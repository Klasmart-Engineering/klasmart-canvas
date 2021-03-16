import { PenBrush } from '../classes/penBrush';
import { MarkerBrush } from '../classes/markerBrush';
import { PaintBrush } from '../classes/paintBrush';
import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
import { IPenPoint } from '../../../../interfaces/brushes/pen-point';
import { ICoordinate } from '../../../../interfaces/brushes/coordinate';
import { DashedBrush } from '../classes/dashedBrush';
import { ICanvasObject } from '../../../../interfaces/objects/canvas-object';

/**
 * Logic for synchronize special brushes creation
 * @param {fabric.Canvas} canvas - Canvas to draw
 * @param {string} userId - User that is drawing
 * @param {string} id - path id
 * @param {ICanvasBrush} target - Target with properties to be setted in path
 */
export const addSynchronizationInSpecialBrushes = (
  canvas: fabric.Canvas,
  userId: string,
  id: string,
  target: ICanvasBrush
) => {
  return new Promise<void>((resolve, reject) => {
    let brush: PenBrush | MarkerBrush | PaintBrush | DashedBrush;
    let path;
    const basePath = target.basePath;
    const brushType = target.basePath?.type;

    try {
      if (
        canvas.getObjects().find((obj: ICanvasObject) => obj.id === target.id)
      )
        return;

      switch (brushType) {
        case 'dashed':
          brush = new DashedBrush(canvas, userId);
          path = brush.createDashedPath(
            'provisional',
            (basePath?.points as ICoordinate[]) || [],
            Number(basePath?.strokeWidth),
            String(basePath?.stroke)
          );
          break;

        case 'pen':
          brush = new PenBrush(canvas, userId);
          path = brush.createPenPath(
            'provisional',
            (basePath?.points as IPenPoint[]) || [],
            Number(basePath?.strokeWidth),
            String(basePath?.stroke)
          );
          break;

        case 'marker':
        case 'felt':
          brush = new MarkerBrush(canvas, userId, brushType);
          path = brush.createMarkerPath(
            'provisional',
            (basePath?.points as ICoordinate[]) || [],
            Number(basePath?.strokeWidth),
            String(basePath?.stroke)
          );
          break;

        case 'paintbrush':
          brush = new PaintBrush(canvas, userId);
          path = brush.modifyPaintBrushPath(
            'provisional',
            (basePath?.points as ICoordinate[]) || [],
            Number(basePath?.strokeWidth),
            String(basePath?.stroke),
            basePath?.bristles || []
          );
          break;
      }

      if (!path) return;

      (path as ICanvasBrush).set({
        top: target.top,
        left: target.left,
        originX: target.originX,
        originY: target.originY,
        selectable: false,
        evented: false,
      });

      canvas.add(path);

      (path as ICanvasBrush).set({ id });
      canvas.renderAll();

      resolve();
    } catch (error) {
      reject();
    }
  });
};
