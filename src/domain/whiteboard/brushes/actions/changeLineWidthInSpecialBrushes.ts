import { PenBrush } from '../classes/penBrush';
import { MarkerBrush } from '../classes/markerBrush';
import { PaintBrush } from '../classes/paintBrush';
import { ChalkBrush } from '../classes/chalkBrush';
import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
import { IPenPoint } from '../../../../interfaces/brushes/pen-point';
import { IBristle } from '../../../../interfaces/brushes/bristle';

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
  let brush: PenBrush | MarkerBrush | PaintBrush | ChalkBrush;
  let newObject: ICanvasBrush | null = null;
  let basePath = object.basePath;
  const brushType = object.basePath?.type;

  try {
    if (lineWidth === basePath?.strokeWidth)
      throw new Error('lineWidth is the same');

    if (target) {
      basePath = target.basePath;
    }

    switch (brushType) {
      case 'pen':
        let points: IPenPoint[] = (basePath?.points as IPenPoint[]) || [];
        const min = lineWidth === 2 ? lineWidth : lineWidth / 2;
        const max = lineWidth === 2 ? lineWidth + 1 : lineWidth;

        brush = new PenBrush(canvas, userId);

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
        if (target) {
          canvas.remove(object);
          canvas.renderAll();
        } else {
          brush = new ChalkBrush(canvas, userId, brushType);

          const newClearRects = brush.createChalkEffect(
            basePath?.points || [],
            lineWidth
          );

          await brush
            .createChalkPath(
              String(object.id),
              basePath?.points || [],
              lineWidth,
              String(basePath?.stroke),
              newClearRects
            )
            .then((response) => {
              if (response) {
                newObject = response;
              }
            });
        }
        break;
    }

    if (newObject) {
      newObject.set({
        name: object.name,
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
      canvas.remove(object);
      canvas.add(newObject);

      if (!target) {
        canvas.setActiveObject(newObject);
      }
    } else if (!target) {
      throw new Error('newObject was not created');
    }

    canvas.renderAll();

    return newObject || object;
  } catch (e) {
    throw e;
  }
};
