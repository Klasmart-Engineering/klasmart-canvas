import { useCallback, useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import {
  ObjectEvent,
  ObjectType,
} from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET, SET_OTHER, SET_GROUP } from '../reducers/undo-redo';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { TypedGroup } from '../../../interfaces/shapes/group';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { IEvent } from 'fabric/fabric-impl';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';

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
    (type: ObjectType, e: CanvasEvent, filteredState?: boolean) => {
      if (
        !e.target ||
        !e.target.id ||
        (e.target.id && !shouldSerializeEvent(e.target.id))
      )
        return;

      e.target.bringToFront();

      const target = {
        angle: e.target.angle,
        top: e.target.top,
        left: e.target.left,
        scaleX: e.target.scaleX,
        scaleY: e.target.scaleY,
        flipX: e.target.flipX,
        flipY: e.target.flipY,
        originX: e.target.originX,
        originY: e.target.originY,
      } as ICanvasObject;

      const payload: ObjectEvent = {
        type,
        target,
        id: e.target.id,
      };

      if (canvas && !filteredState) {
        const event = { event: payload, type: 'moved' };

        undoRedoDispatch({
          type: SET,
          payload: canvas.getObjects(),
          canvasId: userId,
          event: event as IUndoRedoEvent,
        });
      }

      eventSerializer?.push('moved', payload);
    },
    [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]
  );

  const moveSelectedGroup = useCallback(
    (type: ObjectType, e: CanvasEvent, filteredState?: boolean) => {
      const activeIds: string[] = [];

      if (!e.target || !e.target._objects) return;

      e.target._objects.forEach((activeObject: ICanvasObject) => {
        if (!shouldSerializeEvent(activeObject.id as string)) return;
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
        } as ICanvasObject;

        const payload: ObjectEvent = {
          type,
          target,
          id: activeObject.id || '',
        };

        activeIds.push(activeObject.id as string);

        eventSerializer?.push('moved', payload);
      });

      if (!filteredState) {
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
          payload: [...(filtered as any[]), active],
          canvasId: userId,
          event: (event as unknown) as IUndoRedoEvent,
        });
      }
    },
    [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]
  );

  /** Register and handle object:moved event. */
  useEffect(() => {
    const objectMoved = (e: IEvent) => {
      if (!e.target) return;

      const type: ObjectType = (e.target.get('type') || 'path') as ObjectType;
      if (type === 'activeSelection') {
        moveSelectedGroup(type, (e as unknown) as CanvasEvent);
      } else {
        moveSelectedObject(type, (e as unknown) as CanvasEvent);
      }
    };

    const objectMoving = (e: fabric.IEvent) => {
      if (!e.target) return;

      const type: ObjectType = (e.target.get('type') || 'path') as ObjectType;
      if (type === 'activeSelection') {
        moveSelectedGroup(type, (e as unknown) as CanvasEvent, true);
      } else {
        moveSelectedObject(type, (e as unknown) as CanvasEvent, true);
      }
    };

    canvas?.on('object:moved', objectMoved);
    canvas?.on('object:moving', objectMoving);

    return () => {
      canvas?.off('object:moved', objectMoved);
      canvas?.off('object:moving', objectMoving);
    };
  }, [canvas, eventSerializer, moveSelectedGroup, moveSelectedObject]);

  /** Register and handle remote moved event. */
  useEffect(() => {
    const moved = (id: string, objectType: string, target: ICanvasObject) => {
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
            obj.bringToFront();
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
              originX: target.originX || 'left',
              originY: target.originY || 'top',
            });
            obj.bringToFront();
            obj.setCoords();

            undoRedoDispatch({
              type: SET_OTHER,
              payload: (canvas?.getObjects() as unknown) as TypedShape[],
              canvasId: userId,
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
  }, [
    canvas,
    eventController,
    shouldHandleRemoteEvent,
    undoRedoDispatch,
    userId,
  ]);
};

export default useSynchronizedMoved;
