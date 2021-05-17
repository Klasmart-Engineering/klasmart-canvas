import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { ICoordinate } from '../../../../interfaces/brushes/coordinate';
declare type IMarkerStyle = 'marker' | 'felt';
export declare class MarkerBrush extends fabric.PencilBrush {
    /**
     * Canvas to print the lines
     */
    private canvas;
    /**
     * Id of the user that draw the line
     */
    private userId;
    /**
     * Context of the given Canvas
     */
    private ctx;
    /**
     * Flag to know when is possible draw in the Canvas,
     * when mouse is pressed the value is true and false when is released.
     */
    private isDrawing;
    /**
     * Last registered point
     */
    private lastPoint;
    /**
     * All the registered points
     */
    private points;
    /**
     * Style for the brush, it could be marker or felt
     */
    private style;
    /**
     * Class constructor
     * @param {Canvas} canvas - Canvas to print the lines
     * @param {string} userId - Id of the user that will draw
     */
    constructor(canvas: Canvas, userId: string, style: IMarkerStyle);
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
     * Add a new line in context drawing (path no created)
     * @param {number} alpha - line opacity
     * @param {ICoordinate} start - line start point
     * @param {ICoordinate} end - line end point
     */
    private addContextLine;
    /**
     * Creates a new Path with a given opacity
     * and a position respect the main line
     * @param {number} opacity - Opacity for the Path
     * @param {ICoordinate[]} points - Points to follow to create the new line
     * @param {string} color - Stroke color to set in the line
     * @param {number} width - Stroke width to set in the line
     * @param {number} difference - points position difference
     * respect the given points
     */
    private addSVGLine;
    /**
     * Creates a new Marker/Felt Brush Path with the given parameters
     * @param {string} id - Id to set in the new path object
     * @param {ICoordinate[]} points - Points to follow and draw the path object
     * @param {number} width - General width that the draw
     * will have (lineWidth value)
     * @param {string} color - Path Color
     */
    createMarkerPath(id: string, points: ICoordinate[], width: number, color: string): fabric.Group;
    /**
     * Creates the context lines
     * @param {ICoordinate} e - Coordinates of current point
     */
    private createContextLines;
}
export {};
