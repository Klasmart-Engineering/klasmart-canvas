import { fabric } from 'fabric';
/**
 * Creates Rectangle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 */
export declare const rectangle: (width: number, height: number, color: string) => fabric.Rect;
/**
 * Creates Triangle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 */
export declare const triangle: (width: number, height: number, color: string) => fabric.Triangle;
/**
 * Creates Circle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 */
export declare const circle: (width: number, height: number, color: string) => fabric.Ellipse;
/**
 * Creates pentagon shape.
 * @param color Color of shape
 */
export declare const pentagon: (color: string) => fabric.Object;
/**
 * Creates pentagon shape.
 * @param color Color of shape
 */
export declare const hexagon: (color: string) => fabric.Object;
/**
 * Method to create a shape.
 * @param path Shape to be created path
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape.
 */
export declare const generic: (path: string, width: number, height: number, color: string) => fabric.Object;
/**
 * Creates a star shape.
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 */
export declare const star: (width: number, height: number, color: string) => fabric.Object;
/**
 * Creates an arrow shape.
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 */
export declare const arrow: (width: number, height: number, color: string) => fabric.Object;
/**
 * Creates a chat bubble shape
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 */
export declare const chat: (width: number, height: number, color: string) => fabric.Object;
export declare const brush: () => fabric.PatternBrush;
