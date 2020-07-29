import React, {
  createContext,
  ReactComponentElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
// @ts-ignore
import FontFaceObserver from 'fontfaceobserver';
import { fabric } from 'fabric';
import * as shapes from './shapes/shapes';
import { useText } from './hooks/useText';
import { useFontFamily } from './hooks/useFontFamily';
import { useShapeColor } from './hooks/useShapeColor';
import { useShape } from './hooks/useShape';
import { useWhiteboardClearModal } from './hooks/useWhiteboardClearModal';
import { setSize, setCircleSize, setPathSize } from './utils/scaling';
import { usePointerEvents } from './hooks/usePointerEvents';
import { useFontColor } from './hooks/useFontColor';
import { useTextIsActive } from './hooks/useTextIsActive';
import { useShapeIsActive } from './hooks/useShapeIsActive';
import { useBrushIsActive } from './hooks/useBrushIsActive';
import CanvasEvent from '../../interfaces/canvas-events/canvas-events';
import './whiteboard.css';
import { useEraseType } from './hooks/useEraseType';
import { DEFAULT_VALUES } from '../../config/toolbar-default-values';
import { useLineWidth } from './hooks/useLineWidth';
import { Canvas, IEvent, TextOptions } from 'fabric/fabric-impl';

// @ts-ignore
export const WhiteboardContext = createContext();

export const WhiteboardProvider = ({
  children,
  canvasId,
  canvasWidth,
  canvasHeight,
  toolbar,
}: {
  children: React.ReactNode;
  canvasId: string;
  toolbar: ReactComponentElement<any>;
  canvasWidth: string;
  canvasHeight: string;
}) => {
  const { text, updateText } = useText();
  const { fontColor, updateFontColor } = useFontColor();
  const { fontFamily, updateFontFamily } = useFontFamily();
  const { shapeColor, updateShapeColor } = useShapeColor();
  const { shape, updateShape } = useShape();
  const { eraseType, updateEraseType } = useEraseType();
  const { lineWidth, updateLineWidth } = useLineWidth();
  const { pointerEvents, setPointerEvents } = usePointerEvents();
  const [canvas, setCanvas] = useState<Canvas>();

  const {
    ClearWhiteboardModal,
    openModal,
    closeModal,
  } = useWhiteboardClearModal();

  const { textIsActive, updateTextIsActive } = useTextIsActive();
  const { shapeIsActive, updateShapeIsActive } = useShapeIsActive();
  const { brushIsActive, updateBrushIsActive } = useBrushIsActive();

  // Provisional (just for change value in Toolbar selectors) they can be modified in the future
  const [pointer, updatePointer] = useState(DEFAULT_VALUES.POINTER);
  const [penLine, updatePenLine] = useState(DEFAULT_VALUES.PEN_LINE);
  const [penColor, updatePenColor] = useState(DEFAULT_VALUES.PEN_COLOR);
  const [floodFill, updateFloodFill] = useState(DEFAULT_VALUES.FLOOD_FILL);
  const [stamp, updateStamp] = useState(DEFAULT_VALUES.STAMP);

  /**
   * Creates Canvas/Whiteboard instance
   */
  useEffect(() => {
    // @ts-ignore
    const canvasInstance = new fabric.Canvas(canvasId, {
      backgroundColor: 'white',
      width: parseInt(canvasWidth, 10),
      height: parseInt(canvasHeight, 10),
      isDrawingMode: false,
      selectionBorderColor: 'rgba(100, 100, 255, 1)',
      selectionLineWidth: 2,
      selectionColor: 'rgba(100, 100, 255, 0.1)',
      selectionFullyContained: true,
      selectionDashArray: [10],
    });

    setCanvas(canvasInstance);
  }, [canvasHeight, canvasWidth, canvasId]);

  /**
   * Handles the logic to write text on the whiteboard
   * */
  useEffect(() => {
    if (textIsActive) {
      //@ts-ignore
      canvas?.on('mouse:down', (options: { target: null; e: any }) => {
        if (options.target === null) {
          let text = new fabric.IText(' ', {
            fontFamily: fontFamily,
            fontSize: 30,
            fontWeight: 400,
            fill: fontColor,
            fontStyle: 'normal',
            top: options.e.offsetY,
            left: options.e.offsetX,
            cursorDuration: 500,
          });

          canvas.add(text);
          canvas.setActiveObject(text);
          text.enterEditing();
          text?.hiddenTextarea?.focus();

          text.on('editing:exited', () => {
            const textCopy = text.text;
            const toObject = text.toObject();
            delete toObject.text;
            delete toObject.type;
            const clonedTextObj = JSON.parse(JSON.stringify(toObject));

            if (typeof textCopy === 'string') {
              text = new fabric.Textbox(textCopy, clonedTextObj);
            }

            canvas.remove(canvas.getActiveObject());
            canvas.add(text);
            canvas.setActiveObject(text);

            if (text?.text?.replace(/\s/g, '').length === 0) {
              canvas.remove(canvas.getActiveObject());
              return;
            }

            text.on('selected', () => {
              if (text.fontFamily) {
                //@ts-ignore
                updateFontColor(text.fill);
                updateFontFamily(text.fontFamily);
              }
            });

            text.on('modified', () => {
              if (text?.text?.replace(/\s/g, '').length === 0) {
                canvas.remove(canvas.getActiveObject());
              }
            });
          });
        }
      });
    }

    return () => {
      canvas?.off('mouse:down');
    };
  }, [
    canvas,
    textIsActive,
    fontColor,
    fontFamily,
    updateFontFamily,
    updateFontColor,
  ]);

  /**
   * Is executed when textIsActive changes its value,
   * basically to deselect any selected object
   */
  useEffect(() => {
    if (!textIsActive) {
      canvas?.discardActiveObject();
      canvas?.renderAll();
    }
  }, [canvas, pointerEvents, textIsActive]);

  /**
   * Activates or deactivates drawing mode.
   */
  useEffect(() => {
    if (brushIsActive && canvas) {
      canvas.freeDrawingBrush = new fabric.PencilBrush();
      //@ts-ignore
      canvas.freeDrawingBrush.canvas = canvas;
      canvas.freeDrawingBrush.color = penColor || DEFAULT_VALUES.PEN_COLOR;
      canvas.freeDrawingBrush.width = lineWidth;
      canvas.isDrawingMode = true;
    } else if (canvas && !brushIsActive) {
      canvas.isDrawingMode = false;

      /*
        This is for no change the line width
        in a free drawing object if this is resized
      */
      canvas.getObjects().forEach((object: fabric.Object) => {
        if (isFreeDrawing(object)) {
          object.strokeUniform = true;
        }
      });
    }
  }, [brushIsActive, canvas, lineWidth, penColor]);

  /**
   * Disables shape canvas mouse events.
   */
  useEffect(() => {
    if (!shapeIsActive && canvas) {
      canvas.off('mouse:move');
      canvas.off('mouse:up');
    }
  }, [shapeIsActive, canvas]);

  /**
   * General handler for keyboard events
   * 'Backspace' event for removing selected element from whiteboard
   * 'Escape' event for deselect active objects
   * */
  const keyDownHandler = useCallback(
    (e: { key: any }) => {
      if (e.key === 'Backspace' && canvas) {
        const objects = canvas.getActiveObjects();

        objects.forEach((object: any) => {
          if (!object?.isEditing) {
            canvas.remove(object);
            canvas.discardActiveObject().renderAll();
          }
        });
        return;
      }

      if (e.key === 'Escape' && canvas) {
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    },
    [canvas]
  );

  /**
   * Loads selected font. Default is Arial
   * */
  const fontFamilyLoader = useCallback(
    (font: string) => {
      const myFont = new FontFaceObserver(font);
      myFont
        .load()
        .then(() => {
          if (canvas?.getActiveObject()) {
            //@ts-ignore
            canvas.getActiveObject().set('fontFamily', font);
            canvas.requestRenderAll();
          }
        })
        .catch((e: any) => {
          console.log(e);
        });
    },
    [canvas]
  );

  /**
   * Add keyboard keydown event listener. It listen keyDownHandler function
   * Invokes fontFamilyLoader to set default and selected font family
   * */
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler, false);
    fontFamilyLoader(fontFamily);
  }, [fontFamily, keyDownHandler, fontFamilyLoader]);

  /**
   * Deselect the actual selected object
   */
  const discardActiveObject = () => {
    canvas?.discardActiveObject().renderAll();
  };

  /**
   * If the input field (text) has length
   * will unselect whiteboard active objects
   * */
  useEffect(() => {
    if (text.length) {
      canvas?.discardActiveObject().renderAll();
    }
  }, [text, canvas]);

  /**
   * If pointerEvents changes to false, all the selected objects
   * will be unselected
   */
  useEffect(() => {
    if (!pointerEvents && canvas) {
      canvas.discardActiveObject().renderAll();
    }
  }, [pointerEvents, canvas]);

  /**
   * Creates the listeners to erase objects from the whiteboard
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const eraseObject = (): void => {
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
  };

  /**
   * Set Canvas Whiteboard selection hability
   * @param {boolean} selection - value to set in canvas and objects selection
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setCanvasSelection = (selection: boolean): void => {
    if (canvas) {
      canvas.selection = selection;
      canvas.forEachObject((object: fabric.Object) => {
        object.selectable = selection;
        object.hoverCursor = selection ? 'move' : 'pointer';
      });

      canvas.renderAll();
    }
  };

  /**
   * When eraseType value changes, listeners and states
   * necessaries to erase objects are setted or removed
   */
  useEffect(() => {
    if (eraseType === 'object' && canvas) {
      eraseObject();

      if (canvas.getActiveObjects().length === 1) {
        canvas.discardActiveObject().renderAll();
      }
    } else if (canvas) {
      setCanvasSelection(true);
    }

    return () => {
      canvas?.off('mouse:down');
      canvas?.off('mouse:up');
      canvas?.off('mouse:over');
    };
  }, [eraseType, canvas, eraseObject, setCanvasSelection]);

  /**
   * Adds shape to whiteboard.
   * @param specific Indicates shape type that should be added in whiteboard.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const shapeSelector = (
    specific: string
  ): fabric.Rect | fabric.Triangle | fabric.Ellipse => {
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
  };

  /**
   * Removes mouse:down event from canvas
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clearOnMouseEvent = (): void => {
    canvas?.off('mouse:down');
  };

  /**
   * Set the size of the shape when the mouse drawing action is made
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
      //@ts-ignore
      canvas?.on('mouse:move', (e: CanvasEvent): void => {
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

        if (coordsStart.x > e.pointer.x) {
          anchor = { ...anchor, originX: 'right' };
        }

        if (coordsStart.y > e.pointer.y) {
          anchor = { ...anchor, originY: 'bottom' };
        }

        shape.set(anchor);
        canvas.renderAll();
      });
    },
    [canvas]
  );

  /**
   * Mouse up event listener for canvas.
   */
  const mouseUp = useCallback(
    (
      shape: fabric.Object | fabric.Rect | fabric.Ellipse,
      coordsStart: any,
      specific: string
    ): void => {
      //@ts-ignore
      canvas?.on('mouse:up', (e: CanvasEvent): void => {
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
      //@ts-ignore
      canvas?.on('mouse:down', (e: CanvasEvent): void => {
        if (e.target) {
          return;
        }

        const shape = shapeSelector(specific);
        shape.set({
          top: e.pointer.y,
          left: e.pointer.x,
          type: 'shape',
          name: specific,
          strokeUniform: true,
        });

        // fill and type properties just can be resetted if is an filled shape
        if (shape.fill !== 'transparent') {
          shape.set({
            type: 'filledShape',
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
   * Clears all mouse event listeners from canvas.
   */
  const clearMouseEvents = (): void => {
    canvas?.off('mouse:move');
    canvas?.off('mouse:up');
  };

  /**
   * Add specific shape to whiteboard
   * */
  const addShape = (specific?: string): void => {
    const shapeToAdd = specific || shape;
    /*
      Required to prevent multiple shapes add at once
      if user clicked more than one shape during selection.
    */
    if (!shapeIsActive) {
      return;
    }

    clearOnMouseEvent();
    clearMouseEvents();
    mouseDown(
      shapeToAdd,
      shapeToAdd.startsWith('filled') ? shapeColor : penColor
    );
  };

  /**
   * Changes the penColor value and if one or more objects are selected
   * also changes the stroke color in free drawing and empty shape objects
   * @param {string} color - new color to change
   */
  const changeStrokeColor = (color: string) => {
    updatePenColor(color);

    if (canvas?.getActiveObjects()) {
      canvas.getActiveObjects().forEach((object) => {
        if (
          (isShape(object) && object.type === 'shape') ||
          isFreeDrawing(object)
        ) {
          object.set('stroke', color);
        }
      });

      canvas.renderAll();
    }
  };

  /**
   * Add specific color to selected shape
   * */
  const fillColor = (color: string) => {
    updateShapeColor(color);
    clearOnMouseEvent();
    clearMouseEvents();
    mouseDown(shape, color);

    // Just the filled shapes can be recolored
    if (
      canvas?.getActiveObject() &&
      canvas.getActiveObject().fill !== 'transparent'
    ) {
      canvas.getActiveObject().set('fill', color);
      canvas.renderAll();
    }
  };

  /**
   * Activates the mouseDown event if shape exists and shapeIsActive is true
   */
  useEffect(() => {
    if (shape && shapeIsActive) {
      mouseDown(shape, shape.startsWith('filled') ? shapeColor : penColor);
    }

    return () => {
      canvas?.off('mouse:down');
      canvas?.off('mouse:move');
      canvas?.off('mouse:up');
    };
  }, [canvas, shape, shapeIsActive, mouseDown, penColor, shapeColor]);

  /**
   * Add specific color to selected text
   * @param {string} color - color to set
   */
  const textColor = (color: string) => {
    updateFontColor(color);
    if (
      canvas?.getActiveObject() &&
      (canvas.getActiveObject() as TextOptions).text
    ) {
      canvas.getActiveObject().set('fill', color);
      canvas.renderAll();
    }
  };

  /**
   * Clears all whiteboard elements
   * */
  const clearWhiteboard = (): void => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = 'white';
      canvas.renderAll();
    }
    closeModal();
  };

  /**
   * Opens ClearWhiteboardModal
   */
  const openClearWhiteboardModal = () => {
    openModal();
  };

  /**
   * Check if the given object is a free drawing object
   * @param {fabric.Object} object - object to check
   */
  const isFreeDrawing = (object: fabric.Object) => {
    return object.strokeLineCap === 'round';
  };

  /**
   * Check if the given object is a shape
   * @param {fabric.Object} object - object to check
   */
  const isShape = (object: fabric.Object) => {
    return object.fill && !(object as TextOptions).text;
  };

  /**
   * Check if the given object is an empty shape
   * @param {fabric.Object} object - object to check
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isEmptyShape = (object: fabric.Object) => {
    return isShape(object) && object.type === 'shape';
  };

  /**
   * Trigger the changes in the required variables
   * when a certain object is selected
   * @param {IEvent} event - event that contains the selected object
   */
  const manageChanges = (event: IEvent) => {
    // Free Drawing Line Selected
    if (
      (event.target && isFreeDrawing(event.target)) ||
      (event.target && isEmptyShape(event.target))
    ) {
      updatePenColor(event.target.stroke || DEFAULT_VALUES.PEN_COLOR);
      updateLineWidth(event.target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH);
    }

    // Shape Selected
    if (event.target && isShape(event.target)) {
      updateShape(event.target.name || DEFAULT_VALUES.SHAPE);

      if (event.target.type === 'shape') {
        updatePenColor(event.target.stroke || DEFAULT_VALUES.PEN_COLOR);
        updateLineWidth(event.target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH);
      } else if (event.target.fill) {
        updateShapeColor(
          event.target.fill.toString() || DEFAULT_VALUES.SHAPE_COLOR
        );
      }
    }
  };

  /**
   * If lineWidth variable changes and a free line drawing is selected
   * that drawing line width will changes to the selected width on Toolbar
   */
  useEffect(() => {
    if (canvas?.getActiveObjects()) {
      canvas.getActiveObjects().forEach((object) => {
        if (isEmptyShape(object) || isFreeDrawing(object)) {
          object.set('strokeWidth', lineWidth);
        }
      });

      canvas.renderAll();
    }
  }, [lineWidth, canvas, isEmptyShape]);

  /**
   * If an object selection is made it, the changeLineWidth function
   * will be executed to determine if is a free line drawing or not
   * and know if the lineWidth variable must change or not
   */
  canvas?.on({
    'selection:created': manageChanges,
    'selection:updated': manageChanges,
  });

  /**
   * List of available colors in toolbar
   * */
  const colorsList = [
    'black',
    'red',
    'yellow',
    'green',
    'blue',
    'purple',
    'brown',
  ];

  const value = {
    fontFamily,
    fontColor,
    updateFontFamily,
    colorsList,
    fillColor,
    textColor,
    shape,
    shapeColor,
    updateShape,
    addShape,
    text,
    updateText,
    discardActiveObject,
    openClearWhiteboardModal,
    clearWhiteboard,
    pointerEvents,
    eraseObject,
    eraseType,
    updateEraseType,
    textIsActive,
    updateTextIsActive,
    shapeIsActive,
    updateShapeIsActive,
    brushIsActive,
    updateBrushIsActive,
    updateFontColor,
    lineWidth,
    updateLineWidth,
    // Just for control selectors' value they can be modified in the future
    pointer,
    updatePointer,
    penLine,
    updatePenLine,
    penColor,
    updatePenColor,
    floodFill,
    updateFloodFill,
    stamp,
    updateStamp,
    setPointerEvents,
    changeStrokeColor,
  };

  return (
    <WhiteboardContext.Provider value={value}>
      <ClearWhiteboardModal clearWhiteboard={clearWhiteboard} />
      <div className="whiteboard">
        {toolbar}
        <div
          style={{
            border: '1px solid black',
            width: canvasWidth + 'px',
            height: canvasHeight + 'px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: 'white',
          }}
        >
          {children}
          <div
            className="canvas-wrapper"
            style={{
              width: canvasWidth + 'px',
              height: canvasHeight + 'px',
              position: 'absolute',
              pointerEvents: pointerEvents ? 'auto' : 'none',
            }}
            onClick={() => {
              addShape();
            }}
          >
            <canvas id={canvasId} />
          </div>
        </div>
      </div>
    </WhiteboardContext.Provider>
  );
};
