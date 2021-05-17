import { fabric } from 'fabric';
import { ICanvasShapeBrush } from '../../../interfaces/brushes/canvas-shape-brush';
/**
 * Point interface.
 */
interface IPoint {
    x: number;
    y: number;
}
export interface IRealtimeData {
    type: string;
    target: fabric.Object;
    coordinates?: IPoint[];
    shape?: {
        [key: string]: string | number | ICanvasShapeBrush | undefined;
    };
}
/**x
 * Class to handle realtime creation of objects.
 */
export declare class Realtime {
    /**
     * Pointer coordinates.
     */
    pointer: IPoint | null;
    /**
     * Canvas element
     */
    canvas: HTMLCanvasElement;
    /**
     * Points for path that is in process of being drawn
     */
    points: IPoint[];
    /**
     * Stroke color, used when adding in realtime
     */
    private color;
    /**
     * Line width of object being added.
     */
    private lineWidth;
    /**
     * Canvas context
     */
    private context;
    /**
     * Temporary canvas will erasing will take place.
     */
    private tempCanvas;
    /**
     * Indicates shape to be drawn
     */
    private type;
    /**
     * Canvas width
     */
    private width;
    /**
     * Canvas height
     */
    private height;
    /**
     *
     * @param width Canvas width
     * @param height Canvas height
     * @param id User / instance id
     */
    constructor(width: number, height: number, id: string);
    /**
     * Initiates realtime process for adding elements to canvas.
     * @param canvas Canavs
     * @param type type of object being added
     * @param color Coloro of object being added
     * @param lineWidth Line width of object being added
     */
    init(canvas: fabric.Canvas, type: string, color: string, lineWidth: number): void;
    /**
     * Checks if instance is initiated.
     */
    isInitiated(): boolean;
    /**
     * Converts 6 digit hex to rgb
     * @param color 6 digit hex color
     */
    private hexToRgb;
    /**
     *
     * @param target Contains shape information.
     */
    draw(target: IRealtimeData): Promise<void>;
    /**
     * Draws a path.
     * @param points Path points
     */
    drawPath(points: IPoint[]): void;
    /**
     * Draws a shape
     * @param target Canvas target
     */
    rectDraw(target: any): void;
    /**
     * Draws circle
     * @param target Data of shape to be drawn.
     */
    ellipseDraw(target: any): void;
    triangleDraw(target: any): void;
    /**
     *
     * @param target Shape information
     */
    private shapeProps;
    /**
     * Draws pentagon
     * @param target Shape information
     */
    pentagonDraw(target: any): void;
    /**
     * Draws hegaxon
     * @param target Shape information
     */
    hexagonDraw(target: any): void;
    /**
     * Draws star
     * @param target Shape inforamtion
     */
    starDraw(target: any): void;
    /**
     * Draws chat bubble
     * @param target Shape information
     */
    chatDraw(target: any): void;
    /**
     * Draws arrow
     * @param target Shape information
     */
    arrowDraw(target: any): void;
    /**
     * Real time text drawing process.
     * @param target
     */
    textDraw(target: any): void;
    /**
     * Clears temporary canvas.
     */
    private clear;
    /**
     * Removes / destroys temporary canvas.
     */
    remove(): void;
    /**
     * Fix the dimensions of the given shape
     * @param newShape - Shape to set dimensions
     * @param targetShape - Reference shape to set dimensions in the new one
     * @param brushType - Shape Brush Type
     */
    private fixCustomBrushShapeDimensions;
    /**
     * Draws a custom brush shape in tempCanvas
     * @param shape - Shape to draw
     * @param target - Object with the required properties to render the shape
     */
    private customBrushShape;
    /**
     * Draws a custom brush path in tempCanvas
     * @param target - Object with the required properties to render the shape
     */
    private customBrushPath;
}
export {};
