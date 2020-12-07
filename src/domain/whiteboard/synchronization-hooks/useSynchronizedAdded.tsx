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
import { ICanvasFreeDrawingBrush } from '../../../interfaces/free-drawing/canvas-free-drawing-brush';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { fabricGif } from '../gifs-actions/fabricGif';
import { addSynchronizationInSpecialBrushes } from '../brushes/actions/addSynchronizationInSpecialBrushes';

const useSynchronizedAdded = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldSerializeEvent: (id: string) => boolean,
  shouldHandleRemoteEvent: (id: string) => boolean,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const { floodFillIsActive, isGif, image, setLocalImage } = useContext(
    WhiteboardContext
  );
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  /** Register and handle path:created event. */
  // Remove all of this useEffect.
  useEffect(() => {
    const pathCreated = (e: ICanvasDrawingEvent) => {
      if (!e.path) {
        return;
      }

      e.path.id = PainterEvents.createId(userId);

      const target = {
        stroke: e.path.stroke,
        strokeWidth: e.path.strokeWidth,
        path: e.path.path,
        strokeDashArray: ((e.path as unknown) as ICanvasFreeDrawingBrush)
          .strokeDashArray,
        isPartialErased: e.path.isPartialErased,
      } as ICanvasObject;

      eventSerializer?.push(
        'added',
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

    canvas?.on('path:created', pathCreated);

    return () => {
      canvas?.off('path:created', pathCreated);
    };
  }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);

  /** Register and handle object:added event. */
  useEffect(() => {
    const objectAdded = (e: any) => {
      if (!e.target?.id) return;
      if (e.target.fromJSON) return;
      if (!shouldSerializeEvent(e.target.id)) return;

      let target;
      if (e.type === 'localImage') {
        const payload: ObjectEvent = {
          type: e.type,
          target: e.target,
          id: e.target.id,
        };
        eventSerializer?.push('added', payload);

        return;
      }

      const type: ObjectType = (e.target.get('type') || 'path') as ObjectType;

      switch (type) {
        case 'path':
          return;

        case 'textbox':
          target = {
            text: e.target.text,
            fontFamily: e.target.fontFamily,
            stroke: e.target.fill,
            top: e.target.top,
            left: e.target.left,
            width: e.target.width,
          };
          break;

        case 'group':
          target = {
            basePath: e.target.basePath,
          };
          break;

        case 'image':
          if (e.target.basePath) {
            target = {
              basePath: e.target.basePath,
              scaleX: e.target.scaleX,
              scaleY: e.target.scaleY,
              angle: e.target.angle,
              flipX: e.target.flipX,
              flipY: e.target.flipY,
            };
          }
          break;
      }

      const payload: ObjectEvent = {
        type,
        target: {
          ...target,
          top: e.target.top,
          left: e.target.left,
        } as ICanvasObject,
        id: e.target.id,
      };

      if (
        (canvas && (payload.target as ICanvasObject)?.text?.trim().length) ||
        (canvas && payload.type === 'group') ||
        (canvas && payload.type === 'image')
      ) {
        const event = { event: payload, type: 'added' } as IUndoRedoEvent;

        undoRedoDispatch({
          type: SET,
          payload: (canvas?.getObjects() as unknown) as TypedShape[],
          canvasId: userId,
          event,
        });

        eventSerializer?.push('added', payload);
      }

      if (isGif) {
        const payload: ObjectEvent = {
          type: 'gif',
          target: URL.createObjectURL(image),
          id: e.target.id,
        };

        eventSerializer?.push('added', payload);

        return;
      }

      if (e.type === 'backgroundImage') {
        const payload: ObjectEvent = {
          type: e.type,
          target: e.target,
          id: e.target.id,
        };
        eventSerializer?.push('added', payload);

        return;
      }

      if (type === 'image' && !e.target.basePath && isGif) {
        const payload: ObjectEvent = {
          type,
          target: e.target,
          id: e.target.id,
        };
        eventSerializer?.push('added', payload);
      }
    };

    canvas?.on('object:added', objectAdded);

    return () => {
      canvas?.off('object:added', objectAdded);
    };
  }, [
    canvas,
    eventSerializer,
    shouldSerializeEvent,
    undoRedoDispatch,
    userId,
    isGif,
    image,
  ]);

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
    const added = (id: string, objectType: string, target: ICanvasObject) => {
      // TODO: We'll want to filter events based on the user ID. This can
      // be done like this. Example of extracting user id from object ID:
      // let { user } = new ShapeID(id);
      // Help!
      // if (eventSerializer?.didSerializeEvent(id)) return;

      // TODO: We'll have to replace this with the user based filtering. Because
      // we want to allow bi-directional events (Teacher <-> Student) as opposed
      // to (Teacher --> Student).

      // Events come from another user
      // Pass as props to user context
      // Ids of shapes + userId  uuid()
      if (!shouldHandleRemoteEvent(id)) return;

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

        (text as ICanvasObject).id = id;
        canvas?.add(text);

        undoRedoDispatch({
          type: SET_OTHER,
          payload: (canvas?.getObjects() as unknown) as TypedShape[],
          canvasId: userId,
        });

        return;
      }

      if (objectType === 'group' && canvas) {
        addSynchronizationInSpecialBrushes(
          canvas,
          userId,
          id,
          target as ICanvasBrush
        );
      }

      let shape = null;

      if (objectType === 'path' && !target.name) {
        const pencil = new fabric.PencilBrush();
        pencil.color = target.stroke || '#000';
        pencil.width = target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH;
        pencil.strokeDashArray = target.strokeDashArray || [];

        // Convert Points to SVG Path
        const res = pencil.createPath((target.path as string) || '');
        (res as ICanvasObject).id = id;
        res.selectable = false;
        res.evented = false;
        res.strokeUniform = true;
        if (target.isPartialErased) {
          res.globalCompositeOperation = 'destination-out';
        }

        canvas?.add(res);
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

      if (objectType === 'image') {
        const src = (target as ICanvasBrush).basePath?.imageData || target.src;

        fabric.Image.fromURL(src as string, (data: fabric.Image) => {
          (data as TypedShape).set({
            id,
            top: target.top,
            left: target.left,
            angle: target.angle,
            scaleX: target.scaleX,
            scaleY: target.scaleY,
            flipX: target.flipX,
            flipY: target.flipY,
            selectable: false,
            evented: false,
          });

          if ((target as ICanvasBrush).basePath) {
            ((data as unknown) as ICanvasBrush).set({
              basePath: (target as ICanvasBrush).basePath,
            });
          }

          canvas?.add(data);
          canvas?.renderAll();

          undoRedoDispatch({
            type: SET_OTHER,
            payload: (canvas?.getObjects() as unknown) as TypedShape[],
            canvasId: userId,
          });
        });
      }

      if (objectType === 'gif') {
        (async function () {
          try {
            const gif = await fabricGif(target + '', 200, 200, 2000);
            gif.set({ top: 0, left: 0, selectable: false, evented: false });
            gif.id = id;
            canvas?.add(gif);

            fabric.util.requestAnimFrame(function render() {
              canvas?.renderAll();
              fabric.util.requestAnimFrame(render);
            });
          } catch (e) {
            console.error(e);
          }
        })();
      }

      if (objectType === 'backgroundImage') {
        fabric.Image.fromURL(target.src as string, function (img) {
          canvas?.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: (canvas.width || 0) / (img.width || 0),
            scaleY: (canvas.height || 0) / (img.height || 0),
            originX: 'left',
            originY: 'top',
            // @ts-ignore
            id,
          });
        });

        return;
      }

      if (objectType === 'localImage') {
        if (target.backgroundImage) setLocalImage(target.backgroundImage);

        return;
      }

      if (shape) {
        target = {
          ...target,
          selectable: false,
          evented: floodFillIsActive,
          hoverCursor: floodFillIsActive ? 'not-allowed' : 'move',
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
    setLocalImage,
  ]);
};

export default useSynchronizedAdded;
