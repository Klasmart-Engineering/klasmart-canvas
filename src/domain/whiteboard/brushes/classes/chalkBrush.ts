import { fabric } from 'fabric';
import tinycolor from 'tinycolor2';
import { ICoordinate } from '../../../../interfaces/brushes/coordinate';
import { IClearRect } from '../../../../interfaces/brushes/clear-rects';
import { v4 as uuidv4 } from 'uuid';
import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';

interface IClearRectDimensions {
  width: number;
  height: number;
}

type IBrushStyle = 'chalk' | 'crayon';

export class ChalkBrush extends fabric.PencilBrush {
  /**
   * Canvas to print the path
   */
  private canvas: fabric.Canvas;

  /**
   * Temporal canvas for draw the path and convert it in image
   */
  private tempCanvas: fabric.Canvas;

  /**
   * Context for original canvas
   */
  private ctx: CanvasRenderingContext2D;

  /**
   * Context for temporal canvas
   */
  private tempContext: CanvasRenderingContext2D;

  /**
   * User that will draw
   */
  private userId: string;

  /**
   * Flag to know if is possible draw or not.
   * When mouse pressed the value is true and when released is false.
   */
  private isDrawing: boolean;

  /**
   * Last registered point in the mouse move event
   */
  private lastPoint: ICoordinate;

  /**
   * Registered points to follow them and create the path
   */
  private points: ICoordinate[];

  /**
   * Registered clear rects used to create the chalk/crayon effect
   */
  private clearRects: IClearRect[];

  /**
   * Style of the brush (chalk/crayon)
   */
  private style: IBrushStyle;

  /**
   * Brightness in path stroke
   */
  private brightness: number;

  /**
   * Dimensions for the generated clear rects
   */
  private clearRectDimensions: IClearRectDimensions;

  /**
   * Class Constructor
   * @param {fabric.Canvas} canvas - Canvas to print the path
   * @param {string} userId - Id of the user that will draw
   * @param {IBrushStyle} style - Style for the brush (chalk/crayon)
   */
  constructor(canvas: fabric.Canvas, userId: string, style: IBrushStyle) {
    super();
    this.canvas = canvas;
    this.userId = userId;
    this.style = style;
    this.brightness = style === 'chalk' ? 20 : 0;
    this.clearRectDimensions =
      style === 'chalk' ? { width: 3, height: 1 } : { width: 1, height: 1 };

    // Temporal canvas creation
    this.tempCanvas = new fabric.Canvas(document.createElement('canvas'));
    this.tempCanvas.setWidth(canvas.getWidth() * 2);
    this.tempCanvas.setHeight(canvas.getHeight() * 2);

    // Contexts creations
    this.ctx = this.canvas.getContext();
    this.tempContext = this.tempCanvas.getContext();

    // Drawing variables initialization
    this.isDrawing = false;
    this.lastPoint = { x: 0, y: 0 };
    this.points = [];
    this.clearRects = [];
  }

  /**
   * Method used to draw in both contexts, save the points for the path
   * and save clear rects to generate the chalk/crayon path
   * @param {ICoordinate} point - Next point to continue drawing and register
   */
  private draw(point: ICoordinate) {
    // Saving current point
    this.points.push(point);

    // Starting line in temporal canvas
    this.tempContext.beginPath();
    this.tempContext.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.tempContext.lineTo(point.x, point.y);
    this.tempContext.stroke();

    // Starting line in original canvas
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.ctx.lineTo(point.x, point.y);
    this.ctx.stroke();

    // Chalk Effect
    const clearRectsInPoint = this.createClearRects(
      point,
      this.lastPoint,
      this.width
    );

    clearRectsInPoint.forEach((rect) => {
      this.tempContext.clearRect(
        rect.originPoint.x,
        rect.originPoint.y,
        rect.width,
        rect.height
      );

      this.ctx.clearRect(
        rect.originPoint.x,
        rect.originPoint.y,
        rect.width,
        rect.height
      );

      this.clearRects.push(rect);
    });

    this.lastPoint = point;
  }

  /**
   * Creates a new chalk path based on the given parameters
   * @param {string} id - Id for the path
   * @param {ICoordinate[]} points - Points to follow and construct the path
   * @param {number} width - Width that the path will have
   * @param {string} color - Color that the path will have
   * @param {IClearRect[]} clearRects - Clear rects to generate
   * the chalk/crayon effect
   */
  public async createChalkPath(
    id: string,
    points: ICoordinate[],
    width: number,
    color: string,
    clearRects: IClearRect[]
  ): Promise<ICanvasBrush> {
    try {
      let imagePath;
      const line = super
        .convertPointsToSVGPath(
          points.map((point) => {
            return new fabric.Point(point.x, point.y);
          })
        )
        .join('');

      const path = new fabric.Group([
        new fabric.Path(line, {
          fill: 'transparent',
          stroke: tinycolor(color)
            .brighten(this.brightness + 5)
            .toHexString(),
          strokeWidth: width,
          strokeLineJoin: 'round',
          strokeLineCap: 'round',
          strokeUniform: true,
        }),
        ...clearRects.map((rect: IClearRect) => {
          return new fabric.Rect({
            left: rect.originPoint.x,
            top: rect.originPoint.y,
            width: rect.width * 0.9,
            height: rect.height * 0.9,
            fill: 'red',
            stroke: 'red',
            strokeWidth: 0,
            globalCompositeOperation: 'destination-out',
          });
        }),
      ]);

      const top = path.top;
      const left = path.left;

      path.set({
        top: 0,
        left: 0,
      });

      this.tempCanvas.add(path);
      path.addWithUpdate();
      this.tempCanvas.renderAll();

      this.tempCanvas.setWidth(Number(path.width));
      this.tempCanvas.setHeight(Number(path.height));

      const tempData = this.tempCanvas.toDataURL();

      const imagePromise = new Promise((resolve, reject) => {
        try {
          fabric.Image.fromURL(tempData, (image) => {
            ((image as unknown) as ICanvasBrush).set({
              id: id,
              top: top,
              left: left,
              basePath: {
                type: this.style,
                points: points,
                stroke: color,
                strokeWidth: width,
                imageData: image.getSrc(),
              },
            });

            this.tempCanvas.clear();
            this.tempCanvas.remove();

            resolve(image);
          });
        } catch (e) {
          reject(e);
        }
      });

      await imagePromise
        .then((response) => {
          imagePath = response;
        })
        .catch((e) => {
          throw e;
        });

      if (!imagePath) throw new Error('Path Image not retrieved');
      return imagePath;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Creates the clear rects to generate the chalk effect
   * @param {ICoordinate[]} points - Points to follow in the path
   * @param {number} width - Width that the path will have
   */
  public createChalkEffect(points: ICoordinate[], width: number) {
    let clearRects: IClearRect[] = [];
    let lastPoint: ICoordinate;

    points.forEach((point) => {
      if (!lastPoint) {
        lastPoint = point;
      } else {
        clearRects.push(...this.createClearRects(point, lastPoint, width));
        lastPoint = point;
      }
    });

    return clearRects;
  }

  /**
   * Mouse Down Event, starts drawing in canvas
   * @param {ICoordinate} e - Mouse pointer coordinate
   */
  public onMouseDown(e: ICoordinate) {
    this.isDrawing = true;
    this.lastPoint = e;

    this.initializeContextProperties();

    this.points.push(e);
    this.draw({ x: e.x + 1, y: e.y + 1 });
  }

  /**
   * Mouse Move Event, continue drawing in canvas
   * @param {ICoordinate} e - Mouse pointer coordinate
   */
  public onMouseMove(e: ICoordinate) {
    if (!this.isDrawing) return;

    this.draw(e);
  }

  /**
   * Mouse Up Event, finishes canvas drawing
   */
  public onMouseUp() {
    this.isDrawing = false;

    this.createChalkPath(
      `${this.userId}:${uuidv4()}`,
      this.points,
      this.width,
      this.color,
      this.clearRects
    ).then((response) => {
      if (response) {
        this.canvas.add(response);
      }

      this.canvas.renderAll();
    });

    this.points = [];
    this.clearRects = [];
  }

  /**
   * Creates the random clear rects to be used in chalk/crayon effect
   * @param {ICoordinate} point - Current Point
   * @param {ICoordinate} lastPoint - Last registered point
   * @param {number} width - Width thath the path will have
   */
  private createClearRects(
    point: ICoordinate,
    lastPoint: ICoordinate,
    width: number
  ) {
    let clearRects = [];
    const length = Math.round(
      Math.sqrt(
        Math.pow(point.x - lastPoint.x, 2) + Math.pow(point.y - lastPoint.y, 2)
      ) /
        (5 / width)
    );

    const unit: ICoordinate = {
      x: (point.x - lastPoint.x) / length,
      y: (point.y - lastPoint.y) / length,
    };

    for (let i = 0; i < length; i += 1) {
      const current: ICoordinate = {
        x: lastPoint.x + i * unit.x,
        y: lastPoint.y + i * unit.y,
      };

      const random: ICoordinate = {
        x: current.x + (Math.random() - 0.5) * width * 1.2,
        y: current.y + (Math.random() - 0.5) * width * 1.2,
      };

      const generatedRect: IClearRect = {
        originPoint: random,
        width: this.clearRectDimensions.width,
        height: this.clearRectDimensions.height,
      };

      clearRects.push(generatedRect);
    }

    return clearRects;
  }

  /**
   * Initialize the properties related with the drawing to create
   * like color and width in both canvases
   */
  private initializeContextProperties() {
    this.tempContext.lineWidth = this.width;
    this.tempContext.lineCap = 'round';
    this.tempContext.lineJoin = 'round';
    this.tempContext.strokeStyle = tinycolor(this.color)
      .brighten(this.brightness)
      .toHexString();

    this.ctx.lineWidth = this.width;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = tinycolor(this.color)
      .brighten(this.brightness)
      .toHexString();
  }
}
