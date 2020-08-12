import React, { createContext, useCallback, useState } from 'react';
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
import { useShapesAreSelectable } from './hooks/useShapesAreSelectable';
import { DEFAULT_VALUES } from '../../config/toolbar-default-values';
import { useLineWidth } from './hooks/useLineWidth';
import { useFloodFill } from './hooks/useFloodFill';
import { useFloodFillIsActive } from './hooks/useFloodFillIsActive';
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
  const { lineWidth, updateLineWidth } = useLineWidth();
  const { floodFill, updateFloodFill } = useFloodFill();
  const { pointerEvents, setPointerEvents } = usePointerEvents();

  const {
    ClearWhiteboardModal,
    openModal,
    closeModal,
  } = useWhiteboardClearModal();

  const { textIsActive, updateTextIsActive } = useTextIsActive();
  const { shapeIsActive, updateShapeIsActive } = useShapeIsActive();
  const { brushIsActive, updateBrushIsActive } = useBrushIsActive();
  const {
    shapesAreSelectable,
    updateShapesAreSelectable,
  } = useShapesAreSelectable();
  const { floodFillIsActive, updateFloodFillIsActive } = useFloodFillIsActive();

  // Provisional (just for change value in Toolbar selectors) they can be modified in the future
  const [pointer, updatePointer] = useState(DEFAULT_VALUES.POINTER);
  const [penLine, updatePenLine] = useState(DEFAULT_VALUES.PEN_LINE);
  const [penColor, updatePenColor] = useState(DEFAULT_VALUES.PEN_COLOR);
  const [stamp, updateStamp] = useState(DEFAULT_VALUES.STAMP);

  // NOTE: Actions provided by canvas instance somewhere in the DOM.
  // The canvas instance will be responsible for registering the actions
  // fulfilling the ICanvasActions interface. Now there can only be one
  // instance registered, but in the future we could add support for
  // multiple instances using the instanceId to choose which one to
  // apply action to.
  const [canvasActions, updateCanvasActions] = useState<ICanvasActions>();

  const isLocalObject = (id: string, canvasId: string) => {
    if (!id) return;

    const object = id.split(':');

    if (!object.length) {
      throw new Error('Invalid ID');
    }

    return object[0] === canvasId;
  };
  const [eventedObjects, updateEventedObjects] = useState('true');

  // Temporary code to get undo / redo working while there are two boards
  // on the view.
  /* const tempKeyDown = (e: any) => {
    if (e.which === 90 && e.ctrlKey && !e.shiftKey) {
      dispatch({ type: UNDO, canvasId });
      return;
    }

    if (e.which === 89 && e.ctrlKey) {
      dispatch({ type: REDO, canvasId });
      return;
    }
  }; */

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

  const undoAction = useCallback(() => {
    canvasActions?.undo();
  }, [canvasActions]);

  const redoAction = useCallback(() => {
    canvasActions?.redo();
  }, [canvasActions]);

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
    shape,
    shapeColor,
    updateShape,
    text,
    updateText,
    openClearWhiteboardModal,
    pointerEvents,
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
    floodFill,
    updateFloodFill,
    floodFillIsActive,
    updateFloodFillIsActive,
    eventedObjects,
    updateEventedObjects,
    // Just for control selectors' value they can be modified in the future
    pointer,
    updatePointer,
    penLine,
    updatePenLine,
    penColor,
    updatePenColor,
    stamp,
    updateStamp,
    setPointerEvents,
    updateShapesAreSelectable,
    closeModal,
    updateShapeColor,
    shapesAreSelectable,
    updateCanvasActions,
    isLocalObject,

    // NOTE: Actions that will get invoked based on registered handler.
    fillColor: fillColorAction,
    textColor: textColorAction,
    addShape: addShapeAction,
    discardActiveObject: discardActiveObjectAction,
    clearWhiteboard: clearWhiteboardAction,
    eraseObject: eraseObjectAction,
    changeStrokeColor: changeStrokeColorAction,
    setCanvasSelection: setCanvasSelectionAction,
    undo: undoAction,
    redo: redoAction,
  };

  return (
    <WhiteboardContext.Provider value={value}>
      <ClearWhiteboardModal clearWhiteboard={clearWhiteboardAction} />
      {children}
    </WhiteboardContext.Provider>
  );
};
