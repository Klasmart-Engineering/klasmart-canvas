import { ITextOptions } from 'fabric/fabric-impl';
import { useCallback, useContext, useEffect } from 'react';
import ICanvasActions from '../canvas-actions/ICanvasActions';
import { isFreeDrawing, isEmptyShape, isShape, isText } from '../utils/shapes';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Handles the logic for change Whiteboard states when an object is selected
 * @param {fabric.Canvas} canvas - Canvas in which the objects are selected
 * @param {ICanvasActions} actions - Shared functions that are necessaries
 * to work this logic
 */
export const useObjectSelection = (
  canvas: fabric.Canvas,
  actions: ICanvasActions
) => {
  const {
    shapeIsActive,
    brushIsActive,
    eventedObjects,
    penColor,
    updatePenColor,
    lineWidth,
    updateLineWidth,
    shape,
    updateShape,
    fontFamily,
    updateFontFamily,
    fontColor,
    updateFontColor,
  } = useContext(WhiteboardContext);

  /**
   * Trigger the changes in the required variables
   * when a certain object is selected
   * @param {IEvent} event - event that contains the selected object
   */
  const manageChanges = useCallback(
    (event: fabric.IEvent) => {
      if (!event.target) return;

      const selected = event.target;
      actions.reorderShapes();

      // Shape or Path selected
      if (
        !shapeIsActive &&
        !brushIsActive &&
        eventedObjects &&
        (isFreeDrawing(selected) || isEmptyShape(selected))
      ) {
        // Change pen color
        if (selected.stroke !== penColor) {
          updatePenColor(selected.stroke as string);
        }

        // Change line width
        if (selected.strokeWidth !== lineWidth) {
          updateLineWidth(selected.strokeWidth as number);
        }
      }

      // Shape selected, change shape
      if (
        isShape(selected) &&
        !shapeIsActive &&
        eventedObjects &&
        selected.name !== shape
      ) {
        updateShape(selected.name as string);
      }

      // Text Selected
      if (isText(selected)) {
        const newFont = (selected as ITextOptions).fontFamily;
        const newFontColor = selected.fill;

        // Change font family
        if (newFont !== fontFamily) {
          updateFontFamily(newFont as string);
        }

        // Change text color
        if (newFontColor !== fontColor) {
          updateFontColor(newFontColor as string);
        }
      }
    },
    [
      actions,
      brushIsActive,
      eventedObjects,
      fontColor,
      fontFamily,
      lineWidth,
      penColor,
      shape,
      shapeIsActive,
      updateFontColor,
      updateFontFamily,
      updateLineWidth,
      updatePenColor,
      updateShape,
    ]
  );

  // Set up mangeChanges callback.
  useEffect(() => {
    if (!canvas) return;

    canvas.on('selection:created', manageChanges);
    canvas.on('selection:updated', manageChanges);

    return () => {
      canvas.off('selection:created', manageChanges);
      canvas.off('selection:updated', manageChanges);
    };
  }, [canvas, manageChanges]);
};
