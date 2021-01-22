import { ITextOptions } from 'fabric/fabric-impl';
import { useCallback, useContext } from 'react';
import { ICanvasKeyboardEvent } from '../../../interfaces/canvas-events/canvas-keyboard-event';
import { IPermissions } from '../../../interfaces/permissions/permissions';
import { UNDO, REDO, CanvasAction } from '../reducers/undo-redo';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Handles the logic for keyboard events
 * @param {fabric.Canvas} canvas - Canvas to interact
 * @param {string} instanceId - Id of the current canvas
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher
 * to save the following events to make undo/redo over them
 */
export const useKeyHandlers = (
  canvas: fabric.Canvas,
  instanceId: string,
  undoRedoDispatch: (action: CanvasAction) => void,
  permissions: IPermissions,
  allToolbarIsEnabled: boolean
) => {
  // Getting context variables
  const {
    activeCanvas,
    perfectShapeIsActive,
    updatePerfectShapeIsActive,
    perfectShapeIsAvailable,
  } = useContext(WhiteboardContext);

  /**
   * General handler for keydown keyboard events
   * 'Backspace' event for removing selected element from whiteboard.
   * 'Escape' event for deselect active objects.
   * 'Shift' event for active the perfect shapes creation.
   * */
  const keyDownHandler = useCallback(
    (e: Event) => {
      if (!permissions.undoRedo || !allToolbarIsEnabled) return;

      /**
       * Removes the current active objects in canvas
       */
      const removeSelectedObjects = () => {
        const objects = canvas.getActiveObjects();

        objects.forEach((object: fabric.Object) => {
          if (!(object as ITextOptions)?.isEditing) {
            canvas.remove(object);
            canvas.discardActiveObject().renderAll();
          }
        });
      };

      const event = e as ICanvasKeyboardEvent;

      // UNDO Keyboard Shortcut
      if (
        event.keyCode === 90 &&
        event.ctrlKey &&
        !event.shiftKey &&
        activeCanvas.current === instanceId
      ) {
        undoRedoDispatch({ type: UNDO, canvasId: instanceId });
        return;
      }

      // REDO Keyboard Shortcut
      if (
        event.keyCode === 89 &&
        event.ctrlKey &&
        activeCanvas.current === instanceId
      ) {
        undoRedoDispatch({ type: REDO, canvasId: instanceId });
        return;
      }

      // Erase Object Keyboard Shortcut
      if (event.key === 'Backspace') {
        removeSelectedObjects();
        return;
      }

      // Deselect Active Object Keyboard Shortcut
      if (event.key === 'Escape') {
        canvas.discardActiveObject();
        canvas.renderAll();
      }

      // Active Perfect Shape
      if (
        event.key === 'Shift' &&
        !perfectShapeIsActive &&
        window.innerWidth > 768 &&
        perfectShapeIsAvailable()
      ) {
        updatePerfectShapeIsActive(true);
      }
    },
    [
      canvas,
      undoRedoDispatch,
      activeCanvas,
      instanceId,
      perfectShapeIsActive,
      perfectShapeIsAvailable,
      updatePerfectShapeIsActive,
      permissions.undoRedo,
    ]
  );

  /**
   * General handler for keyup keyboard events
   * 'Shift' event for deactive the perfect shapes creation
   */
  const keyUpHandler = useCallback(
    (e: Event) => {
      const event = e as ICanvasKeyboardEvent;
      // Deactive Perfect Shape
      if (
        event.key === 'Shift' &&
        perfectShapeIsActive &&
        window.innerWidth > 768
      ) {
        updatePerfectShapeIsActive(false);
      }
    },
    [perfectShapeIsActive, updatePerfectShapeIsActive]
  );

  return {
    keyDownHandler,
    keyUpHandler,
  };
};
