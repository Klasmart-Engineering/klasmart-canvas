import { TypedShape } from "../../../interfaces/shapes/shapes";
export declare const findLocalObjects: (userId: string, objects: TypedShape[]) => TypedShape[];
export declare const isLocalObject: (objectId: string, userId: string) => boolean;
