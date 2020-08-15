import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { CanvasAction, SET } from '../reducers/undo-redo';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import {
  ObjectEvent,
  ObjectType,
} from '../event-serializer/PaintEventSerializer';

const useSynchronizedScaled = (
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
    const scaled = (id: string, objectType: string, target: ICanvasObject) => {
      if (!shouldHandleRemoteEvent(id)) return;
      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          if (objectType === 'activeSelection' && target.left && obj.left) {
            obj.set({
              angle: target.angle,
              top: target.top,
              left: target.left + 1,
              scaleX: target.scaleX,
              scaleY: target.scaleY,
              flipX: target.flipX,
              flipY: target.flipY,
              originX: 'center',
              originY: 'center',
            });
            obj.set({ left: obj.left - 1 });
            obj.setCoords();
          } else {
            obj.set({
              angle: target.angle,
              top: target.top,
              left: target.left,
              scaleX: target.scaleX,
              scaleY: target.scaleY,
              flipX: target.flipX,
              flipY: target.flipY,
              originX: 'left',
              originY: 'top',
            });
            obj.setCoords();
          }
        }
      });
      canvas?.renderAll();
    };

    eventController?.on('scaled', scaled);

    return () => {
      eventController?.removeListener('scaled', scaled);
    };
  }, [canvas, eventController, shouldHandleRemoteEvent]);

  useEffect(() => {
    const objectScaled = (e: CanvasEvent) => {
      if (!e.target) return;
      const type = e.target.get('type');

      if (type === 'activeSelection' && e.target._objects) {
        e.target._objects.forEach((activeObject: ICanvasObject) => {
          if (activeObject.id && !shouldSerializeEvent(activeObject.id)) return;

          const matrix = activeObject.calcTransformMatrix();
          const options = fabric.util.qrDecompose(matrix);

          const flipX = () => {
            if (activeObject.flipX && e.target?.flipX) {
              return false;
            }

            return activeObject.flipX || e.target?.flipX;
          };
          const flipY = () => {
            if (activeObject.flipY && e.target?.flipY) {
              return false;
            }

            return activeObject.flipY || e.target?.flipY;
          };

          const angle = () => {
            if (e.target?.angle !== 0) {
              return e.target?.angle;
            }

            return activeObject.angle;
          };

          const target = {
            angle: angle(),
            top: options.translateY,
            left: options.translateX,
            scaleX: options.scaleX,
            scaleY: options.scaleY,
            flipX: flipX(),
            flipY: flipY(),
          };

          const payload: ObjectEvent = {
            type,
            target,
            id: activeObject.id || '',
          };

          eventSerializer?.push('scaled', payload);
        });
      } else {
        if (!e.target.id) {
          return;
        }

        if (!shouldSerializeEvent(e.target.id)) return;

        const type: ObjectType = e.target.get('type') as ObjectType;
        const target = {
          top: e.target.top,
          left: e.target.left,
          angle: e.target.angle,
          scaleX: e.target.scaleX,
          scaleY: e.target.scaleY,
          flipX: e.target.flipX,
          flipY: e.target.flipY,
        };

        const payload: ObjectEvent = {
          type,
          target,
          id: e.target.id,
        };

        if (canvas) {
          const event = { event: payload, type: 'scaled' };

          undoRedoDispatch({
            type: SET,
            payload: canvas.getObjects(),
            canvasId: userId,
            event,
          });
        }

        eventSerializer?.push('scaled', payload);
      }
    };

    canvas?.on('object:scaled', objectScaled);

    return () => {
      canvas?.off('object:scaled', objectScaled);
    };
  }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
};

export default useSynchronizedScaled;
