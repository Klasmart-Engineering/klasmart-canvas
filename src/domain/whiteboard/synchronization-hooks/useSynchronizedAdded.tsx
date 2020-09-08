import { useEffect, useContext } from 'react';
import { PainterEvents } from '../event-serializer/PainterEvents';
import {
  ObjectEvent,
  ObjectType,
} from '../event-serializer/PaintEventSerializer';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { CanvasAction, SET, SET_OTHER } from '../reducers/undo-redo';
import { TypedShape, TypedPolygon } from '../../../interfaces/shapes/shapes';
import { chat, star, arrow, hexagon, pentagon } from '../shapes/shapes';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { ICanvasDrawingEvent } from '../../../interfaces/canvas-events/canvas-drawing-event';
import { DEFAULT_VALUES } from '../../../config/toolbar-default-values';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { WhiteboardContext } from '../WhiteboardContext';
import { EventFilterFunction } from '../WhiteboardCanvas';

const useSynchronizedAdded = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  generatedBy: string,
  shouldSerializeEvent: EventFilterFunction,
  shouldHandleRemoteEvent: EventFilterFunction,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const { floodFillIsActive } = useContext(WhiteboardContext);
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  /** Register and handle path:created event. */
  useEffect(() => {
    const pathCreated = (e: ICanvasDrawingEvent) => {
      if (!e.path) throw new Error(`path:created event without path.`);
      // NOTE: This object already have an ID, so it's not a newly created object. The object
      // create event shouldn't be serialized and sent because it was created because of
      // an incoming event from someone else.
      if (e.path.id) return;

      PainterEvents.generateAndSetIdForTarget(userId, generatedBy, e.path);

      if (!e.path.id) throw new Error(`path doesn't have any ID`);

      const target = {
        stroke: e.path.stroke,
        strokeWidth: e.path.strokeWidth,
        path: e.path.path,
      } as ICanvasObject;

      eventSerializer?.push(
        'added',
        generatedBy,
        PainterEvents.pathCreated(target, e.path.id, userId) as ObjectEvent
      );

      const stateTarget = { ...target, top: e.path.top, left: e.path.left };

      if (canvas) {
        const event = ({
          event: {
            id: e.path.id,
            target: stateTarget,
            type: 'path',
          },
          type: 'added',
        } as unknown) as IUndoRedoEvent;

        undoRedoDispatch({
          type: SET,
          payload: canvas.getObjects(),
          canvasId: userId,
          event,
        });
      }
    };

    if (canvas) {
      canvas.on('path:created', pathCreated);

      return () => {
        canvas.off('path:created', pathCreated);
      };
    }
  }, [canvas, eventSerializer, generatedBy, shouldSerializeEvent, undoRedoDispatch, userId]);

  /** Register and handle object:added event. */
  useEffect(() => {
    const objectAdded = (e: any) => {
      if (!e.target) throw new Error(`object:added without any target`);
      if (e.target.fromJSON) return;

      const type: ObjectType = (e.target.get('type') || 'path') as ObjectType;

      // NOTE: Path events is handled separately by the 'path:created' handler.
      if (type === 'path') return;

      // NOTE: This object already have an ID, so it's not a newly created object. The object
      // create event shouldn't be serialized and sent because it was created because of
      // an incoming event from someone else.
      if (e.target.id) return;

      PainterEvents.generateAndSetIdForTarget(userId, generatedBy, e.target);

      if (!e.target.id) throw new Error(`object doesn't have any ID`);

      const target = {
        ...(type === 'textbox' && {
          text: e.target.text,
          fontFamily: e.target.fontFamily,
          stroke: e.target.fill,
          top: e.target.top,
          left: e.target.left,
          width: e.target.width,
        }),
      } as ICanvasObject;

      const payload: ObjectEvent = {
        type,
        target: {
          ...target,
          top: e.target.top,
          left: e.target.left,
        } as ICanvasObject,
        id: e.target.id,
      };

      if (canvas && (payload.target as ICanvasObject)?.text?.trim().length) {
        const event = { event: payload, type: 'added' } as IUndoRedoEvent;

        undoRedoDispatch({
          type: SET,
          payload: (canvas?.getObjects() as unknown) as TypedShape[],
          canvasId: userId,
          event,
        });

        eventSerializer?.push('added', generatedBy, payload);
      }
    };

    if (canvas) {
      canvas.on('object:added', objectAdded);

      return () => {
        canvas.off('object:added', objectAdded);
      };
    }
  }, [canvas, eventSerializer, generatedBy, shouldSerializeEvent, undoRedoDispatch, userId]);

  /**
   * Generates a new shape based on shape name.
   * @param target Object data.
   */
  const generateGenericShape = (target: {
    [key: string]: number | string | boolean;
  }): TypedShape | TypedPolygon => {
    switch (target.name) {
      case 'chatBubble': {
        return chat(
          target.width as number,
          target.height as number,
          target.stroke as string,
          target.filled as boolean,
          target.strokeWidth as number
        );
      }
      case 'star': {
        return star(
          target.width as number,
          target.height as number,
          target.stroke as string,
          target.filled as boolean,
          target.strokeWidth as number
        );
      }
      case 'hexagon': {
        return hexagon(
          target.stroke as string,
          target.filled as boolean,
          target.strokeWidth as number
        );
      }
      case 'pentagon': {
        return pentagon(
          target.stroke as string,
          target.filled as boolean,
          target.strokeWidth as number
        );
      }
      default: {
        return arrow(
          target.width as number,
          target.height as number,
          target.stroke as string,
          target.filled as boolean,
          target.strokeWidth as number
        );
      }
    }
  };

  /** Register and handle remote added event. */
  useEffect(() => {
    const added = (id: string, generatedBy: string, objectType: string, target: ICanvasObject) => {
      // Events come from another user
      // Pass as props to user context
      // Ids of shapes + userId  uuid()

      if (!shouldHandleRemoteEvent(id, generatedBy)) return;

      console.log(`${userId}: adding remote shape with id: ${id} generated by: ${generatedBy}`);

      if (objectType === 'textbox') {
        let text = new fabric.Textbox(target.text || '', {
          fontSize: 30,
          fontWeight: 400,
          fontStyle: 'normal',
          fontFamily: target.fontFamily,
          fill: target.stroke,
          top: target.top,
          left: target.left,
          width: target.width,
          selectable: false,
        });


        const canvasObject = text as ICanvasObject;
        canvasObject.set({
          id,
          generatedBy
        });

        canvas?.add(canvasObject);

        undoRedoDispatch({
          type: SET_OTHER,
          payload: (canvas?.getObjects() as unknown) as TypedShape[],
          canvasId: userId,
        });

        return;
      }

      let shape = null;

      if (objectType === 'path' && !target.name) {
        const pencil = new fabric.PencilBrush();
        pencil.color = target.stroke || '#000';
        pencil.width = target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH;

        // Convert Points to SVG Path
        const res = pencil.createPath((target.path as string) || '');

        const canvasObject = res as ICanvasObject;
        canvasObject.set({
          id,
          selectable: false,
          evented: false,
          strokeUniform: true,
          generatedBy,
        });

        canvas?.add(canvasObject);
        canvas?.renderAll();
      } else if (
        (objectType === 'path' || objectType === 'polygon') &&
        target.name
      ) {
        shape = generateGenericShape(
          (target as unknown) as { [key: string]: string | number | boolean }
        );
      }

      if (objectType === 'rect') {
        shape = new fabric.Rect();
      }

      if (objectType === 'triangle') {
        shape = new fabric.Triangle();
      }

      if (objectType === 'ellipse') {
        shape = new fabric.Ellipse();
      }

      if (shape) {
        target = {
          ...target,
          id,
          selectable: false,
          evented: floodFillIsActive,
          hoverCursor: floodFillIsActive ? 'not-allowed' : 'move',
          generatedBy,
        } as ICanvasObject;

        shape.set(target as Partial<fabric.Ellipse>);
        canvas?.add(shape);
        canvas?.renderAll();
      }

      undoRedoDispatch({
        type: SET_OTHER,
        payload: (canvas?.getObjects() as unknown) as TypedShape[],
        canvasId: userId,
      });
    };

    eventController?.on('added', added);

    return () => {
      eventController?.removeListener('added', added);
    };
  }, [
    canvas,
    eventController,
    floodFillIsActive,
    shouldHandleRemoteEvent,
    undoRedoDispatch,
    userId,
  ]);
};

export default useSynchronizedAdded;
