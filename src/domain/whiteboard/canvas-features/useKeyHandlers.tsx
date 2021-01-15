import { fabric } from 'fabric';
import { ITextOptions } from 'fabric/fabric-impl';
import { useCallback, useContext } from 'react';
import { ICanvasKeyboardEvent } from '../../../interfaces/canvas-events/canvas-keyboard-event';
import { IPermissions } from '../../../interfaces/permissions/permissions';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { UNDO, REDO, CanvasAction } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
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
  permissions: IPermissions
) => {
  // Getting context variables
  const {
    activeCanvas,
    perfectShapeIsActive,
    updatePerfectShapeIsActive,
    perfectShapeIsAvailable,
  } = useContext(WhiteboardContext);

  // Event serialization for synchronizing whiteboard state.
  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();

  /**
   * General handler for keydown keyboard events
   * 'Backspace' event for removing selected element from whiteboard.
   * 'Escape' event for deselect active objects.
   * 'Shift' event for active the perfect shapes creation.
   * */
  const keyDownHandler = useCallback(
    (e: Event) => {
      if (!permissions.undoRedo) return;

      /**
       * Removes the current active objects in canvas
       */
      const removeSelectedObjects = () => {
        let active = canvas.getActiveObject();

        canvas.discardActiveObject();

        if (active.type === 'activeSelection') {
          const objectIds: string[] = [];

          (active as fabric.ActiveSelection).forEachObject(
            (object: ICanvasObject) => {
              if (!(object as ITextOptions)?.isEditing) {
                object.groupClear = true;
                objectIds.push(object.id as string);
                canvas.remove(object);
              }
            }
          );

          const target = {
            target: {
              strategy: 'removeGroup',
              objectIds: objectIds,
            },
          };

          eventSerializer?.push('removed', (target as unknown) as ObjectEvent);
        } else {
          if (!(active as ITextOptions)?.isEditing) {
            canvas.remove(active);
          }
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
      activeCanvas,
      instanceId,
      perfectShapeIsActive,
      perfectShapeIsAvailable,
      canvas,
      eventSerializer,
      undoRedoDispatch,
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
