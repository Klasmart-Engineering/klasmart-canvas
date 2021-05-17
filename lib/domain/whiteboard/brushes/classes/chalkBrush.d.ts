import { fabric } from 'fabric';
import { ICoordinate } from '../../../../interfaces/brushes/coordinate';
import { IClearRect } from '../../../../interfaces/brushes/clear-rects';
import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
declare type IBrushStyle = 'chalk' | 'crayon';
export declare class ChalkBrush extends fabric.PencilBrush {
    /**
     * Canvas to print the path
     */
    private canvas;
    /**
     * Temporal canvas for draw the path and convert it in image
     */
    private tempCanvas;
    /**
     * Context for original canvas
     */
    private ctx;
    /**
     * Context for temporal canvas
     */
    private tempContext;
    /**
     * User that will draw
     */
    private userId;
    /**
     * Flag to know if is possible draw or not.
     * When mouse pressed the value is true and when released is false.
     */
    private isDrawing;
    /**
     * Last registered point in the mouse move event
     */
    private lastPoint;
    /**
     * Registered points to follow them and create the path
     */
    private points;
    /**
     * Registered clear rects used to create the chalk/crayon effect
     */
    private clearRects;
    /**
     * Style of the brush (chalk/crayon)
     */
    private style;
    /**
     * Brightness in path stroke
     */
    private brightness;
    /**
     * Dimensions for the generated clear rects
     */
    private clearRectDimensions;
    /**
     * Class Constructor
     * @param {fabric.Canvas} canvas - Canvas to print the path
     * @param {string} userId - Id of the user that will draw
     * @param {IBrushStyle} style - Style for the brush (chalk/crayon)
     */
    constructor(canvas: fabric.Canvas, userId: string, style: IBrushStyle);
    /**
     * Method used to draw in both contexts, save the points for the path
     * and save clear rects to generate the chalk/crayon path
     * @param {ICoordinate} point - Next point to continue drawing and register
     */
    private draw;
    /**
     * Creates a new chalk path based on the given parameters
     * @param {string} id - Id for the path
     * @param {ICoordinate[]} points - Points to follow and construct the path
     * @param {number} width - Width that the path will have
     * @param {string} color - Color that the path will have
     * @param {IClearRect[]} clearRects - Clear rects to generate
     * the chalk/crayon effect
     */
    createChalkPath(id: string, points: ICoordinate[], width: number, color: string, clearRects: IClearRect[]): Promise<ICanvasBrush>;
    /**
     * Creates the clear rects to generate the chalk effect
     * @param {ICoordinate[]} points - Points to follow in the path
     * @param {number} width - Width that the path will have
     */
    createChalkEffect(points: ICoordinate[], width: number): IClearRect[];
    /**
     * Mouse Down Event, starts drawing in canvas
     * @param {ICoordinate} e - Mouse pointer coordinate
     */
    onMouseDown(e: ICoordinate): void;
    /**
     * Mouse Move Event, continue drawing in canvas
     * @param {ICoordinate} e - Mouse pointer coordinate
     */
    onMouseMove(e: ICoordinate): void;
    /**
     * Mouse Up Event, finishes canvas drawing
     */
    onMouseUp(): Promise<void>;
    /**
     * Creates the random clear rects to be used in chalk/crayon effect
     * @param {ICoordinate} point - Current Point
     * @param {ICoordinate} lastPoint - Last registered point
     * @param {number} width - Width thath the path will have
     */
    private createClearRects;
    /**
     * Initialize the properties related with the drawing to create
     * like color and width in both canvases
     */
    private initializeContextProperties;
}
export {};
