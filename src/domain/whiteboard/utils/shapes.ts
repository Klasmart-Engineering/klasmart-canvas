import { TypedShape } from '../../../interfaces/shapes/shapes';

/**
 * Check if the given object is a free drawing object
 * @param {fabric.Object} object - object to check
 */
export const isFreeDrawing = (object: fabric.Object) => {
  return object.strokeLineCap === 'round';
};

/**
 * Check if the given object is a shape
 * @param {fabric.Object} object - object to check
 */
export const isShape = (object: fabric.Object) => {
  if (object.get('type') === 'path') {
    return true;
  }

  return object.fill && !(object as fabric.TextOptions).text;
};

/**
 * Check if the given object is an empty shape
 * @param {fabric.Object} object - object to check
 */
// eslint-disable-next-line react-hooks/exhaustive-deps
export const isEmptyShape = (object: TypedShape) => {
  return isShape(object) && object.shapeType === 'shape';
};
