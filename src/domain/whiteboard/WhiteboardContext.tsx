import React, { createContext, useCallback, useEffect, useRef } from 'react';
// @ts-ignore
import FontFaceObserver from 'fontfaceobserver';
import * as shapes from './shapes/shapes';
import { useText } from './hooks/useText';
import { useFontFamily } from './hooks/useFontFamily';
import { useFontColor } from './hooks/useFontColor';
import { textHandler } from './text/text';
import { useShapeColor } from './hooks/useShapeColor';
import { useShape } from './hooks/useShape';
import { useWhiteboardClearModal } from './hooks/useWhiteboardClearModal';

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
  const { fontColor, updateFontColor } = useFontColor('#000');
  const { fontFamily, updateFontFamily } = useFontFamily('Arial');
  const { shapeColor, updateShapeColor } = useShapeColor('#000');
  const { shape, updateShape } = useShape('circle');
  const { closeModal } = useWhiteboardClearModal();

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
        canvas.getActiveObject().set('fill', fontColor);
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
  const addShape = (specific?: string) => {
    switch (specific || shape) {
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
    // @ts-ignore
    canvas.backgroundColor = 'white';
    canvas.renderAll();
    closeModal();
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
    clearWhiteboard,
  };

  return (
    <WhiteboardContext.Provider value={value}>
      {children}
    </WhiteboardContext.Provider>
  );
};
