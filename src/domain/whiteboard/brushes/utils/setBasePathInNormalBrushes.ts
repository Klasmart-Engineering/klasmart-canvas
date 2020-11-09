import { ICanvasPathBrush } from '../../../../interfaces/brushes/canvas-path-brush';
import { ICoordinate } from '../../../../interfaces/brushes/coordinate';

/**
 * Creates basePath property in pencil and dashed line styles
 * @param {ICanvasPathBrush} object - Line to set the property.
 */
export const setBasePathInNormalBrushes = (object: ICanvasPathBrush) => {
  // Getting point from SVG data in object
  const points: ICoordinate[] | undefined = object
    .toSVG()
    .split('"')
    .find((element: string) => element.startsWith('M'))
    ?.split(/ ([MQL] [\d+ .]+)/gm)
    .map((element: string) => element.trim())
    .map((value: string, index: number, array: string[]) => {
      const parts = (value || array[index - 1]).split(' ');
      return {
        x: Number(parts[1]),
        y: Number(parts[2]),
      };
    });

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
