import { useContext, useEffect } from 'react';
import { isEmptyShape, isFreeDrawing } from '../utils/shapes';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Handles the logic for change lineWidth in path and shape objects
 * @param {fabric.Canvas} canvas - Canvas in which the objects to modify are.
 */
export const useChangeLineWidth = (canvas: fabric.Canvas) => {
  const { lineWidth } = useContext(WhiteboardContext);

  /**
   * If lineWidth variable changes and a free line drawing is selected
   * that drawing line width will changes to the selected width on Toolbar
   */
  useEffect(() => {
    if (!canvas) return;

    canvas.getActiveObjects().forEach((object) => {
      if (isEmptyShape(object) || isFreeDrawing(object)) {
        object.set({ strokeWidth: lineWidth });
      }
    });

    canvas.renderAll();
  }, [lineWidth, canvas]);
};
