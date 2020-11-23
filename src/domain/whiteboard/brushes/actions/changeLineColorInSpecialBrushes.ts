import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
import { PaintBrush } from '../classes/paintBrush';
import { fabric } from 'fabric';
import { ChalkBrush } from '../classes/chalkBrush';
import { PenBrush } from '../classes/penBrush';
import { MarkerBrush } from '../classes/markerBrush';
import { IPenPoint } from '../../../../interfaces/brushes/pen-point';

/**
 * Logic for change line color in special brushes
 * @param {fabric.Canvas} canvas - Canvas to draw
 * @param {string} userId - User that is drawing
 * @param {ICanvasBrush} object - Path to change color
 * @param {string} color - New color to set in path
 */
export const changeLineColorInSpecialBrushes = async (
  canvas: fabric.Canvas,
  userId: string,
  object: ICanvasBrush,
  color: string
) => {
  let brush: PaintBrush | ChalkBrush;
  const basePath = (object as ICanvasBrush).basePath;
  const brushType = (object as ICanvasBrush).basePath?.type;

  switch (brushType) {
    case 'paintbrush':
      brush = new PaintBrush(canvas, userId);
      const newBrush = brush.makeBrush(color, Number(basePath?.strokeWidth));

      if (object.type !== 'image') {
        // Not filled shape
        object._objects.forEach((line, index) => {
          line.set({
            stroke: newBrush[index].color,
            shadow: new fabric.Shadow({
              affectStroke: true,
              nonScaling: true,
              color: color,
              blur: Number(line.strokeWidth) / 2,
            }),
          });
        });

        object.set({
          basePath: {
            type: basePath?.type || 'pen',
            points: basePath?.points || [],
            stroke: color,
            strokeWidth: Number(basePath?.strokeWidth),
            bristles: newBrush,
          },
        });
      } else {
        // Filled shape
        const newShape = brush.modifyPaintBrushPath(
          String(object.id),
          basePath?.points || [],
          Number(basePath?.strokeWidth),
          color,
          newBrush
        );

        newShape.set({
          name: object.name,
          angle: object.angle,
          top: object.top,
          left: object.left,
          flipX: object.flipX,
          flipY: object.flipY,
        });

        canvas.remove(object);
        canvas.add(newShape);
        canvas.setActiveObject(newShape);
        canvas.renderAll();

        object = newShape;
      }
      break;

    case 'chalk':
    case 'crayon':
      brush = new ChalkBrush(canvas, userId, brushType);
      const newClearRects = brush.createChalkEffect(
        basePath?.points || [],
        Number(basePath?.strokeWidth)
      );

      await brush
        .createChalkPath(
          String(object.id),
          basePath?.points || [],
          Number(basePath?.strokeWidth),
          color,
          newClearRects
        )
        .then((newObject) => {
          newObject.set({
            name: object.name,
            angle: object.angle,
            top: object.top,
            left: object.left,
            flipX: object.flipX,
            flipY: object.flipY,
          });

          canvas.remove(object);
          canvas.add(newObject);
          canvas.setActiveObject(newObject);
          canvas.renderAll();

          object = newObject;
        });
      break;

    default:
      if (object.type !== 'image') {
        // Not filled shape
        object._objects?.forEach((line) => {
          line.set('stroke', color);
        });

        object.set({
          basePath: {
            type: brushType || 'pen',
            points: basePath?.points || [],
            stroke: color,
            strokeWidth: Number(basePath?.strokeWidth),
          },
        });
      } else {
        // Filled shape
        let brush: PenBrush | MarkerBrush;
        let newShape;

        if (brushType === 'pen') {
          brush = new PenBrush(canvas, userId);
          const min =
            Number(basePath?.strokeWidth) === 2
              ? Number(basePath?.strokeWidth)
              : Number(basePath?.strokeWidth) / 2;

          const max =
            Number(basePath?.strokeWidth) === 2
              ? Number(basePath?.strokeWidth) + 1
              : Number(basePath?.strokeWidth);

          const points = (basePath?.points as IPenPoint[]).map((point) => {
            return {
              x: point.x,
              y: point.y,
              width: (brush as PenBrush).getRandomInt(min, max),
            };
          });

          newShape = brush.createPenPath(
            String(object.id),
            points,
            Number(basePath?.strokeWidth),
            color
          );
        } else {
          brush = new MarkerBrush(
            canvas,
            userId,
            brushType as 'marker' | 'felt'
          );

          newShape = brush.createMarkerPath(
            String(object.id),
            basePath?.points || [],
            Number(basePath?.strokeWidth),
            color
          );
        }

        newShape.set({
          name: object.name,
          angle: object.angle,
          top: object.top,
          left: object.left,
          flipX: object.flipX,
          flipY: object.flipY,
        });

        canvas.remove(object);
        canvas.add(newShape);
        canvas.setActiveObject(newShape);
        canvas.renderAll();

        object = newShape;
      }
      break;
  }

  return object;
};
