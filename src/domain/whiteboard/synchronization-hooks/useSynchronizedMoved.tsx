import { useCallback, useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET, SET_OTHER, SET_GROUP } from '../reducers/undo-redo';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { v4 as uuidv4 } from 'uuid';
import { TypedGroup } from '../../../interfaces/shapes/group';

const useSynchronizedMoved = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldSerializeEvent: (id: string) => boolean,
  shouldHandleRemoteEvent: (id: string) => boolean,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  const moveSelectedObject = useCallback(
    (type: any, e: any) => {
      if (!shouldSerializeEvent(e.target.id)) return;

      const target = {
        angle: e.target.angle,
        top: e.target.top,
        left: e.target.left,
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
        const event = { event: payload, type: 'moved' };

        undoRedoDispatch({
          type: SET,
          payload: (canvas.getObjects() as unknown) as TypedShape[],
          canvasId: userId,
          event,
        });
      }

      eventSerializer?.push('moved', payload);
    },
    [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]
  );

  const moveSelectedGroup = useCallback(
    (type: any, e: any) => {
      const activeIds: string[] = [];

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

        const payload: ObjectEvent = {
          type,
          target,
          id: activeObject.id,
        };

        activeIds.push(activeObject.id);

        eventSerializer?.push('moved', payload);
      });

      const payload = {
        type,
        svg: true,
        target: null,
        id: `${userId}:group`,
      };

      const event = { event: payload, type: 'activeSelection', activeIds };
      
      let filtered = canvas?.getObjects().filter((o: any) => {
        return !o.group;
      });

      let active: TypedGroup = canvas?.getActiveObject() as TypedGroup;
      active?.set({ id: `${userId}:group` });

      undoRedoDispatch({
        type: SET_GROUP,
        payload: [ ...filtered as any[], active ],
        canvasId: userId,
        event,
      });
    },
    [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]
  );

  /** Register and handle object:moved event. */
  useEffect(() => {
    const objectMoved = (e: any) => {
      const type = e.target.get('type');
      if (type === 'activeSelection') {
        moveSelectedGroup(type, e);
      } else {
        moveSelectedObject(type, e);
      }
    };

    canvas?.on('object:moved', objectMoved);

    return () => {
      canvas?.off('object:moved', objectMoved);
    };
  }, [canvas, eventSerializer, moveSelectedGroup, moveSelectedObject]);

  /** Register and handle remote moved event. */
  useEffect(() => {
    const moved = (id: string, objectType: string, target: any) => {
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
              angle: target.angle || 0,
              top: target.top,
              left: target.left,
              scaleX: target.scaleX || 1,
              scaleY: target.scaleY || 1,
              flipX: target.flipX || false,
              flipY: target.flipY || false,
              originX: 'left',
              originY: 'top',
            });
            obj.setCoords();   
  
            undoRedoDispatch({
              type: SET_OTHER,
              payload: (canvas?.getObjects() as unknown) as TypedShape[],
              canvasId: userId
            });
          }
        }
      });
      canvas?.renderAll();
    };

    eventController?.on('moved', moved);

    return () => {
      eventController?.removeListener('moved', moved);
    };
  }, [canvas, eventController, shouldHandleRemoteEvent, undoRedoDispatch, userId]);
};

export default useSynchronizedMoved;
