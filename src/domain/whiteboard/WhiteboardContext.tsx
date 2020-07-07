import React, { createContext, useCallback, useEffect, useRef } from 'react';
// @ts-ignore
import FontFaceObserver from 'fontfaceobserver';
import * as shapes from './Shapes/Shapes';
import { useText } from './hooks/useText';
import { useFontFamily } from './hooks/useFontFamily';
import { textHandler } from './text/text';
import { useShapeColor } from './hooks/useShapeColor';
import { useShape } from './hooks/useShape';

// @ts-ignore
export const WhiteboardContext = createContext();

let canvas: {
  add: (arg0: any) => void;
  remove: (arg0: any) => void;
  getActiveObject: () => any;
  getObjects: () => any;
  backgroundColor: 'red';
  requestRenderAll(): void;
  discardActiveObject(): void;
  clear(): void;
  renderAll(): void;
};

export const WhiteboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { text, updateText } = useText();
  const textRef = useRef('');
  const { fontFamily, updateFontFamily } = useFontFamily();
  const { shapeColor, updateShapeColor } = useShapeColor();
  const { shape, updateShape } = useShape();

  /**
   * Creates Canvas/Whiteboard instance
   */
  useEffect(() => {
    // @ts-ignore
    canvas = new fabric.Canvas('canvas', {
      backgroundColor: 'white',
      width: '600',
      height: '350',
    });
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

  const value = {
    text,
    updateText,
    removeSelectedElement,
  };

  return (
    <WhiteboardContext.Provider value={value}>
      {children}
    </WhiteboardContext.Provider>
  );
};
