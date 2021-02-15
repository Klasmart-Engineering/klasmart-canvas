import { ICanvasPathBrush } from '../../../../interfaces/brushes/canvas-path-brush';
import { ICoordinate } from '../../../../interfaces/brushes/coordinate';
import { convertSVGPathInPoints } from './convertSVGPathInPoints';
import { ICanvasObject } from '../../../../interfaces/objects/canvas-object';

/**
 * Creates basePath property in pencil and dashed line styles
 * @param {ICanvasPathBrush} object - Line to set the property.
 */
export const setBasePathInNormalBrushes = (object: ICanvasPathBrush) => {
  // Getting point from SVG data in object
  const points: ICoordinate[] | undefined = convertSVGPathInPoints(
    (object as unknown as ICanvasObject) as fabric.Path
  );

  // Setting properties of base Path and adding them in current object
  (object as ICanvasPathBrush).set({
    basePath: {
      type: object.strokeDashArray?.length ? 'dashed' : 'pencil',
      points: points || [],
      stroke: String(object.stroke),
      strokeWidth: Number(object.strokeWidth),
    },
  });
};
