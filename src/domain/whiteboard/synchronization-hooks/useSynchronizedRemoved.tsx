import { useEffect } from 'react';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';

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

      canvas?.forEachObject(function (obj: any) {
        if (obj.id && obj.id === id) {
          canvas?.remove(obj);
        }
      });
      canvas?.renderAll();

      undoRedoDispatch({
        type: SET_OTHER,
        payload: (canvas?.getObjects() as unknown) as TypedShape[],
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
    const objectRemoved = (e: any) => {
      if (!shouldSerializeEvent(e.target.id)) return;

      const payload = {
        id: e.target.id,
      };

      if (canvas && (!e.target?._objects && e.target?._objects?.length > 0)) {
        const event = { event: payload, type: 'removed' };

        undoRedoDispatch({
          type: SET,
          payload: (canvas.getObjects() as unknown) as TypedShape[],
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
