import { useCallback, useContext, useMemo } from 'react';
import { fabric } from 'fabric';
import { WhiteboardContext } from '../WhiteboardContext';
import ICanvasActions from './ICanvasActions';
import * as shapes from '../shapes/shapes';

export interface ICanvasActionsState {
  actions: ICanvasActions;
  mouseDown: (specific: string, color?: string) => void;
}

export const useCanvasActions = (canvas?: fabric.Canvas) => {
  const {
    shapeIsActive,
    updateFontColor,
    shape,
    shapeColor,
    updatePenColor,
    updateShapeColor,
    closeModal,
    setCircleSize,
    setSize,
    setPathSize,
  } = useContext(WhiteboardContext);

  /**
   * Adds shape to whiteboard.
   * @param specific Indicates shape type that should be added in whiteboard.
   */
  const shapeSelector = useCallback(
    (specific: string): fabric.Rect | fabric.Triangle | fabric.Ellipse => {
      switch (specific || shape) {
        case 'rectangle':
          return shapes.rectangle(2, 2, shapeColor);
        case 'triangle':
          return shapes.triangle(2, 4, shapeColor);
        case 'star':
          return shapes.star(2, 2, shapeColor);
        case 'rightArrow':
          return shapes.arrow(2, 2, shapeColor);
        case 'chatBubble':
          return shapes.chat(2, 2, shapeColor);
        case 'pentagon':
          return shapes.pentagon(shapeColor);
        case 'hexagon':
          return shapes.hexagon(shapeColor);
        default:
          return shapes.circle(2, 2, shapeColor);
      }
    },
    [shape, shapeColor]
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
        if (specific === 'circle') {
          setCircleSize(shape as fabric.Ellipse, coordsStart, e.pointer);
        } else if (specific === 'rectangle' || specific === 'triangle') {
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
    [setCircleSize, setPathSize, setSize, canvas]
  );

  const clearOnMouseEvent = useCallback((): void => {
    canvas?.off('mouse:down');
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

        if (specific === 'circle') {
          size = setCircleSize(shape as fabric.Ellipse, coordsStart, e.pointer);
        } else if (specific === 'rectangle' || specific === 'triangle') {
          size = setSize(shape, coordsStart, e.pointer);
        } else {
          size = setPathSize(shape, coordsStart, e.pointer);
        }

        if (size.width <= 2 && size.height <= 2) {
          canvas.remove(shape);
        } else {
          shape.setCoords();
          canvas.renderAll();
        }
      });
    },
    [setCircleSize, setPathSize, setSize, canvas]
  );

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
        if (e.target) {
          return;
        }

        if (!e.pointer) {
          return;
        }

        const shape = shapeSelector(specific);
        if (e.pointer) {
          shape.set({
            top: e.pointer.y,
            left: e.pointer.x,
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
    (specific?: string) => {
      // Required to prevent multiple shapes add at once
      // if user clicked more than one shape during selection.
      if (!shapeIsActive) {
        return;
      }

      clearOnMouseEvent();
      clearMouseEvents();
      mouseDown(specific || shape, shapeColor);
    },
    [
      clearMouseEvents,
      clearOnMouseEvent,
      mouseDown,
      shape,
      shapeColor,
      shapeIsActive,
    ]
  );

  const changeStrokeColor = useCallback(
    (color: string) => {
      updatePenColor(color);

      if (canvas?.getActiveObject()) {
        canvas.getActiveObject().set('stroke', color);
        canvas.renderAll();
      }
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

      if (canvas?.getActiveObject()) {
        canvas.getActiveObject().set('fill', color);
        canvas.renderAll();
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
        // @ts-ignore
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
      canvas.backgroundColor = 'white';
      canvas.renderAll();
    }
    closeModal();
  }, [canvas, closeModal]);

  /**
   * Set Canvas Whiteboard selection ability
   * @param {boolean} selection - value to set in canvas and objects selection
   */
  const setCanvasSelection = useCallback(
    (selection: boolean) => {
      if (canvas) {
        canvas.selection = selection;
        canvas.forEachObject((object: fabric.Object) => {
          object.selectable = selection;
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
    let activeObjects: any = null;

    // Deactivate selection
    setCanvasSelection(false);

    // When mouse down eraser is able to remove objects
    canvas?.on('mouse:down', (e: any) => {
      if (eraser) {
        return false;
      }

      // if the click is made over an object
      if (e.target) {
        activeObjects = canvas.getActiveObjects();
        canvas.remove(e.target);
        canvas.renderAll();
      }

      // if the click is made over an object group
      if (e.target && activeObjects.length) {
        activeObjects.forEach(function (object: any) {
          canvas.remove(object);
        });

        canvas.discardActiveObject().renderAll();
      }

      eraser = true;
    });

    // When mouse is over an object
    canvas?.on('mouse:over', (e: any) => {
      if (!eraser) {
        return false;
      }

      canvas.remove(e.target);
      canvas.renderAll();
    });

    // When mouse up eraser is unable to remove objects
    canvas?.on('mouse:up', () => {
      if (!eraser) {
        return false;
      }

      eraser = false;
    });
  }, [canvas, setCanvasSelection]);

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
      setCanvasSelection,
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
    setCanvasSelection,
    textColor,
  ]);

  return state;
};
