import { TypedShape } from "../../../interfaces/shapes/shapes";

export const findIntersectedObjects = (mainObject: TypedShape, objectsList: TypedShape[]) => (
  objectsList.filter((o : TypedShape) => mainObject.intersectsWithObject(o))
)
