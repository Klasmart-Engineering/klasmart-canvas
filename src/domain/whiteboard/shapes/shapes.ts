import { fabric } from 'fabric';

/**
 * Creates Rectangle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 */
export const rectangle = (width: number, height: number, color: string) => {
  return new fabric.Rect({
    width: width,
    height: height,
    fill: color,
  });
};

/**
 * Creates Triangle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 */
export const triangle = (width: number, height: number, color: string) => {
  return new fabric.Triangle({
    width: width,
    height: height,
    fill: color,
  });
};

/**
 * Creates Circle Shape
 * @param radius Radius of circle
 * @param color Color of shape
 */
export const circle = (radius: number, color: string) => {
  return new fabric.Circle({
    radius: radius,
    fill: color,
  });
};
