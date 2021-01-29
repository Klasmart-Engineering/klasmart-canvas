import React, {
  createContext,
  MutableRefObject,
  useCallback,
  useState,
} from 'react';
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
import ICanvasActions from './canvas-actions/ICanvasActions';
import { IWhiteboardContext } from '../../interfaces/whiteboard-context/whiteboard-context';
import { IClearWhiteboardPermissions } from '../../interfaces/canvas-events/clear-whiteboard-permissions';
import { useClearIsActive } from './hooks/useClearIsActive';
import { usePointerPermissions } from './hooks/usePointerPermissions';
import { useLineWidthIsActive } from './hooks/lineWidthIsActive';
import { useBrushType } from './hooks/useBrushType';
import { canvasImagePopup } from './hooks/canvasImagePopup';
import { usePerfectShapeIsActive } from './hooks/perfectShapeIsActive';
import WhiteboardToggle from '../../components/WhiteboardToogle';
import { usePartialEraseIsActive } from './hooks/usePartialEraseIsActive';
import { useUploadFileModal } from './hooks/useUploadFileModal';
import store from './redux/store';
import { getToolbarIsEnabled } from './redux/utils';
import { IPermissions } from '../../interfaces/permissions/permissions';
import { IBrushType } from '../../interfaces/brushes/brush-type';
import { usePointer } from './hooks/usePointer';
import { useBackgroundColor } from './hooks/useBackgroundColor';
import { ICanvasObject } from '../../interfaces/objects/canvas-object';

export const WhiteboardContext = createContext({} as IWhiteboardContext);

export const WhiteboardProvider = ({
  children,
  clearWhiteboardPermissions,
  allToolbarIsEnabled,
  activeCanvas,
  userId,
}: {
  children: React.ReactNode;
  clearWhiteboardPermissions: IClearWhiteboardPermissions;
  allToolbarIsEnabled: boolean;
  activeCanvas: MutableRefObject<string | null>;
  userId?: string;
}) => {
  const { text, updateText } = useText();
  const { fontColor, updateFontColor } = useFontColor();
  const { fontFamily, updateFontFamily } = useFontFamily();
  const { shapeColor, updateShapeColor } = useShapeColor();
  const { shape, updateShape } = useShape();
  const { eraseType, updateEraseType } = useEraseType();
  const { lineWidth, updateLineWidth } = useLineWidth();
  const { floodFill, updateFloodFill } = useFloodFill();
  const { backgroundColor, updateBackgroundColor } = useBackgroundColor();
  const { pointerEvents, setPointerEvents } = usePointerEvents();
  const { imagePopupIsOpen, updateImagePopupIsOpen } = canvasImagePopup();
  const { pointer, updatePointer } = usePointer();

  const {
    ClearWhiteboardModal,
    openModal,
    closeModal,
  } = useWhiteboardClearModal();

  const { textIsActive, updateTextIsActive } = useTextIsActive();
  const { shapeIsActive, updateShapeIsActive } = useShapeIsActive();
  const { brushIsActive, updateBrushIsActive } = useBrushIsActive();
  const { clearIsActive, updateClearIsActive } = useClearIsActive();
  const {
    partialEraseIsActive,
    updatePartialEraseIsActive,
  } = usePartialEraseIsActive();
  const { lineWidthIsActive, updateLineWidthIsActive } = useLineWidthIsActive();
  const { brushType, updateBrushType } = useBrushType();
  const {
    perfectShapeIsActive,
    updatePerfectShapeIsActive,
  } = usePerfectShapeIsActive();

  const {
    shapesAreSelectable,
    updateShapesAreSelectable,
  } = useShapesAreSelectable();
  const { shapesAreEvented, updateShapesAreEvented } = useShapesAreEvented();
  const { floodFillIsActive, updateFloodFillIsActive } = useFloodFillIsActive();
  const { laserIsActive, updateLaserIsActive } = useLaserIsActive();
  const { pointerIsEnabled, setPointerIsEnabled } = usePointerPermissions();
  const {
    UploadFileModal,
    openUploadFileModal,
    closeUploadFileModal,
  } = useUploadFileModal();

  // Provisional (just for change value in Toolbar selectors) they can be modified in the future
  const [penColor, updatePenColor] = useState(DEFAULT_VALUES.PEN_COLOR);
  const [stamp, updateStamp] = useState(DEFAULT_VALUES.STAMP);
  const [eraserIsActive, updateEraserIsActive] = useState(false);

  // NOTE: Actions provided by canvas instance somewhere in the DOM.
  // The canvas instance will be responsible for registering the actions
  // fulfilling the ICanvasActions interface. Now there can only be one
  // instance registered, but in the future we could add support for
  // multiple instances using the instanceId to choose which one to
  // apply action to.
  const [canvasActions, updateCanvasActions] = useState<ICanvasActions>();
  const [image, setImage] = useState<string | File>('');
  const [isGif, setIsGif] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | File>('');
  const [isBackgroundImage, setIsBackgroundImage] = useState(false);
  const [localImage, setLocalImage] = useState<string | File>('');
  const [localBackground, setLocalBackground] = useState(false);
  const [
    backgroundImageIsPartialErasable,
    setBackgroundImageIsPartialErasable,
  ] = useState(false);

  const isLocalObject = (id: string, canvasId: string | undefined) => {
    const object = id.split(':');

    if (!object.length) {
      throw new Error('Invalid ID');
    }

    return object[0] === canvasId;
  };
  const [eventedObjects, updateEventedObjects] = useState(true);

  /**
   * Opens ClearWhiteboardModal
   */
  const openClearWhiteboardModal = () => {
    if (
      allToolbarIsEnabled ||
      (store.getState().permissionsState as IPermissions).clearWhiteboard
    ) {
      openModal();
    }
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

  const changeBrushTypeAction = useCallback(
    (type: IBrushType) => {
      canvasActions?.changeBrushType(type);
    },
    [canvasActions]
  );

  const textColorAction = useCallback(
    (color: string) => {
      canvasActions?.textColor(color);
    },
    [canvasActions]
  );

  const isCursorObject = useCallback(
    (object: ICanvasObject) => {
      if (!canvasActions) return false;

      return canvasActions.isCursorObject(object);
    },
    [canvasActions]
  );

  const clearWhiteboardActionClearMyself = useCallback(() => {
    const toolbarIsEnabled = getToolbarIsEnabled(userId);

    if (clearWhiteboardPermissions.allowClearMyself && toolbarIsEnabled) {
      canvasActions?.clearWhiteboardClearMySelf();
    }
  }, [canvasActions, clearWhiteboardPermissions.allowClearMyself, userId]);

  const clearWhiteboardAllowClearOthersAction = useCallback(
    (userId) => {
      if (clearWhiteboardPermissions.allowClearOthers) {
        canvasActions?.clearWhiteboardAllowClearOthers(userId);
      }
    },
    [canvasActions, clearWhiteboardPermissions]
  );

  const clearWhiteboardActionClearAll = useCallback(() => {
    if (clearWhiteboardPermissions.allowClearAll) {
      canvasActions?.clearWhiteboardClearAll();
    }
  }, [canvasActions, clearWhiteboardPermissions]);

  const discardActiveObjectAction = useCallback(() => {
    canvasActions?.discardActiveObject();
  }, [canvasActions]);

  const addShapeAction = useCallback(
    (specific: string) => {
      canvasActions?.addShape(specific);
    },
    [canvasActions]
  );

  const fillBackgroundColor = useCallback(
    (color: string) => {
      canvasActions?.fillBackgroundColor(color);
    },
    [canvasActions]
  );

  const setBackgroundColorInCanvas = useCallback(
    (color: string) => {
      canvasActions?.setBackgroundColorInCanvas(color);
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

  const perfectShapeIsAvailable = () => {
    const permissionsState = (store.getState() as unknown) as IPermissions;
    return (
      allToolbarIsEnabled || permissionsState.shape || permissionsState.move
    );
  };

  /**
   * Returns boolean indicating if undo / redo feature is available.
   */
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
    lineWidthIsActive,
    updateLineWidthIsActive,
    perfectShapeIsActive,
    updatePerfectShapeIsActive,
    isLocalObject,
    brushType,
    updateBrushType,
    // NOTE: Actions that will get invoked based on registered handler.
    fillColor: fillColorAction,
    textColor: textColorAction,
    addShape: addShapeAction,
    discardActiveObject: discardActiveObjectAction,
    clearWhiteboard: clearWhiteboardActionClearMyself,
    clearWhiteboardAllowClearOthers: clearWhiteboardAllowClearOthersAction,
    clearWhiteboardClearAll: clearWhiteboardActionClearAll,
    eraseObject: eraseObjectAction,
    changeStrokeColor: changeStrokeColorAction,
    changeBrushType: changeBrushTypeAction,
    setCanvasSelection: setCanvasSelectionAction,
    undo: undoAction,
    redo: redoAction,
    pointerIsEnabled,
    setPointerIsEnabled,
    allToolbarIsEnabled,
    imagePopupIsOpen,
    updateImagePopupIsOpen,
    activeCanvas,
    perfectShapeIsAvailable,
    partialEraseIsActive,
    updatePartialEraseIsActive,
    openUploadFileModal,
    closeUploadFileModal,
    image,
    setImage,
    isGif,
    setIsGif,
    backgroundImage,
    setBackgroundImage,
    backgroundImageIsPartialErasable,
    setBackgroundImageIsPartialErasable,
    isBackgroundImage,
    setIsBackgroundImage,
    localImage,
    setLocalImage,
    eraserIsActive,
    updateEraserIsActive,
    localBackground,
    setLocalBackground,
    backgroundColor,
    updateBackgroundColor,
    fillBackgroundColor,
    setBackgroundColorInCanvas,
    isCursorObject,
  };

  return (
    <WhiteboardContext.Provider value={value}>
      {/*: Should work for student and teacher */}
      <button onClick={() => clearWhiteboardActionClearMyself()}>
        Clear My self
      </button>
      {/*: Should work only for teacher */}
      <button onClick={() => clearWhiteboardActionClearAll()}>Clear All</button>
      {/*: Should work only for teacher */}
      <button onClick={() => clearWhiteboardAllowClearOthersAction('student')}>
        Clear student
      </button>
      {(window.innerWidth <= 768 || window.innerHeight <= 768) &&
      perfectShapeIsAvailable() ? (
        <WhiteboardToggle
          label="Perfect Shape Creation"
          state={perfectShapeIsActive}
          onStateChange={(value: boolean) => {
            if (perfectShapeIsAvailable()) {
              updatePerfectShapeIsActive(value);
            }
          }}
        />
      ) : null}
      <ClearWhiteboardModal
        clearWhiteboard={clearWhiteboardActionClearMyself}
      />

      <UploadFileModal
        setImage={setImage}
        setIsGif={setIsGif}
        setBackgroundImage={setBackgroundImage}
        setBackgroundImageIsPartialErasable={
          setBackgroundImageIsPartialErasable
        }
        isBackgroundImage={isBackgroundImage}
        setIsBackgroundImage={setIsBackgroundImage}
      />
      {children}
    </WhiteboardContext.Provider>
  );
};
