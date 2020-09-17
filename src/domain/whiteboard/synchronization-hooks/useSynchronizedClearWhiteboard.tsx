import { useEffect } from 'react';
import { CanvasAction, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';

interface IFilter {
  filter?: string[];
}

const useSynchronizedClearWhiteboard = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  /** Register and handle remote event. */
  useEffect(() => {
    const clear = (objects: IFilter) => {
      const whiteboardObjects = canvas?.getObjects();

      if (!objects.filter?.length) {
        whiteboardObjects?.forEach((object: ICanvasObject) => {
          canvas?.remove(object);
        });
      } else {
        if (!canvas?.getObjects().length) return;

        objects.filter.forEach((objectId) => {
          let currentObject = whiteboardObjects?.find(
            (object: ICanvasObject) => {
              return object.id === objectId;
            }
          );

          if (currentObject) {
            canvas.remove(currentObject);
          }
        });
      }
      // switch (target.strategy) {
      //   case 'allowClearMyself':
      //     if (!shouldHandleRemoteEvent(objectId)) return;
      //     canvas?.forEachObject(function (obj: ICanvasObject) {
      //       if (obj.id === objectId) {
      //         canvas?.remove(obj);
      //       }
      //     });
      //     break;
      //   case 'allowClearAll':
      //     if (shouldHandleRemoteEvent(objectId)) return;
      //     canvas?.forEachObject(function (obj: ICanvasObject) {
      //       canvas?.remove(obj);
      //     });
      //     break;
      //   case 'allowClearOthers':
      //     if (shouldHandleRemoteEvent(objectId)) return;
      //     canvas?.forEachObject(function (obj: ICanvasObject) {
      //       if (obj.id) {
      //         const object = obj.id.split(':');

      //         if (!object.length) {
      //           throw new Error('Invalid ID');
      //         }

      //         if (object[0] === target.userId) {
      //           canvas?.remove(obj);
      //         }
      //       }
      //     });
      //     break;
      //   default:
      //     canvas?.forEachObject(function (obj: ICanvasObject) {
      //       if (obj.id && obj.id === objectId) {
      //         canvas?.remove(obj);
      //       }
      //     });
      // }

      canvas?.renderAll();

      undoRedoDispatch({
        type: SET_OTHER,
        payload: canvas?.getObjects(),
        canvasId: userId,
      });
    };

    eventController?.on('clearWhiteboard', clear);

    return () => {
      eventController?.removeListener('clearWhiteboard', clear);
    };
  }, [
    canvas,
    eventController,
    shouldHandleRemoteEvent,
    undoRedoDispatch,
    userId,
  ]);
};

export default useSynchronizedClearWhiteboard;
