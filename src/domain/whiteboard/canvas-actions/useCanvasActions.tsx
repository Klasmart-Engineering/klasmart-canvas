import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fabric } from 'fabric';
import eraseObjectCursor from '../../../assets/cursors/erase-object.png';
import { WhiteboardContext } from '../WhiteboardContext';
// import * as shapes from '../shapes/shapes';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { getBiggerDifference, isFreeDrawing, isShape } from '../utils/shapes';
import { UNDO, REDO, SET, SET_GROUP } from '../reducers/undo-redo';
import { setSize, setCircleSize, setPathSize } from '../utils/scaling';
import { v4 as uuidv4 } from 'uuid';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { ICanvasMouseEvent } from '../../../interfaces/canvas-events/canvas-mouse-event';
import { IWhiteboardContext } from '../../../interfaces/whiteboard-context/whiteboard-context';
import {
  ObjectEvent,
  ObjectType,
} from '../event-serializer/PaintEventSerializer';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { TypedGroup } from '../../../interfaces/shapes/group';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { PartialErase } from '../partial-erase/partialErase';
import { changeLineColorInSpecialBrushes } from '../brushes/actions/changeLineColorInSpecialBrushes';
import { IBrushType } from '../../../interfaces/brushes/brush-type';
import { ICoordinate } from '../../../interfaces/brushes/coordinate';
import { PenBrush } from '../brushes/classes/penBrush';
import { Group } from 'fabric/fabric-impl';
import { MarkerBrush } from '../brushes/classes/markerBrush';
import { PaintBrush } from '../brushes/classes/paintBrush';
import { ChalkBrush } from '../brushes/classes/chalkBrush';
import { ICanvasPathBrush } from '../../../interfaces/brushes/canvas-path-brush';
import { shapePoints } from '../../../assets/shapes-points/index';
import { IShapePointsIndex } from '../../../interfaces/brushes/shape-points-index';
import { ICanvasShapeBrush } from '../../../interfaces/brushes/canvas-shape-brush';
import { setBasePathInNormalBrushes } from '../brushes/utils/setBasePathInNormalBrushes';
import { changeBrushTypeAction } from './feature-actions/changeBrushTypeAction';
import { useShapeSelector, useSpecialShapeSelector } from './shapeActions';
import { useMouseMove, useMouseUp } from './mouseActions';
import { mouseDownMain, mouseMoveMain, useAddShape } from './shapeActionUtils';
import { requiredEllipseProps, requiredPencilDashedProps, requiredProps } from './shapeProps';

export const useCanvasActions = (
  canvas?: fabric.Canvas,
  dispatch?: any,
  canvasId?: string,
  eventSerializer?: any,
  userId?: string
) => {
  const {
    shapeIsActive,
    updateFontColor,
    shape,
    shapeColor,
    updatePenColor,
    updateShapeColor,
    updateBrushType,
    closeModal,
    penColor,
    lineWidth,
    isLocalObject,
    updateClearIsActive,
    toolbarIsEnabled,
    allToolbarIsEnabled,
    serializerToolbarState,
    perfectShapeIsActive,
    partialEraseIsActive,
    eraseType,
    backgroundImage,
    localImage,
    brushType,
  } = useContext(WhiteboardContext) as IWhiteboardContext;

  /**
   * Adds shape to whiteboard.
   * @param specific Indicates shape type that should be added in whiteboard.
   */
  const shapeSelector = useShapeSelector({ brushType, lineWidth, penColor, shape, shapeColor});

  /**
   * Adds shape with special brush to whiteboard.
   * @param {string} shape - Indicates shape type that should be added in whiteboard.
   * @param {IBrushType} brushType - Indicates brush type that sould be drawed the given shape.
   */
  const specialShapeSelector = useSpecialShapeSelector(userId as string);

  const mouseMove = useMouseMove();

  const mouseUp = useMouseUp(dispatch);

  const clearOnMouseEvent = useCallback((): void => {
    canvas?.off('mouse:down');
  }, [canvas]);

  /**
   * Clears all mouse event listeners from canvas.
   */
  const clearMouseEvents = useCallback((): void => {
    canvas?.off('mouse:move');
    canvas?.off('mouse:up');
  }, [canvas]);

  /**
   * Mouse down event listener for canvas.
   * @param shape Shape being added on canvas.
   * @param isCircle Indicates if shape is a circle.
   */
  const mouseDown = useCallback(
    (specific: string, color?: string): void => {
      canvas?.on('mouse:down', (e: fabric.IEvent): void => {
        if (e.target || !e.pointer) {
          return;
        }

        let shape;

        shape = shapeSelector(specific);

        if (e.pointer) {
          (shape as unknown as TypedShape).set({
            top: e.pointer.y,
            left: e.pointer.x,
            shapeType: 'shape',
            name: specific,
            strokeUniform: true,
          });
        }

        // fill and type properties just can be resetted if is an filled shape
        if (shape.fill !== 'transparent') {
          shape.set({
            shapeType: 'filledShape',
            fill: color || shapeColor,
          });
        }

        clearOnMouseEvent();
        mouseMove(shape, e.pointer, specific, canvas, brushType);
        mouseUp(shape, e.pointer, specific);
        canvas.add(shape);
      });
    },
    [canvas, clearOnMouseEvent, mouseMove, mouseUp, shapeColor, shapeSelector]
  );

  interface IShapeInProgress {
    shape: TypedShape;
    startPoint: fabric.Point;
  }

  /**
   * Used to save the current shape in case of an interruption
   * in its creation, generated by a state change in perfectShapeIsActive
   */
  const [
    shapeInProgress,
    setShapeInProgress,
  ] = useState<IShapeInProgress | null>();

  // const addShapeTemp = useAddShape(shapeIsActive, shapeInProgress, canvas, brushType, shapeSelector, specialShapeSelector, lineWidth);

  /**
   * Add specific shape to whiteboard
   * */
  const addShape = useCallback(
    (shapeToAdd: string) => {
      // Required to prevent multiple shapes add at once
      // if user clicked more than one shape during selection.
      if (!shapeIsActive) {
        return;
      }

      let resize: boolean = false;
      let startPoint: fabric.Point;
      let shape: TypedShape;

      // If shape creation was interrupted by a change in perfectShapeIsActive
      if (shapeInProgress) {
        resize = true;
        shape = shapeInProgress.shape;
        startPoint = shapeInProgress.startPoint;
      }

      const activeObject = canvas?.getActiveObject();

      if (activeObject && isShape(activeObject)) {
        activeObject.set('evented', true);
      }

      /**
       * Set the new size of a recently created shape
       * @param {TypedShape} shape - Shape to change its size
       * @param {IEvent} e - Current event, necessary to know
       * where is the pointer
       */
      const setShapeSize = (shape: TypedShape, e: fabric.IEvent) => {
        if (!e.pointer) return;

        let pointer: fabric.Point = e.pointer;
        let biggerDifference: number = 0;
        let newSize;

        if (perfectShapeIsActive) {
          biggerDifference = getBiggerDifference(pointer, startPoint);

          pointer.x = startPoint.x + biggerDifference;
          pointer.y = startPoint.y + biggerDifference;
        } else {
          pointer = e.pointer;
        }

        if (shapeToAdd === 'circle') {
          newSize = setCircleSize(
            shape as fabric.Ellipse,
            startPoint,
            pointer,
            brushType === 'pencil' || brushType === 'dashed'
          );
        } else if (shapeToAdd === 'rectangle' || shapeToAdd === 'triangle') {
          newSize = setSize(
            shape,
            startPoint,
            pointer,
            brushType === 'pencil' || brushType === 'dashed'
          );
        } else {
          newSize = setPathSize(shape, startPoint, pointer);
        }

        if (brushType === 'marker' || brushType === 'felt') {
          (shape as Group).forEachObject((line) => {
            line.set({
              top: Number(line.top) / Number(shape.scaleY),
              left: Number(line.left) / Number(shape.scaleX),
            });
          });

          shape.set({
            top: startPoint.y,
            left: startPoint.x,
          });

          (shape as Group).addWithUpdate();
          canvas?.renderAll();
        }

        if (brushType === 'paintbrush' && canvas && userId) {
          const brush = new PaintBrush(canvas, userId);
          const newPoints = ((shape as ICanvasPathBrush).basePath
            ?.points as ICoordinate[]).map((point) => {
            return {
              x: point.x * Number(shape.scaleX),
              y: point.y * Number(shape.scaleY),
            };
          });

          const newPath = brush.modifyPaintBrushPath(
            String(shape.id),
            newPoints,
            Number((shape as ICanvasPathBrush).basePath?.strokeWidth),
            String((shape as ICanvasPathBrush).basePath?.stroke),
            (shape as ICanvasBrush).basePath?.bristles || []
          );

          newPath.set({
            top: startPoint.y,
            left: startPoint.x,
          });

          (shape as ICanvasPathBrush).set({ ...newPath });
          (shape as Group).addWithUpdate();
          canvas.renderAll();
        }

        return newSize;
      };

      /**
       * Removes the recent created shape and set resize variable in false
       */
      const cancelShapeCreation = () => {
        if (resize) {
          resize = false;
        }

        if (!shape.id || shape.id === 'provisional') {
          canvas?.remove(shape);
        }
      };

      /**
       * Return the movement hability in the current target shape
       * @param {IEvent} event - current event, necessary to know
       * which is the current target shape
       */
      const allowMovementInShape = (event: fabric.IEvent) => {
        if (event.target) {
          event.target.set({
            lockMovementX: false,
            lockMovementY: false,
          });
        }
      };


      const mouseDownAction = (canvas: fabric.Canvas) => (async (e: fabric.IEvent) => {

        if (resize) {
          return;
        }

        // Locking movement to avoid shapes moving
        if (e.target) {
          e.target.set({
            lockMovementX: true,
            lockMovementY: true,
          });
        }

        if (brushType === 'pencil' || brushType === 'dashed') {
          shape = shapeSelector(shapeToAdd);
        } else {
          // await specialShapeSelector(shapeToAdd, brushType).then((result) => {
          //   if (!result) return;

          //   shape = result as TypedShape;
          // });
          shape = await specialShapeSelector({ canvas, shape: shapeToAdd, brushType, lineWidth, penColor}) as TypedShape;
        }

        if (!shape) return;

        if (e.pointer) {
          shape.set({
            top: e.pointer.y,
            left: e.pointer.x,
            shapeType: 'shape',
            name: shapeToAdd,
            strokeUniform: true,
          });

          startPoint = e.pointer;
        }

        canvas?.add(shape);
        resize = true;

        /*
          Canceling shapes creation in object:scaling
          and object:rotating events
        */
        canvas?.on({
          'object:scaling': cancelShapeCreation,
          'object:rotating': cancelShapeCreation,
        });

        /*
          When the shape was resized or rotated
          the shape's movement is allowed
        */
        canvas?.on({
          'object:scaled': allowMovementInShape,
          'object:rotated': allowMovementInShape,
        });
      });

      canvas?.on('mouse:down', mouseDownAction(canvas));
      // canvas?.on('mouse:down', mouseDownMain(canvas, resize, brushType, shapeSelector, shapeToAdd, specialShapeSelector, lineWidth, penColor));

      canvas?.on('mouse:move', (e: fabric.IEvent) => {
        if (!shapeToAdd || !shape || !resize) {
          return;
        }

        canvas.selection = false;
        setShapeSize(shape, e);

        let anchor = { ...startPoint, originX: 'left', originY: 'top' };

        if (startPoint && e.pointer && startPoint.x > e.pointer.x) {
          anchor = { ...anchor, originX: 'right' };
        }

        if (startPoint && e.pointer && startPoint.y > e.pointer.y) {
          anchor = { ...anchor, originY: 'bottom' };
        }

        shape.set(anchor);
        canvas.renderAll();

        setShapeInProgress({
          shape: shape,
          startPoint: startPoint,
        });
      });

      canvas?.on('mouse:up', async (e: fabric.IEvent) => {
        if (!shape || !resize) {
          return;
        }

        const size = setShapeSize(shape, e);
        const id = `${userId}:${uuidv4()}`;
        resize = false;

        if (size && size.width <= 2 && size.height <= 2) {
          canvas.remove(shape);
        } else {
          if (brushType === 'pencil' || brushType === 'dashed') {
            shape.set({ id });
            shape.setCoords();

            /*
            Setting the recent created shape like evented
            to can be resized and rotated
            */
            shape.set({
              strokeDashArray:
                brushType === 'dashed' ? [Number(shape.strokeWidth) * 2] : [],
              evented: true,
              hoverCursor: 'default',
              lockUniScaling: perfectShapeIsActive,
            });

            setBasePathInNormalBrushes(shape as ICanvasShapeBrush);

            canvas.setActiveObject(shape);
            canvas.renderAll();
          } else {
            canvas.remove(shape);

            if (userId) {
              let brush: PenBrush | MarkerBrush | PaintBrush | ChalkBrush;
              let newPath;
              const shapeName = String(shape.name);

              const setScaledPoint = (point: ICoordinate) => {
                return {
                  x:
                    (point.x * Number(shape.width) * Number(shape.scaleX)) /
                    original.width,
                  y:
                    (point.y * Number(shape.height) * Number(shape.scaleY)) /
                    original.height,
                };
              };

              const original =
                shapePoints[shapeName as keyof IShapePointsIndex];

              const points: ICoordinate[] = original.points.map((point) => {
                return setScaledPoint(point);
              });

              switch (brushType) {
                case 'pen':
                  brush = new PenBrush(canvas, userId);
                  const { min, max } = brush.setMinMaxWidth(lineWidth);
                  const penPoints = points.map((point) => {
                    return {
                      x: point.x,
                      y: point.y,
                      width: (brush as PenBrush).getRandomInt(min, max),
                    };
                  });

                  newPath = (brush as PenBrush).createPenPath(
                    String((shape as ICanvasObject).id),
                    penPoints,
                    lineWidth,
                    penColor
                  );
                  break;

                case 'marker':
                case 'felt':
                  brush = new MarkerBrush(canvas, userId, brushType);

                  newPath = (brush as MarkerBrush).createMarkerPath(
                    String((shape as ICanvasObject).id),
                    points,
                    lineWidth,
                    penColor
                  );
                  break;

                case 'paintbrush':
                  brush = new PaintBrush(canvas, userId);

                  const bristles = (brush as PaintBrush).makeBrush(
                    penColor,
                    lineWidth
                  );

                  newPath = (brush as PaintBrush).modifyPaintBrushPath(
                    String((shape as ICanvasObject).id),
                    points,
                    lineWidth,
                    penColor,
                    bristles
                  );
                  break;

                case 'chalk':
                case 'crayon':
                  brush = new ChalkBrush(canvas, userId, brushType);

                  const clearRects = (brush as ChalkBrush).createChalkEffect(
                    points,
                    lineWidth
                  );

                  await (brush as ChalkBrush)
                    .createChalkPath(
                      String((shape as ICanvasObject).id),
                      points,
                      lineWidth,
                      penColor,
                      clearRects
                    )
                    .then((image: ICanvasBrush) => {
                      newPath = image;
                    })
                    .catch((error: string) => {
                      console.warn(error);
                    });
                  break;
              }

              if (!newPath) return;

              ((newPath as ICanvasObject) as ICanvasShapeBrush).set({
                id: id,
                name: shapeName,
                top: shape.top,
                left: shape.left,
                angle: shape.angle,
                flipX: shape.flipX,
                flipY: shape.flipY,
                originX: shape.originX,
                originY: shape.originY,
                evented: true,
                hoverCursor: 'default',
                lockUniScaling: perfectShapeIsActive,
              });

              canvas.remove(shape);
              shape = newPath as TypedShape;
              canvas.add(newPath);

              canvas.setActiveObject(newPath);
              canvas.renderAll();
            }
          }
          setShapeInProgress(null);

          if (brushType !== 'pencil' && brushType !== 'dashed') {
            let type = shape.type;
            let payload = {};
            let target = {
              type,
              id,
            };

            const requiredProps = requiredPencilDashedProps;

            requiredProps.forEach((prop: string) => {
              if (shape && (shape as any)[prop]) {
                target = { ...target, [prop]: (shape as any)[prop] };
              }
            });

            payload = {
              type,
              target,
              id,
            };

            eventSerializer?.push('added', payload);

            const event = { event: payload, type: 'added' };

            dispatch({
              type: SET,
              payload: (canvas?.getObjects() as unknown) as TypedShape[],
              canvasId: userId,
              event,
            });
          } else {
            let type = shape.type;
            let payload = {};
            let target = {
              type,
              id,
            };

            if (type !== 'ellipse') {
              requiredProps.forEach((prop: string) => {
                if (shape && (shape as any)[prop]) {
                  target = { ...target, [prop]: (shape as any)[prop] };
                }
              });

              payload = {
                type,
                target,
                id,
              };
            } else {
              requiredEllipseProps.forEach((prop: string) => {
                if (shape && (shape as any)[prop]) {
                  target = { ...target, [prop]: (shape as any)[prop] };
                }
              });

              payload = {
                type,
                target,
                id,
              };
            }

            eventSerializer?.push('added', payload);

            const event = { event: payload, type: 'added' };

            dispatch({
              type: SET,
              payload: (canvas?.getObjects() as unknown) as TypedShape[],
              canvasId: userId,
              event,
            });
          }
        }
      });
    },
    /* If dataInProgress is added on dependencies
    the performance is bad and an unexpected behavior occurs */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      shapeIsActive,
      canvas,
      perfectShapeIsActive,
      shapeSelector,
      userId,
      eventSerializer,
      dispatch,
    ]
  );

  /**
   * Changes the penColor value and if one or more objects are selected
   * also changes the stroke color in free drawing and empty shape objects
   * @param {string} color - new color to change
   */
  const changeStrokeColor = useCallback(
    async (color: string) => {
      let newActives: TypedShape[] = [];
      let activeObjects: TypedShape[] = [];

      if (!canvas) return;

      const selection = canvas.getActiveObject();

      if (selection?.type === 'activeSelection') {
        activeObjects = (selection as fabric.ActiveSelection)._objects;
      } else {
        activeObjects = canvas.getActiveObjects();
      }

      if (!activeObjects) return;
      canvas.discardActiveObject();

      for (const object of activeObjects) {
        if (
          (isShape(object) && object.shapeType === 'shape') ||
          isFreeDrawing(object)
        ) {
          (object as ICanvasPathBrush).set('stroke', color);
          newActives.push(object);
        }

        // Updating basePath
        if (isFreeDrawing(object)) {
          const basePath = (object as ICanvasPathBrush).basePath;
          (object as ICanvasPathBrush).set({
            basePath: {
              type: basePath.type,
              points: basePath.points,
              stroke: color,
              strokeWidth: basePath.strokeWidth,
            },
          });
        }

        // Color Change in Special Brushes
        if (
          ((object.type === 'group' && (object as ICanvasBrush).basePath) ||
            (object.type === 'image' && (object as ICanvasBrush).basePath)) &&
          canvas &&
          userId
        ) {
          await changeLineColorInSpecialBrushes(
            canvas,
            userId,
            object as ICanvasBrush,
            color
          )
            .then((newObject) => {
              if (newObject.basePath?.type === 'paintbrush') {
                const payload: ObjectEvent = {
                  type: 'group',
                  target: ({
                    stroke: (object as ICanvasBrush).basePath?.stroke,
                    bristles: (object as ICanvasBrush).basePath?.bristles,
                  } as unknown) as ICanvasObject,
                  id: String(object.id),
                };

                eventSerializer?.push('colorChanged', payload);
              }

              newActives.push(newObject as TypedShape);
            })
            .catch((e) => {
              console.warn(e);
            });
        }
      }

      if (newActives.length === 1) {
        canvas?.setActiveObject(newActives[0]);
      } else if (newActives.length >= 2) {
        const activesGroup = new fabric.ActiveSelection(newActives);
        canvas?.setActiveObject(activesGroup);
      }

      updatePenColor(color);

      const obj = canvas?.getActiveObject() as any;
      if (!obj) return;

      const type = obj?.get('type');

      if (type === 'textbox') return;

      if (obj?.type !== 'activeSelection') {
        let stroke = type === 'path' ? obj?.stroke : obj?.basePath?.stroke;

        const payload = {
          type,
          target: { stroke: stroke },
          id: obj?.id,
        };

        const event = { event: payload, type: 'colorChanged' };

        dispatch({
          type: SET,
          payload: canvas?.getObjects() as TypedShape[],
          canvasId: userId,
          event: (event as unknown) as IUndoRedoEvent,
        });
      } else {
        const activeIds: string[] = canvas
          ?.getActiveObject()
          // @ts-ignore - Typings are out of date, getObjects is the correct method to get objects in group.
          .getObjects()
          .map((o: TypedShape) => o.id);
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

        dispatch({
          type: SET_GROUP,
          payload: [...(filtered as any[]), active],
          canvasId: userId,
          event: (event as unknown) as IUndoRedoEvent,
        });
      }

      canvas?.renderAll();
    },
    [updatePenColor, canvas, userId, eventSerializer, dispatch]
  );

  const changeBrushType = useCallback(
    (type: IBrushType) => {
      changeBrushTypeAction(
        canvas as fabric.Canvas,
        userId as string,
        eventSerializer,
        updateBrushType,
        type
      );
    },
    [canvas, eventSerializer, updateBrushType, userId]
  );

  /**
   * Add specific color to selected shape
   * */
  const fillColor = useCallback(
    (color: string) => {
      updateShapeColor(color);
      clearOnMouseEvent();
      clearMouseEvents();
      mouseDown(shape, color);

      if (
        canvas?.getActiveObject() &&
        canvas.getActiveObject().fill !== 'transparent'
      ) {
        canvas.getActiveObject().set('fill', color);
        canvas.renderAll();

        // TODO: Handle Undo/Redo dispatch.
        dispatch({ type: SET, payload: canvas.getObjects() });
      }
    },
    [
      canvas,
      clearMouseEvents,
      clearOnMouseEvent,
      mouseDown,
      shape,
      updateShapeColor,
      dispatch,
    ]
  );

  /**
   * Add specific color to selected text or group of texts
   * @param {string} color - color to set
   */
  const textColor = useCallback(
    (color: string) => {
      updateFontColor(color);
      if (
        canvas?.getActiveObject() &&
        (canvas.getActiveObject() as fabric.IText).text
      ) {
        canvas.getActiveObject().set('fill', color);
        canvas.renderAll();

        const object: ICanvasObject = canvas?.getActiveObject();

        if (!(object as fabric.ITextOptions).isEditing) {
          const payload = {
            type: 'textbox',
            target: { fill: color },
            id: object.id,
          };

          eventSerializer?.push('fontColorChanged', payload);
        }
        return;
      }

      canvas?.getActiveObjects().forEach((obj: ICanvasObject) => {
        if (obj.id) {
          const type: ObjectType = obj.get('type') as ObjectType;
          if (type === 'textbox') {
            const target = (type: string) => {
              if (type === 'textbox') {
                return {
                  fill: color,
                };
              }
            };

            obj.set({
              fill: color,
            });

            const payload: ObjectEvent = {
              type,
              target: target(type) as ICanvasObject,
              id: obj.id,
            };

            eventSerializer?.push('fontColorChanged', payload);
          }
        }
      });
    },
    [canvas, updateFontColor, eventSerializer]
  );

  /**
   * Clears all whiteboard elements
   * */
  const clearWhiteboardClearAll = useCallback(async () => {
    await updateClearIsActive(true);
    await canvas?.getObjects().forEach((obj: ICanvasObject) => {
      if (obj.id) {
        obj.set({ groupClear: true });
        canvas?.remove(obj);
      }
    });

    const target = {
      target: {
        strategy: 'allowClearAll',
      },
    };

    eventSerializer?.push('removed', target as ObjectEvent);

    // Add cleared whiteboard to undo / redo state.
    const event = {
      event: { id: `${userId}:clearWhiteboard` },
      type: 'clearedWhiteboard',
    };

    // Add cleared whiteboard to undo / redo state.

    dispatch({
      type: SET,
      payload: canvas?.getObjects(),
      canvasId: userId,
      event,
    });

    await updateClearIsActive(false);
  }, [updateClearIsActive, canvas, dispatch, userId, eventSerializer]);

  /**
   * Clears all whiteboard elements
   * */
  const clearWhiteboardClearMySelf = useCallback(async () => {
    const teacherHasPermission = allToolbarIsEnabled;
    const studentHasPermission =
      toolbarIsEnabled && serializerToolbarState.clearWhiteboard;
    if (teacherHasPermission || studentHasPermission) {
      if (typeof localImage === 'string' && localImage.length) {
        const target = {
          id: '',
          target: {
            strategy: 'allowClearMyself',
            isLocalImage: true,
          },
        };

        eventSerializer?.push('removed', target as ObjectEvent);
      }
      await updateClearIsActive(true);
      await canvas?.getObjects().forEach((obj: ICanvasObject) => {
        if (obj.id && isLocalObject(obj.id, userId)) {
          const target = {
            id: obj.id,
            target: {
              strategy: 'allowClearMyself',
            },
          };

          obj.set({ groupClear: true });
          canvas?.remove(obj);
          eventSerializer?.push('removed', target as ObjectEvent);
        }
      });

      if (canvas?.backgroundImage) {
        const target = {
          // @ts-ignore
          id: canvas.backgroundImage.id,
          target: {
            strategy: 'allowClearMyself',
            isBackgroundImage: true,
          },
        };

        eventSerializer?.push('removed', target as ObjectEvent);

        // In order to remove background you need to add 0 to the first argument.
        // An empty string unfortunately doesnt work.
        // https://stackoverflow.com/a/14171884
        // @ts-ignore
        canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
      }

      closeModal();

      const event = {
        event: { id: `${userId}:clearWhiteboard` },
        type: 'clearedWhiteboard',
      };

      // Add cleared whiteboard to undo / redo state.
      dispatch({
        type: SET,
        payload: canvas?.getObjects(),
        canvasId: userId,
        event,
      });

      await updateClearIsActive(false);
    }
    // If isLocalObject is added in dependencies an infinity loop happens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    canvas,
    closeModal,
    canvasId,
    eventSerializer,
    updateClearIsActive,
    toolbarIsEnabled,
    allToolbarIsEnabled,
    serializerToolbarState.clearWhiteboard,
    dispatch,
    userId,
    localImage,
    backgroundImage,
  ]);

  /**
   * Clears all whiteboard with allowClearOthers strategy
   * */
  const clearWhiteboardAllowClearOthers = useCallback(
    async (userId: string) => {
      await updateClearIsActive(true);
      await canvas?.getObjects().forEach((obj: ICanvasObject) => {
        if (obj.id) {
          const object = obj.id.split(':');

          if (!object.length) {
            throw new Error('Invalid ID');
          }

          if (object[0] === userId) {
            canvas?.remove(obj);
          }

          const target = {
            id: obj.id,
            target: {
              strategy: 'allowClearOthers',
              userId,
            },
          };

          eventSerializer?.push('removed', target as ObjectEvent);
        }
      });
      await updateClearIsActive(false);
    },
    [canvas, eventSerializer, updateClearIsActive]
  );

  /**
   * Set Canvas Whiteboard selection ability
   * @param {boolean} selection - value to set in canvas and objects selection
   */
  const setCanvasSelection = useCallback(
    (selection: boolean) => {
      if (canvas) {
        canvas.selection = selection;
        canvas.renderAll();
      }
    },
    [canvas]
  );

  /**
   * Set the cursor to be showed when a object hover happens
   * @param {string} cursor - Cursor name to show
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setHoverCursorObjects = useCallback(
    (cursor: string): void => {
      if (canvas) {
        canvas.forEachObject((object: fabric.Object) => {
          object.hoverCursor = cursor;
        });

        canvas.renderAll();
      }
    },
    [canvas]
  );

  /**
   * Creates the listeners to erase objects from the whiteboard
   */
  const eraseObject = useCallback(() => {
    let eraser: boolean = false;
    let activeObjects = canvas?.getActiveObjects();

    canvas?.getObjects().forEach((object: ICanvasObject) => {
      if (
        (object.id && isLocalObject(object.id, userId as string)) ||
        !object.id
      ) {
        object.set({
          evented: true,
          hoverCursor: `url("${eraseObjectCursor}"), auto`,
          lockMovementX: true,
          lockMovementY: true,
        });
      } else if (object.id) {
        object.set({
          hoverCursor: 'default',
        });
      }
    });

    if (activeObjects?.length && activeObjects.length > 1) {
      canvas?.getActiveObject().set({
        hoverCursor: `url("${eraseObjectCursor}"), auto`,
      });
    }

    // When mouse down eraser is able to remove objects
    canvas?.on('mouse:down', (e: ICanvasMouseEvent) => {
      if (eraser) {
        return false;
      }

      canvas.defaultCursor = `url("${eraseObjectCursor}"), auto`;
      eraser = true;

      // if the click is made over an object
      if (
        e.target &&
        (!e.target._objects ||
          (e.target._objects && (e.target as ICanvasBrush).basePath)) &&
        ((e.target.id && isLocalObject(e.target.id, userId as string)) ||
          !e.target.id)
      ) {
        canvas.remove(e.target);
        canvas.renderAll();
      }

      // if the click is made over an object group
      if (e.target?._objects) {
        e.target._objects.forEach(function (object: fabric.Object) {
          canvas.remove(object);
        });

        canvas.discardActiveObject();
        canvas.renderAll();
      }
    });

    // When mouse is over an object
    canvas?.on('mouse:over', (e: ICanvasMouseEvent) => {
      if (!eraser) {
        return false;
      }

      if (
        (e.target &&
          e.target.id &&
          isLocalObject(e.target.id, userId as string)) ||
        (e.target && !e.target.id)
      ) {
        canvas.remove(e.target);
        canvas.renderAll();
      }
    });

    // When mouse up eraser is unable to remove objects
    canvas?.on('mouse:up', () => {
      if (!eraser) {
        return false;
      }

      canvas.defaultCursor = 'default';
      eraser = false;
    });
    // If isLocalObject is added in dependencies an infinity loop happens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, canvasId, userId]);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    let eraser: any;

    if (
      eraseType === 'partial' &&
      canvas &&
      toolbarIsEnabled &&
      (allToolbarIsEnabled || serializerToolbarState.partialErase)
    ) {
      canvas?.discardActiveObject();
      canvas?.renderAll();

      eraser = new PartialErase(
        userId as string,
        canvas as fabric.Canvas,
        lineWidth,
        eraseObjectCursor,
        allToolbarIsEnabled,
        partialEraseIsActive,
        serializerToolbarState.partialErase,
        eventSerializer,
        dispatch
      );
      eraser.init();
    }

    if (
      eraseType === 'object' &&
      canvas &&
      toolbarIsEnabled &&
      (allToolbarIsEnabled || serializerToolbarState.erase)
    ) {
      eraseObject();

      if (canvas.getActiveObjects().length === 1) {
        canvas.discardActiveObject().renderAll();
      }
    }

    return () => {
      if (eraser) {
        eraser.destroy();
      }

      canvas?.off('mouse:up');
      canvas?.off('mouse:over');
      canvas?.off('path:created');
    };
  }, [
    canvas,
    eraseType,
    partialEraseIsActive,
    toolbarIsEnabled,
    allToolbarIsEnabled,
    serializerToolbarState.partialErase,
    userId,
    lineWidth,
    eventSerializer,
    dispatch,
    serializerToolbarState.erase,
    eraseObject,
  ]);

  /**
   * Deselect the actual selected object
   */
  const discardActiveObject = useCallback(() => {
    canvas?.discardActiveObject().renderAll();
  }, [canvas]);

  const undo = useCallback(() => {
    const teacherHasPermission = allToolbarIsEnabled;
    const studentHasPermission =
      toolbarIsEnabled && serializerToolbarState.undoRedo;

    if (teacherHasPermission || studentHasPermission) {
      dispatch({ type: UNDO, canvasId: canvasId });
    }
  }, [
    dispatch,
    canvasId,
    toolbarIsEnabled,
    allToolbarIsEnabled,
    serializerToolbarState.undoRedo,
  ]);

  const redo = useCallback(() => {
    const teacherHasPermission = allToolbarIsEnabled;
    const studentHasPermission =
      toolbarIsEnabled && serializerToolbarState.undoRedo;

    if (teacherHasPermission || studentHasPermission) {
      dispatch({ type: REDO, canvasId: canvasId });
    }
  }, [
    dispatch,
    canvasId,
    toolbarIsEnabled,
    allToolbarIsEnabled,
    serializerToolbarState.undoRedo,
  ]);

  const state = useMemo(() => {
    const actions = {
      fillColor,
      changeStrokeColor,
      changeBrushType,
      textColor,
      clearWhiteboardClearAll,
      discardActiveObject,
      addShape,
      eraseObject,
      setCanvasSelection,
      setHoverCursorObjects,
      undo,
      redo,
      clearWhiteboardAllowClearOthers,
      clearWhiteboardClearMySelf,
    };

    return { actions, mouseDown };
  }, [
    addShape,
    changeStrokeColor,
    changeBrushType,
    clearWhiteboardClearAll,
    discardActiveObject,
    eraseObject,
    fillColor,
    mouseDown,
    setCanvasSelection,
    setHoverCursorObjects,
    textColor,
    undo,
    redo,
    clearWhiteboardAllowClearOthers,
    clearWhiteboardClearMySelf,
  ]);

  return state;
};
