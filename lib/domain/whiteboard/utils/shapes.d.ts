import { TypedShape } from '../../../interfaces/shapes/shapes';
/**
 * Check if the given object is a free drawing object
 * @param {fabric.Object} object - object to check
 */
export declare const isFreeDrawing: (object: fabric.Object) => boolean;
/**
 * Check if the given object is a shape
 * @param {fabric.Object} object - object to check
 */
export declare const isShape: (object: fabric.Object) => boolean | "" | undefined;
/**
 * Check if the given object is an empty shape
 * @param {fabric.Object} object - object to check
 */
export declare const isEmptyShape: (object: TypedShape) => boolean | "" | undefined;
