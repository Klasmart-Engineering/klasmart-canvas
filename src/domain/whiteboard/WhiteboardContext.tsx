import React, { createContext, useCallback, useState, useReducer } from 'react';
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
import { useShapesAreEvented } from './hooks/useShapesAreEvented';
import { DEFAULT_VALUES } from '../../config/toolbar-default-values';
import { useLineWidth } from './hooks/useLineWidth';
import { useFloodFill } from './hooks/useFloodFill';
import { useFloodFillIsActive } from './hooks/useFloodFillIsActive';
import { useLaserIsActive } from './hooks/useLaserIsActive';
import { useToolbarPermissions } from './hooks/useToolbarPermissions';
import ICanvasActions from './canvas-actions/ICanvasActions';
import { IWhiteboardContext } from '../../interfaces/whiteboard-context/whiteboard-context';
import { IWhiteboardPermissions } from '../../interfaces/canvas-events/whiteboard-permissions';
import { useClearIsActive } from './hooks/useClearIsActive';
import { useMoveCanvasIsActive } from './hooks/useMoveCanvasIsActive';
import { useMouseXY } from './hooks/useMouseXY';

export const WhiteboardContext = createContext({} as IWhiteboardContext);

export const WhiteboardProvider = ({
  children,
  permissions,
}: {
  children: React.ReactNode;
  permissions: IWhiteboardPermissions;
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

  const [ clickThrough, setClickThrough ] = useState<boolean>(false);

  const {
    ClearWhiteboardModal,
    openModal,
    closeModal,
  } = useWhiteboardClearModal();

  const { moveCanvasIsActive, updateMoveCanvasIsActive } =
    useMoveCanvasIsActive();
  const { mouseXY, updateMouseXY } = useMouseXY();
  const { textIsActive, updateTextIsActive } = useTextIsActive();
  const { shapeIsActive, updateShapeIsActive } = useShapeIsActive();
  const { brushIsActive, updateBrushIsActive } = useBrushIsActive();
  const { clearIsActive, updateClearIsActive } = useClearIsActive();
  const {
    shapesAreSelectable,
    updateShapesAreSelectable,
  } = useShapesAreSelectable();
  const { shapesAreEvented, updateShapesAreEvented } = useShapesAreEvented();
  const { floodFillIsActive, updateFloodFillIsActive } = useFloodFillIsActive();
  const { laserIsActive, updateLaserIsActive } = useLaserIsActive();
  const { toolbarIsEnabled, setToolbarIsEnabled } = useToolbarPermissions();

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
  const [canvasActions, updateCanvasActions] = useReducer((state: Map<string, ICanvasActions>, action: { op: "add" | "remove", id: string, value: ICanvasActions}) => {
    if (action.op === "add") {
      state.set(action.id, action.value);
    } else if (action.op === "remove") {
      state.delete(action.id);
    }
    return state;
  }, new Map<string, ICanvasActions>());

  const [eventedObjects, updateEventedObjects] = useState(true);

  // Hard coded until functionality to provide permissions to students is implemented.
  const allowPointer = false;

  // Hard coded until roles fully integrated.
  const universalPermits = (id: string) => {
    return id === 'teacher';
  };

  /**
   * Opens ClearWhiteboardModal
   */
  const openClearWhiteboardModal = () => {
    openModal();
  };

  const fillColorAction = useCallback(
    (color: string) => {
      canvasActions?.forEach(ca => ca.fillColor(color));
    },
    [canvasActions]
  );

  const changeStrokeColorAction = useCallback(
    (color: string) => {
      canvasActions?.forEach(ca => ca.changeStrokeColor(color));
    },
    [canvasActions]
  );

  const textColorAction = useCallback(
    (color: string) => {
      canvasActions?.forEach(ca => ca.textColor(color));
    },
    [canvasActions]
  );

  const clear = useCallback((filterUsers?: string[]) => {
    canvasActions?.forEach(ca => ca.clear(filterUsers));
  }, [canvasActions]);

  const clearSelf = useCallback(() => {
    canvasActions?.forEach(ca => ca.clearSelf());
  }, [canvasActions]);

  const discardActiveObjectAction = useCallback(() => {
    canvasActions?.forEach(ca => ca.discardActiveObject());
  }, [canvasActions]);

  const addShapeAction = useCallback(
    (specific: string) => {
      canvasActions?.forEach(ca => ca.addShape(specific));
    },
    [canvasActions]
  );

  const eraseObjectAction = useCallback(() => {
    canvasActions?.forEach(ca => ca.eraseObject());
  }, [canvasActions]);

  const setCanvasSelectionAction = useCallback(
    (selection: boolean) => {
      canvasActions?.forEach(ca => ca.setCanvasSelection(selection));
    },
    [canvasActions]
  );

  const undoAction = useCallback(() => {
    canvasActions?.forEach(ca => ca.undo());
  }, [canvasActions]);

  const redoAction = useCallback(() => {
    canvasActions?.forEach(ca => ca.redo());
  }, [canvasActions]);

  const value = {
    fontFamily,
    fontColor,
    updateFontFamily,
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
    moveCanvasIsActive,
    updateMoveCanvasIsActive,
    mouseXY,
    updateMouseXY,
    shapeIsActive,
    updateShapeIsActive,
    brushIsActive,
    updateBrushIsActive,
    clearIsActive,
    updateClearIsActive,
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
    updateShapesAreEvented,
    closeModal,
    updateShapeColor,
    shapesAreSelectable,
    shapesAreEvented,
    canvasActions,
    updateCanvasActions,
    laserIsActive,
    updateLaserIsActive,
    permissions,
    clickThrough,
    setClickThrough,

    // NOTE: Actions that will get invoked based on registered handler.
    fillColor: fillColorAction,
    textColor: textColorAction,
    addShape: addShapeAction,
    discardActiveObject: discardActiveObjectAction,
    clear,
    clearSelf,
    eraseObject: eraseObjectAction,
    changeStrokeColor: changeStrokeColorAction,
    setCanvasSelection: setCanvasSelectionAction,
    undo: undoAction,
    redo: redoAction,
    allowPointer,
    universalPermits,
    toolbarIsEnabled,
    setToolbarIsEnabled,
  };

  return (
    <WhiteboardContext.Provider value={value}>
      <ClearWhiteboardModal
        clearWhiteboard={() => { clearSelf(); closeModal(); }}
      />
      {children}
    </WhiteboardContext.Provider>
  );
};
