import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';
import { ICoordinate } from '../../../../interfaces/brushes/coordinate';
import { ICanvasPathBrush } from '../../../../interfaces/brushes/canvas-path-brush';
import { ICanvasObject } from '../../../../interfaces/objects/canvas-object';

export class DashedBrush extends fabric.PencilBrush {
  /**
   * Canvas to draw the path
   */
  private canvas: fabric.Canvas;

  /**
   * User that will draw
   */
  private userId: string;

  /**
   * Flag to know if currently is possible draw in the given canvas,
   * basically used to avoid draw in the canvas in a mouse move event
   * when mouse down is not happening
   */
  private isDrawing: boolean;

  /**
   * Array to store the points to draw the path that will conform
   * the final group of paths with their respective width
   */
  private points: ICoordinate[];

  /**
   * Recent created path with the current points
   */
  private currentPath: fabric.Path | null;

  /**
   * Class Constructor
   * @param {fabric.Canvas} canvas - Canvas to draw
   * @param {string} userId - User that will draw
   */
  constructor(canvas: fabric.Canvas, userId: string) {
    super();

    this.canvas = canvas;
    this.userId = userId;
    this.isDrawing = false;
    this.points = [];
    this.currentPath = null;
  }

  /**
   * Creates a new Dashed Brush Path with the given parameters
   * @param {string} id - Id to set in the new path object
   * @param {ICoordinate[]} points - Points to follow
   * and draw the new path object
   * @param {number} width - General width that the draw
   * will have (lineWidth value)
   * @param {string} color - Path Color
   */
  public createDashedPath(
    id: string,
    points: ICoordinate[],
    width: number,
    color: string
  ) {
    const dashedPath = new fabric.Path(
      super
        .convertPointsToSVGPath(
          points.map((point) => {
            return new fabric.Point(point.x, point.y);
          })
        )
        .join(''),
      {
        fill: 'transparent',
        stroke: color,
        strokeWidth: width,
        strokeLineJoin: 'round',
        strokeLineCap: 'round',
        strokeUniform: true,
        strokeDashArray: [width * 2],
      }
    );

    (dashedPath as unknown as ICanvasPathBrush).set({
      id: id,
      basePath: {
        type: 'dashed',
        points: points,
        stroke: color,
        strokeWidth: width,
      },
    });

    return dashedPath;
  }

  /**
   * Mouse Down Event, starts to draw in the canvas
   * @param {ICoordinate} e - Event Coordinate value
   */
  public onMouseDown(e: ICoordinate) {
    if (this.isDrawing) return;

    this.isDrawing = true;
    this.points.push(e);
  }

  /**
   * Mouse Move Event, detects mouse movement to set the position of each point
   * @param {ICoordinate} e - Event Coordinate value
   */
  public onMouseMove(e: ICoordinate) {
    if (!this.isDrawing) return;

    this.points.push(e);

    if (this.currentPath) {
      this.canvas.remove(this.currentPath);
    }

    this.currentPath = this.createDashedPath(
      'provisional',
      this.points,
      this.width,
      this.color
    );

    this.canvas.add(this.currentPath);
  }

  /**
   * Mouse Up Event, finish drawing in canvas
   * and creates the new path with the given points
   */
  public onMouseUp() {
    if (!this.isDrawing) return;

    this.isDrawing = false;

    if (this.currentPath) {
      this.canvas.remove(this.currentPath);
    }

    if (this.points.length > 1) {
      const path = this.createDashedPath(
        `${this.userId}:${uuidv4()}`,
        this.points,
        this.width,
        this.color
      );

      this.points = [];

      path.setCoords();
      this.canvas.add(path);
      this.canvas.renderAll();
    }
  }
}
