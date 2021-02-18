import { useEffect, useContext } from 'react';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import { ITextOptions } from 'fabric/fabric-impl';
import { WhiteboardContext } from '../WhiteboardContext';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';

interface ITarget {
  strategy: string;
  userId: string;
  isBackgroundImage: boolean;
  isLocalImage: boolean;
  objectIds?: string[];
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

  const {
    clearIsActive,
    setBackgroundImage,
    setLocalImage,
    setLocalBackground,
    isCursorObject,
  } = useContext(WhiteboardContext);

  /** Register and handle remote event. */
  useEffect(() => {
    const removed = (objectId: string, target: ITarget) => {
      if (target.isLocalImage) {
        setLocalImage('');
        setBackgroundImage('');
        setLocalBackground(false);
        return;
      }

      switch (target.strategy) {
        case 'allowClearMyself':
          if (!shouldHandleRemoteEvent(objectId)) return;
          canvas?.forEachObject(function (obj: ICanvasObject) {
            if (obj.id === objectId && !isCursorObject(obj)) {
              canvas?.remove(obj);
            }
          });

          if (target.isBackgroundImage) {
            // In order to remove background you need to add 0 to the first argument.
            // An empty string unfortunately doesnt work.
            // https://stackoverflow.com/a/14171884
            // @ts-ignore
            canvas?.setBackgroundImage(0, canvas.renderAll.bind(canvas));
            setLocalImage('');
            setBackgroundImage('');
          }

          break;
        case 'allowClearAll':
          if (shouldHandleRemoteEvent(objectId)) return;
          canvas?.forEachObject(function (obj: ICanvasObject) {
            if (!isCursorObject(obj)) {
              canvas?.remove(obj);
            }
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

              if (object[0] === target.userId && !isCursorObject(obj)) {
                canvas?.remove(obj);
              }
            }
          });
          break;
        case 'removeGroup':
          if (shouldHandleRemoteEvent(objectId)) return;

          target.objectIds?.forEach((id) => {
            const objectToRemove = canvas
              ?.getObjects()
              .find((object: ICanvasObject) => object.id === id);

            canvas?.remove(objectToRemove as fabric.Object);
          });

          const event = ({
            event: { id: `${userId}:group` },
            type: 'removed',
            activeIds: target.objectIds,
          } as unknown) as IUndoRedoEvent;

          undoRedoDispatch({
            type: SET,
            payload: canvas?.getObjects(),
            canvasId: userId,
            event,
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
    setLocalImage,
    setBackgroundImage,
    setLocalBackground,
    isCursorObject,
  ]);

  /** Register and handle local event. */
  useEffect(() => {
    const objectRemoved = (e: fabric.IEvent | CanvasEvent) => {
      if ((e.target as ICanvasObject).isActiveErase) {
        return;
      }

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
          !(e.target as TypedShape).fromJSON &&
          ((e.target as ICanvasObject)?.text?.trim().length ||
            (e.target as ICanvasObject).get('type') !== 'textbox')
        ) {
          let event = { event: payload, type: 'removed' } as IUndoRedoEvent;

          undoRedoDispatch({
            type: SET,
            payload: canvas?.getObjects(),
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
