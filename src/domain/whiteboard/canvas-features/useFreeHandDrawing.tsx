import { fabric } from 'fabric';
import { useContext, useEffect } from 'react';
import { DEFAULT_VALUES } from '../../../config/toolbar-default-values';
import { ICanvasDrawingEvent } from '../../../interfaces/canvas-events/canvas-drawing-event';
import { ICanvasFreeDrawingBrush } from '../../../interfaces/free-drawing/canvas-free-drawing-brush';
import { WhiteboardContext } from '../WhiteboardContext';

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
    const pathCreated = (e: ICanvasDrawingEvent) => {
      if (e.path) {
        e.path.strokeUniform = true;
        canvas?.renderAll();
      }
    };

    if (brushIsActive && canvas) {
      canvas.freeDrawingBrush = new fabric.PencilBrush();
      (canvas.freeDrawingBrush as ICanvasFreeDrawingBrush).canvas = canvas;
      canvas.freeDrawingBrush.color = penColor || DEFAULT_VALUES.PEN_COLOR;
      canvas.freeDrawingBrush.width = lineWidth;
      canvas.freeDrawingCursor = 'crosshair';
      canvas.isDrawingMode =
        allToolbarIsEnabled || (toolbarIsEnabled && serializerToolbarState.pen);

      canvas.on('path:created', pathCreated);
    } else if (canvas && !brushIsActive && !partialEraseIsActive) {
      canvas.isDrawingMode = false;
    }

    return () => {
      canvas?.off('path:created');
    };
  }, [
    brushIsActive,
    canvas,
    lineWidth,
    penColor,
    toolbarIsEnabled,
    allToolbarIsEnabled,
    serializerToolbarState.pen,
    partialEraseIsActive,
  ]);
};
