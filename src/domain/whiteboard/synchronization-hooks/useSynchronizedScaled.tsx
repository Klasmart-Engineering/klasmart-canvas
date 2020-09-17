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
import { EventFilterFunction } from '../WhiteboardCanvas';

const useSynchronizedScaled = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  generatedBy: string,
  shouldSerializeEvent: EventFilterFunction,
  shouldHandleRemoteEvent: EventFilterFunction,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  /** Register and handle remote event. */
  useEffect(() => {
    const objectScaled = (id: string, target: ICanvasObject) => {
      if (!shouldHandleRemoteEvent(id, generatedBy)) return;

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

    const groupScaled = (id: string, target: ICanvasObject) => {
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
      const objectsToGroup = [];

      for (let i = 0; i < localObjects.length; i++) {
        if (target.activeIds) {
          if (target.activeIds.includes(localObjects[i].id)) {
            objectsToGroup.push(localObjects[i]);
          }
        }
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

    const scaled = (id: string, _type: string, target: ICanvasObject) => {
      if (target.isGroup) {
        groupScaled(id, target);
        return;
      }

      objectScaled(id, target);
    };

    eventController?.on('scaled', scaled);

    return () => {
      eventController?.removeListener('scaled', scaled);
    };
  }, [canvas, eventController, generatedBy, shouldHandleRemoteEvent, userId]);

  useEffect(() => {
    const objectScaled = (e: fabric.IEvent | CanvasEvent) => {
      if (!e.target) return;

      const type = (e.target as ICanvasObject).get('type');
      const activeIds: string[] = [];

      if (type === 'activeSelection' && (e.target as ICanvasObject)._objects) {
        const groupObjects = (e.target as ICanvasObject)._objects || [];

        groupObjects.forEach((activeObject: ICanvasObject) => {

          if (!activeObject.id) throw new Error('Scaled object without id');
          if (!activeObject.generatedBy) throw new Error('Scaled object without generatedBy');

          if (activeObject.id && !shouldSerializeEvent(activeObject.id, activeObject.generatedBy)) return;

          activeIds.push(activeObject.id as string);
        });

        const groupPayload: ObjectEvent = {
          id: userId,
          type,
          target: { activeIds, eTarget: e.target, isGroup: true },
        };
        eventSerializer?.push('scaled', generatedBy, groupPayload);

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
        const filtered = canvas?.getObjects().filter((o: any) => {
          return !o.group;
        });

        let active = canvas?.getActiveObject();

        undoRedoDispatch({
          type: SET_GROUP,
          payload: [...(filtered as any[]), active],
          canvasId: userId,
          event: (event as unknown) as IUndoRedoEvent,
        });
      } else {
        const canvasObject = e.target as ICanvasObject;
        if (!canvasObject.id) throw new Error('Scaled object without id');
        if (!canvasObject.generatedBy) throw new Error('Scaled object without generatedBy');

        if (!shouldSerializeEvent((e.target as ICanvasObject).id as string, generatedBy))
          return;

        const type: ObjectType = (e.target as ICanvasObject).get(
          'type'
        ) as ObjectType;

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

        eventSerializer?.push('scaled', generatedBy, payload);

        if (canvas) {
          const event = { event: payload, type: 'scaled' };

          undoRedoDispatch({
            type: SET,
            payload: canvas.getObjects(),
            canvasId: userId,
            event: (event as unknown) as IUndoRedoEvent,
          });
        }
      }
    };

    canvas?.on('object:scaled', objectScaled);

    return () => {
      canvas?.off('object:scaled', objectScaled);
    };
  }, [canvas, eventSerializer, generatedBy, shouldSerializeEvent, undoRedoDispatch, userId]);
};

export default useSynchronizedScaled;
