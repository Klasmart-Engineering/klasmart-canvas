import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { CanvasAction, SET, SET_GROUP } from '../reducers/undo-redo';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { v4 as uuidv4 } from 'uuid';

const useSynchronizedRotated = (
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
    const rotated = (id: string, objectType: string, target: any) => {
      if (!shouldHandleRemoteEvent(id)) return;

      canvas?.forEachObject(function (obj: any) {
        if (obj.id && obj.id === id) {
          if (objectType === 'activeSelection') {
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

    eventController?.on('rotated', rotated);

    return () => {
      eventController?.removeListener('rotated', rotated);
    };
  }, [canvas, eventController, shouldHandleRemoteEvent]);

  /** Register and handle local event. */
  useEffect(() => {
    const objectRotated = (e: any) => {
      const type = e.target.get('type');
      const eventId: string = uuidv4();
      const events: any[] = [];

      if (type === 'activeSelection') {
        e.target._objects.forEach((activeObject: any) => {
          if (!shouldSerializeEvent(activeObject.id)) return;
          const matrix = activeObject.calcTransformMatrix();
          const options = fabric.util.qrDecompose(matrix);
          const flipX = () => {
            if (activeObject.flipX && e.target.flipX) {
              return false;
            }

            return activeObject.flipX || e.target.flipX;
          };

          const flipY = () => {
            if (activeObject.flipY && e.target.flipY) {
              return false;
            }

            return activeObject.flipY || e.target.flipY;
          };

          const angle = () => {
            if (e.target.angle !== 0) {
              return e.target.angle;
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

          const payload = {
            type,
            target,
            id: activeObject.id,
          };

          const event = { event: payload, type: 'activeSelection', eventId };
          events.push(event);

          eventSerializer?.push('rotated', payload);
        });

        let mappedObjects = canvas?.getObjects().map((object: any) => {
          
          if (!object.group) {
            return object.toJSON(['strokeUniform', 'id']);
          }
          const matrix = object.calcTransformMatrix();
          const options = fabric.util.qrDecompose(matrix);
          const transformed = object.toJSON(['strokeUniform', 'id']);
          let top = !options.angle ? (object.group.height / 2 + object.top) + object.group.top : options.translateY;
          let left = !options.angle ? (object.group.width / 2 + object.left) + object.group.left : options.translateX;
  
          events.forEach((event: any) => {
            if (event.event.id === object.id) {
              event.event.target.top = top;
              event.event.target.left = left;
            }
          });
  
          return {
            ...transformed,
            angle: options.angle,
            top,
            left,
            scaleX: options.scaleX,
            scaleY: options.scaleY,
          }
        });

        undoRedoDispatch({
          type: SET_GROUP,
          payload: mappedObjects as unknown as fabric.Object[],
          canvasId: userId,
          event: events,
        });

      } else {
        if (!e.target.id) {
          return;
        }

        const id = e.target.id;

        const target = {
          top: e.target.top,
          left: e.target.left,
          angle: e.target.angle,
          scaleX: e.target.scaleX,
          scaleY: e.target.scaleY,
          flipX: e.target.flipX,
          flipY: e.target.flipY,
        };

        const payload = {
          type,
          target,
          id,
        };

        if (canvas) {
          const event = { event: payload, type: 'moved' };

          undoRedoDispatch({
            type: SET,
            payload: (canvas.getObjects() as unknown) as TypedShape[],
            canvasId: userId,
            event,
          });
        }

        eventSerializer?.push('rotated', payload);
      }
    };

    canvas?.on('object:rotated', objectRotated);

    return () => {
      canvas?.off('object:rotated', objectRotated);
    };
  }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
};

export default useSynchronizedRotated;
