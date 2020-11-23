import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
import { v4 as uuidv4 } from 'uuid';
import { IPenPoint } from '../../../../interfaces/brushes/pen-point';
import { ICoordinate } from '../../../../interfaces/brushes/coordinate';

export class PenBrush extends fabric.PencilBrush {
  /**
   * Canvas to draw
   */
  private canvas: Canvas;

  /**
   * userId of the user
   */
  private userId: string;

  /**
   * State to know if currently is possible draw in the given canvas,
   * basically used to avoid draw in the canvas in a mouse move event
   * when mouse down is not happening
   */
  private isDrawing: boolean = false;

  /**
   * Array to store the points to draw the paths that will conform
   * the final group of paths with their respective width
   */
  private points: IPenPoint[] = [];

  /**
   * Class Constructor
   * @param {Canvas} canvas - Canvas to draw
   * @param {string} userId - userId of the current user
   */
  constructor(canvas: Canvas, userId: string) {
    super();
    this.userId = userId;
    this.canvas = canvas;
  }

  /**
   * Returns a random int from a given min value to a given max value,
   * basically is used here to set a different width in each path generated
   * @param {number} min - Random Number minimum value
   * @param {number} max - Random NUmber maximum value
   */
  public getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Mouse Down Event, starts to draw in the canvas
   * @param {ICoordinate} e - Event Coordinate value
   */
  public onMouseDown(e: ICoordinate) {
    /*
      If line is so thinner flood-fill can fail.
      To avoid this, 2px line will be converted to a 3px line.
    */
    const min = this.width === 2 ? this.width : this.width / 2;
    const max = this.width === 2 ? this.width + 1 : this.width;

    this.isDrawing = true;
    this.points.push(
      {
        x: e.x,
        y: e.y,
        width: this.getRandomInt(min, max),
      },
      {
        x: e.x,
        y: e.y,
        width: this.getRandomInt(min, max),
      }
    );
  }

  /**
   * Mouse Move Event, detects mouse movement to set the position of each point
   * @param {ICoordinate} e - Event Coordinate value
   */
  public onMouseMove(e: ICoordinate) {
    if (!this.isDrawing) return;
    /*
      If line is so thinner flood-fill can fail.
      To avoid this, 2px line will be converted to a 3px line.
    */
    const min = this.width === 2 ? this.width : this.width / 2;
    const max = this.width === 2 ? this.width + 1 : this.width;
    const ctx = this.canvas.getContext();

    this.points.push({
      x: e.x,
      y: e.y,
      width: this.getRandomInt(min, max),
    });

    for (let i = 1; i < this.points.length; i++) {
      ctx.beginPath();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.moveTo(this.points[i - 1].x, this.points[i - 1].y);
      ctx.lineWidth = this.points[i].width;
      ctx.strokeStyle = this.color;
      ctx.lineTo(this.points[i].x, this.points[i].y);
      ctx.stroke();
    }
  }

  /**
   * Mouse Up Event, finish drawing in canvas
   * and creates the new path with the given points
   */
  public onMouseUp() {
    this.isDrawing = false;

    let path: ICanvasBrush = this.createPenPath(
      `${this.userId}:${uuidv4()}`,
      this.points,
      this.width,
      this.color
    );

    this.canvas.add(path);
    this.canvas.requestRenderAll();
    path.setCoords();

    this.points.length = 0;
  }

  /**
   * Creates a new Pen Brush Path with the given parameters
   * @param {string} id - Id to set in the new path object
   * @param {IPenPoint[]} points - Points to follow and draw the new path object
   * @param {number} width - General width that the draw
   * will have (lineWidth value)
   * @param {string} color - Path Color
   */
  public createPenPath(
    id: string,
    points: { x: number; y: number; width: number }[],
    width: number,
    color: string
  ) {
    let paths: fabric.Path[] = [];
    let penPath: ICanvasBrush;

    points.forEach((point, index) => {
      if (!index) return;

      paths.push(
        new fabric.Path(
          super
            .convertPointsToSVGPath([
              {
                x: points[index - 1].x,
                y: points[index - 1].y,
              },
              {
                x: point.x,
                y: point.y,
              },
            ])
            .join(''),
          {
            strokeWidth: point.width,
            stroke: color,
            strokeLineCap: 'round',
            strokeLineJoin: 'round',
            strokeUniform: true,
          }
        )
      );
    });

    penPath = new fabric.Group(paths);
    penPath.set({
      id: id,
      basePath: {
        type: 'pen',
        points: [...points],
        stroke: color,
        strokeWidth: width,
      },
    });

    return penPath;
  }
}
