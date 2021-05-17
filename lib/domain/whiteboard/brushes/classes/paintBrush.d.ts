import { fabric } from 'fabric';
import { ICoordinate } from '../../../../interfaces/brushes/coordinate';
import { IBristle } from '../../../../interfaces/brushes/bristle';
export declare class PaintBrush extends fabric.PencilBrush {
    /**
     * Canvas to draw
     */
    private canvas;
    /**
     * Context for the given canvas
     */
    private ctx;
    /**
     * Id of the user that will draw
     */
    private userId;
    /**
     * Brightness variation factor,
     * path colors variation is proportional to this number
     */
    private varyBrightness;
    /**
     * Latest registered point
     */
    private latestPoint;
    /**
     * Points to use to create the path
     */
    private points;
    /**
     * Points registered for each brush's bristle,
     * when a new line will be created
     */
    private brushPoints;
    /**
     * Flag to know if is possible draw o not
     * true: mouse clicked, false: mouse released
     */
    private isDrawing;
    /**
     * Current registered angle in the drawing path
     */
    private currentAngle;
    /**
     * Brush state in this drawing,
     * contains properties necessaries to create variations in the drawing path
     */
    private currentBrush;
    /**
     * Class Constructor
     * @param {fabric.Canvas} canvas - Canvas to draw
     * @param {string} userId - User that will draw
     */
    constructor(canvas: fabric.Canvas, userId: string);
    /**
     * Creates a color variation of the given color
     * @param {string} color - Color to create a variation
     */
    private varyColor;
    /**
     * Create a brush state to use in the current drawing,
     * set the properties to make this drawing different
     * @param {string} color - Path original stroke color
     * @param {number} size - Path original stroke width
     */
    makeBrush(color: string, size: number): IBristle[];
    /**
     * Set a new point based in the angle drawing
     * @param {number} distance - Distance of this bristle
     * respect the original point
     * @param {number} angle - Angle in which the draw is made.
     * @param {ICoordinate} origin - Origin point
     */
    private rotatePoint;
    /**
     * Get bearing of origin and destination points
     * @param {ICoordinate} origin - Origin Point
     * @param {ICoordinate} destination - Destination Point
     */
    private getBearing;
    /**
     * Set a new angle based in origin and destination points
     * and the current angle
     * @param {ICoordinate} origin - Origin Point
     * @param {ICoordinate} destination - Destination Point
     * @param {number} oldAngle - Current Angle
     */
    private getNewAngle;
    /**
     * Get the difference between two angles
     * @param {number} angleA - first angle
     * @param {number} angleB - second angle
     */
    private angleDiff;
    /**
     * Draw path for a bristle of the brush
     * Technically bristle is a path and brush the group of these paths
     * @param {ICoordinate} origin - Origin point
     * @param {ICoordinate} destination - Destination Point
     * @param {IBristle} bristle - Configuration like color and width
     * of this bristle
     * @param {ICoordinate} controlPoint - Control Point for make
     * a quadratic curve
     */
    private strokeBristle;
    /**
     * Draw each brush's bristle
     * @param {IBristle[]} bristles - Bristles of the Brush
     * @param {ICoordinate} origin - Origin Point
     * @param {ICoordinate} destination - DEstination Point
     * @param {number} oldAngle - Angle in the previous point
     * @param {number} newAngle - Angle in the current point
     */
    private drawStroke;
    /**
     * Keep doing the drawing in canvas
     * @param {ICoordinate} newPoint - New point to continue drawing
     */
    private continueStroke;
    /**
     * Start to draw in canvas
     * @param {ICoordinate} point - Point in which the drawing starts
     */
    private startStroke;
    /**
     * Mouse Down Event, starts drawing in canvas
     * @param {ICoordinate} e - Event coordinate value
     */
    onMouseDown(e: ICoordinate): void;
    /**
     * Mouse Move Event, continues with drawing
     * @param {ICoordinate} e - Event coordinate value
     */
    onMouseMove(e: ICoordinate): void;
    /**
     * Mouse Up Event, finishes drawing
     */
    onMouseUp(): void;
    /**
     * Creates a new path based on previous properties
     * and a new modification on it
     * @param {string} id - Id for the path object
     * @param {ICoordinate[]} points - Points to follow in path creation
     * @param {number} width - Path general width
     * @param {string} color - Path general color
     * @param {IBristle[]} bristles - Brush's bristles for this path
     */
    modifyPaintBrushPath(id: string, points: ICoordinate[], width: number, color: string, bristles: IBristle[]): fabric.Group;
    /**
     * Create the path for the current brush's bristle
     * @param {ICoordinate[]} points - Points to follow in path creation
     * @param {number} width - Width of current bristle
     * @param {string} color - Color of current bristle
     */
    private addSVGLine;
    /**
     * Creates a new paintbrush path from mouse events
     * @param {string} id - Id to set in the path
     */
    private createNewPaintBrushPath;
}
