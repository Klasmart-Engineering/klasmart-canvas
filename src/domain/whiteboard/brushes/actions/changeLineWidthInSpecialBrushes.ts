import { PenBrush } from '../classes/penBrush';
import { MarkerBrush } from '../classes/markerBrush';
import { PaintBrush } from '../classes/paintBrush';
import { ChalkBrush } from '../classes/chalkBrush';
import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
import { IPenPoint } from '../../../../interfaces/brushes/pen-point';
import { IBristle } from '../../../../interfaces/brushes/bristle';
import { DashedBrush } from '../classes/dashedBrush';

/**
 * Logic for change lineWidth in special brushes local and remote
 * @param {fabric.Canvas} canvas - Canvas to draw
 * @param {string} userId - User that is drawing
 * @param {ICanvasBrush} object - Path to change its line width
 * @param {number} lineWidth - New line width to set in path
 * @param {ICanvasBrush} target - Target to copy properties and set itin a remote path
 */
export const changeLineWidthInSpecialBrushes = async (
  canvas: fabric.Canvas,
  userId: string,
  object: ICanvasBrush,
  lineWidth: number,
  target?: ICanvasBrush
): Promise<ICanvasBrush> => {
  let brush: PenBrush | MarkerBrush | PaintBrush | ChalkBrush | DashedBrush;
  let newObject: ICanvasBrush | fabric.Path | null = null;
  let basePath = object.basePath;
  const brushType = object.basePath?.type;

  try {
    if (lineWidth === basePath?.strokeWidth)
      throw new Error('lineWidth is the same');

    if (target) {
      basePath = target.basePath;
    }

    switch (brushType) {
      case 'dashed':
        brush = new DashedBrush(canvas, userId);
        newObject = brush.createDashedPath(
          String(object.id),
          basePath?.points || [],
          lineWidth,
          String(basePath?.stroke)
        );
        break;
      case 'pen':
        let points: IPenPoint[] = (basePath?.points as IPenPoint[]) || [];

        brush = new PenBrush(canvas, userId);
        const { min, max } = brush.setMinMaxWidth(lineWidth);

        if (!target) {
          points = points.map((point) => {
            return {
              x: point.x,
              y: point.y,
              width: (brush as PenBrush).getRandomInt(min, max),
            };
          });
        }

        newObject = brush.createPenPath(
          String(object.id),
          points,
          lineWidth,
          String(basePath?.stroke)
        );
        break;

      case 'marker':
      case 'felt':
        brush = new MarkerBrush(canvas, userId, brushType);
        newObject = brush.createMarkerPath(
          String(object.id),
          basePath?.points || [],
          lineWidth,
          String(basePath?.stroke)
        );
        break;

      case 'paintbrush':
        brush = new PaintBrush(canvas, userId);
        let newBrush: IBristle[] = basePath?.bristles || [];

        if (!target) {
          newBrush = brush.makeBrush(String(basePath?.stroke), lineWidth);
        }

        newObject = brush.modifyPaintBrushPath(
          String(object.id),
          basePath?.points || [],
          lineWidth,
          String(basePath?.stroke),
          newBrush
        );
        break;

      case 'chalk':
      case 'crayon':
        brush = new ChalkBrush(canvas, userId, brushType);

        const newClearRects = brush.createChalkEffect(
          basePath?.points || [],
          lineWidth
        );

        newObject = await brush.createChalkPath(
          String(object.id),
          basePath?.points || [],
          lineWidth,
          String(basePath?.stroke),
          newClearRects
        );

        break;
    }

    if (newObject) {
      const id = (newObject as ICanvasBrush).id;
      (newObject as ICanvasBrush).set({
        angle: object.angle,
        top: object.top,
        left: object.left,
        scaleX: object.scaleX,
        scaleY: object.scaleY,
        flipX: object.flipX,
        flipY: object.flipY,
        originX: object.originX || 'left',
        originY: object.originY || 'top',
        evented: !target,
        selectable: !target,
      });

      delete object.id;
      delete (newObject as ICanvasBrush).id;
      canvas.remove(object);
      canvas.add(newObject);

      (newObject as ICanvasBrush).set({ id: id });
      if (!target) {
        canvas.setActiveObject(newObject);
      }
    } else if (!target) {
      throw new Error('newObject was not created');
    }

    canvas.renderAll();

    return (newObject as ICanvasBrush) || object;
  } catch (e) {
    throw e;
  }
};
