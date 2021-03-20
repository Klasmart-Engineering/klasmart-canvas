import { useEffect, useCallback, useContext } from 'react';
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
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { Group } from 'fabric/fabric-impl';
import { ICoordinate } from '../../../interfaces/brushes/coordinate';
import { PaintBrush } from '../brushes/classes/paintBrush';
import { ChalkBrush } from '../brushes/classes/chalkBrush';
import { WhiteboardContext } from '../WhiteboardContext';
import { PenBrush } from '../brushes/classes/penBrush';
import { IPenPoint } from '../../../interfaces/brushes/pen-point';
import { ICanvasShapeBrush } from '../../../interfaces/brushes/canvas-shape-brush';

const useSynchronizedScaled = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldSerializeEvent: (id: string) => boolean,
  shouldHandleRemoteEvent: (id: string) => boolean,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const { perfectShapeIsActive } = useContext(WhiteboardContext);
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  /**
   * When the lines to fix are paintbrush type is necessary
   * create a new paintbrush path based on its current data
   * @param {ICanvasBrush} path - Path to take base to create the new one
   */
  const fixPaintBrushLines = useCallback(
    (path: ICanvasBrush) => {
      if (!canvas || !userId) return;

      const brush = new PaintBrush(canvas, userId);
      const newPoints = (path.basePath?.points as ICoordinate[]).map(
        (point) => {
          return {
            x: point.x * Number(path.scaleX),
            y: point.y * Number(path.scaleY),
          };
        }
      );

      const newPath = brush.modifyPaintBrushPath(
        String(path.id),
        newPoints,
        Number(path.basePath?.strokeWidth),
        String(path.basePath?.stroke),
        path.basePath?.bristles || []
      );

      path.set({ ...newPath });
      (path as Group).addWithUpdate();
      canvas.renderAll();
    },
    [canvas, userId]
  );

  /**
   * Fix the lines of marker/paintbrush path to maintain
   * the same separation on them when marker/paintbrush path is scaled
   * @param {ICanvasBrush} path - Modified path
   */
  const fixLines = useCallback(
    (path: ICanvasBrush) => {
      let top = path.top;
      let left = path.left;

      if (path.basePath?.type === 'paintbrush') {
        fixPaintBrushLines(path);
      }

      (path as Group)._objects.forEach((line) => {
        line.set({
          top: Number(line.top) / Number(path.scaleY),
          left: Number(line.left) / Number(path.scaleX),
        });
      });
      (path as Group).addWithUpdate();

      ((path as unknown) as ICanvasShapeBrush).set({
        top: top,
        left: left,
        blockResize: false,
      });

      (path as Group).addWithUpdate();
    },
    [fixPaintBrushLines]
  );

  /**
   * Remove the given chalk/crayon path from canvas
   * and add a new one in the correct scale in remote whiteboard
   * @param {ICanvasBrush} path - Path to remove
   */
  const remakePathSync = useCallback(
    async (path: ICanvasBrush) => {
      if (!canvas || !userId || !path.basePath) return;

      eventController.setEventRunning(true);

      // Data to generate a new chalk/crayon path
      const basePath = path.basePath;

      // Brush creation
      const brush = new ChalkBrush(
        canvas,
        userId,
        basePath?.type as 'crayon' | 'chalk'
      );

      // new points creation based on the new scale
      const newPoints = (basePath?.points as ICoordinate[])?.map((point) => {
        return {
          x: point.x * Number(path?.scaleX),
          y: point.y * Number(path?.scaleY),
        };
      });

      // new chalk/crayon effect for the new path
      const newRects = brush.createChalkEffect(
        newPoints,
        Number(basePath?.strokeWidth)
      );

      try {
        const newObject = await brush.createChalkPath(
          'provisional',
          newPoints,
          Number(basePath?.strokeWidth),
          String(basePath?.stroke),
          newRects
        );

        if (!path || !path.id) return;

        const id = path.id;
        newObject.set({
          top: path.top,
          left: path.left,
          angle: path.angle,
          flipX: path.flipX,
          flipY: path.flipY,
        });

        // Id's are deleted to avoid add and remove event serializing
        delete path.id;
        delete newObject.id;

        canvas.add(newObject);
        canvas.remove(path);
        canvas.renderAll();

        // Id's are deleted to avoid add and remove event serializing
        newObject.set({
          id: id,
        });

        eventController.setEventRunning(false);
      } catch (error) {
        console.warn(error);
      }
    },
    [canvas, eventController, userId]
  );

  /**
   * Remove the given pen path from canvas
   * and add a new one in the current whiteboard
   * @param {ICanvasBrush} path - Path to remove
   */
  const remakePenPath = useCallback(
    (path: ICanvasBrush) => {
      if (!canvas || !userId) return;

      // Data to generate a new chalk/crayon path
      const basePath = path.basePath;

      // Brush creation
      const brush = new PenBrush(canvas, userId);

      // new points creation based on the new scale
      const newPoints = (basePath?.points as IPenPoint[]).map((point) => {
        return {
          x: point.x * Number(path?.scaleX),
          y: point.y * Number(path?.scaleY),
          width: point.width,
        };
      });

      try {
        const newObject = brush.createPenPath(
          String(path.id),
          newPoints,
          Number(basePath?.strokeWidth),
          String(basePath?.stroke)
        );

        if (!path) return;

        const id = path.id;
        newObject.set({
          top: path.top,
          left: path.left,
          angle: path.angle,
          flipX: path.flipX,
          flipY: path.flipY,
        });

        // Id's are deleted to avoid add and remove event serializing
        delete path.id;
        delete newObject.id;

        canvas.remove(path);
        canvas.add(newObject);
        canvas.renderAll();

        // Id's are deleted to avoid add and remove event serializing
        newObject.set({
          id,
        });

        eventController.setEventRunning(false);
      } catch (error) {
        console.warn(error);
      }
    },
    [canvas, eventController, userId]
  );

  /**
   * Checks if an image-based path object should be scaled
   * when this comes from persistent events
   * @param object - Object to check
   * @param target - Target with the properties to set in the given object
   */
  const chalkCrayonObjectShouldBeScaled = useCallback(
    (object: ICanvasBrush, target: ICanvasBrush) => {
      const objectWidth = Number(object.width);
      const objectHeight = Number(object.height);
      const targetWidth = Number(target.width);
      const targetHeight = Number(target.height);
      const objectStrokeWidth = Number(object.basePath?.strokeWidth);

      return (
        objectWidth > targetWidth + objectStrokeWidth / 4 ||
        objectHeight > targetHeight + objectStrokeWidth / 4
      );
    },
    []
  );

  /** Register and handle remote event. */
  useEffect(() => {
    const objectScaled = (
      id: string,
      target: ICanvasObject,
      isPersistent: boolean
    ) => {
      if (!shouldHandleRemoteEvent(id) && !isPersistent) return;

      canvas?.forEachObject(function (obj: ICanvasObject) {
        if (obj.id && obj.id === id) {
          const object = target.eTarget;

          if (
            isPersistent &&
            object?.type === 'image-based' &&
            chalkCrayonObjectShouldBeScaled(
              obj as ICanvasBrush,
              object as ICanvasBrush
            )
          ) {
            return;
          }

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

            if (
              isPersistent &&
              object.type === 'group-marker' &&
              object.scaleX === 1 &&
              object.scaleY === 1
            ) {
              obj.set({
                scaleX: Number(object.width) / Number(obj.width),
                scaleY: Number(object.height) / Number(obj.height),
              });
            }

            if (object.type === 'group-marker') {
              fixLines(obj as ICanvasBrush);
            }

            if (object.type === 'image-based') {
              remakePathSync(obj as ICanvasBrush);
            }

            if (object.type === 'group-pen') {
              remakePenPath(obj as ICanvasBrush);
            }
          }
        }
      });

      canvas?.renderAll();
    };

    const groupScaled = (
      id: string,
      target: ICanvasObject,
      isPersistent: boolean
    ) => {
      const isLocalGroup = (id: string, canvasId: string | undefined) => {
        const object = id.split(':');

        if (!object.length) {
          throw new Error('Invalid ID');
        }

        return object[0] === canvasId;
      };

      if (isLocalGroup(id, userId) && !isPersistent) {
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
        let match =
          target?.eTarget?.objects?.filter(
            (o: any) => o.id === objectsToGroup[i].id
          )[0] || {};
        objectsToGroup[i].set(match);
      }

      const props = target?.eTarget;

      const sel = new fabric.ActiveSelection(objectsToGroup, {
        canvas,
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
        globalCompositeOperation: 'source-over',
      });

      canvas?.setActiveObject(sel);
      canvas?.requestRenderAll();
      canvas?.discardActiveObject();
    };

    const scaled = (
      id: string,
      _type: string,
      target: ICanvasObject,
      isPersistent: boolean
    ) => {
      if (target.isGroup) {
        groupScaled(id, target, isPersistent);
        return;
      }

      objectScaled(id, target, isPersistent);
    };

    eventController?.on('scaled', scaled);

    return () => {
      eventController?.removeListener('scaled', scaled);
    };
  }, [
    canvas,
    chalkCrayonObjectShouldBeScaled,
    eventController,
    fixLines,
    remakePathSync,
    remakePenPath,
    shouldHandleRemoteEvent,
    userId,
  ]);

  useEffect(() => {
    /**
     * Handles the logic for scale objects on canvas
     * @param e - Scale or scaling event
     * @param filtered - Flag to know if is a scaling (true)
     * or scaled (false) event
     */
    const objectScaled = async (
      e: fabric.IEvent | CanvasEvent,
      filtered?: boolean
    ) => {
      if (!e.target) return;

      const type = (e.target as ICanvasObject).get('type');
      const activeIds: string[] = [];

      if (type === 'activeSelection' && (e.target as ICanvasObject)._objects) {
        const groupObjects = (e.target as ICanvasObject)._objects || [];

        groupObjects.forEach((activeObject: ICanvasObject) => {
          if (activeObject.id && !shouldSerializeEvent(activeObject.id)) return;

          activeIds.push(activeObject.id as string);
        });

        const groupPayloadData = e.target.toJSON(['id']);

        const groupPayload: ObjectEvent = {
          id: userId,
          type,
          target: { activeIds, eTarget: groupPayloadData, isGroup: true },
          avoidPersistentStoring: filtered,
        };

        eventSerializer?.push('scaled', groupPayload);

        if (!filtered) {
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
          const filteredPayload = canvas?.getObjects().filter((o: any) => {
            return !o.group;
          });

          let active = canvas?.getActiveObject();

          undoRedoDispatch({
            type: SET_GROUP,
            payload: [...(filteredPayload as any[]), active],
            canvasId: userId,
            event: (event as unknown) as IUndoRedoEvent,
          });
        }
      } else {
        if (!(e.target as ICanvasObject).id) {
          return;
        }

        if (!shouldSerializeEvent((e.target as ICanvasObject).id as string))
          return;

        const type: ObjectType = (e.target as ICanvasObject).get(
          'type'
        ) as ObjectType;

        const brushTarget: ICanvasBrush = e.target as ICanvasBrush;
        const brushType = brushTarget.basePath?.type;
        const id = brushTarget.id;

        let target = {
          top: e.target.top,
          left: e.target.left,
          width: e.target.width,
          height: e.target.height,
          angle: e.target.angle,
          scaleX: e.target.scaleX,
          scaleY: e.target.scaleY,
          flipX: e.target.flipX,
          flipY: e.target.flipY,
          originX: e.target.originX,
          originY: e.target.originY,
          name: e.target.name,
        } as ICanvasObject;

        switch (brushType) {
          case 'pen': {
            if (!canvas || !userId) return;

            if (filtered) break;

            const brush = new PenBrush(canvas, userId);
            const basePath = brushTarget.basePath;
            const newPoints = (basePath?.points as IPenPoint[]).map((point) => {
              return {
                x: point.x * Number(e.target?.scaleX),
                y: point.y * Number(e.target?.scaleY),
                width: point.width,
              };
            });

            try {
              const newObject = await brush.createPenPath(
                String(brushTarget.id),
                newPoints,
                Number(basePath?.strokeWidth),
                String(basePath?.stroke)
              );

              if (!e.target) return;

              console.log(e.target);
              const id = brushTarget.id;
              ((newObject as unknown) as ICanvasShapeBrush).set({
                top: e.target.top,
                left: e.target.left,
                angle: e.target.angle,
                flipX: e.target.flipX,
                flipY: e.target.flipY,
                name: e.target.name,
                shapeType: (e.target as ICanvasShapeBrush).shapeType,
              });

              // Id's are deleted to avoid add and remove event serializing
              delete (e.target as ICanvasBrush).id;
              delete newObject.id;

              canvas.remove(e.target);
              canvas.add(newObject);
              canvas.setActiveObject(newObject);
              canvas.renderAll();

              // Id's are deleted to avoid add and remove event serializing
              newObject.set({
                id: id,
              });

              // target.type = 'image-based';
            } catch (e) {
              console.warn(e);
            }

            target.type = 'group-pen';
            break;
          }
          case 'marker':
          case 'felt':
          case 'paintbrush': {
            fixLines(brushTarget);
            canvas?.renderAll();
            target.type = 'group-marker';
            break;
          }
          case 'chalk':
          case 'crayon': {
            if (!canvas || !userId) return;

            if (filtered) break;

            const brush = new ChalkBrush(canvas, userId, brushType);
            const basePath = brushTarget.basePath;
            const newPoints = (basePath?.points as ICoordinate[]).map(
              (point) => {
                return {
                  x: point.x * Number(e.target?.scaleX),
                  y: point.y * Number(e.target?.scaleY),
                };
              }
            );

            const newRects = brush.createChalkEffect(
              newPoints,
              Number(basePath?.strokeWidth)
            );

            try {
              const newObject = await brush.createChalkPath(
                String(brushTarget.id),
                newPoints,
                Number(basePath?.strokeWidth),
                String(basePath?.stroke),
                newRects
              );

              if (!e.target) return;

              const id = brushTarget.id;
              ((newObject as unknown) as ICanvasShapeBrush).set({
                top: e.target.top,
                left: e.target.left,
                angle: e.target.angle,
                flipX: e.target.flipX,
                flipY: e.target.flipY,
                name: e.target.name,
                shapeType: (e.target as ICanvasShapeBrush).shapeType,
              });

              // Id's are deleted to avoid add and remove event serializing
              delete (e.target as ICanvasBrush).id;
              delete newObject.id;

              canvas.remove(e.target);
              canvas.add(newObject);
              canvas.setActiveObject(newObject);
              canvas.renderAll();

              // Id's are deleted to avoid add and remove event serializing
              newObject.set({
                id: id,
              });

              target.type = 'image-based';
            } catch (e) {
              console.warn(e);
            }

            break;
          }
        }

        const payload: ObjectEvent = {
          id: id as string,
          type: type as ObjectType,
          target: { eTarget: target, isGroup: false },
          avoidPersistentStoring: filtered,
        };

        eventSerializer?.push('scaled', payload);

        if (canvas && !filtered) {
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

    const scaling = (e: fabric.IEvent | CanvasEvent) => {
      objectScaled(e, true);
    };

    canvas?.on('object:scaled', objectScaled);
    canvas?.on('object:scaling', scaling);

    return () => {
      canvas?.off('object:scaled', objectScaled);
      canvas?.off('object:scaling', scaling);
    };
  }, [
    canvas,
    eventSerializer,
    fixLines,
    shouldSerializeEvent,
    undoRedoDispatch,
    userId,
  ]);

  useEffect(() => {
    if (perfectShapeIsActive) {
      canvas?.renderAll();
    }
  }, [canvas, perfectShapeIsActive]);
};

export default useSynchronizedScaled;
