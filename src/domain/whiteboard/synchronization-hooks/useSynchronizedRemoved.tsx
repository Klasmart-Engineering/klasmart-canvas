import { useEffect } from 'react';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';

const useSynchronizedRemoved = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldSerializeEvent: (id: string) => boolean,
  shouldHandleRemoteEvent: (id: string) => boolean,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  /** Register and handle remote event. */
  useEffect(() => {
    const removed = (id: string) => {
      if (!shouldHandleRemoteEvent(id)) return;

      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          canvas?.remove(obj);
        }
      });
      canvas?.renderAll();

      undoRedoDispatch({
        type: SET_OTHER,
        payload: canvas?.getObjects(),
        canvasId: userId,
      });
    };

    eventController?.on('removed', removed);

    return () => {
      eventController?.removeListener('removed', removed);
    };
  }, [
    canvas,
    eventController,
    shouldHandleRemoteEvent,
    undoRedoDispatch,
    userId,
  ]);

  /** Register and handle local event. */
  useEffect(() => {
    const objectRemoved = (e: fabric.IEvent | CanvasEvent) => {
      if (!e.target) return;
      if ((e.target as ICanvasObject).id && !shouldSerializeEvent((e.target as ICanvasObject).id as string)) return;

      const payload = {
        id: (e.target as ICanvasObject).id as string,
      };

      const canvasEvent = e.target as ICanvasObject;
      const groupObjects = canvasEvent?._objects || [];

      if (canvas && payload.id && (!canvasEvent?._objects || groupObjects.length > 0)) {
        const event = { event: payload, type: 'removed' } as IUndoRedoEvent;

        undoRedoDispatch({
          type: SET,
          payload: canvas.getObjects(),
          canvasId: userId,
          event,
        });
      }

      eventSerializer?.push('removed', payload as ObjectEvent);
    };

    canvas?.on('object:removed', objectRemoved);

    return () => {
      canvas?.off('object:removed', objectRemoved);
    };
  }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
};

export default useSynchronizedRemoved;
