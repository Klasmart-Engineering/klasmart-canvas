import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { ICoordinate } from '../../../interfaces/brushes/coordinate';
import { v4 as uuidv4 } from 'uuid';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';

export class MarkerBrush extends fabric.PencilBrush {
  /**
   * Canvas to print the lines
   */
  private canvas: Canvas;

  /**
   * Id of the user that draw the line
   */
  private userId: string;

  /**
   * Context of the given Canvas
   */
  private ctx: CanvasRenderingContext2D;

  /**
   * Flag to know when is possible draw in the Canvas,
   * when mouse is pressed the value is true and false when is released.
   */
  private isDrawing: boolean = false;

  /**
   * Last registered point
   */
  private lastPoint: { x: number; y: number } | null = null;

  /**
   * All the registered points
   */
  private points: { x: number; y: number }[] = [];

  /**
   * Class constructor
   * @param {Canvas} canvas - Canvas to print the lines
   * @param {string} userId - Id of the user that will draw
   */
  constructor(canvas: Canvas, userId: string) {
    super();
    this.userId = userId;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext();
  }

  /**
   * Mouse Down Event, starts to draw in the canvas
   * @param {ICoordinate} e - Event Coordinate value
   */
  public onMouseDown(e: ICoordinate) {
    this.isDrawing = true;
    this.lastPoint = { x: e.x, y: e.y };
    this.points.push(e);
  }

  /**
   * Mouse Move Event, detects mouse movement to set the position of each point
   * @param {ICoordinate} e - Event Coordinate value
   */
  public onMouseMove(e: ICoordinate) {
    if (!this.isDrawing || !this.lastPoint) return;

    this.points.push(e);
    this.ctx.beginPath();

    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.width / 5;

    this.addContextLine(
      1,
      {
        x: this.lastPoint.x - this.width / 8,
        y: this.lastPoint.y - this.width / 8,
      },
      { x: e.x - this.width / 8, y: e.y - this.width / 8 }
    );

    this.addContextLine(
      0.8,
      {
        x: this.lastPoint.x - this.width / 4,
        y: this.lastPoint.y - this.width / 4,
      },
      { x: e.x - this.width / 4, y: e.y - this.width / 4 }
    );

    this.addContextLine(
      0.6,
      {
        x: this.lastPoint.x,
        y: this.lastPoint.y,
      },
      { x: e.x, y: e.y }
    );

    this.addContextLine(
      0.4,
      {
        x: this.lastPoint.x + this.width / 4,
        y: this.lastPoint.y + this.width / 4,
      },
      { x: e.x + this.width / 4, y: e.y + this.width / 4 }
    );

    this.addContextLine(
      0.2,
      {
        x: this.lastPoint.x + this.width / 8,
        y: this.lastPoint.y + this.width / 8,
      },
      { x: e.x + this.width / 8, y: e.y + this.width / 8 }
    );

    this.lastPoint = { x: e.x, y: e.y };
    this.ctx.globalAlpha = 1;
  }

  /**
   * Mouse Up Event, finish drawing in canvas
   * and creates the new path with the given points
   */
  public onMouseUp() {
    this.isDrawing = false;

    let path = this.createMarkerPath(
      `${this.userId}:${uuidv4()}`,
      this.points,
      this.width,
      this.color
    );

    this.points = [];

    this.canvas.add(path);
    this.canvas.requestRenderAll();
    path.setCoords();
  }

  /**
   * Add a new line in context drawing (path no created)
   * @param {number} alpha - line opacity
   * @param {ICoordinate} start - line start point
   * @param {ICoordinate} end - line end point
   */
  private addContextLine(alpha: number, start: ICoordinate, end: ICoordinate) {
    this.ctx.globalAlpha = alpha;
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  }

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
  private addSVGLine(
    opacity: number,
    points: ICoordinate[],
    color: string,
    width: number,
    difference: number
  ) {
    return new fabric.Path(
      super
        .convertPointsToSVGPath(
          points.map((point) => {
            return new fabric.Point(point.x + difference, point.y + difference);
          })
        )
        .join(''),
      {
        fill: 'transparent',
        stroke: color,
        strokeWidth: width,
        opacity: opacity,
        strokeLineJoin: 'round',
        strokeLineCap: 'round',
        strokeUniform: true,
      }
    );
  }

  /**
   * Creates a new Marker Brush Path with the given parameters
   * @param {string} id - Id to set in the new path object
   * @param {ICoordinate[]} points - Points to follow and draw the path object
   * @param {number} width - General width that the draw
   * will have (lineWidth value)
   * @param {string} color - Path Color
   */
  public createMarkerPath(
    id: string,
    points: ICoordinate[],
    width: number,
    color: string
  ) {
    let markerPath = new fabric.Group([
      this.addSVGLine(1, points, color, width / 5, -width / 8),
      this.addSVGLine(0.8, points, color, width / 5, -width / 4),
      this.addSVGLine(0.6, points, color, width / 5, 0),
      this.addSVGLine(0.4, points, color, width / 5, width / 4),
      this.addSVGLine(0.2, points, color, width / 5, width / 8),
    ]);

    (markerPath as ICanvasBrush).set({
      id: id,
      basePath: {
        type: 'marker',
        points: points,
        stroke: color,
        strokeWidth: width,
      },
    });

    return markerPath;
  }
}
