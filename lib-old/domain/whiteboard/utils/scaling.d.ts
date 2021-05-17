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
export declare const getLength: (x1: number, x2: number) => number;
/**
 *
 * @param shape Fabric shape. Either rectangle or triangle.
 * @param start Start coordinates.
 * @param end End coordinates.
 */
export declare const setSize: (shape: fabric.Rect | fabric.Triangle, start: Point, end: Point, isNormalBrush: boolean) => Dimensions;
/**
 * Sets circle size and returns dimensions.
 * @param shape Fabric ellipse
 * @param start Start coordinates.
 * @param end End coordinates.
 */
export declare const setCircleSize: (shape: fabric.Ellipse, start: Point, end: Point, isNormalBrush: boolean) => Dimensions;
/**
 * Sets custom shape size and returns dimensions.
 * @param shape Custom shape.
 * @param start Start coordinates.
 * @param end End coordinates.
 */
export declare const setPathSize: (shape: fabric.Object, start: Point, end: Point) => Dimensions;
