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
import { textHandler } from './text/text';
import { useShapeColor } from './hooks/useShapeColor';
import { useShape } from './hooks/useShape';
import { useWhiteboardClearModal } from './hooks/useWhiteboardClearModal';
import { usePointerEvents } from './hooks/usePointerEvents';
import { useFontColor } from './hooks/useFontColor';
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
  const { pointerEvents, setPointerEvents } = usePointerEvents();
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
    // @ts-ignore
    const canvasInstance = new fabric.Canvas(canvasId, {
      backgroundColor: null,
      width: canvasWidth,
      height: canvasHeight,
    });

    setCanvas(canvasInstance);
  }, [canvasHeight, canvasWidth, canvasId]);

  /**
   * Removes selected element from whiteboard
   * */
  const removeSelectedElement = useCallback(() => {
    canvas.remove(canvas.getActiveObject());
  }, [canvas]);

  /**
   * General handler for keyboard events
   * Currently handle 'Backspace' event for removing selected element from
   * whiteboard
   * */
  const keyDownHandler = useCallback(
    (e: { key: any }) => {
      if (e.key === 'Backspace' && canvas) {
        removeSelectedElement();
        return;
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
        canvas.centerObject(textFabric);
        canvas.add(textFabric);
        updateText('');
      }
    }
  };

  /**
   * Add specific shape to whiteboard
   * */
  const addShape = (specific?: string) => {
    switch (specific || shape) {
      case 'rectangle':
        const rectangle = shapes.rectangle(150, 150, shapeColor);
        canvas.centerObject(rectangle);
        return canvas.add(rectangle);
      case 'triangle':
        const triangle = shapes.triangle(100, 160, shapeColor);
        canvas.centerObject(triangle);
        return canvas.add(triangle);
      case 'circle':
        const circle = shapes.circle(50, shapeColor);
        canvas.centerObject(circle);
        return canvas.add(circle);
    }
  };

  /**
   * Add specific color to selected shape
   * */
  const fillColor = (color: string) => {
    updateShapeColor(color);
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
    setPointerEvents,
    pointerEvents,
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
            style={{
              width: canvasWidth + 'px',
              height: canvasHeight + 'px',
              position: 'absolute',
              pointerEvents: pointerEvents ? 'auto' : 'none',
            }}
          >
            <canvas id={canvasId} />
          </div>
        </div>
      </div>
    </WhiteboardContext.Provider>
  );
};
