import { useEffect } from 'react';
import { PainterEvents } from '../event-serializer/PainterEvents';
import {
  ObjectEvent,
  ObjectType,
} from '../event-serializer/PaintEventSerializer';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { CanvasAction, SET, SET_OTHER } from '../reducers/undo-redo';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { ICanvasDrawingEvent } from '../../../interfaces/canvas-events/canvas-drawing-event';
import { IPathTarget } from '../../../interfaces/canvas-events/path-target';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import { DEFAULT_VALUES } from '../../../config/toolbar-default-values';

const useSynchronizedAdded = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldSerializeEvent: (id: string) => boolean,
  shouldHandleRemoteEvent: (id: string) => boolean,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  /** Register and handle path:created event. */
  useEffect(() => {
    const pathCreated = (e: ICanvasDrawingEvent) => {
      if (!e.path) {
        return;
      }

      e.path.id = PainterEvents.createId(userId);
      // if (!shouldSerializeEvent(e.path.id)) return;

      const target: IPathTarget = {
        stroke: e.path.stroke,
        strokeWidth: e.path.strokeWidth,
        path: e.path.path,
      };

      eventSerializer?.push(
        'added',
        PainterEvents.pathCreated(target, e.path.id, userId) as ObjectEvent
      );

      if (canvas) {
        const event = {
          event: PainterEvents.pathCreated(target, e.path.id, userId),
          type: 'added',
        };

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
    const objectAdded = (e: CanvasEvent) => {
      if (!e.target || !e.target.id) return;
      if (!shouldSerializeEvent(e.target.id)) return;

      const type: ObjectType = (e.target.get('type') || 'path') as ObjectType;

      if (type === 'path') {
        return;
      }

      const target = {
        ...(type === 'textbox' && {
          text: e.target.text,
          fontFamily: e.target.fontFamily,
          stroke: e.target.fill,
          top: e.target.top,
          left: e.target.left,
          width: e.target.width,
        }),
      };

      const payload: ObjectEvent = {
        type,
        target,
        id: e.target.id,
      };

      if (canvas) {
        const event = { event: payload, type: 'added' };

        undoRedoDispatch({
          type: SET,
          payload: canvas.getObjects(),
          canvasId: userId,
          event,
        });
      }

      eventSerializer?.push('added', payload);
    };

    canvas?.on('object:added', objectAdded);

    return () => {
      canvas?.off('object:added', objectAdded);
    };
  }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);

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
        return;
      }

      if (objectType === 'path') {
        const pencil = new fabric.PencilBrush();
        pencil.color = target.stroke || '#000';
        pencil.width = target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH;

        // Convert Points to SVG Path
        const res = pencil.createPath(target.path || '');
        (res as ICanvasObject).id = id;
        res.selectable = false;
        res.evented = false;
        res.strokeUniform = true;

        canvas?.add(res);

        undoRedoDispatch({
          type: SET_OTHER,
          payload: canvas?.getObjects(),
          canvasId: userId,
        });
      }
    };

    eventController?.on('added', added);

    return () => {
      eventController?.removeListener('added', added);
    };
  }, [
    canvas,
    eventController,
    shouldHandleRemoteEvent,
    undoRedoDispatch,
    userId,
  ]);
};

export default useSynchronizedAdded;
