import { fabric } from 'fabric';
import { useCallback, useContext, useEffect } from 'react';
import { DEFAULT_VALUES } from '../../../config/toolbar-default-values';
import { ICanvasDrawingEvent } from '../../../interfaces/canvas-events/canvas-drawing-event';
import { ICanvasFreeDrawingBrush } from '../../../interfaces/free-drawing/canvas-free-drawing-brush';
import { ChalkBrush } from '../brushes/classes/chalkBrush';
import { MarkerBrush } from '../brushes/classes/markerBrush';
import { PaintBrush } from '../brushes/classes/paintBrush';
import { PenBrush } from '../brushes/classes/penBrush';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Handles logic for Free Hand Drawing Feature
 * @param {fabric.Canvas} canvas - Canvas to draw
 */
export const useFreeHandDrawing = (canvas: fabric.Canvas, userId: string) => {
  // Getting necessary context variables
  const {
    brushIsActive,
    penColor,
    lineWidth,
    brushType,
    allToolbarIsEnabled,
    toolbarIsEnabled,
    serializerToolbarState,
    partialEraseIsActive,
  } = useContext(WhiteboardContext);

  /**
   * Checks current brushType selected
   * to set it like current path style
   */
  const setBrushType = useCallback(() => {
    switch (brushType) {
      case 'pen':
        canvas.freeDrawingBrush = new PenBrush(canvas, userId);
        break;
      case 'marker':
      case 'felt':
        canvas.freeDrawingBrush = new MarkerBrush(canvas, userId, brushType);
        break;
      case 'paintbrush':
        canvas.freeDrawingBrush = new PaintBrush(canvas, userId);
        break;
      case 'chalk':
      case 'crayon':
        canvas.freeDrawingBrush = new ChalkBrush(canvas, userId, brushType);
        break;
      case 'dashed':
        canvas.freeDrawingBrush = new fabric.PencilBrush();
        (canvas.freeDrawingBrush as ICanvasFreeDrawingBrush).strokeDashArray = [
          lineWidth * 2,
        ];
        break;
      default:
        canvas.freeDrawingBrush = new fabric.PencilBrush();
        break;
    }
  }, [brushType, canvas, lineWidth, userId]);

  /**
   * Activates or deactivates drawing mode.
   */
  useEffect(() => {
    /**
     * When a path object is recently created set its stroke like uniform
     * @param {ICanvasDrawingEvent} e - Event that contains
     * the recent created path
     */
    const pathCreated = (e: ICanvasDrawingEvent) => {
      if (e.path) {
        e.path.strokeUniform = true;
        canvas.renderAll();
      }
    };

    /* When free hand drawing option is selected on toolbar,
    freeDrawingBrush is created */
    if (brushIsActive) {
      const canDraw =
        allToolbarIsEnabled || (toolbarIsEnabled && serializerToolbarState.pen);

      setBrushType();

      (canvas.freeDrawingBrush as ICanvasFreeDrawingBrush).canvas = canvas;
      canvas.freeDrawingBrush.color = penColor || DEFAULT_VALUES.PEN_COLOR;
      canvas.freeDrawingBrush.width = lineWidth;
      canvas.freeDrawingCursor = 'crosshair';
      canvas.isDrawingMode = canDraw;

      canvas.on('path:created', pathCreated);
    } else if (canvas && !brushIsActive && !partialEraseIsActive) {
      canvas.isDrawingMode = false;
    }

    return () => {
      canvas?.off('path:created');
    };
  }, [
    allToolbarIsEnabled,
    brushIsActive,
    brushType,
    canvas,
    lineWidth,
    partialEraseIsActive,
    penColor,
    serializerToolbarState.pen,
    setBrushType,
    toolbarIsEnabled,
    userId,
  ]);
};
