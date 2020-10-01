import { useCallback, useContext, useMemo } from 'react';
import { fabric } from 'fabric';
import eraseObjectCursor from '../../../assets/cursors/erase-object.png';
import { WhiteboardContext } from '../WhiteboardContext';
import * as shapes from '../shapes/shapes';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { isFreeDrawing, isShape } from '../utils/shapes';
import { UNDO, REDO, SET } from '../reducers/undo-redo';
import { setSize, setCircleSize, setPathSize } from '../utils/scaling';
import { v4 as uuidv4 } from 'uuid';
import { IEvent, Point, ITextOptions } from 'fabric/fabric-impl';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { ICanvasMouseEvent } from '../../../interfaces/canvas-events/canvas-mouse-event';
import { IWhiteboardContext } from '../../../interfaces/whiteboard-context/whiteboard-context';
import {
  ObjectEvent,
  ObjectType,
} from '../event-serializer/PaintEventSerializer';

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
    closeModal,
    penColor,
    lineWidth,
    isLocalObject,
    updateClearIsActive,
    toolbarIsEnabled,
    allToolbarIsEnabled,
    serializerToolbarState,
    perfectShapeIsActive,
  } = useContext(WhiteboardContext) as IWhiteboardContext;

  /**
   * Adds shape to whiteboard.
   * @param specific Indicates shape type that should be added in whiteboard.
   */
  const shapeSelector = useCallback(
    (specific: string): TypedShape => {
      switch (specific || shape) {
        case 'rectangle':
          return shapes.rectangle(2, 2, penColor, false, lineWidth);
        case 'circle':
          return shapes.circle(2, 2, penColor, false, lineWidth);
        case 'triangle':
          return shapes.triangle(2, 4, penColor, false, lineWidth);
        case 'star':
          return shapes.star(2, 2, penColor, false, lineWidth);
        case 'arrow':
          return shapes.arrow(2, 2, penColor, false, lineWidth);
        case 'chatBubble':
          return shapes.chat(2, 2, penColor, false, lineWidth);
        case 'pentagon':
          return shapes.pentagon(penColor, false, lineWidth);
        case 'hexagon':
          return shapes.hexagon(penColor, false, lineWidth);
        case 'filledRectangle':
          return shapes.rectangle(2, 2, shapeColor, true, 0);
        case 'filledCircle':
          return shapes.circle(2, 2, shapeColor, true, 0);
        case 'filledTriangle':
          return shapes.triangle(2, 4, shapeColor, true, 0);
        case 'filledStar':
          return shapes.star(2, 2, shapeColor, true, 0);
        case 'filledArrow':
          return shapes.arrow(2, 2, shapeColor, true, 0);
        case 'filledChatBubble':
          return shapes.chat(2, 2, shapeColor, true, 0);
        case 'filledPentagon':
          return shapes.pentagon(shapeColor, true, 0);
        case 'filledHexagon':
          return shapes.hexagon(shapeColor, true, 0);
        default:
          return shapes.circle(2, 2, penColor, false, lineWidth);
      }
    },
    [lineWidth, penColor, shape, shapeColor]
  );

  /**
   *
   * @param shape Shape that was added to canvas.
   * @param coordsStart Coordinates of initial click on canvas.
   * @param isCircle Indicates if shape added is a circle.
   */
  const mouseMove = useCallback(
    (
      shape: fabric.Object | fabric.Rect | fabric.Ellipse,
      coordsStart: Point,
      specific?: string
    ): void => {
      canvas?.on('mouse:move', (e: fabric.IEvent): void => {
        if (!e.pointer) return;

        canvas.selection = false;

        if (specific === 'filledCircle' || specific === 'circle') {
          setCircleSize(shape as fabric.Ellipse, coordsStart, e.pointer);
        } else if (
          specific === 'filledRectangle' ||
          specific === 'filledTriangle' ||
          specific === 'rectangle' ||
          specific === 'triangle'
        ) {
          setSize(shape, coordsStart, e.pointer);
        } else {
          setPathSize(shape, coordsStart, e.pointer);
        }

        let anchor = { ...coordsStart, originX: 'left', originY: 'top' };

        if (e.pointer && coordsStart.x > e.pointer.x) {
          anchor = { ...anchor, originX: 'right' };
        }

        if (e.pointer && coordsStart.y > e.pointer.y) {
          anchor = { ...anchor, originY: 'bottom' };
        }

        shape.set(anchor);
        canvas.renderAll();
      });
    },
    [canvas]
  );

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
   * Mouse up event listener for canvas.
   */
  const mouseUp = useCallback(
    (
      shape: fabric.Object | fabric.Rect | fabric.Ellipse,
      coordsStart: Point,
      specific: string
    ): void => {
      canvas?.on('mouse:up', (e: fabric.IEvent): void => {
        if (!e.pointer) return;

        let size;

        if (specific === 'filledCircle' || specific === 'circle') {
          size = setCircleSize(shape as fabric.Ellipse, coordsStart, e.pointer);
        } else if (
          specific === 'filledRectangle' ||
          specific === 'filledTriangle' ||
          specific === 'rectangle' ||
          specific === 'triangle'
        ) {
          size = setSize(shape, coordsStart, e.pointer);
        } else {
          size = setPathSize(shape, coordsStart, e.pointer);
        }

        if (size.width <= 2 && size.height <= 2) {
          canvas.remove(shape);
        } else {
          shape.setCoords();
          canvas.renderAll();

          dispatch({ type: 'CANVAS_SET', payload: canvas.getObjects() });
        }
      });
    },
    [canvas, dispatch]
  );

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

        const shape = shapeSelector(specific);
        if (e.pointer) {
          shape.set({
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
        mouseMove(shape, e.pointer, specific);
        mouseUp(shape, e.pointer, specific);
        canvas.add(shape);
      });
    },
    [canvas, clearOnMouseEvent, mouseMove, mouseUp, shapeColor, shapeSelector]
  );

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
      const setShapeSize = (shape: TypedShape, e: IEvent) => {
        if (!e.pointer) return;

        let pointer: Point = e.pointer;
        let biggerDifference: number = 0;

        if (perfectShapeIsActive) {
          biggerDifference = getBiggerDifference(pointer);

          pointer.x = startPoint.x + biggerDifference;
          pointer.y = startPoint.y + biggerDifference;
        } else {
          pointer = e.pointer;
        }

        if (shapeToAdd === 'circle') {
          return setCircleSize(shape as fabric.Ellipse, startPoint, pointer);
        } else if (shapeToAdd === 'rectangle' || shapeToAdd === 'triangle') {
          return setSize(shape, startPoint, pointer);
        } else {
          return setPathSize(shape, startPoint, pointer);
        }
      };

      /**
       * Get the bigger difference
       * between startPoint.x - point.x and startPoint.y - point.y
       * @param {Point} point - Point to find the difference with startPoint
       */
      const getBiggerDifference = (point: Point) => {
        return Math.abs(point.x - startPoint.x) >
          Math.abs(point.y - startPoint.y)
          ? point.x - startPoint.x
          : point.y - startPoint.y;
      };

      /**
       * Removes the recent created shape and set resize variable in false
       */
      const cancelShapeCreation = () => {
        if (resize) {
          canvas?.remove(shape);
          resize = false;
        }
      };

      /**
       * Return the movement hability in the current target shape
       * @param {IEvent} event - current event, necessary to know
       * which is the current target shape
       */
      const allowMovementInShape = (event: IEvent) => {
        if (event.target) {
          event.target.set({
            lockMovementX: false,
            lockMovementY: false,
          });
        }
      };

      canvas?.on('mouse:down', (e: IEvent) => {
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

        shape = shapeSelector(shapeToAdd);

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

        canvas.add(shape);
        resize = true;

        /*
          Canceling shapes creation in object:scaling
          and object:rotating events
        */
        canvas.on({
          'object:scaling': cancelShapeCreation,
          'object:rotating': cancelShapeCreation,
        });

        /*
          When the shape was resized or rotated
          the shape's movement is allowed
        */
        canvas.on({
          'object:scaled': allowMovementInShape,
          'object:rotated': allowMovementInShape,
        });
      });

      canvas?.on('mouse:move', (e: IEvent) => {
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
      });

      canvas?.on('mouse:up', (e: IEvent) => {
        if (!shape || !resize) {
          return;
        }

        const size = setShapeSize(shape, e);
        const id = `${userId}:${uuidv4()}`;
        resize = false;

        if (size && size.width <= 2 && size.height <= 2) {
          canvas.remove(shape);
        } else {
          shape.set({ id });
          shape.setCoords();

          /*
            Setting the recent created shape like evented
            to can be resized and rotated
          */
          shape.set({
            evented: true,
            hoverCursor: 'default',
            lockUniScaling: perfectShapeIsActive,
          });

          canvas.setActiveObject(shape);
          canvas.renderAll();
          let type = shape.type;
          let payload = {};
          let target = {
            type,
            id,
          };

          const requiredProps = [
            'id',
            'height',
            'width',
            'left',
            'top',
            'strokeWidth',
            'stroke',
            'fill',
            'name',
            'scaleX',
            'scaleY',
            'strokeUniform',
            'originX',
            'originY',
          ];

          const requiredEllipseProps = [
            'id',
            'ry',
            'rx',
            'left',
            'top',
            'strokeWidth',
            'stroke',
            'fill',
            'strokeUniform',
            'originY',
            'originX',
          ];

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
      });
    },
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
    (color: string) => {
      updatePenColor(color);

      const activeObjects = canvas?.getActiveObjects();
      if (!activeObjects) return;

      activeObjects.forEach((object: TypedShape) => {
        if (
          (isShape(object) && object.shapeType === 'shape') ||
          isFreeDrawing(object)
        ) {
          object.set('stroke', color);
        }
      });

      canvas?.renderAll();
    },
    [canvas, updatePenColor]
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

        if (!(object as ITextOptions).isEditing) {
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
        // canvas.forEachObject((object: fabric.Object) => {
        // @ts-ignore
        // if (isLocalObject(object.id, userId)) {
        //   object.set({
        //     selectable: selection,
        //   });
        // }
        // });

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
        !e.target._objects &&
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
