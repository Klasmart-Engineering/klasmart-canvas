import { fabric } from 'fabric';
import { Point } from 'fabric/fabric-impl';

/**
 * Dimensions model. Indicates an object with
 * height and width.
 */
export interface Dimensions {
  width: number;
  height: number;
}

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
export const setSize = (
  shape: fabric.Rect | fabric.Triangle,
  start: Point,
  end: Point,
  isNormalBrush: boolean
): Dimensions => {
  const width = getLength(end.x, start.x);
  const height = getLength(end.y, start.y);

  if (isNormalBrush) {
    shape.set({ width, height });
  } else {
    const scaleX = Number(shape.width) / width;
    const scaleY = Number(shape.height) / height;

    shape.set({
      scaleX: 1 / scaleX,
      scaleY: 1 / scaleY,
    });
  }

  return { width, height };
};

/**
 * Sets circle size and returns dimensions.
 * @param shape Fabric ellipse
 * @param start Start coordinates.
 * @param end End coordinates.
 */
export const setCircleSize = (
  shape: fabric.Ellipse,
  start: Point,
  end: Point,
  isNormalBrush: boolean
): Dimensions => {
  const rx = getLength(end.x, start.x) / 2;
  const ry = getLength(end.y, start.y) / 2;

  if (isNormalBrush) {
    shape.set({ rx, ry });
  } else {
    const scaleX = Number(shape.width) / rx;
    const scaleY = Number(shape.height) / ry;

    shape.set({
      scaleX: (1 / scaleX) * 2,
      scaleY: (1 / scaleY) * 2,
    });
  }

  return { width: rx * 2, height: ry * 2 };
};

/**
 * Sets custom shape size and returns dimensions.
 * @param shape Custom shape.
 * @param start Start coordinates.
 * @param end End coordinates.
 */
export const setPathSize = (
  shape: fabric.Object,
  start: Point,
  end: Point
): Dimensions => {
  const width = getLength(end.x, start.x) / 2;
  const height = getLength(end.y, start.y) / 2;
  const scaleX = 2 / (Number(shape.width) / width);
  const scaleY = 2 / (Number(shape.height) / height);

  shape.set({ scaleX, scaleY });
  return { width, height };
};
