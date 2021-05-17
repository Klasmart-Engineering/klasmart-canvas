import fabric from 'fabric/fabric-impl';
/**
 * Point interface.
 */
interface IPoint {
    x: number;
    y: number;
}
/**
 * Class to manage laser pointer.
 */
export declare class Laser {
    /**
     * Pointer coordinates.
     */
    pointer: IPoint;
    /**
     * Canvas element
     */
    canvas: HTMLCanvasElement;
    /**
     * Stored coordinates of previous pointer positions
     */
    positions: IPoint[];
    /**
     * Indicates if pointer canvas should be cleared.
     */
    clear: boolean;
    /**
     * Length of motion trail.
     */
    private motionTrailLength;
    /**
     * Interval for trail fader.
     */
    private fadeInterval;
    /**
     * Canvas context
     */
    private context;
    /**
     * Pointer color
     */
    private color;
    /**
     * Indicates fade delay.
     */
    private fadeDelay;
    /**
     * Indicates width of line
     */
    private lineWidth;
    /**
     * Radius of pointer.
     */
    private radius;
    /**
     * Alpha fade of trail.
     */
    private alpha;
    /**
     * Class constructor
     * @param canvas Original canvas
     * @param color Color of pointer
     * @param fadeDelay Delay of trail fade
     * @param trailLength Length of trail
     * @param lineWidth Width of trail line
     * @param radius Radius of pointer
     * @param alpha Indicates level of alpha for fading line
     */
    constructor(canvas: fabric.Canvas, color: string, fadeDelay?: number, trailLength?: number, lineWidth?: number, radius?: number, alpha?: number);
    /**
     * Converts 6 digit hex to rgb
     * @param color 6 digit hex color
     */
    private hexToRgb;
    /**
     * Stores last positions of pointer
     * @param xPos
     * @param yPos
     */
    private storeLastPosition;
    /**
     * Generates mid point between two points.
     * @param c1 Coordinate
     * @param c2 Coordinate
     */
    private getMidpoint;
    /**
     * Creates additional coordinates between coordinates provided
     * for a smoother gradient effect.
     */
    private generateMidpoints;
    /**
     * Draws main pointer in exact mouse coordinate.
     */
    private buildPointer;
    /**
     * Generates fading trail.
     * @param points Array of coordinates
     * @param colorProps RGB values of color
     */
    private buildLine;
    /**
     * Fades trailing path
     */
    private fadeAway;
    /**
     * Updates pointer position and generates light trail.
     * @param pointer
     */
    update(pointer: IPoint): void;
    /**
     * Clears pointer
     */
    clearPointer(): void;
    /**
     * Removes temporary canvas for laser pointer.
     */
    remove(): void;
}
export {};
