import { ITextOptions } from 'fabric/fabric-impl';
import { useCallback, useContext, useEffect } from 'react';
import { IBrushType } from '../../../interfaces/brushes/brush-type';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import ICanvasActions from '../canvas-actions/ICanvasActions';
import {
  isFreeDrawing,
  isEmptyShape,
  isShape,
  isText,
  isSpecialFreeDrawing,
} from '../utils/shapes';
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
  // Getting the necessary context variables
  const {
    shapeIsActive,
    brushIsActive,
    eventedObjects,
    penColor,
    updatePenColor,
    lineWidth,
    updateLineWidth,
    brushType,
    updateBrushType,
    shape,
    updateShape,
    fontFamily,
    updateFontFamily,
    fontColor,
    updateFontColor,
  } = useContext(WhiteboardContext);

  /**
   * Gets stroke, strokeWidth and brushType properties
   * from path and custom path objects
   * @param {ICanvasBrush} object - Object to get its properties
   */
  const getBrushObjectProperties = useCallback((object: ICanvasBrush) => {
    if (isFreeDrawing(object) || isEmptyShape(object as TypedShape)) {
      return {
        objectStroke: String(object.stroke),
        objectStrokeWidth: Number(object.strokeWidth),
        objectBrushType: object.strokeDashArray?.length ? 'dashed' : 'pencil',
      };
    }

    return {
      objectStroke: String(object.basePath?.stroke),
      objectStrokeWidth: Number(object.basePath?.strokeWidth),
      objectBrushType: String(object.basePath?.type),
    };
  }, []);

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
        (isFreeDrawing(selected) ||
          isEmptyShape(selected) ||
          isSpecialFreeDrawing(selected))
      ) {
        const {
          objectStroke,
          objectStrokeWidth,
          objectBrushType,
        } = getBrushObjectProperties(selected as ICanvasBrush);

        // Change pen color
        if (objectStroke !== penColor) {
          updatePenColor(objectStroke);
        }

        // Change line width
        if (objectStrokeWidth !== lineWidth) {
          updateLineWidth(objectStrokeWidth);
        }

        // Change brush type
        if (objectBrushType !== brushType) {
          updateBrushType(objectBrushType as IBrushType);
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
      brushType,
      eventedObjects,
      fontColor,
      fontFamily,
      getBrushObjectProperties,
      lineWidth,
      penColor,
      shape,
      shapeIsActive,
      updateBrushType,
      updateFontColor,
      updateFontFamily,
      updateLineWidth,
      updatePenColor,
      updateShape,
    ]
  );

  // Set up manageChanges callback.
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
