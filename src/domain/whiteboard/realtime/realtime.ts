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

  /**
   * Points for path that is in process of being drawn
   */
  public points: IPoint[];

  /** 
   * Stroke color, used when adding in realtime 
   */
  private color!: { r: number; g: number; b: number; };

  /**
   * Line width of object being added.
   */
  private lineWidth!: number;

  /**
   * Canvas context
   */
  private context: any;

  /**
   * User / instance id.
   */
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

  /**
   * Initiates realtime process for adding elements to canvas.
   * @param canvas Canavs
   * @param type type of object being added
   * @param color Coloro of object being added
   * @param lineWidth Line width of object being added
   */
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
   * Draws a path.
   * @param points Path points
   */
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

  /**
   * Draws a shape
   * @param target Canvas target
   */
  public shapeDraw(target: any) {
    this.clear();
    this.context.lineWidth = target.shape.strokeWidth;
    this.context.strokeStyle = target.shape.color || '#000000';// ;`rgba(${this.color.r},${this.color.g},${this.color.b},1)`;
    this.context.strokeRect(target.shape.left, target.shape.top, target.shape.width, target.shape.height);
  }

  /**
   * Real time text drawing process.
   * @param target 
   */
  public textDraw(target: any) {
    // text code here
    // this.clear();
    // this.context.strokeText('Hello ', 10, 50);
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