import { TypedShape } from '../../../interfaces/shapes/shapes';
/**
 * Checks the objects in objectsList
 * to know if are really intersecting mainObject
 * @param {TypedShape} mainObject - Flood-fill object
 * @param {TypedShape} objectsList - Objects to compare with mainObject
 * @param {fabric.Canvas} canvas - Canvas in which the objects are
 */
export declare const findIntersectedObjects: (mainObject: TypedShape, objectsList: TypedShape[], canvas: fabric.Canvas) => TypedShape[];
