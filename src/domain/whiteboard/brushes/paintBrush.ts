import tinycolor from 'tinycolor2';
import { fabric } from 'fabric';
import { ICoordinate } from '../../../interfaces/brushes/coordinate';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { v4 as uuidv4 } from 'uuid';
import { IBristle } from '../../../interfaces/brushes/bristle';

export class PaintBrush extends fabric.PencilBrush {
  /**
   * Canvas to draw
   */
  private canvas: fabric.Canvas;

  /**
   * Context for the given canvas
   */
  private ctx: CanvasRenderingContext2D;

  /**
   * Id of the user that will draw
   */
  private userId: string;

  /**
   * Brightness variation factor,
   * path colors variation is proportional to this number
   */
  private varyBrightness: number = 10;

  // Drawing state

  /**
   * Latest registered point
   */
  private latestPoint: ICoordinate;

  /**
   * Points to use to create the path
   */
  private points: ICoordinate[] = [];

  /**
   * Points registered for each brush's bristle,
   * when a new line will be created
   */
  private brushPoints: ICoordinate[][] = [];

  /**
   * Flag to know if is possible draw o not
   * true: mouse clicked, false: mouse released
   */
  private isDrawing: boolean = false;

  /**
   * Current registered angle in the drawing path
   */
  private currentAngle: number;

  /**
   * Brush state in this drawing,
   * contains properties necessaries to create variations in the drawing path
   */
  private currentBrush: IBristle[] = this.makeBrush(this.color, this.width);

  /**
   * Class Constructor
   * @param {fabric.Canvas} canvas - Canvas to draw
   * @param {string} userId - User that will draw
   */
  constructor(canvas: fabric.Canvas, userId: string) {
    super();
    this.canvas = canvas;
    this.ctx = this.canvas.getContext();
    this.userId = userId;
    this.latestPoint = { x: 0, y: 0 };
    this.currentAngle = 0;
  }

  /**
   * Creates a color variation of the given color
   * @param {string} color - Color to create a variation
   */
  private varyColor(color: string) {
    const amount = Math.round(Math.random() * 2 * this.varyBrightness);
    const newColor = tinycolor(color);
    const varied =
      amount > this.varyBrightness
        ? newColor.brighten(amount - this.varyBrightness)
        : newColor.darken(amount);

    return varied.toHexString();
  }

  /**
   * Create a brush state to use in the current drawing,
   * set the properties to make this drawing different
   * @param {string} color - Path original stroke color
   * @param {number} size - Path original stroke width
   */
  public makeBrush(color: string, size: number) {
    let bristleCount = Math.round(size / 3);
    const brush: IBristle[] = [];
    const gap = size / bristleCount;

    for (let i = 0; i < bristleCount; i += 1) {
      const distance =
        i === 0 ? 0 : gap * i + (Math.random() * gap) / 2 - gap / 2;
      brush.push({
        distance,
        thickness: Math.random() * 2 + 2,
        color: this.varyColor(color),
      });

      if (this.brushPoints) {
        this.brushPoints.push([]);
      }
    }

    return brush;
  }

  // Geometry

  /**
   * Set a new point based in the angle drawing
   * @param {number} distance - Distance of this bristle
   * respect the original point
   * @param {number} angle - Angle in which the draw is made.
   * @param {ICoordinate} origin - Origin point
   */
  private rotatePoint(distance: number, angle: number, origin: ICoordinate) {
    return {
      x: origin.x + distance * Math.cos(angle),
      y: origin.y + distance * Math.sin(angle),
    };
  }

  /**
   * Get bearing of origin and destination points
   * @param {ICoordinate} origin - Origin Point
   * @param {ICoordinate} destination - Destination Point
   */
  private getBearing(origin: ICoordinate, destination: ICoordinate) {
    return (
      (Math.atan2(destination.y - origin.y, destination.x - origin.x) -
        Math.PI / 2) %
      (Math.PI * 2)
    );
  }

  /**
   * Set a new angle based in origin and destination points
   * and the current angle
   * @param {ICoordinate} origin - Origin Point
   * @param {ICoordinate} destination - Destination Point
   * @param {number} oldAngle - Current Angle
   */
  private getNewAngle(
    origin: ICoordinate,
    destination: ICoordinate,
    oldAngle: number
  ) {
    const bearing = this.getBearing(origin, destination);
    if (typeof oldAngle === 'undefined') {
      return bearing;
    }

    return oldAngle - this.angleDiff(oldAngle, bearing);
  }

  /**
   * Get the difference between two angles
   * @param {number} angleA - first angle
   * @param {number} angleB - second angle
   */
  private angleDiff(angleA: number, angleB: number) {
    const twoPi = Math.PI * 2;
    const diff =
      ((angleA - (angleB > 0 ? angleB : angleB + twoPi) + Math.PI) % twoPi) -
      Math.PI;
    return diff < -Math.PI ? diff + twoPi : diff;
  }

  // Drawing Functions

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
  private strokeBristle(
    origin: ICoordinate,
    destination: ICoordinate,
    bristle: IBristle,
    controlPoint: ICoordinate,
    bristleNumber: number
  ) {
    this.ctx.beginPath();
    this.ctx.moveTo(origin.x, origin.y);

    this.brushPoints[bristleNumber].push(origin);

    this.ctx.strokeStyle = bristle.color;
    this.ctx.lineWidth = bristle.thickness;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.shadowColor = bristle.color;
    this.ctx.shadowBlur = bristle.thickness / 2;

    this.ctx.quadraticCurveTo(
      controlPoint.x,
      controlPoint.y,
      destination.x,
      destination.y
    );

    this.ctx.lineTo(destination.x, destination.y);

    if (this.brushPoints[bristleNumber]) {
      this.brushPoints[bristleNumber].push(destination);
    }

    this.ctx.stroke();

    this.ctx.shadowColor = 'rgba(0, 0, 0, 0)';
    this.ctx.shadowBlur = 0;
  }

  /**
   * Draw each brush's bristle
   * @param {IBristle[]} bristles - Bristles of the Brush
   * @param {ICoordinate} origin - Origin Point
   * @param {ICoordinate} destination - DEstination Point
   * @param {number} oldAngle - Angle in the previous point
   * @param {number} newAngle - Angle in the current point
   */
  private drawStroke(
    bristles: IBristle[],
    origin: ICoordinate,
    destination: ICoordinate,
    oldAngle: number,
    newAngle: number
  ) {
    bristles.forEach((bristle, index) => {
      this.ctx.beginPath();

      let bristleOrigin = this.rotatePoint(
        bristle.distance - this.width / 2,
        oldAngle,
        origin
      );

      let bristleDestination = this.rotatePoint(
        bristle.distance - this.width / 2,
        newAngle,
        destination
      );

      const controlPoint = this.rotatePoint(
        bristle.distance - this.width / 2,
        newAngle,
        origin
      );

      bristleDestination = this.rotatePoint(
        bristle.distance - this.width / 2,
        newAngle,
        destination
      );

      this.strokeBristle(
        bristleOrigin,
        bristleDestination,
        bristle,
        controlPoint,
        index
      );
    });
  }

  /**
   * Keep doing the drawing in canvas
   * @param {ICoordinate} newPoint - New point to continue drawing
   */
  private continueStroke(newPoint: ICoordinate) {
    const newAngle = this.getNewAngle(
      this.latestPoint,
      newPoint,
      this.currentAngle
    );

    this.drawStroke(
      this.currentBrush,
      this.latestPoint,
      newPoint,
      this.currentAngle,
      newAngle
    );

    this.currentAngle = newAngle % (Math.PI * 2);
    this.latestPoint = newPoint;
    this.points.push(newPoint);
  }

  /**
   * Start to draw in canvas
   * @param {ICoordinate} point - Point in which the drawing starts
   */
  private startStroke(point: ICoordinate) {
    this.currentAngle = 0;
    this.currentBrush = this.makeBrush(this.color, this.width);
    this.isDrawing = true;
    this.latestPoint = point;
    this.points.push(point);
  }

  // Mouse Events

  /**
   * Mouse Down Event, starts drawing in canvas
   * @param {ICoordinate} e - Event coordinate value
   */
  public onMouseDown(e: ICoordinate) {
    if (this.isDrawing) return;

    this.startStroke(e);
  }

  /**
   * Mouse Move Event, continues with drawing
   * @param {ICoordinate} e - Event coordinate value
   */
  public onMouseMove(e: ICoordinate) {
    if (!this.isDrawing) return;

    this.continueStroke(e);
  }

  /**
   * Mouse Up Event, finishes drawing
   */
  public onMouseUp() {
    if (!this.isDrawing) return;

    this.createNewPaintBrushPath(`${this.userId}:${uuidv4()}`);
  }

  /**
   * Creates a new path based on previous properties
   * and a new modification on it
   * @param {string} id - Id for the path object
   * @param {ICoordinate[]} points - Points to follow in path creation
   * @param {number} width - Path general width
   * @param {string} color - Path general color
   * @param {IBristle[]} bristles - Brush's bristles for this path
   */
  public modifyPaintBrushPath(
    id: string,
    points: ICoordinate[],
    width: number,
    color: string,
    bristles: IBristle[]
  ) {
    let paintBrushPath = new fabric.Group(
      bristles.map((bristle) => {
        let newPoints: ICoordinate[] = [];
        let currentAngle = 0;
        let latestPoint = points[0];

        if (points.length === 1) {
          return this.addSVGLine(
            [points[0], points[0]],
            bristle.thickness,
            bristle.color
          );
        }

        points.forEach((point) => {
          const newAngle = this.getNewAngle(latestPoint, point, currentAngle);

          const bristleOrigin = this.rotatePoint(
            bristle.distance - width / 2,
            currentAngle,
            latestPoint
          );

          const bristleDestination = this.rotatePoint(
            bristle.distance - width / 2,
            newAngle,
            point
          );

          newPoints.push(bristleOrigin, bristleDestination);

          currentAngle = newAngle % (Math.PI * 2);
          latestPoint = point;
        });

        return this.addSVGLine(newPoints, bristle.thickness, bristle.color);
      })
    );

    (paintBrushPath as ICanvasBrush).set({
      id: id,
      basePath: {
        type: 'paintbrush',
        points: points,
        stroke: color,
        strokeWidth: width,
        bristles: bristles,
      },
    });

    return paintBrushPath;
  }

  /**
   * Create the path for the current brush's bristle
   * @param {ICoordinate[]} points - Points to follow in path creation
   * @param {number} width - Width of current bristle
   * @param {string} color - Color of current bristle
   */
  private addSVGLine(points: ICoordinate[], width: number, color: string) {
    return new fabric.Path(
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
        shadow: new fabric.Shadow({
          affectStroke: true,
          nonScaling: true,
          color: color,
          blur: width / 2,
        }),
        strokeWidth: width,
        strokeLineJoin: 'round',
        strokeLineCap: 'round',
        strokeUniform: true,
      }
    );
  }

  /**
   * Creates a new paintbrush path from mouse events
   * @param {string} id - Id to set in the path
   */
  private createNewPaintBrushPath(id: string) {
    if (this.points.length === 1) {
      this.brushPoints.forEach((bristle) => {
        bristle.push(this.points[0], this.points[0]);
      });
    }

    let paintBrushPath = new fabric.Group(
      this.currentBrush.map((bristle, index) => {
        return this.addSVGLine(
          this.brushPoints[index],
          bristle.thickness,
          bristle.color
        );
      })
    );

    (paintBrushPath as ICanvasBrush).set({
      id: id,
      basePath: {
        type: 'paintbrush',
        points: this.points,
        stroke: this.color,
        strokeWidth: this.width,
        bristles: this.currentBrush,
      },
    });

    this.isDrawing = false;
    this.points = [];
    this.brushPoints = [];

    this.canvas.add(paintBrushPath);
    paintBrushPath.addWithUpdate();
    this.canvas.renderAll();
  }
}
