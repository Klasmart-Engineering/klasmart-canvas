import { fabric } from 'fabric';
/**
 * Creates Rectangle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export declare const rectangle: (width: number, height: number, color: string, filled: boolean, thickness: number) => any;
/**
 * Creates Triangle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export declare const triangle: (width: number, height: number, color: string, filled: boolean, thickness: number) => any;
/**
 * Creates Circle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export declare const circle: (width: number, height: number, color: string, filled: boolean, thickness: number) => any;
/**
 * Creates pentagon shape.
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export declare const pentagon: (color: string, filled: boolean, thickness: number) => fabric.Object;
/**
 * Creates pentagon shape.
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export declare const hexagon: (color: string, filled: boolean, thickness: number) => fabric.Object;
/**
 * Method to create a shape.
 * @param path Shape to be created path
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape.
 * @param filled Flag to set a shape filled or not
 */
export declare const generic: (path: string, width: number, height: number, color: string, filled: boolean, thickness: number) => fabric.Object;
/**
 * Creates a star shape.
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export declare const star: (width: number, height: number, color: string, filled: boolean, thickness: number) => fabric.Object;
/**
 * Creates an arrow shape.
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export declare const arrow: (width: number, height: number, color: string, filled: boolean, thickness: number) => fabric.Object;
/**
 * Creates a chat bubble shape
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export declare const chat: (width: number, height: number, color: string, filled: boolean, thickness: number) => fabric.Object;
export declare const brush: () => fabric.PatternBrush;
