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
  const { fontFamily, updateFontFamily } = useFontFamily();
  const { shapeColor, updateShapeColor } = useShapeColor();
  const { shape, updateShape } = useShape();
  const { closeModal } = useWhiteboardClearModal();
  const [pointerEvents, setPointerEvents] = useState(false);
  const [canvas, setCanvas] = useState();

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
  }, []);

  /**
   * General handler for keyboard events
   * Currently handle 'Backspace' event for removing selected element from
   * whiteboard
   * */
  const keyDownHandler = useCallback((e: { key: any }) => {
    if (e.key === 'Backspace') {
      removeSelectedElement();
      return;
    }
  }, []);

  /**
   * Removes selected element from whiteboard
   * */
  function removeSelectedElement() {
    canvas.remove(canvas.getActiveObject());
  }

  /**
   * Loads selected font. Default is Arial
   * */
  const fontFamilyLoader = useCallback((font: string) => {
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
  }, []);

  /**
   * Add keyaboard keydown event listener. It listen keyDownHandler function
   * Invokes fontFamilyLoader to set default and selected font family
   * */
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler, false);
    fontFamilyLoader(fontFamily);
  }, [fontFamily, keyDownHandler, fontFamilyLoader]);

  const discardActiveObject = () => {
    // @ts-ignore
    canvas.discardActiveObject().renderAll();
  };

  /**
   * If the input field (text) has length will unselect whiteboard active objects
   * */
  useEffect(() => {
    if (text.length) {
      // @ts-ignore
      canvas.discardActiveObject().renderAll();
    }
  }, [text]);

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

        // @ts-ignore
        canvas.setActiveObject(textFabric);
        // @ts-ignore
        canvas.centerObject(textFabric);
        canvas.add(textFabric);
        updateText('');
      }
    }
  };

  /**
   * Add specific shape to whiteboard
   * */
  const addShape = () => {
    switch (shape) {
      case 'rectangle':
        const rectangle = shapes.rectangle(150, 150, shapeColor);
        // @ts-ignore
        canvas.centerObject(rectangle);
        return canvas.add(rectangle);
      case 'triangle':
        const triangle = shapes.triangle(100, 160, shapeColor);
        // @ts-ignore
        canvas.centerObject(triangle);
        return canvas.add(triangle);
      case 'circle':
        const circle = shapes.circle(50, shapeColor);
        // @ts-ignore
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

      // @ts-ignore
      canvas.renderAll();
    }
  };

  /**
   * Clears all whiteboard elements
   * */
  const clearWhiteboard = (): void => {
    canvas.clear();
    // @ts-ignore
    canvas.backgroundColor = 'white';
    canvas.renderAll();
    closeModal();
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
    updateShape,
    addShape,
    removeSelectedElement,
    text,
    updateText,
    writeText,
    discardActiveObject,
    clearWhiteboard,
    pointerEvents,
    setPointerEvents,
  };

  return (
    <WhiteboardContext.Provider value={value}>
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
            pointerEvents: pointerEvents ? 'auto' : 'none',
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
      {toolbar}
    </WhiteboardContext.Provider>
  );
};
