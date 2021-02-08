import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fabric } from 'fabric';
import eraseObjectCursor from '../../../assets/cursors/erase-object.png';
import { WhiteboardContext } from '../WhiteboardContext';
import { isShape } from '../utils/shapes';
import { UNDO, REDO, SET, CanvasAction } from '../reducers/undo-redo';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { IWhiteboardContext } from '../../../interfaces/whiteboard-context/whiteboard-context';
import { PartialErase } from '../partial-erase/partialErase';
import { useSynchronization } from '../canvas-features/useSynchronization';
import store from '../../whiteboard/redux/store';
import { getToolbarIsEnabled } from '../redux/utils';
import { IPermissions } from '../../../interfaces/permissions/permissions';
import { IBrushType } from '../../../interfaces/brushes/brush-type';
import { changeBrushTypeAction } from './feature-actions/changeBrushTypeAction';
import { useShapeSelector, useSpecialShapeSelector } from './shapeActions';
import { useMouseDown, useMouseMove, useMouseUp } from './mouseActions';
import { mouseDownAction } from './mouseHandlers/mouseDown';
import { mouseUpAction } from './mouseHandlers/mouseUp';
import { mouseMoveAction } from './mouseHandlers/mouseMove';
import { useChangeStrokeColor, useTextColor } from './strokeColor';
import { useEraseObject } from './eraseActions';
import {
  useClearWhiteboardOthers,
  useClearWhiteboardSelf,
  useClearWhiteboardClearAll,
} from './clearWhiteboardActions';
import { IShapeInProgress } from '../../../interfaces/canvas-events/shape-in-progress';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';

export const useCanvasActions = (
  canvas: fabric.Canvas,
  dispatch: (action: CanvasAction) => void,
  canvasId: string,
  eventSerializer: any,
  userId: string,
  ignoreDirectActions?: boolean
) => {
  const {
    shapeIsActive,
    updateFontColor,
    shape,
    shapeColor,
    updatePenColor,
    updateShapeColor,
    updateBrushType,
    closeModal,
    penColor,
    lineWidth,
    isLocalObject,
    updateClearIsActive,
    allToolbarIsEnabled,
    perfectShapeIsActive,
    partialEraseIsActive,
    eraseType,
    localImage,
    brushType,
    eraserIsActive,
    updateBackgroundColor,
    setLocalBackground,
    backgroundImage,
    setIsBackgroundImage,
    setBackgroundImageIsPartialErasable,
    setLocalImage,
    localBackground,
  } = useContext(WhiteboardContext) as IWhiteboardContext;

  const { changePenColorSync } = useSynchronization(userId as string);
  /**
   * Adds shape to whiteboard.
   * @param specific Indicates shape type that should be added in whiteboard.
   */
  const shapeSelector = useShapeSelector({
    brushType,
    lineWidth,
    penColor,
    shape,
    shapeColor,
  });

  /**
   * Adds shape with special brush to whiteboard.
   * @param {string} shape - Indicates shape type that should be added in whiteboard.
   * @param {IBrushType} brushType - Indicates brush type that sould be drawed the given shape.
   */
  const specialShapeSelector = useSpecialShapeSelector(userId as string);

  /**
   * Changes backgroundColor property
   * and makes the necessary changes to paint the current whiteboard
   * @param {string} color - Color to paint the background
   */
  const setBackgroundColorInCanvas = useCallback(
    (color: string) => {
      updateBackgroundColor(color);
      setLocalBackground(true);
      setIsBackgroundImage(false);
      setBackgroundImageIsPartialErasable(false);
      setLocalImage('');

      canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));

      // @ts-ignore
      canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
    },
    [
      canvas,
      setBackgroundImageIsPartialErasable,
      setIsBackgroundImage,
      setLocalBackground,
      setLocalImage,
      updateBackgroundColor,
    ]
  );

  /**
   * Add specific color to the whiteboard background
   * @param {string} color - color to set
   */
  const fillBackgroundColor = useCallback(
    async (color: string) => {
      await setBackgroundColorInCanvas(color);

      const payload = {
        id: userId,
        target: color,
      };

      const event = ({
        event: {
          id: userId,
          color,
        },
        type: 'backgroundColorChanged',
      } as unknown) as IUndoRedoEvent;

      dispatch({
        type: SET,
        payload: canvas?.getObjects(),
        canvasId: userId,
        event,
      });

      eventSerializer?.push('backgroundColorChanged', payload);
    },
    [canvas, dispatch, eventSerializer, setBackgroundColorInCanvas, userId]
  );

  /**
   *
   * @param shape Shape that was added to canvas.
   * @param coordsStart Coordinates of initial click on canvas.
   * @param isCircle Indicates if shape added is a circle.
   */
  const mouseMove = useMouseMove();

  /**
   * Mouse up event handlers for cavnas
   */
  const mouseUp = useMouseUp(dispatch);

  /**
   * Clear mouse event handlers for cavnas
   */
  const clearOnMouseEvent = useCallback((): void => {
    canvas?.off('mouse:down');
  }, [canvas]);

  /**
   * Clears all mouse event listeners from canvas.
   */
  const clearMouseEvents = useCallback((): void => {
    canvas?.off('mouse:move');
    canvas?.off('mouse:up');
  }, [canvas]);

  /**
   * Mouse down event listener for canvas.
   * @param shape Shape being added on canvas.
   * @param isCircle Indicates if shape is a circle.
   */
  const mouseDown = useMouseDown(
    canvas,
    shapeSelector,
    clearOnMouseEvent,
    mouseMove,
    mouseUp,
    brushType,
    shapeColor
  );

  /**
   * Used to save the current shape in case of an interruption
   * in its creation, generated by a state change in perfectShapeIsActive
   */
  const [
    shapeInProgress,
    setShapeInProgress,
  ] = useState<IShapeInProgress | null>();

  /**
   * Add specific shape to whiteboard
   * */
  const addShape = useCallback(
    (shapeToAdd: string) => {
      // Required to prevent multiple shapes add at once
      // if user clicked more than one shape during selection.
      if (!shapeIsActive) {
        return;
      }

      // If shape creation was interrupted by a change in perfectShapeIsActive
      if (shapeInProgress) {
        let startPoint = shapeInProgress.startPoint;
        store.dispatch({ type: 'SET_TRUE' });
        store.dispatch({ type: 'SET_START_POINT', payload: startPoint });
      }

      const activeObject = canvas?.getActiveObject();

      if (activeObject && isShape(activeObject)) {
        activeObject.set('evented', true);
      }

      canvas?.on(
        'mouse:down',
        mouseDownAction(
          canvas,
          brushType,
          shapeSelector,
          shapeToAdd,
          specialShapeSelector,
          lineWidth,
          penColor
        )
      );
      canvas?.on(
        'mouse:move',
        mouseMoveAction(
          canvas,
          userId,
          perfectShapeIsActive,
          shapeToAdd,
          brushType,
          setShapeInProgress,
          eventSerializer
        )
      );
      canvas?.on(
        'mouse:up',
        mouseUpAction(
          canvas,
          userId,
          perfectShapeIsActive,
          shapeToAdd,
          brushType,
          lineWidth,
          penColor,
          setShapeInProgress,
          eventSerializer,
          dispatch
        )
      );
    },
    /* If dataInProgress is added on dependencies
    the performance is bad and an unexpected behavior occurs */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      shapeIsActive,
      canvas,
      perfectShapeIsActive,
      shapeSelector,
      userId,
      eventSerializer,
      dispatch,
    ]
  );

  /**
   * Changes the penColor value and if one or more objects are selected
   * also changes the stroke color in free drawing and empty shape objects
   * @param {string} color - new color to change
   */
  const changeStrokeColor = useChangeStrokeColor(
    canvas,
    userId,
    eventSerializer,
    updatePenColor,
    dispatch,
    changePenColorSync
  );

  /**
   * Changes brush type for shapes and
   */
  const changeBrushType = useCallback(
    (type: IBrushType) => {
      changeBrushTypeAction(
        canvas as fabric.Canvas,
        userId as string,
        eventSerializer,
        updateBrushType,
        type,
        dispatch
      );
    },
    [canvas, dispatch, eventSerializer, updateBrushType, userId]
  );

  /**
   * Add specific color to selected shape
   * */
  const fillColor = useCallback(
    (color: string) => {
      updateShapeColor(color);
      clearOnMouseEvent();
      clearMouseEvents();
      mouseDown(shape, color);

      if (
        canvas?.getActiveObject() &&
        canvas.getActiveObject().fill !== 'transparent'
      ) {
        canvas.getActiveObject().set('fill', color);
        canvas.renderAll();

        // TODO: Handle Undo/Redo dispatch.
        dispatch({ type: SET, payload: canvas.getObjects() });
      }
    },
    [
      canvas,
      clearMouseEvents,
      clearOnMouseEvent,
      mouseDown,
      shape,
      updateShapeColor,
      dispatch,
    ]
  );

  /**
   * Add specific color to selected text or group of texts
   * @param {string} color - color to set
   */
  const textColor = useTextColor(
    canvas,
    userId,
    updateFontColor,
    eventSerializer,
    dispatch
  );

  /**
   * Set the given visibility in all the controls in the given object.
   * @param {ICanvasObject} object - Object to set controls visibility.
   * @param {boolean} visibility - Visibility state.
   */
  const setObjectControlsVisibility = useCallback(
    (object: ICanvasObject, visibility: boolean) => {
      object.setControlsVisibility({
        bl: visibility,
        br: visibility,
        mb: visibility,
        ml: visibility,
        mr: visibility,
        mt: visibility,
        tl: visibility,
        tr: visibility,
        mtr: visibility,
      });
    },
    []
  );

  // Flood-fill Feature or maybe could be in CanvasActions.tsx
  /**
   * Reorder the current shapes letting the shapes over their container shape
   */
  const reorderShapes = useCallback(() => {
    let temporal;
    let actualIndex;
    let compareIndex;

    const getObjectIndex = (object: ICanvasObject, canvas: fabric.Canvas) => {
      return canvas.getObjects().indexOf(object);
    };

    canvas?.forEachObject((actual) => {
      canvas.forEachObject((compare) => {
        actualIndex = getObjectIndex(actual, canvas);
        compareIndex = getObjectIndex(compare, canvas);

        if (
          actual.isContainedWithinObject(compare) &&
          actualIndex < compareIndex
        ) {
          temporal = getObjectIndex(actual, canvas);
          actual.moveTo(compareIndex);
          compare.moveTo(temporal);
        }
      });
    });
  }, [canvas]);

  /**
   * Clears background color from current whiteboard
   */
  const clearBackground = useCallback(() => {
    updateBackgroundColor('transparent');
    setLocalBackground(false);

    const payload = {
      id: userId,
      target: 'transparent',
    };

    eventSerializer?.push('backgroundColorChanged', payload);
  }, [eventSerializer, setLocalBackground, updateBackgroundColor, userId]);

  /**
   * Finds in the current canvas an object with the given id and returns it.
   * @param {string} id - Id of the object to find
   */
  const findObjectById = useCallback(
    (id: string) => {
      return canvas
        .getObjects()
        .find((obj: ICanvasObject) => obj.id === id) as ICanvasObject;
    },
    [canvas]
  );

  /**
   * Checks if the given object is a cursor object
   * @param {ICanvasObject} object - Object to check
   */
  const isCursorObject = useCallback((object: ICanvasObject) => {
    return object.id?.split(':')[1] === 'cursor';
  }, []);

  /**
   * Clears all whiteboard elements
   * */
  const clearWhiteboardClearAll = useClearWhiteboardClearAll(
    canvas,
    userId,
    localBackground,
    clearBackground,
    isCursorObject,
    updateClearIsActive,
    eventSerializer,
    dispatch
  );

  /**
   * Clears all whiteboard elements
   * */
  const clearWhiteboardClearMySelf = useClearWhiteboardSelf(
    canvas,
    userId,
    localBackground,
    clearBackground,
    isCursorObject,
    closeModal,
    dispatch,
    isLocalObject,
    allToolbarIsEnabled,
    localImage,
    eventSerializer,
    updateClearIsActive,
    canvasId,
    backgroundImage
  );

  /**
   * Clears all whiteboard with allowClearOthers strategy
   * */
  const clearWhiteboardAllowClearOthers = useClearWhiteboardOthers(
    canvas,
    localBackground,
    clearBackground,
    isCursorObject,
    updateClearIsActive,
    eventSerializer
  );

  /**
   * Set Canvas Whiteboard selection ability
   * @param {boolean} selection - value to set in canvas and objects selection
   */
  const setCanvasSelection = useCallback(
    (selection: boolean) => {
      if (canvas) {
        canvas.selection = selection;
        canvas.renderAll();
      }
    },
    [canvas]
  );

  /**
   * Set the cursor to be showed when a object hover happens
   * @param {string} cursor - Cursor name to show
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setHoverCursorObjects = useCallback(
    (cursor: string): void => {
      if (canvas) {
        canvas.forEachObject((object: fabric.Object) => {
          object.hoverCursor = cursor;
        });

        canvas.renderAll();
      }
    },
    [canvas]
  );

  /**
   * Creates the listeners to erase objects from the whiteboard
   */
  const eraseObject = useEraseObject(canvas, userId, canvasId);

  useEffect(() => {
    if (!canvas || ignoreDirectActions) {
      return;
    }

    const toolbarIsEnabled = getToolbarIsEnabled(userId);
    const serializerToolbarState = store.getState()
      .permissionsState as IPermissions;
    let eraser: any;

    if (
      eraseType === 'partial' &&
      canvas &&
      toolbarIsEnabled &&
      eraserIsActive &&
      (allToolbarIsEnabled || serializerToolbarState.partialErase)
    ) {
      canvas?.discardActiveObject();
      canvas?.renderAll();

      eraser = new PartialErase(
        userId as string,
        canvas as fabric.Canvas,
        lineWidth,
        eraseObjectCursor,
        allToolbarIsEnabled,
        partialEraseIsActive,
        serializerToolbarState.partialErase,
        eventSerializer,
        dispatch
      );
      eraser.init();
    }

    if (
      eraseType === 'object' &&
      canvas &&
      toolbarIsEnabled &&
      (allToolbarIsEnabled || serializerToolbarState.erase)
    ) {
      eraseObject();

      if (canvas.getActiveObjects().length === 1) {
        canvas.discardActiveObject().renderAll();
      }
    }

    return () => {
      if (eraser) {
        eraser.destroy();
      }

      canvas?.off('mouse:up');
      canvas?.off('mouse:over');
      canvas?.off('path:created');
    };
  }, [
    canvas,
    eraserIsActive,
    eraseType,
    partialEraseIsActive,
    allToolbarIsEnabled,
    userId,
    lineWidth,
    eventSerializer,
    dispatch,
    eraseObject,
  ]);

  /**
   * Deselect the actual selected object
   */
  const discardActiveObject = useCallback(() => {
    canvas?.discardActiveObject().renderAll();
  }, [canvas]);

  const undo = useCallback(() => {
    const toolbarIsEnabled = getToolbarIsEnabled();
    const serializerToolbarState = store.getState()
      .permissionsState as IPermissions;
    const teacherHasPermission = allToolbarIsEnabled;
    const studentHasPermission =
      toolbarIsEnabled && serializerToolbarState.undoRedo;

    if (teacherHasPermission || studentHasPermission) {
      dispatch({ type: UNDO, canvasId: canvasId });
    }
  }, [dispatch, canvasId, allToolbarIsEnabled]);

  const redo = useCallback(() => {
    const toolbarIsEnabled = getToolbarIsEnabled();
    const serializerToolbarState = store.getState()
      .permissionsState as IPermissions;
    const teacherHasPermission = allToolbarIsEnabled;
    const studentHasPermission =
      toolbarIsEnabled && serializerToolbarState.undoRedo;

    if (teacherHasPermission || studentHasPermission) {
      dispatch({ type: REDO, canvasId: canvasId });
    }
  }, [dispatch, canvasId, allToolbarIsEnabled]);

  const state = useMemo(() => {
    const actions = {
      fillColor,
      changeStrokeColor,
      changeBrushType,
      textColor,
      clearWhiteboardClearAll,
      discardActiveObject,
      addShape,
      eraseObject,
      reorderShapes,
      setCanvasSelection,
      setHoverCursorObjects,
      setObjectControlsVisibility,
      undo,
      redo,
      clearWhiteboardAllowClearOthers,
      clearWhiteboardClearMySelf,
      fillBackgroundColor,
      setBackgroundColorInCanvas,
      isCursorObject,
      findObjectById,
    };

    return { actions, mouseDown };
  }, [
    fillColor,
    changeStrokeColor,
    changeBrushType,
    textColor,
    clearWhiteboardClearAll,
    discardActiveObject,
    addShape,
    eraseObject,
    reorderShapes,
    setCanvasSelection,
    setHoverCursorObjects,
    setObjectControlsVisibility,
    undo,
    redo,
    clearWhiteboardAllowClearOthers,
    clearWhiteboardClearMySelf,
    fillBackgroundColor,
    setBackgroundColorInCanvas,
    isCursorObject,
    findObjectById,
    mouseDown,
  ]);

  return state;
};
