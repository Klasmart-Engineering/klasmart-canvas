import { TypedShape } from '../../../interfaces/shapes/shapes';
import { isEmptyShape } from './shapes';

export const findIntersectedObjects = (
  mainObject: TypedShape,
  objectsList: TypedShape[]
) =>
  objectsList.filter(
    (o: TypedShape) => mainObject.intersectsWithObject(o) && !isEmptyShape(o)
  );
