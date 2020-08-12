import { useCallback, useContext, useMemo } from 'react';
import { fabric } from 'fabric';
import { WhiteboardContext } from '../WhiteboardContext';
import ICanvasActions from './ICanvasActions';
import * as shapes from '../shapes/shapes';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { isFreeDrawing, isShape } from '../utils/shapes';
import { setSize, setCircleSize, setPathSize } from '../utils/scaling';
import { IEvent } from 'fabric/fabric-impl';

export interface ICanvasActionsState {
  actions: ICanvasActions;
  mouseDown: (specific: string, color?: string) => void;
}

export const useCanvasActions = (canvasId: string, canvas?: fabric.Canvas) => {
  console.log(canvasId);
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
  } = useContext(WhiteboardContext);

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
      coordsStart: any,
      specific?: string
    ): void => {
      canvas?.on('mouse:move', (e: fabric.IEvent): void => {
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
      coordsStart: any,
      specific: string
    ): void => {
      canvas?.on('mouse:up', (e: fabric.IEvent): void => {
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
          // TODO: Handle Undo/Redo dispatch.
          // dispatch({ type: SET, payload: canvas.getObjects() });
        }
      });
    },
    [canvas]
  );

  /**
   * Mouse down event listener for canvas.
   * @param shape Shape being added on canvas.
   * @param isCircle Indicates if shape is a circle.
   */
  const mouseDown = useCallback(
    (specific: string, color?: string): void => {
      canvas?.on('mouse:down', (e: fabric.IEvent): void => {
        if (e.target) {
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
      let startPoint: fabric.Point | null = null;
      let shape: TypedShape | null = null;

      /**
       * Set the new size of a recently created shape
       * @param {TypedShape} shape - Shape to change its size
       * @param {IEvent} e - Current event, necessary to know
       * where is the pointer
       */
      const setShapeSize = (shape: TypedShape, e: IEvent) => {
        if (shapeToAdd === 'circle') {
          return setCircleSize(shape as fabric.Ellipse, startPoint, e.pointer);
        } else if (shapeToAdd === 'rectangle' || shapeToAdd === 'triangle') {
          return setSize(shape, startPoint, e.pointer);
        } else {
          return setPathSize(shape, startPoint, e.pointer);
        }
      };

      canvas?.on('mouse:down', (e: IEvent) => {
        if (e.target || resize) {
          return;
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
        resize = false;

        if (size.width <= 2 && size.height <= 2) {
          canvas.remove(shape);
        } else {
          shape.setCoords();
          canvas.renderAll();
          // TODO: Handle Undo/Redo dispatch.
          // dispatch({ type: SET, payload: canvas.getObjects() });
        }
      });
    },
    [canvas, shapeIsActive, shapeSelector]
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
        // dispatch({ type: SET, payload: canvas.getObjects() });
      }
    },
    [
      canvas,
      clearMouseEvents,
      clearOnMouseEvent,
      mouseDown,
      shape,
      updateShapeColor,
    ]
  );

  /**
   * Add specific color to selected text
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
      }
    },
    [canvas, updateFontColor]
  );

  /**
   * Clears all whiteboard elements
   * */
  const clearWhiteboard = useCallback(() => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = '#ffffff';
      canvas.renderAll();
    }
    closeModal();
  }, [canvas, closeModal]);

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

    canvas?.getObjects().forEach((object: any) => {
      if ((object.id && isLocalObject(object.id, canvasId)) || !object.id) {
        object.set({
          selectable: true,
          evented: true,
          hoverCursor: 'pointer',
        });
      } else if (object.id) {
        object.set({
          hoverCursor: 'default',
        });
      }
    });

    if (activeObjects?.length) {
      canvas?.getActiveObject().set({
        hoverCursor: 'pointer',
      });
    }

    // When mouse down eraser is able to remove objects
    canvas?.on('mouse:down', (e: any) => {
      console.log('mouse down');
      if (eraser) {
        return false;
      }

      // if the click is made over an object
      if (
        (e.target && e.target.id && isLocalObject(e.target.id, canvasId)) ||
        (e.target && !e.target.id)
      ) {
        canvas.remove(e.target);
        canvas.renderAll();
      }

      // if the click is made over an object group
      if (e.target && activeObjects?.length) {
        activeObjects.forEach(function (object: any) {
          canvas.remove(object);
        });

        canvas.discardActiveObject().renderAll();
      }

      eraser = true;
    });

    // When mouse is over an object
    canvas?.on('mouse:over', (e: any) => {
      console.log('mouse over');
      if (!eraser) {
        return false;
      }

      if (
        (e.target && e.target.id && isLocalObject(e.target.id, canvasId)) ||
        (e.target && !e.target.id)
      ) {
        canvas.remove(e.target);
        canvas.renderAll();
      }
    });

    // When mouse up eraser is unable to remove objects
    canvas?.on('mouse:up', () => {
      console.log('mouse up');
      if (!eraser) {
        return false;
      }

      eraser = false;
    });
    // If isLocalObject is added in dependencies an infinity loop happens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, canvasId]);

  /**
   * Deselect the actual selected object
   */
  const discardActiveObject = useCallback(() => {
    canvas?.discardActiveObject().renderAll();
  }, [canvas]);

  const state = useMemo(() => {
    const actions: ICanvasActions = {
      fillColor,
      changeStrokeColor,
      textColor,
      clearWhiteboard,
      discardActiveObject,
      addShape,
      eraseObject,
      setHoverCursorObjects,
    };

    return { actions, mouseDown };
  }, [
    addShape,
    changeStrokeColor,
    clearWhiteboard,
    discardActiveObject,
    eraseObject,
    fillColor,
    mouseDown,
    setHoverCursorObjects,
    textColor,
  ]);

  return state;
};
