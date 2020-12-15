import { fabric } from 'fabric';
import { useContext, useEffect } from 'react';
import { DEFAULT_VALUES } from '../../../config/toolbar-default-values';
import { ICanvasDrawingEvent } from '../../../interfaces/canvas-events/canvas-drawing-event';
import { ICanvasFreeDrawingBrush } from '../../../interfaces/free-drawing/canvas-free-drawing-brush';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Handles logic for Free Hand Drawing Feature
 * @param {fabric.Canvas} canvas - Canvas to draw
 */
export const useFreeHandDrawing = (canvas: fabric.Canvas) => {
  const {
    brushIsActive,
    penColor,
    lineWidth,
    allToolbarIsEnabled,
    toolbarIsEnabled,
    serializerToolbarState,
    partialEraseIsActive,
  } = useContext(WhiteboardContext);

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

      canvas.freeDrawingBrush = new fabric.PencilBrush();
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
    canvas,
    lineWidth,
    partialEraseIsActive,
    penColor,
    serializerToolbarState.pen,
    toolbarIsEnabled,
  ]);
};
