import { ITextOptions } from 'fabric/fabric-impl';
import { useCallback, useContext, useEffect } from 'react';
import { DEFAULT_VALUES } from '../../../config/toolbar-default-values';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import ICanvasActions from '../canvas-actions/ICanvasActions';
import { isFreeDrawing, isEmptyShape, isShape, isText } from '../utils/shapes';
import { WhiteboardContext } from '../WhiteboardContext';

export const useObjectSelection = (
  canvas: fabric.Canvas,
  actions: ICanvasActions
) => {
  const {
    shapeIsActive,
    brushIsActive,
    eventedObjects,
    updatePenColor,
    updateLineWidth,
    updateShape,
    updateShapeColor,
    updateFontFamily,
    updateFontColor,
  } = useContext(WhiteboardContext);

  /**
   * Trigger the changes in the required variables
   * when a certain object is selected
   * @param {IEvent} event - event that contains the selected object
   */
  const manageChanges = useCallback(
    (event: fabric.IEvent) => {
      actions.reorderShapes();

      // Free Drawing Line Selected
      if (
        !shapeIsActive &&
        !brushIsActive &&
        eventedObjects &&
        ((event.target && isFreeDrawing(event.target)) ||
          (event.target && isEmptyShape(event.target)))
      ) {
        updatePenColor(event.target.stroke || DEFAULT_VALUES.PEN_COLOR);
        updateLineWidth(event.target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH);
      }

      // Shape Selected
      if (
        event.target &&
        isShape(event.target) &&
        !shapeIsActive &&
        eventedObjects
      ) {
        updateShape(event.target.name || DEFAULT_VALUES.SHAPE);

        if (
          (event.target as TypedShape).shapeType === 'shape' &&
          !brushIsActive
        ) {
          updatePenColor(event.target.stroke || DEFAULT_VALUES.PEN_COLOR);
          updateLineWidth(
            event.target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH
          );
        } else if (event.target.fill && !brushIsActive) {
          updateShapeColor(
            event.target.fill.toString() || DEFAULT_VALUES.SHAPE_COLOR
          );
        }
      }

      // Text Selected
      if (event.target && isText(event.target)) {
        const newFont = (event.target as ITextOptions).fontFamily;
        const newFontColor = event.target.fill;

        if (newFont && newFontColor) {
          updateFontFamily(newFont);
          updateFontColor(newFontColor.toString());
        }
      }
    },
    [
      actions,
      brushIsActive,
      eventedObjects,
      shapeIsActive,
      updateFontColor,
      updateFontFamily,
      updateLineWidth,
      updatePenColor,
      updateShape,
      updateShapeColor,
    ]
  );

  /** Set up mangeChanges callback. */
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
