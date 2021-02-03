import { TypedShape } from "../../../interfaces/shapes/shapes";

export const findLocalObjects = (userId: string, objects: TypedShape[]) => (
  objects.filter((o: TypedShape) => (o.id?.split(':')[0] === userId))
);

export const isLocalObject = (objectId: string, userId: string) => (objectId.split(':')[0] === userId);
