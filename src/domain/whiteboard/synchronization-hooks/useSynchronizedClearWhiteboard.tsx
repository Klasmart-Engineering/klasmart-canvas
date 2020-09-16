import { useEffect, useContext } from 'react';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ITextOptions } from 'fabric/fabric-impl';
import { WhiteboardContext } from '../WhiteboardContext';

interface IFilter {
  filter?: string[];
}

const useSynchronizedClearWhiteboard = (
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
    const clear = (objects: IFilter) => {
      const whiteboardObjects = canvas?.getObjects();

      if (!objects.filter) {
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

      if (shouldHandleRemoteEvent(objectId)) {
        undoRedoDispatch({
          type: SET_OTHER,
          payload: canvas?.getObjects(),
          canvasId: userId,
        });
      }
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

export default useSynchronizedRemoved;
