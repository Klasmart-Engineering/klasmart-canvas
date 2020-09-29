import { TypedShape } from "../../../interfaces/shapes/shapes";

export const findObjectsByCoordinates = (coord: fabric.Point, objects: TypedShape[]) => (
  objects.filter((o: TypedShape) => o.containsPoint(coord))
);