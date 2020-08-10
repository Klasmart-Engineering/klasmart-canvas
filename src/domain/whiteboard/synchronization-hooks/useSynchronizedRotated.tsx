import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { CanvasAction, SET } from '../reducers/undo-redo';
import { TypedShape } from '../../../interfaces/shapes/shapes';

const useSynchronizedRotated = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldSerializeEvent: (id: string) => boolean,
  shouldHandleRemoteEvent: (id: string) => boolean,
  undoRedoDispatch: React.Dispatch<CanvasAction>,
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
              left: target.left,
              scaleX: target.scaleX,
              scaleY: target.scaleY,
              flipX: target.flipX,
              flipY: target.flipY,
              originX: 'center',
              originY: 'center',
            });
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
      if (type === 'activeSelection') {
        e.target._objects.forEach((activeObject: any) => {
          if (!shouldSerializeEvent(activeObject.id)) return;
          const matrix = activeObject.calcTransformMatrix();
          const options = fabric.util.qrDecompose(matrix);

          const target = {
            angle: options.angle,
            top: options.translateY,
            left: options.translateX,
            scaleX: options.scaleX,
            scaleY: options.scaleY,
            flipX: activeObject.flipX,
            flipY: activeObject.flipY,
          };

          const payload = {
            type,
            target,
            id: activeObject.id,
          };

          eventSerializer?.push('rotated', payload);
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
