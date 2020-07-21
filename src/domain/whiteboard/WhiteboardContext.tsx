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
import { useStyles } from './hooks/useStyles';
import { useWhiteboardClearModal } from './hooks/useWhiteboardClearModal';
import { setSize, setCircleSize, setPathSize } from './utils/scaling';
import { usePointerEvents } from './hooks/usePointerEvents';
import { useFontColor } from './hooks/useFontColor';
import { useTextIsActive } from './hooks/useTextIsActive';
import './whiteboard.css';

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
  const { pointerEvents, setPointerEvents } = usePointerEvents();
  const [canvas, setCanvas] = useState();
  const {
    ClearWhiteboardModal,
    openModal,
    closeModal,
  } = useWhiteboardClearModal();
  const { styles, updateStyles } = useStyles({
    border: '1px solid blue',
    width: canvasWidth + 'px',
    height: canvasHeight + 'px',
    position: 'absolute',
    pointerEvents: pointerEvents ? 'auto' : 'none',
  });

  const { textIsActive, updateTextIsActive } = useTextIsActive();

  // Provisional (just for change value in Toolbar selectors) they can be modified in the future
  const [pointer, updatePointer] = useState('arrow');
  const [eraseType, updateEraseType] = useState('object');
  const [penLine, updatePenLine] = useState('pen');
  const [penColor, updatePenColor] = useState('#000');
  const [thickness, updateThickness] = useState('8px');
  const [floodFill, updateFloodFill] = useState('#000');
  const [stamp, updateStamp] = useState('yellowStar');

  /**
   * Creates Canvas/Whiteboard instance
   */
  useEffect(() => {
    // @ts-ignore
    const canvasInstance = new fabric.Canvas(canvasId, {
      backgroundColor: null,
      width: canvasWidth,
      height: canvasHeight,
    });

    setCanvas(canvasInstance);
  }, [canvasHeight, canvasWidth, canvasId]);

  /**
   * Handles the logic to write text on the whiteboard
   * */
  useEffect(() => {
    if (textIsActive) {
      canvas?.on('mouse:down', (options: { target: null; e: any }) => {
        if (options.target === null) {
          const text = new fabric.IText(' ', {
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
            if (text?.text?.replace(/\s/g, '').length === 0) {
              canvas.remove(canvas.getActiveObject());
            }
          });

          text.on('selected', () => {
            if (text.fontFamily) {
              //@ts-ignore
              updateFontColor(text.fill);
              updateFontFamily(text.fontFamily);
            }
          });
        }
      });
    } else {
      if (canvas?.getActiveObject()) {
        canvas?.discardActiveObject();
        canvas?.renderAll();
      }

      canvas?.on({
        'selection:updated': (object: any) => {
          if (object.selected[0]) {
            canvas?.setActiveObject(object.selected[0]);
            canvas?.renderAll();
          }
        },
        'selection:created': (object: any) => {
          if (object.selected[0]) {
            canvas?.setActiveObject(object.selected[0]);
            canvas?.renderAll();
          }
        },
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
   * When pointerEvents is false deselects any selected object
   */
  useEffect(() => {
    if (!pointerEvents && canvas) {
      canvas.discardActiveObject().renderAll();
    }
  }, [canvas, pointerEvents]);

  /**
   * Removes selected element from whiteboard
   * */
  const removeSelectedElement = useCallback(() => {
    canvas.remove(canvas.getActiveObject());
  }, [canvas]);

  /**
   * General handler for keyboard events
   * 'Backspace' event for removing selected element from whiteboard
   * 'Escape' event for deselect active objects
   * */
  const keyDownHandler = useCallback(
    (e: { key: any }) => {
      if (e.key === 'Backspace' && canvas) {
        const obj = canvas.getActiveObject();
        if (!obj?.isEditing) {
          removeSelectedElement();
        }
        return;
      }

      if (e.key === 'Escape' && canvas) {
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    },
    [canvas, removeSelectedElement]
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
          if (canvas.getActiveObject()) {
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

  const discardActiveObject = () => {
    canvas.discardActiveObject().renderAll();
  };

  /**
   * If the input field (text) has length will unselect whiteboard active objects
   * */
  useEffect(() => {
    if (text.length) {
      canvas.discardActiveObject().renderAll();
    }
  }, [text, canvas]);

  /**
   * Adds shape to whiteboard.
   * @param specific Indicates shape type that should be added in whiteboard.
   */
  const shapeSelector = (specific: string): fabric.Rect | fabric.Triangle | fabric.Ellipse => {
    switch (specific || shape) {
      case 'rectangle':
        return shapes.rectangle(10, 10, shapeColor);
      case 'triangle':
        return shapes.triangle(10, 16, shapeColor);
      case 'star':
        return shapes.star(10, 10, shapeColor);
      case 'rightArrow':
        return shapes.arrow(10, 10, shapeColor);
      case 'chatBubble':
        return shapes.chat(10, 10, shapeColor);
      case 'pentagon':
        return shapes.pentagon(shapeColor);
      case 'hexagon':
          return shapes.hexagon(shapeColor);
      default:
        return shapes.circle(10, 10, shapeColor);
    }
  }

  /**
   * Mouse down event listener for canvas.
   * @param shape Shape being added on canvas.
   * @param isCircle Indicates if shape is a circle.
   */
  const mouseDown = (specific: string, color?: string): void => {

    canvas.on('mouse:down', (e: any): void => {
      if (e.target) {
        return;
      }

      const shape = shapeSelector(specific)
      shape.set({ top: e.pointer.y, left: e.pointer.x, fill: color || shapeColor });
      clearOnMouseEvent();
      mouseMove(shape, e.pointer, specific);
      mouseUp(shape, specific);
      canvas.add(shape);
    });
  };

  /**
   * 
   * @param shape Shape that was added to canvas.
   * @param coordsStart Coordinates of initial click on canvas.
   * @param isCircle Indicates if shape added is a circle.
   */
  const mouseMove = (
    shape: fabric.Object | fabric.Rect | fabric.Ellipse,
    coordsStart: any,
    specific?: string
  ): void => {
    canvas.on('mouse:move', (e: any): void => {
      let size;

      if (specific === 'circle') {
        size = setCircleSize(shape as fabric.Ellipse, coordsStart, e.pointer);
      } else if (specific === 'rectangle' || specific === 'triangle') {
        size = setSize(shape, coordsStart, e.pointer);
      } else {
        size = setPathSize(shape, coordsStart, e.pointer);
      }

      let anchor = { ...coordsStart, originX: 'left', originY: 'top' };

      if (coordsStart.x > e.pointer.x) {
        anchor = { ...anchor, originX: 'right' };
      }

      if (coordsStart.y > e.pointer.y) {
        anchor = { ...anchor, originY: 'bottom' };
      }

      shape.set(anchor)
      canvas.renderAll();
    });
  }

  /**
   * Mouse up event listener for canvas.
   */
  const mouseUp = (shape: any, specific: string): void => {
    canvas.on('mouse:up', (e: any): void => {
      shape.setCoords();
      canvas.renderAll();
      clearOnMouseEvent();
      clearMouseEvents();
    });
  };

  /**
   * Clears all mouse event listeners from canvas.
   */
  const clearMouseEvents = (): void => {
    canvas.off('mouse:move');
    canvas.off('mouse:up');
  }

  const clearOnMouseEvent = (): void => {
    canvas.off('mouse:down');
  }

  /**
   * Add specific shape to whiteboard
   * */
  const addShape = (specific?: string): void => {
    // Required to prevent multiple shapes add at once
    // if user clicked more than one shape during selection.
    clearOnMouseEvent();
    clearMouseEvents();
    mouseDown(specific || shape, shapeColor);
  };

  /**
   * Add specific color to selected shape
   * */
  const fillColor = (color: string) => {
    updateShapeColor(color);
    clearOnMouseEvent();
    clearMouseEvents();
    mouseDown(shape, color);

    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set('fill', color);
      canvas.renderAll();
    }
  };

  /**
   * Add specific color to selected text
   * @param {string} color - color to set
   */
  const textColor = (color: string) => {
    updateFontColor(color);
    if (canvas.getActiveObject() && canvas.getActiveObject().text) {
      canvas.getActiveObject().set('fill', color);
      // @ts-ignore
      canvas.renderAll();
    }
  };

  /**
   * Clears all whiteboard elements
   * */
  const clearWhiteboard = (): void => {
    canvas.clear();
    canvas.backgroundColor = 'white';
    canvas.renderAll();
    closeModal();
  };

  /**
   * Opens ClearWhiteboardModal
   */
  const openClearWhiteboardModal = () => {
    openModal();
  };

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
    removeSelectedElement,
    text,
    updateText,
    discardActiveObject,
    openClearWhiteboardModal,
    clearWhiteboard,
    styles,
    updateStyles,
    pointerEvents,
    textIsActive,
    updateTextIsActive,
    updateFontColor,
    // Just for control selectors' value they can be modified in the future
    pointer,
    updatePointer,
    eraseType,
    updateEraseType,
    penLine,
    updatePenLine,
    penColor,
    updatePenColor,
    thickness,
    updateThickness,
    floodFill,
    updateFloodFill,
    stamp,
    updateStamp,
    setPointerEvents
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
            style={styles}
            onClick={() => {addShape()}}
          >
            <canvas id={canvasId} />
          </div>
        </div>
      </div>
    </WhiteboardContext.Provider>
  );
};
