import { PenBrush } from '../classes/penBrush';
import { MarkerBrush } from '../classes/markerBrush';
import { PaintBrush } from '../classes/paintBrush';
import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
import { IPenPoint } from '../../../../interfaces/brushes/pen-point';
import { ICoordinate } from '../../../../interfaces/brushes/coordinate';

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
  let brush: PenBrush | MarkerBrush | PaintBrush;
  let path;
  const basePath = target.basePath;
  const brushType = target.basePath?.type;

  switch (brushType) {
    case 'pen':
      brush = new PenBrush(canvas, userId);
      path = brush.createPenPath(
        id,
        (basePath?.points as IPenPoint[]) || [],
        Number(basePath?.strokeWidth),
        String(basePath?.stroke)
      );
      break;

    case 'marker':
    case 'felt':
      brush = new MarkerBrush(canvas, userId, brushType);
      path = brush.createMarkerPath(
        id,
        (basePath?.points as ICoordinate[]) || [],
        Number(basePath?.strokeWidth),
        String(basePath?.stroke)
      );
      break;

    case 'paintbrush':
      brush = new PaintBrush(canvas, userId);
      path = brush.modifyPaintBrushPath(
        id,
        (basePath?.points as ICoordinate[]) || [],
        Number(basePath?.strokeWidth),
        String(basePath?.stroke),
        basePath?.bristles || []
      );
      break;
  }

  if (!path) return;

  path.set({
    selectable: false,
    evented: false,
  });

  canvas.add(path);
  canvas.renderAll();
};
