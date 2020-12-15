import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../../interfaces/objects/canvas-object';

/**
 * Logic for synchronize line color in special brushes
 * @param {ICanvasBrush} object - Path to change color
 * @param {ICanvasObject} target - Target to copy properties on path
 */
export const colorChangeSynchronizationInSpecialBrushes = (
  object: ICanvasBrush,
  target: ICanvasObject
) => {
  const basePath = object.basePath;
  const brushType = object.basePath?.type;

  if (brushType === 'paintbrush') {
    const bristles = target.bristles || [];

    if (!bristles.length) return;

    object.forEachObject((line, index) => {
      line.set({
        stroke: bristles[index].color,
        shadow: new fabric.Shadow({
          affectStroke: true,
          nonScaling: true,
          color: bristles[index].color,
          blur: Number(line.strokeWidth) / 2,
        }),
      });

      object.set({
        basePath: {
          type: brushType || 'pen',
          points: basePath?.points || [],
          stroke: String(target.stroke),
          strokeWidth: Number(basePath?.strokeWidth),
          bristles: bristles,
        },
      });
    });
  } else if (brushType !== 'chalk' && brushType !== 'crayon') {
    object.forEachObject((line) => {
      line.set({
        stroke: target.stroke,
      });
    });

    (object as ICanvasBrush).set({
      basePath: {
        type: brushType || 'pen',
        points: basePath?.points || [],
        stroke: String(target.stroke),
        strokeWidth: Number(basePath?.strokeWidth),
      },
    });
  }
};
