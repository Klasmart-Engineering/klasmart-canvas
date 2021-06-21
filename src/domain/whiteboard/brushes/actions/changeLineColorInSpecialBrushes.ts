import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
import { PaintBrush } from '../classes/paintBrush';
import { fabric } from 'fabric';
import { ChalkBrush } from '../classes/chalkBrush';

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
          // const id = object.id;

          newObject.set({
            angle: object.angle,
            top: object.top,
            left: object.left,
            flipX: object.flipX,
            flipY: object.flipY,
          });

          // Id's are deleted to avoid add and remove event serializing
          // delete object.id;
          // delete newObject.id;

          canvas.remove(object);
          canvas.add(newObject);
          canvas.setActiveObject(newObject);
          canvas.renderAll();

          object = newObject;

          // Id is resetted to could synchronize object
          // object.set({
          //   id: id,
          // });
          // console.log(object)
        });
      break;

    default:
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
      break;
  }

  return object;
};
