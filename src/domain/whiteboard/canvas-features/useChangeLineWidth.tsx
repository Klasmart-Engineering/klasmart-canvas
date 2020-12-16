import { useContext, useEffect } from 'react';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { CanvasAction, SET } from '../reducers/undo-redo';
import { isEmptyShape, isFreeDrawing } from '../utils/shapes';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Handles the logic for change lineWidth in path and shape objects
 * @param {fabric.Canvas} canvas - Canvas in which the objects to modify are.
 * @param {string} userId - User that will modify lineWidth in objects.
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher to
 * save lineWidth changes and could make undo/redo over them
 */
export const useChangeLineWidth = (
  canvas: fabric.Canvas,
  userId: string,
  undoRedoDispatch: (action: CanvasAction) => void
) => {
  const { lineWidth } = useContext(WhiteboardContext);

  /**
   * If lineWidth variable changes and a free line drawing is selected
   * that drawing line width will changes to the selected width on Toolbar
   */
  useEffect(() => {
    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects();

    activeObjects.forEach((object: ICanvasObject) => {
      if (
        lineWidth !== object.strokeWidth &&
        (isEmptyShape(object as TypedShape) || isFreeDrawing(object))
      ) {
        const target = { strokeWidth: lineWidth };
        object.set(target);

        if (activeObjects.length === 1) {
          const type = object.get('type');
          const payload = {
            type,
            target,
            id: object.id,
          };

          const event = { event: payload, type: 'lineWidthChanged' };

          undoRedoDispatch({
            type: SET,
            payload: canvas?.getObjects() as TypedShape[],
            canvasId: userId,
            event: event as IUndoRedoEvent,
          });
        }
      }
    });
    canvas.renderAll();
  }, [lineWidth, canvas, undoRedoDispatch, userId]);
};
