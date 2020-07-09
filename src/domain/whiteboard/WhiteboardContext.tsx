import React, {
  createContext,
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
import ReactPlayer from 'react-player';

// @ts-ignore
export const WhiteboardContext = createContext();

// let canvas: {
//   add: (arg0: any) => void;
//   remove: (arg0: any) => void;
//   getActiveObject: () => any;
//   getObjects: () => any;
//   backgroundColor: 'red';
//   requestRenderAll(): void;
//   discardActiveObject(): void;
//   clear(): void;
//   renderAll(): void;
// };

export const WhiteboardProvider = ({
  children,
  canvasId,
}: {
  children: React.ReactNode;
  canvasId: string;
}) => {
  const { text, updateText } = useText();
  const textRef = useRef('');
  const { fontFamily, updateFontFamily } = useFontFamily();
  const { shapeColor, updateShapeColor } = useShapeColor();
  const { shape, updateShape } = useShape();
  const { closeModal } = useWhiteboardClearModal();
  const [auto, setAuto] = useState(false);

  const [canvas, setCanvas] = useState();

  /**
   * Creates Canvas/Whiteboard instance
   */
  useEffect(() => {
    console.log('canvas Id', canvasId);

    // @ts-ignore
    const canvasInstance = new fabric.Canvas(canvasId, {
      backgroundColor: null, //'white',
      width: '640', //'600',
      height: '360', //'350',
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
    canvas.discardActiveObject().renderAll();
  };

  /**
   * If the input field (text) has length will unselect whiteboard active objects
   * */
  useEffect(() => {
    if (text.length) {
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

        canvas.setActiveObject(textFabric);
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
   * Clears all whiteboard elements
   * */
  const clearWhiteboard = (): void => {
    canvas.clear();
    canvas.backgroundColor = null; //'white';
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
  };

  return (
    <WhiteboardContext.Provider value={value}>
      <div
        style={{
          border: '1px solid red',
          width: '640px',
          height: '360px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: 'green',
        }}
      >
        {/*<ReactPlayer*/}
        {/*  url="https://www.youtube.com/watch?v=XhpGp9d9jSA"*/}
        {/*  controls*/}
        {/*/>*/}

        {children}
        <div
          style={{
            border: '1px solid blue',
            width: '640px',
            height: '360px',
            // display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center',
            position: 'absolute',
            // backgroundColor: 'blue',
            pointerEvents: auto ? 'auto' : 'none',
          }}
        >
          <canvas
            id={canvasId}
            style={{
              // border: '1px solid',
              // position: 'absolute',
              // width: '600px',
              // height: '350px',
              border: '1px solid blue',
              // width: '400px',
              // height: '250px',
              // display: 'flex',
              // alignItems: 'center',
              // justifyContent: 'center',
              // position: 'absolute',
              // backgroundColor: 'blue',
              //pointerEvents: 'auto',
            }}
          />
        </div>
      </div>
    </WhiteboardContext.Provider>
  );
};
