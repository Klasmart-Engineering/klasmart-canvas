/// <reference types="react" />
import { TypedShape } from "../../../interfaces/shapes/shapes";
import { CanvasAction } from "../reducers/undo-redo";
/**
 * Mouse Move event handler
 * @param shape Shape that was added to canvas.
 * @param coordsStart Coordinates of initial click on canvas.
 * @param isCircle Indicates if shape added is a circle.
 */
export declare function useMouseMove(): (shape: fabric.Object | fabric.Rect | fabric.Ellipse, coordsStart: fabric.Point, specific?: string | undefined, canvas?: import("fabric/fabric-impl").Canvas | undefined, brushType?: "pencil" | "pen" | "felt" | "crayon" | "chalk" | "paintbrush" | "marker" | "dashed" | undefined) => void;
/**
 * Mouse up event handler
 * @param dispatch React dispatch method
 */
export declare function useMouseUp(dispatch: React.Dispatch<CanvasAction>): (shape: fabric.Object | fabric.Rect | fabric.Ellipse, coordsStart: fabric.Point, specific?: string | undefined, canvas?: import("fabric/fabric-impl").Canvas | undefined, brushType?: "pencil" | "pen" | "felt" | "crayon" | "chalk" | "paintbrush" | "marker" | "dashed" | undefined) => void;
export declare const useMouseDown: (canvas: fabric.Canvas, shapeSelector: (args: string) => fabric.Object | TypedShape, clearOnMouseEvent: (click: (arg: fabric.IEvent) => void) => void, mouseMove: (...args: Array<any>) => void, mouseUp: (...args: Array<any>) => void, brushType: string, shapeColor: string) => (specific: string, color?: string | undefined) => void;
