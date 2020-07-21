import { fabric } from 'fabric';

/**
 * Dimensions model. Indicates an object with
 * height and width.
 */
export interface Dimensions {
  width: number;
  height: number;
};

/**
 * Gets length from one point to another.
 * @param x1 Coordinate starts.
 * @param x2 Coordinate ends.
 */
export const getLength = (x1: number, x2: number): number => Math.abs(x1 - x2);

/**
 * 
 * @param shape Fabric shape. Either rectangle or triangle.
 * @param start Start coordinates.
 * @param end End coordinates.
 */
export const setSize = (shape: fabric.Rect | fabric.Triangle, start: any, end: any): Dimensions => {
  let width = getLength(end.x, start.x);
  let height = getLength(end.y, start.y);
  shape.set({ width, height });

  return { width, height };
};

/**
 * Sets circle size and returns dimensions.
 * @param shape Fabric ellipse
 * @param start Start coordinates.
 * @param end End coordinates.
 */
export const setCircleSize = (shape: fabric.Ellipse, start: any, end: any): Dimensions => {
  let rx = getLength(end.x, start.x) / 2;
  let ry = getLength(end.y, start.y) / 2;
  shape.set({ rx, ry });

  return { width: rx * 2, height: ry * 2 };
};

/**
 * Sets custom shape size and returns dimensions.
 * @param shape Custom shape.
 * @param start Start coordinates.
 * @param end End coordinates.
 */
export const setPathSize = (shape: fabric.Object, start: any, end: any): Dimensions => {
  let width = getLength(end.x, start.x) / 2;
  let height = getLength(end.y, start.y) / 2;
  let scaleX = 2 / (shape.width as unknown as number / width);
  let scaleY = 2 / (shape.height as unknown as number / height);

  shape.set({ scaleX, scaleY });
  return { width, height };
};
