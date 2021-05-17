import { TypedShape } from "../../../interfaces/shapes/shapes";
/**
 * Sets shape size
 * @param shape Shape
 * @param e fabric event
 * @param perfectShapeIsActive Indicates if perfect shape is enabled
 * @param startPoint Start point coordinates
 * @param shapeToAdd Type of shape to add
 * @param brushType Brush type
 * @param canvas Fabric canvas
 * @param userId User id.
 */
export declare const setShapeSize: (shape: TypedShape, e: fabric.IEvent, perfectShapeIsActive: boolean, startPoint: fabric.Point, shapeToAdd: string, brushType: string, canvas: fabric.Canvas, userId: string) => import("../utils/scaling").Dimensions | undefined;
/**
 * Mouse move event handler.
 * @param canvas Canvas
 * @param setShapeSize Set shape size method
 * @param setShapeInProgress Set shape in progress method
 * @param shapeToAdd Sets shape to add
 * @param shape Indicates shape
 * @param resize Indicates if shape is being resized
 * @param startPoint Start point coordinates
 */
export declare const mouseMoveMain: (canvas: fabric.Canvas, setShapeSize: <T>(...args: T[]) => void, setShapeInProgress: <T_1>(...args: T_1[]) => void, shapeToAdd: string, shape: fabric.Object | TypedShape, resize: boolean, startPoint: fabric.Point) => import("fabric/fabric-impl").StaticCanvas;
