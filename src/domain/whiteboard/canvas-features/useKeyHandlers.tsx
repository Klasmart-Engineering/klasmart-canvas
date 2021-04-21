import { fabric } from 'fabric';
import { ITextOptions } from 'fabric/fabric-impl';
import { useCallback, useContext } from 'react';
import { ICanvasKeyboardEvent } from '../../../interfaces/canvas-events/canvas-keyboard-event';
import { IPermissions } from '../../../interfaces/permissions/permissions';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Handles the logic for keyboard events
 * @param {fabric.Canvas} canvas - Canvas to interact
 * @param {string} instanceId - Id of the current canvas
 */
export const useKeyHandlers = (
  canvas: fabric.Canvas,
  instanceId: string,
  permissions: IPermissions,
  allToolbarIsEnabled: boolean,
) => {
  // Getting context variables
  const {
    activeCanvas,
    perfectShapeIsActive,
    updatePerfectShapeIsActive,
    perfectShapeIsAvailable,
    redo,
    undo,
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
      if (instanceId !== activeCanvas.current) return;

      if (!(permissions.undoRedo || allToolbarIsEnabled)) return;

      /**
       * Removes the current active objects in canvas
       */
      const removeSelectedObjects = () => {
        let active = canvas.getActiveObject();

        if ((active as fabric.IText)?.isEditing) return;

        canvas.discardActiveObject();

        if (active?.type === 'activeSelection') {
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

      /**
       * Checks if client's OS is MacOS or not
       */
      const isMacOS = () => {
        return navigator.appVersion.indexOf('Mac') !== -1;
      };

      /**
       * Checks if an Undo Shortcut is executed
       */
      const isUndoShortcut = () => {
        return (
          (event.ctrlKey || (isMacOS() && event.metaKey)) &&
          event.keyCode === 90 &&
          !event.shiftKey &&
          activeCanvas.current === instanceId
        );
      };

      /**
       * Checks if a Redo Shortcut is executed
       */
      const isRedoShortcut = () => {
        return (
          ((event.keyCode === 89 && event.ctrlKey) ||
            (isMacOS() &&
              event.metaKey &&
              event.shiftKey &&
              event.keyCode === 90)) &&
          activeCanvas.current === instanceId
        );
      };

      const event = e as ICanvasKeyboardEvent;

      // UNDO Keyboard Shortcut
      if (isUndoShortcut() && (permissions.undoRedo || allToolbarIsEnabled)) {
        undo();
        return;
      }

      // REDO Keyboard Shortcut
      if (isRedoShortcut() && (permissions.undoRedo || allToolbarIsEnabled)) {
        redo();
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
      allToolbarIsEnabled,
      canvas,
      eventSerializer,
      instanceId,
      perfectShapeIsActive,
      perfectShapeIsAvailable,
      permissions.undoRedo,
      redo,
      undo,
      updatePerfectShapeIsActive,
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
        console.log('key up');
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
