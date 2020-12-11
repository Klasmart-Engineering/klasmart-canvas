import { ITextOptions } from 'fabric/fabric-impl';
import { useCallback, useContext, KeyboardEvent } from 'react';
import { ICanvasKeyboardEvent } from '../../../interfaces/canvas-events/canvas-keyboard-event';
import { UNDO, REDO, CanvasAction } from '../reducers/undo-redo';
import { WhiteboardContext } from '../WhiteboardContext';

export const useKeyHandlers = (
  canvas: fabric.Canvas,
  instanceId: string,
  undoRedoDispatch: (action: CanvasAction) => void
) => {
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
      if (!undoRedoIsAvailable()) {
        return;
      }

      if (
        ((e as unknown) as KeyboardEvent).keyCode === 90 &&
        (e as any).ctrlKey &&
        !(e as any).shiftKey &&
        activeCanvas.current === instanceId
      ) {
        undoRedoDispatch({ type: UNDO, canvasId: instanceId });
        return;
      }

      if (
        ((e as unknown) as KeyboardEvent).keyCode === 89 &&
        (e as any).ctrlKey &&
        activeCanvas.current === instanceId
      ) {
        undoRedoDispatch({ type: REDO, canvasId: instanceId });
        return;
      }

      if ((e as ICanvasKeyboardEvent).key === 'Backspace' && canvas) {
        const objects = canvas.getActiveObjects();

        objects.forEach((object: fabric.Object) => {
          if (!(object as ITextOptions)?.isEditing) {
            canvas.remove(object);
            canvas.discardActiveObject().renderAll();
          }
        });
        return;
      }

      if ((e as ICanvasKeyboardEvent).key === 'Escape' && canvas) {
        canvas.discardActiveObject();
        canvas.renderAll();
      }

      if (
        (e as ICanvasKeyboardEvent).key === 'Shift' &&
        canvas &&
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
      if (
        (e as ICanvasKeyboardEvent).key === 'Shift' &&
        canvas &&
        perfectShapeIsActive &&
        window.innerWidth > 768
      ) {
        updatePerfectShapeIsActive(false);
      }
    },
    [canvas, perfectShapeIsActive, updatePerfectShapeIsActive]
  );

  // Will be modified once only one board is visible.
  const keyDown = (e: KeyboardEvent<HTMLCanvasElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
    }

    if (e.which === 90 && e.ctrlKey && !e.shiftKey) {
      undoRedoDispatch({ type: UNDO, canvasId: instanceId });
      return;
    }

    if (e.which === 89 && e.ctrlKey) {
      undoRedoDispatch({ type: REDO, canvasId: instanceId });
      return;
    }
  };

  return {
    keyDownHandler: keyDownHandler,
    keyUpHandler: keyUpHandler,
    keyDown: keyDown,
  };
};
