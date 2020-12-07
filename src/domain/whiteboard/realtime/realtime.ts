import fabric from 'fabric/fabric-impl';

/**
 * Point interface.
 */
interface IPoint {
  x: number;
  y: number;
}

export class Realtime {
  /**
   * Pointer coordinates.
   */
  public pointer: IPoint | null;

  /**
   * Canvas element
   */
  public canvas: HTMLCanvasElement;

  public points: IPoint[];

  private color!: { r: number; g: number; b: number; };

  private lineWidth!: number;

  /**
   * Canvas context
   */
  private context: any;


  private id: string;


  private tool: string | null;

  constructor(
    width: number,
    height: number,
    tool: any,
    id: string,
  ) {
    this.canvas = document.createElement('canvas');
    this.canvas.id = id;
    this.id = id;

    this.canvas.style.cssText =
      'position: absolute; z-index: 3; pointer-events: none;';

    this.canvas.width = width as number;
    this.canvas.height = height as number;
    this.pointer = null;
    this.points = [];
    this.context = null;
    this.tool = null;
  }

  public init(canvas: fabric.Canvas, type: string, color: string, lineWidth: number) {
    let fabricCanvas = canvas.getElement();
    fabricCanvas.parentNode?.insertBefore(this.canvas, fabricCanvas);
    this.context = this.canvas.getContext('2d');
    this.tool = type;
    this.color = this.hexToRgb(color);
    this.lineWidth = lineWidth;

    if (type === 'rectangle') {
      this.context.translate(0.5,0.5);
    }
  }

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

  public draw(points: IPoint[]) {
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

  public shapeDraw(target: any) {
    this.clear();
    this.context.lineWidth = target.shape.strokeWidth;
    this.context.strokeStyle = target.shape.color || '#000000';// ;`rgba(${this.color.r},${this.color.g},${this.color.b},1)`;
    this.context.strokeRect(target.shape.left, target.shape.top, target.shape.width, target.shape.height);
  }

  private clear() {
    this.context.clearRect(
      0,
      0,
      this.canvas.width as number,
      this.canvas.height as number
    );
  }

  public remove() {
    if (!this.isInitiated()) {
      return;
    }

    this.clear();
    this.canvas?.remove();
  }
}