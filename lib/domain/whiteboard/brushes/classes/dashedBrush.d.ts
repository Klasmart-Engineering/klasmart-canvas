import { fabric } from 'fabric';
import { ICoordinate } from '../../../../interfaces/brushes/coordinate';
export declare class DashedBrush extends fabric.PencilBrush {
    /**
     * Canvas to draw the path
     */
    private canvas;
    /**
     * User that will draw
     */
    private userId;
    /**
     * Flag to know if currently is possible draw in the given canvas,
     * basically used to avoid draw in the canvas in a mouse move event
     * when mouse down is not happening
     */
    private isDrawing;
    /**
     * Array to store the points to draw the path that will conform
     * the final group of paths with their respective width
     */
    private points;
    /**
     * Recent created path with the current points
     */
    private currentPath;
    /**
     * Class Constructor
     * @param {fabric.Canvas} canvas - Canvas to draw
     * @param {string} userId - User that will draw
     */
    constructor(canvas: fabric.Canvas, userId: string);
    /**
     * Creates a new Dashed Brush Path with the given parameters
     * @param {string} id - Id to set in the new path object
     * @param {ICoordinate[]} points - Points to follow
     * and draw the new path object
     * @param {number} width - General width that the draw
     * will have (lineWidth value)
     * @param {string} color - Path Color
     */
    createDashedPath(id: string, points: ICoordinate[], width: number, color: string): fabric.Path;
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
}
