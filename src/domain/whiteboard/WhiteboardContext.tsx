import React, {
  createContext,
  ReactComponentElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
// @ts-ignore
import FontFaceObserver from 'fontfaceobserver';
import { fabric } from 'fabric';
import * as shapes from './shapes/shapes';
import { useText } from './hooks/useText';
import { useFontFamily } from './hooks/useFontFamily';
import { useFontColor } from './hooks/useFontColor';
import { textHandler } from './text/text';
import { useShapeColor } from './hooks/useShapeColor';
import { useShape } from './hooks/useShape';
import { useWhiteboardClearModal } from './hooks/useWhiteboardClearModal';
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
  const textRef = useRef('');
  const { fontColor, updateFontColor } = useFontColor('#000');
  const { fontFamily, updateFontFamily } = useFontFamily('Arial');
  const { shapeColor, updateShapeColor } = useShapeColor('#000');
  const { shape, updateShape } = useShape('circle');
  const [auto, setAuto] = useState(false);
  const [canvas, setCanvas] = useState();
  const {
    ClearWhiteboardModal,
    openModal,
    closeModal,
  } = useWhiteboardClearModal();

  /**
   * Creates Canvas/Whiteboard instance
   */
  useEffect(() => {
    console.log('canvas Id', canvasId);

    // @ts-ignore
    const canvasInstance = new fabric.Canvas(canvasId, {
      backgroundColor: null,
      width: canvasWidth,
      height: canvasHeight,
    });

    setCanvas(canvasInstance);
  }, [canvasHeight, canvasId, canvasWidth]);

  /**
   * General handler for keyboard events
   * Currently handle 'Backspace' event for removing selected element from
   * whiteboard
   * */
  const keyDownHandler = useCallback(
    (e: { key: any }) => {
      if (canvas && e.key === 'Backspace') {
        removeSelectedElement();
        return;
      }
    },
    [canvas, removeSelectedElement]
  );

  /**
   * Removes selected element from whiteboard
   * */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function removeSelectedElement() {
    canvas.remove(canvas.getActiveObject());
  }

  /**
   * Loads selected font. Default is Arial
   * */
  const fontFamilyLoader = useCallback(
    (font: string) => {
      const myFont = new FontFaceObserver(font);
      myFont
        .load()
        .then(() => {
          if (canvas && canvas.getActiveObject()) {
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
   * Add keyaboard keydown event listener. It listen keyDownHandler function
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
  }, [canvas, text]);

  /**
   * Handles the logic to write text on the whiteboard
   * */
  const writeText = (e: any) => {
    if (e.key === 'Enter') {
      textRef.current = text;

      if (textRef.current.length) {
        const textFabric = textHandler(
          textRef.current,
          fontFamily,
          updateFontFamily
        );

        canvas.setActiveObject(textFabric);
        canvas.getActiveObject().set('fill', fontColor);
        // @ts-ignore
        canvas.centerObject(textFabric);
        canvas.add(textFabric);
        updateText('');
      }
    }
  };

  /**
   * Mouse down event listener for canvas.
   * @param shape Shape being added on canvas.
   * @param isCircle Indicates if shape is a circle.
   */
  const mouseDown = (shape: any, isCircle?: boolean) => {
    canvas.on('mouse:down', (e: any) => {
      shape.set({ top: e.pointer.y, left: e.pointer.x });
      mouseMove(shape, e.pointer, isCircle);
      mouseUp(shape);
      return canvas.add(shape);
    });
  };

  /**
   * 
   * @param shape Shape that was added to canvas.
   * @param coordsStart Coordinates of initial click on canvas.
   * @param isCircle Indicates if shape added is a circle.
   */
  const mouseMove = (shape: any, coordsStart: any, isCircle?: boolean): void => {
    canvas.on('mouse:move', (e: any) => {
      const getLength = (x1: number, x2: number) => Math.abs(x1 - x2);
      const setSize = (start: any, end: any): void => {
        let width = getLength(end.x, start.x);
        let height = getLength(end.y, start.y);
        shape.set({ width, height });
      };

      const setCircleSize = (start: any, end: any): void => {
        let rx = getLength(end.x, start.x) / 2;
        let ry = getLength(end.y, start.y) / 2;
        shape.set({ rx, ry });
      };

      if (!isCircle) {
        setSize(coordsStart, e.pointer);
      } else {
        setCircleSize(coordsStart, e.pointer);
      }

      canvas.renderAll();
    });
  }

  /**
   * Mouse up event listener for canvas.
   */
  const mouseUp = (shape: any): void => {
    canvas.on('mouse:up', (e: any) => {
      clearAllMouseEvents();
      shape.setCoords();
      canvas.renderAll();
    });
  };

  /**
   * Clears all mouse event listeners from canvas.
   */
  const clearAllMouseEvents = (): void => {
    canvas.off('mouse:move');
    canvas.off('mouse:down');
    canvas.off('mouse:up');
  }

  /**
   * Add specific shape to whiteboard
   * */
  const addShape = (specific?: string): void => {
    // Required to prevent multiple shapes add at once
    // if user clicked more than one shape during selection.
    clearAllMouseEvents();
    
    switch (specific || shape) {
      case 'rectangle':
        const rectangle = shapes.rectangle(15, 15, shapeColor);
        mouseDown(rectangle);
        mouseUp(rectangle);
        return;
      case 'triangle':
        const triangle = shapes.triangle(10, 16, shapeColor);
        mouseDown(triangle);
        mouseUp(triangle);
        return;
      case 'circle':
        const circle = shapes.circle(10, 10, shapeColor);
        mouseDown(circle, true);
        mouseUp(circle);
        return;
    }
  };

  /**
   * Add specific color to selected shape
   * */
  const fillColor = (color: string) => {
    updateShapeColor(color);
    if (canvas.getActiveObject() && !canvas.getActiveObject().text) {
      canvas.getActiveObject().set('fill', color);
      // @ts-ignore
      canvas.renderAll();
    }
  };

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
    canvas.backgroundColor = null; //'white';
    canvas.renderAll();
    closeModal();
  };

  const openClearWhiteboardModal = () => {
    openModal();
  };

  /**
   * List of available colors in toolbar
   * */
  const colorsList = [
    '#fff',
    '#e6e6e6',
    '#808080',
    '#000',
    '#f8433f',
    '#5fe119',
    '#347dfa',
    '#44f9f9',
    '#f289fe',
    '#fbe739',
    '#fb823f',
    '#8880fc',
    '#0C7Cfa',
  ];

  const value = {
    fontFamily,
    updateFontFamily,
    colorsList,
    fillColor,
    textColor,
    updateShape,
    addShape,
    removeSelectedElement,
    text,
    updateText,
    writeText,
    discardActiveObject,
    openClearWhiteboardModal,
    clearWhiteboard,
    auto,
    setAuto,
  };

  return (
    <WhiteboardContext.Provider value={value}>
      <ClearWhiteboardModal clearWhiteboard={clearWhiteboard} />
      <div className="whiteboard">
        {toolbar}
        <div
          style={{
            border: '1px solid red',
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
            style={{
              border: '1px solid blue',
              width: canvasWidth + 'px',
              height: canvasHeight + 'px',
              position: 'absolute',
              pointerEvents: auto ? 'auto' : 'none',
            }}
          >
            <canvas
              id={canvasId}
              style={{
                border: '1px solid blue',
              }}
            />
          </div>
        </div>
      </div>
    </WhiteboardContext.Provider>
  );
};
