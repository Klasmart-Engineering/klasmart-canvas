import { fabric } from 'fabric';
import { ITextOptions } from 'fabric/fabric-impl';
import { useCallback, useContext } from 'react';
import { ICanvasKeyboardEvent } from '../../../interfaces/canvas-events/canvas-keyboard-event';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
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
  undoRedoDispatch: (action: CanvasAction) => void
) => {
  // Getting context variables
  const {
    undoRedoIsAvailable,
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
      if (!undoRedoIsAvailable()) return;

      /**
       * Removes the current active objects in canvas
       */
      const removeSelectedObjects = () => {
        let active = canvas.getActiveObject();
        let objectToDelete: fabric.Object;

        canvas.discardActiveObject();

        if (active.type === 'activeSelection') {
          const objects = (active as fabric.ActiveSelection)._objects;

          (active as fabric.ActiveSelection).forEachObject(
            (object: ICanvasObject) => {
              if (!(object as ITextOptions)?.isEditing) {
                object.inGroup = true;
                canvas.remove(object);
              }
            }
          );

          objectToDelete = new fabric.Group(objects);
          (objectToDelete as ICanvasObject).id = 'teacher:group';

          canvas.add(objectToDelete);
          canvas.setActiveObject(objectToDelete);
        } else {
          objectToDelete = active;
        }

        if (!(objectToDelete as ITextOptions)?.isEditing) {
          canvas.remove(objectToDelete);
        }
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
      undoRedoIsAvailable,
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
