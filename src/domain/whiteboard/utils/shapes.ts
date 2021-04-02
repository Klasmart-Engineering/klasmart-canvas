import { TypedShape } from '../../../interfaces/shapes/shapes';
import { ITextOptions } from 'fabric/fabric-impl';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { ICoordinate } from '../../../interfaces/brushes/coordinate';
import { PenBrush } from '../brushes/classes/penBrush';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';

/**
 * Check if the given object is a free drawing object
 * @param {fabric.Object} object - object to check
 */
export const isFreeDrawing = (object: fabric.Object) => {
  return object.strokeLineCap === 'round';
};

export const isSpecialFreeDrawing = (object: fabric.Object) => {
  return (
    (object.type === 'group' && (object as ICanvasBrush).basePath) ||
    (object.type === 'image' && (object as ICanvasBrush).basePath)
  );
};

/**
 * Check if the given object is a shape
 * @param {fabric.Object} object - object to check
 */
export const isShape = (object: fabric.Object) => {
  if (object.get('type') === 'path' && object.name) {
    return true;
  }

  return object.fill && !(object as fabric.TextOptions).text;
};

/**
 * Check if the given object is a text object
 * @param {fabric.Object} object - object to check
 */
export const isText = (object: fabric.Object) => {
  return (object as ITextOptions).text;
};

/**
 * Check if the given object is an empty shape
 * @param {fabric.Object} object - object to check
 */
// eslint-disable-next-line react-hooks/exhaustive-deps
export const isEmptyShape = (object: TypedShape) => {
  return isShape(object) && object.shapeType === 'shape';
};

/**
 * Get the bigger difference
 * between startPoint.x - point.x and startPoint.y - point.y
 * @param {Point} point - Point to find the difference with startPoint
 */
export const getBiggerDifference = (point: fabric.Point, startPoint: fabric.Point) => {
  return Math.abs(point.x - startPoint.x) >
    Math.abs(point.y - startPoint.y)
    ? point.x - startPoint.x
    : point.y - startPoint.y;
};

export const setScaledPoint = (shape: any, original: any, point: ICoordinate) => {
  return {
    x:
      (point.x * Number(shape.width) * Number(shape.scaleX)) /
      original.width,
    y:
      (point.y * Number(shape.height) * Number(shape.scaleY)) /
      original.height,
  };
};

export const penPointsMapping = (points: any[], brush: any, min: number, max: number) => (
  points.map((point) => (
    {
      x: point.x,
      y: point.y,
      width: (brush as PenBrush).getRandomInt(min, max),
    }
  )
));

/**
 * Check if the given object is a 3d shape
 * @param {fabric.Object} object - object to check
 */
export const is3DShape = (object: ICanvasObject) => {
  return object.hasOwnProperty("threeObject");
};

/**
 * Check if the given object is a group
 * @param {fabric.Object} object - object to check
 */
export const isGroup = (object: ICanvasObject) => {
  return object.hasOwnProperty("_objects");
};
