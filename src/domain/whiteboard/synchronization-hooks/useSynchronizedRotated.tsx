import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { CanvasAction, SET, SET_GROUP } from '../reducers/undo-redo';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import CanvasEvent from '../../../interfaces/canvas-events/canvas-events';
import {
  ObjectEvent,
  ObjectType,
} from '../event-serializer/PaintEventSerializer';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { TypedGroup } from '../../../interfaces/shapes/group';

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
    const objectRotated = (id: string, target: ICanvasObject) => {
      if (!shouldHandleRemoteEvent(id)) return;

      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          const object = target.eTarget;
          if (object) {
            obj.set({
              angle: object.angle,
              top: object.top,
              left: object.left,
              scaleX: object.scaleX,
              scaleY: object.scaleY,
              flipX: object.flipX,
              flipY: object.flipY,
              originX: object.originX || 'left',
              originY: object.originY || 'top',
            });
            obj.setCoords();
          }
        }
      });
      canvas?.renderAll();
    };

    const groupRotated = (id: string, target: ICanvasObject) => {
      const isLocalGroup = (id: string, canvasId: string | undefined) => {
        const object = id.split(':');

        if (!object.length) {
          throw new Error('Invalid ID');
        }

        return object[0] === canvasId;
      };

      if (isLocalGroup(id, userId)) {
        return;
      }

      const localObjects: any[] = canvas?.getObjects() || [];
      const objectsToGroup: ICanvasObject[] = [];

      for (let i = 0; i < localObjects.length; i++) {
        if (target.activeIds) {
          if (target.activeIds.includes(localObjects[i].id)) {
            objectsToGroup.push(localObjects[i]);
          }
        }
      }

      for (let i = 0; i < objectsToGroup.length; i++) {
        let match = target?.eTarget?.objects?.filter((o: any) => o.id === objectsToGroup[i].id)[0] || {};
        objectsToGroup[i].set(match);
      }

      const props = target?.eTarget;

      const sel = new fabric.ActiveSelection(objectsToGroup, {
        canvas: canvas,
        originX: props?.originX,
        originY: props?.originY,
        top: props?.top,
        left: props?.left,
        width: props?.width,
        height: props?.height,
        scaleX: props?.scaleX,
        scaleY: props?.scaleY,
        flipX: props?.flipX,
        flipY: props?.flipY,
        angle: props?.angle,
        skewX: props?.skewX,
        skewY: props?.skewY,
        oCoords: props?.oCoords,
        aCoords: props?.aCoords,
        matrixCache: props?.matrixCache,
        ownMatrixCache: props?.ownMatrixCache,
        snapAngle: props?.snapAngle,
        snapThreshold: props?.snapThreshold,
        group: props?.group,
      });
      canvas?.setActiveObject(sel);
      canvas?.requestRenderAll();
      canvas?.discardActiveObject();
    };

    const rotation = (id: string, _type: string, target: ICanvasObject) => {
      if (target.isGroup) {
        groupRotated(id, target);
        return;
      }

      objectRotated(id, target);
    };

    eventController?.on('rotated', rotation);

    return () => {
      eventController?.removeListener('rotated', rotation);
    };
  }, [canvas, eventController, shouldHandleRemoteEvent, userId]);

  /** Register and handle local event. */
  useEffect(() => {
    const objectRotated = (e: fabric.IEvent | CanvasEvent, filteredState?: boolean) => {
      if (!e.target) return;

      const type = (e.target as ICanvasObject).get('type');
      const activeIds: string[] = [];

      if (type === 'activeSelection') {
        if (!e.target || !(e.target as ICanvasObject)._objects) return;
        const targetObjects = (e.target as ICanvasObject)._objects;

        targetObjects?.forEach((activeObject: ICanvasObject) => {
          if (activeObject.id && !shouldSerializeEvent(activeObject.id)) return;

          activeIds.push(activeObject.id as string);
        });

        const groupPayloadData = e.target.toJSON([
          'id'
        ]);

        const groupPayload: ObjectEvent = {
          id: userId,
          type,
          target: { activeIds, eTarget: groupPayloadData, isGroup: true },
        };
        eventSerializer?.push('rotated', groupPayload);

        if (!filteredState) {
          const activeObjects = canvas?.getActiveObjects();
          canvas?.discardActiveObject();
          const activeSelection = new fabric.ActiveSelection(activeObjects, {
            canvas: canvas,
          });
          canvas?.setActiveObject(activeSelection);
          canvas?.renderAll();

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
      } else {
        if (!(e.target as ICanvasObject).id) {
          return;
        }

        const id = (e.target as ICanvasObject).id;
        const target = {
          top: e.target.top,
          left: e.target.left,
          angle: e.target.angle,
          scaleX: e.target.scaleX,
          scaleY: e.target.scaleY,
          flipX: e.target.flipX,
          flipY: e.target.flipY,
          originX: e.target.originX,
          originY: e.target.originY,
        } as ICanvasObject;

        const payload: ObjectEvent = {
          id: id as string,
          type: type as ObjectType,
          target: { eTarget: target, isGroup: false },
        };

        eventSerializer?.push('rotated', payload);

        if (canvas && !filteredState) {
          const event = { event: payload, type: 'rotated' };

          undoRedoDispatch({
            type: SET,
            payload: canvas.getObjects(),
            canvasId: userId,
            event: (event as unknown) as IUndoRedoEvent,
          });
        }
      }
    };

    const objectRotating = (e: fabric.IEvent | CanvasEvent) => {
      objectRotated(e, true);
    };

    canvas?.on('object:rotated', objectRotated);
    canvas?.on('object:rotating', objectRotating);

    return () => {
      canvas?.off('object:rotated', objectRotated);
      canvas?.off('object:rotating', objectRotating);
    };
  }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
};

export default useSynchronizedRotated;
