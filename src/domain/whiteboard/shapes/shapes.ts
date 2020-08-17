import { fabric } from 'fabric';
import { TypedShape, TypedPolygon } from '../../../interfaces/shapes/shapes';

// filled shape default values
const filledShape = {
  stroke: 'none',
  strokeWidth: 0,
};

// empty shape default values
const emptyShape = {
  strokeWidth: 2,
  fill: 'transparent',
};

/**
 * Creates Rectangle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export const rectangle = (
  width: number,
  height: number,
  color: string,
  filled: boolean,
  thickness: number
) => {
  const shape = new fabric.Rect({
    width: width,
    height: height,
    selectable: false,
    evented: false,
    stroke: filled ? filledShape.stroke : color,
    strokeWidth: thickness,
    fill: filled ? color : emptyShape.fill,
    strokeUniform: true,
    padding: 15,
  });

  return fabric.util.object.extend(shape, {
    shapeType: 'shape',
    mimicBackground: true,
  });
};

/**
 * Creates Triangle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export const triangle = (
  width: number,
  height: number,
  color: string,
  filled: boolean,
  thickness: number
) => {
  const shape = new fabric.Triangle({
    width: width,
    height: height,
    stroke: filled ? filledShape.stroke : color,
    strokeWidth: thickness,
    fill: filled ? color : emptyShape.fill,
    selectable: false,
    evented: false,
    padding: 15,
    strokeUniform: true,
  });

  return fabric.util.object.extend(shape, {
    shapeType: 'shape',
    mimicBackground: true,
  });
};

/**
 * Creates Circle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export const circle = (
  width: number,
  height: number,
  color: string,
  filled: boolean,
  thickness: number
) => {
  const shape = new fabric.Ellipse({
    rx: width,
    ry: height,
    stroke: filled ? filledShape.stroke : color,
    strokeWidth: thickness,
    fill: filled ? color : emptyShape.fill,
    selectable: false,
    evented: false,
    strokeUniform: true,
    padding: 15,
  });

  return fabric.util.object.extend(shape, {
    shapeType: 'shape',
    mimicBackground: true,
  });
};

/**
 * Creates pentagon shape.
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export const pentagon = (
  color: string,
  filled: boolean,
  thickness: number
): TypedShape => {
  let shape = new fabric.Polygon([
    { x: 200, y: 0 },
    { x: 250, y: 42 },
    { x: 230, y: 100 },
    { x: 170, y: 100 },
    { x: 150, y: 42 },
  ]);

  shape = fabric.util.object.extend(shape, {
    shapeType: 'shape',
    mimicBackground: true,
  });

  return shape.set({
    scaleX: 0.02,
    scaleY: 0.02,
    stroke: filled ? filledShape.stroke : color,
    strokeWidth: thickness,
    fill: filled ? color : emptyShape.fill,
    selectable: false,
    evented: false,
    strokeUniform: true,
    padding: 15,
  });
};

/**
 * Creates pentagon shape.
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export const hexagon = (
  color: string,
  filled: boolean,
  thickness: number
): TypedPolygon => {
  let shape = new fabric.Polygon([
    { x: 125, y: 0 },
    { x: 275, y: 0 },
    { x: 350, y: 175 },
    { x: 275, y: 350 },
    { x: 125, y: 350 },
    { x: 50, y: 175 },
  ]);

  shape = fabric.util.object.extend(shape, {
    shapeType: 'shape',
    scaleX: 0.02,
    scaleY: 0.02,
    stroke: filled ? filledShape.stroke : color,
    strokeWidth: thickness,
    fill: filled ? color : emptyShape.fill,
    selectable: false,
    evented: false,
    strokeUniform: true,
    padding: 15,
  });

  return shape;
};

/**
 * Method to create a shape.
 * @param path Shape to be created path
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape.
 * @param filled Flag to set a shape filled or not
 */
export const generic = (
  path: string,
  width: number,
  height: number,
  color: string,
  filled: boolean,
  thickness: number
): TypedShape => {
  let shape = new fabric.Path(path);
  const scaleX = 1 / (((shape.width as unknown) as number) / width);
  const scaleY = 1 / (((shape.height as unknown) as number) / height);

  fabric.util.object.extend(shape, {
    shapeType: 'shape',
    mimicBackground: true,
  });

  return shape.set({
    scaleX,
    scaleY,
    stroke: filled ? filledShape.stroke : color,
    strokeWidth: thickness,
    fill: filled ? color : emptyShape.fill,
    selectable: false,
    evented: false,
    strokeUniform: true,
    padding: 15,
  });
};

/**
 * Creates a star shape.
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export const star = (
  width: number,
  height: number,
  color: string,
  filled: boolean,
  thickness: number
): TypedShape => {
  const path: string = `
    M 202.000 222.000 \
    L 225.511 234.361 \
    L 221.021 208.180 \
    L 240.042 189.639 \
    L 213.756 185.820 \
    L 202.000 162.000 \
    L 190.244 185.820 \
    L 163.958 189.639 \
    L 182.979 208.180 \
    L 178.489 234.361 \
    L 202.000 222.000 \
    z
  `;
  return generic(path, width, height, color, filled, thickness);
};

/**
 * Creates an arrow shape.
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export const arrow = (
  width: number,
  height: number,
  color: string,
  filled: boolean,
  thickness: number
): TypedShape => {
  const path: string = `
    M421.976,196.712L236.111,10.848C228.884,3.615,220.219,0,210.131,0c-9.9,0-18.464,3.615-25.697,10.848L163.023,32.26
    c-7.234,6.853-10.85,15.418-10.85,25.697c0,10.277,3.616,18.842,10.85,25.697l83.653,83.937H45.677
    c-9.895,0-17.937,3.568-24.123,10.707s-9.279,15.752-9.279,25.837v36.546c0,10.088,3.094,18.698,9.279,25.837
    s14.228,10.704,24.123,10.704h200.995L163.02,360.88c-7.234,7.228-10.85,15.89-10.85,25.981c0,10.089,3.616,18.75,10.85,25.978
    l21.411,21.412c7.426,7.043,15.99,10.564,25.697,10.564c9.899,0,18.562-3.521,25.981-10.564l185.864-185.864
    c7.043-7.043,10.567-15.701,10.567-25.981C432.54,211.939,429.016,203.37,421.976,196.712z
  `;

  return generic(path, width, height, color, filled, thickness);
};

/**
 * Creates a chat bubble shape
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export const chat = (
  width: number,
  height: number,
  color: string,
  filled: boolean,
  thickness: number
): TypedShape => {
  const path: string = `
    M29,1.5c-16.016,0-29,11.641-29,26c0,5.292,1.768,10.211,4.796,14.318
    C4.398,46.563,3.254,53.246,0,56.5c0,0,9.943-1.395,16.677-5.462c0.007,0.003,0.015,0.006,0.022,0.009
    c2.764-1.801,5.532-3.656,6.105-4.126c0.3-0.421,0.879-0.548,1.33-0.277c0.296,0.178,0.483,0.503,0.489,0.848
    c0.01,0.622-0.005,0.784-5.585,4.421C22.146,52.933,25.498,53.5,29,53.5c16.016,0,29-11.641,29-26S45.016,1.5,29,1.5z
  `;

  return generic(path, width, height, color, filled, thickness);
};

export const brush = () => {
  const shape = new fabric.PatternBrush();
  return shape;
};
