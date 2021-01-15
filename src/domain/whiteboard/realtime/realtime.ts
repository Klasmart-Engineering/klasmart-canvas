import { fabric } from 'fabric';
import * as shapes from '../shapes/shapes';

/**
 * Point interface.
 */
interface IPoint {
  x: number;
  y: number;
}

export interface IRealtimeData {
  type: string;
  target: fabric.Object;
  coordinates?: IPoint[];
  shape?: { [key: string]: string | number | undefined };
}

/**x
 * Class to handle realtime creation of objects.
 */
export class Realtime {
  /**
   * Pointer coordinates.
   */
  public pointer: IPoint | null;

  /**
   * Canvas element
   */
  public canvas: HTMLCanvasElement;

  /**
   * Points for path that is in process of being drawn
   */
  public points: IPoint[];

  /**
   * Stroke color, used when adding in realtime
   */
  private color!: { r: number; g: number; b: number };

  /**
   * Line width of object being added.
   */
  private lineWidth!: number;

  /**
   * Canvas context
   */
  private context: any;

  /**
   * Temporary canvas will erasing will take place.
   */
  private tempCanvas: fabric.Canvas | null;

  /**
   * Indicates shape to be drawn
   */
  private type: string | null;

  /**
   * Canvas width
   */
  private width: number;

  /**
   * Canvas height
   */
  private height: number;

  /**
   *
   * @param width Canvas width
   * @param height Canvas height
   * @param id User / instance id
   */
  constructor(width: number, height: number, id: string) {
    this.canvas = document.createElement('canvas');
    this.canvas.id = id;

    this.canvas.style.cssText =
      'position: absolute; z-index: 3; pointer-events: none;';

    this.canvas.width = width as number;
    this.canvas.height = height as number;
    this.pointer = null;
    this.points = [];
    this.context = null;
    this.type = null;
    this.tempCanvas = null;
    this.width = width;
    this.height = height;
  }

  /**
   * Initiates realtime process for adding elements to canvas.
   * @param canvas Canavs
   * @param type type of object being added
   * @param color Coloro of object being added
   * @param lineWidth Line width of object being added
   */
  public init(
    canvas: fabric.Canvas,
    type: string,
    color: string,
    lineWidth: number
  ) {
    if (type !== 'PencilBrush' && type !== 'text') {
      this.tempCanvas = new fabric.Canvas(this.canvas, {
        width: this.width,
        height: this.height,
      });
    }

    let fabricCanvas = canvas.getElement();
    fabricCanvas.parentNode?.insertBefore(this.canvas, fabricCanvas);
    this.context = this.canvas.getContext('2d');
    this.color = this.hexToRgb(color);
    this.lineWidth = lineWidth;
    this.type = type;
  }

  /**
   * Checks if instance is initiated.
   */
  public isInitiated() {
    return this.context !== null;
  }

  /**
   * Converts 6 digit hex to rgb
   * @param color 6 digit hex color
   */
  private hexToRgb(color: string): any | null {
    let parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

    return parsed
      ? {
          r: parseInt(parsed[1], 16),
          g: parseInt(parsed[2], 16),
          b: parseInt(parsed[3], 16),
        }
      : null;
  }

  /**
   *
   * @param target Contains shape information.
   */
  public draw(target: IRealtimeData) {
    switch (this.type) {
      case 'PencilBrush': {
        this.drawPath(target.coordinates as IPoint[]);
        break;
      }
      case 'rectangle': {
        this.rectDraw(target);
        break;
      }
      case 'circle': {
        this.ellipseDraw(target);
        break;
      }
      case 'triangle': {
        this.triangleDraw(target);
        break;
      }
      case 'pentagon': {
        this.pentagonDraw(target);
        break;
      }
      case 'hexagon': {
        this.hexagonDraw(target);
        break;
      }
      case 'star': {
        this.starDraw(target);
        break;
      }
      case 'chatBubble': {
        this.chatDraw(target);
        break;
      }
      case 'arrow': {
        this.arrowDraw(target);
        break;
      }
    }
  }

  /**
   * Draws a path.
   * @param points Path points
   */
  public drawPath(points: IPoint[]) {
    if (!points) {
      return;
    }

    let i = 0;
    this.clear();

    this.context.strokeStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},1)`;
    this.context.lineCap = 'round';
    this.context.lineWidth = this.lineWidth;
    this.context.beginPath();
    this.context.moveTo(points[0], points[0]);
    points.shift();

    for (i; i < points.length; i++) {
      this.context.lineTo(points[i].x, points[i].y);
    }

    this.context.stroke();
  }

  /**
   * Draws a shape
   * @param target Canvas target
   */
  public rectDraw(target: any) {
    this.clear();

    if (!target || !target.shape) {
      return;
    }

    const rect = shapes.rectangle(
      target.shape.width,
      target.shape.height,
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeDashArray?.length
    );

    rect.set({
      top: target.shape.top,
      left: target.shape.left,
      originX: target.shape.originX,
      originY: target.shape.originY,
    });

    this.tempCanvas?.add(rect);
    this.tempCanvas?.renderAll();
  }

  /**
   * Draws circle
   * @param target Data of shape to be drawn.
   */
  public ellipseDraw(target: any) {
    this.clear();
    const ellipse = shapes.circle(
      target.shape.width,
      target.shape.height,
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeDashArray?.length
    );
    ellipse.set({
      top: target.shape.top,
      left: target.shape.left,
      originX: target.shape.originX,
      originY: target.shape.originY,
    });
    this.tempCanvas?.add(ellipse);
    this.tempCanvas?.renderAll();
  }

  public triangleDraw(target: any) {
    this.tempCanvas?.clear();
    const triangle = shapes.triangle(
      target.shape.width,
      target.shape.height,
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeDashArray?.length
    );

    triangle.set({
      top: target.shape.top,
      left: target.shape.left,
      originX: target.shape.originX,
      originY: target.shape.originY,
    });

    this.tempCanvas?.add(triangle);
    this.tempCanvas?.renderAll();
  }

  /**
   *
   * @param target Shape information
   */
  private shapeProps(shape: IRealtimeData['shape']) {
    return {
      top: shape?.top,
      left: shape?.left,
      originX: shape?.originX,
      originY: shape?.originY,
      scaleX: shape?.scaleX,
      scaleY: shape?.scaleY,
    };
  }

  /**
   * Draws pentagon
   * @param target Shape information
   */
  public pentagonDraw(target: any) {
    this.tempCanvas?.clear();
    const pentagon = shapes.pentagon(
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeDashArray?.length
    );

    // @ts-ignore
    pentagon.set(this.shapeProps(target.shape));

    this.tempCanvas?.add(pentagon);
    this.tempCanvas?.renderAll();
  }

  /**
   * Draws hegaxon
   * @param target Shape information
   */
  public hexagonDraw(target: any) {
    this.tempCanvas?.clear();
    const hexagon = shapes.hexagon(
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeDashArray?.length
    );

    // @ts-ignore
    hexagon.set(this.shapeProps(target.shape));
    this.tempCanvas?.add(hexagon);
    this.tempCanvas?.renderAll();
  }

  /**
   * Draws star
   * @param target Shape inforamtion
   */
  public starDraw(target: any) {
    this.tempCanvas?.clear();
    const star = shapes.star(
      2,
      2,
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeDashArray?.length
    );

    // @ts-ignore
    star.set(this.shapeProps(target.shape));
    this.tempCanvas?.add(star);
    this.tempCanvas?.renderAll();
  }

  /**
   * Draws chat bubble
   * @param target Shape information
   */
  public chatDraw(target: any) {
    this.tempCanvas?.clear();
    const chat = shapes.chat(
      2,
      2,
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeWidth
    );

    // @ts-ignore
    chat.set(this.shapeProps(target.shape));
    this.tempCanvas?.add(chat);
    this.tempCanvas?.renderAll();
  }

  /**
   * Draws arrow
   * @param target Shape information
   */
  public arrowDraw(target: any) {
    this.tempCanvas?.clear();
    const arrow = shapes.arrow(
      2,
      2,
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeWidth
    );

    // @ts-ignore
    arrow.set(this.shapeProps(target.shape));
    this.tempCanvas?.add(arrow);
    this.tempCanvas?.renderAll();
  }

  /**
   * Real time text drawing process.
   * @param target
   */
  public textDraw(target: any) {
    this.clear();
    this.context.font = `${target.fontSize}px ${target.fontFamily}`;
    this.context.fillStyle = target.fill || '#000000';
    this.context.fillText(
      target.text,
      target.left,
      target.top + target.height - 7
    );
  }

  /**
   * Clears temporary canvas.
   */
  private clear() {
    this.context.clearRect(
      0,
      0,
      this.canvas.width as number,
      this.canvas.height as number
    );

    this.tempCanvas?.clear();
  }

  /**
   * Removes / destroys temporary canvas.
   */
  public remove() {
    if (!this.isInitiated()) {
      return;
    }

    this.clear();
    this.canvas?.remove();
  }
}
