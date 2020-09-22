import { useEffect, useContext } from 'react';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ITextOptions } from 'fabric/fabric-impl';
import { WhiteboardContext } from '../WhiteboardContext';
import { TypedShape } from '../../../interfaces/shapes/shapes';

interface ITarget {
  strategy: string;
  userId: string;
}

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

  const { clearIsActive } = useContext(WhiteboardContext);

  /** Register and handle remote event. */
  useEffect(() => {
    const removed = (objectId: string, target: ITarget) => {
      switch (target.strategy) {
        case 'allowClearMyself':
          if (!shouldHandleRemoteEvent(objectId)) return;
          canvas?.forEachObject(function (obj: ICanvasObject) {
            if (obj.id === objectId) {
              canvas?.remove(obj);
            }
          });
          break;
        case 'allowClearAll':
          if (shouldHandleRemoteEvent(objectId)) return;
          canvas?.forEachObject(function (obj: ICanvasObject) {
            canvas?.remove(obj);
          });
          break;
        case 'allowClearOthers':
          if (shouldHandleRemoteEvent(objectId)) return;
          canvas?.forEachObject(function (obj: ICanvasObject) {
            if (obj.id) {
              const object = obj.id.split(':');

              if (!object.length) {
                throw new Error('Invalid ID');
              }

              if (object[0] === target.userId) {
                canvas?.remove(obj);
              }
            }
          });
          break;
        default:
          canvas?.forEachObject(function (obj: ICanvasObject | TypedShape) {
            if (obj.id && obj.id === objectId) {
              canvas?.remove(obj);
            }
          });
      }

      canvas?.renderAll();

      if (shouldHandleRemoteEvent(objectId)) {
        undoRedoDispatch({
          type: SET_OTHER,
          payload: canvas?.getObjects(),
          canvasId: userId,
        });
      }
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
      if (
        !e.target ||
        !(e.target as ICanvasObject).id ||
        ((e.target as ICanvasObject).id &&
          !shouldSerializeEvent((e.target as ICanvasObject).id as string))
      ) {
        return;
      }

      const payload = {
        id: (e.target as ICanvasObject).id as string,
      };

      const canvasEvent = e.target as ICanvasObject;
      const groupObjects = canvasEvent?._objects || [];

      if (
        canvas &&
        payload.id &&
        (!canvasEvent?._objects || groupObjects.length > 0) &&
        !(e.target as ICanvasObject).groupClear &&
        !clearIsActive
      ) {
        if (
          (e.target as ITextOptions).text &&
          !(e.target as ITextOptions).text?.trim()
        )
          return;

        if (
          !(e.target as TypedShape).skipState &&
          !(e.target as TypedShape).fromJSON
        ) {
          const event = { event: payload, type: 'removed' } as IUndoRedoEvent;
          undoRedoDispatch({
            type: SET,
            payload: canvas.getObjects(),
            canvasId: userId,
            event,
          });
        }

        eventSerializer?.push('removed', payload as ObjectEvent);
      }
    };

    canvas?.on('object:removed', objectRemoved);

    return () => {
      canvas?.off('object:removed', objectRemoved);
    };
  }, [
    canvas,
    clearIsActive,
    eventSerializer,
    shouldSerializeEvent,
    undoRedoDispatch,
    userId,
  ]);
};

export default useSynchronizedRemoved;
