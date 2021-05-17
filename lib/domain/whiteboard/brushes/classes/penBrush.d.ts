import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
import { ICoordinate } from '../../../../interfaces/brushes/coordinate';
export declare class PenBrush extends fabric.PencilBrush {
    /**
     * Canvas to draw
     */
    private canvas;
    /**
     * userId of the user
     */
    private userId;
    /**
     * State to know if currently is possible draw in the given canvas,
     * basically used to avoid draw in the canvas in a mouse move event
     * when mouse down is not happening
     */
    private isDrawing;
    /**
     * Array to store the points to draw the paths that will conform
     * the final group of paths with their respective width
     */
    private points;
    /**
     * Class Constructor
     * @param {Canvas} canvas - Canvas to draw
     * @param {string} userId - userId of the current user
     */
    constructor(canvas: Canvas, userId: string);
    /**
     * Returns a random int from a given min value to a given max value,
     * basically is used here to set a different width in each path generated
     * @param {number} min - Random Number minimum value
     * @param {number} max - Random NUmber maximum value
     */
    getRandomInt(min: number, max: number): number;
    /**
     * Sets minimum and maximum values to set valid widths
     * for a pen line with the given linewidth
     * @param {number} lineWidth - stroke width for the line
     */
    setMinMaxWidth(lineWidth: number): {
        min: number;
        max: number;
    };
    /**
     * Mouse Down Event, starts to draw in the canvas
     * @param {ICoordinate} e - Event Coordinate value
     */
    onMouseDown(e: ICoordinate): void;
    /**
     * Mouse Move Event, detects mouse movement to set the position of each point
     * @param {ICoordinate} e - Event Coordinate value
     */
    onMouseMove(e: ICoordinate): void;
    /**
     * Mouse Up Event, finish drawing in canvas
     * and creates the new path with the given points
     */
    onMouseUp(): void;
    /**
     * Creates a new Pen Brush Path with the given parameters
     * @param {string} id - Id to set in the new path object
     * @param {IPenPoint[]} points - Points to follow and draw the new path object
     * @param {number} width - General width that the draw
     * will have (lineWidth value)
     * @param {string} color - Path Color
     */
    createPenPath(id: string, points: {
        x: number;
        y: number;
        width: number;
    }[], width: number, color: string): ICanvasBrush;
}
