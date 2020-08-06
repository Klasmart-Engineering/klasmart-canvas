import React, { createContext, useCallback, useState } from 'react';
// @ts-ignore

import { useText } from './hooks/useText';
import { useFontFamily } from './hooks/useFontFamily';
import { useShapeColor } from './hooks/useShapeColor';
import { useShape } from './hooks/useShape';
import { useWhiteboardClearModal } from './hooks/useWhiteboardClearModal';
import { usePointerEvents } from './hooks/usePointerEvents';
import { useFontColor } from './hooks/useFontColor';
import { useTextIsActive } from './hooks/useTextIsActive';
import { useShapeIsActive } from './hooks/useShapeIsActive';
import { useBrushIsActive } from './hooks/useBrushIsActive';
import { useEraseType } from './hooks/useEraseType';
import { DEFAULT_VALUES } from '../../config/toolbar-default-values';
import ICanvasActions from './canvas-actions/ICanvasActions';

// @ts-ignore
export const WhiteboardContext = createContext<any>();

export const WhiteboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { text, updateText } = useText();
  const { fontColor, updateFontColor } = useFontColor();
  const { fontFamily, updateFontFamily } = useFontFamily();
  const { shapeColor, updateShapeColor } = useShapeColor();
  const { shape, updateShape } = useShape();
  const { eraseType, updateEraseType } = useEraseType();
  const { pointerEvents, setPointerEvents } = usePointerEvents(false);

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
  const [thickness, updateThickness] = useState(DEFAULT_VALUES.THICKNESS);
  const [floodFill, updateFloodFill] = useState(DEFAULT_VALUES.FLOOD_FILL);
  const [stamp, updateStamp] = useState(DEFAULT_VALUES.STAMP);

  // NOTE: Actions provided by canvas instance somewhere in the DOM.
  // The canvas instance will be responsible for registering the actions
  // fulfilling the ICanvasActions interface. Now there can only be one
  // instance registered, but in the future we could add support for
  // multiple instances using the instanceId to choose which one to
  // apply action to.
  const [canvasActions, updateCanvasActions] = useState<ICanvasActions>();

  const isLocalObject = (id: string, canvasId: string) => {
    const object = id.split(':');

    if (!object.length) {
      throw new Error('Invalid ID');
    }

    return object[0] === canvasId;
  };

  /**
   * Opens ClearWhiteboardModal
   */
  const openClearWhiteboardModal = () => {
    openModal();
  };

  const fillColorAction = useCallback(
    (color: string) => {
      canvasActions?.fillColor(color);
    },
    [canvasActions]
  );

  const changeStrokeColorAction = useCallback(
    (color: string) => {
      canvasActions?.changeStrokeColor(color);
    },
    [canvasActions]
  );

  const textColorAction = useCallback(
    (color: string) => {
      canvasActions?.textColor(color);
    },
    [canvasActions]
  );

  const clearWhiteboardAction = useCallback(() => {
    canvasActions?.clearWhiteboard();
  }, [canvasActions]);

  const discardActiveObjectAction = useCallback(() => {
    canvasActions?.discardActiveObject();
  }, [canvasActions]);

  const addShapeAction = useCallback(
    (specific?: string) => {
      canvasActions?.addShape(specific);
    },
    [canvasActions]
  );

  const eraseObjectAction = useCallback(() => {
    canvasActions?.eraseObject();
  }, [canvasActions]);

  const setCanvasSelectionAction = useCallback(
    (selection: boolean) => {
      canvasActions?.setCanvasSelection(selection);
    },
    [canvasActions]
  );

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
    fillColor: fillColorAction,
    textColor: textColorAction,
    shape,
    shapeColor,
    updateShape,
    addShape: addShapeAction,
    text,
    updateText,
    discardActiveObject: discardActiveObjectAction,
    openClearWhiteboardModal,
    clearWhiteboard: clearWhiteboardAction,
    pointerEvents,
    eraseObject: eraseObjectAction,
    eraseType,
    updateEraseType,
    textIsActive,
    updateTextIsActive,
    shapeIsActive,
    updateShapeIsActive,
    brushIsActive,
    updateBrushIsActive,
    updateFontColor,
    // Just for control selectors' value they can be modified in the future
    pointer,
    updatePointer,
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
    setPointerEvents,
    changeStrokeColor: changeStrokeColorAction,
    isLocalObject,
    updateShapeColor,
    closeModal,
    updateCanvasActions,
    setCanvasSelection: setCanvasSelectionAction,
  };

  return (
    <WhiteboardContext.Provider value={value}>
      <ClearWhiteboardModal clearWhiteboard={clearWhiteboardAction} />
      {children}
    </WhiteboardContext.Provider>
  );
};
