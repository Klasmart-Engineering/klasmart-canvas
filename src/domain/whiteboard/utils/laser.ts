import fabric from 'fabric/fabric-impl';

/**
 * Point interface.
 */
interface IPoint {
  x: number;
  y: number;
}

/**
 * RGB Interface
 */
interface IRgb {
  r: number;
  g: number;
  b: number;
}

/**
 * Class to manage laser pointer.
 */
export class Laser {
  /**
   * Pointer coordinates.
   */
  public pointer: IPoint;

  /**
   * Canvas element
   */
  public canvas: HTMLCanvasElement;

  /**
   * Stored coordinates of previous pointer positions
   */
  public positions: IPoint[];

  /**
   * Indicates if pointer canvas should be cleared.
   */
  public clear: boolean;

  /**
   * Length of motion trail.
   */
  private motionTrailLength: number;

  /**
   * Interval for trail fader.
   */
  private fadeInterval: ReturnType<typeof setInterval> | null;

  /**
   * Canvas context
   */
  private context: any;

  /**
   * Pointer color
   */
  private color: string;

  /**
   * Indicates fade delay.
   */
  private fadeDelay: number;

  /**
   * Indicates width of line
   */
  private lineWidth: number;

  /**
   * Radius of pointer.
   */
  private radius: number;

  /**
   * Alpha fade of trail.
   */
  private alpha: number;

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
  constructor(
    canvas: fabric.Canvas,
    color: string,
    fadeDelay?: number,
    trailLength?: number,
    lineWidth?: number,
    radius?: number,
    alpha?: number
  ) {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText =
      'position: absolute; z-index: 3; pointer-events: none;';
    this.canvas.width = canvas.width as number;
    this.canvas.height = canvas.height as number;
    this.fadeInterval = null;
    this.clear = false;
    this.color = color;
    this.fadeDelay = fadeDelay && fadeDelay > 25 ? 25 : fadeDelay || 15;
    this.lineWidth = lineWidth ? lineWidth : 5;
    this.radius = radius ? radius : 2.5;
    this.alpha = alpha ? alpha / 100 : 0.01;

    // Create temporary canvas for laser pointer.
    let fabricCanvas = canvas.getElement();
    fabricCanvas.parentNode?.insertBefore(this.canvas, fabricCanvas);

    this.positions = [];
    this.pointer = { x: 0, y: 0 };
    this.motionTrailLength =
      trailLength && trailLength > 100 ? 100 : trailLength || 20;
    this.context = this.canvas.getContext('2d');
  }

  /**
   * Converts 6 digit hex to rgb
   * @param color 6 digit hex color
   */
  private hexToRgb(color: string): IRgb | null {
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
   * Stores last positions of pointer
   * @param xPos
   * @param yPos
   */
  private storeLastPosition(xPos: number, yPos: number) {
    this.positions.push({
      x: xPos,
      y: yPos,
    });

    if (this.positions.length > this.motionTrailLength) {
      this.positions.shift();
    }
  }

  /**
   * Generates mid point between two points.
   * @param c1 Coordinate
   * @param c2 Coordinate
   */
  private getMidpoint(c1: number, c2: number) {
    return (c1 + c2) / 2;
  }

  /**
   * Creates additional coordinates between coordinates provided
   * for a smoother gradient effect.
   */
  private generateMidpoints() {
    let points = [];

    for (let i = 0; i < this.positions.length; i++) {
      points.push(this.positions[i]);

      if (this.positions[i + 1]) {
        let a = this.positions[i];
        let b = this.positions[i + 1];
        let midpoint = {
          x: this.getMidpoint(a.x, b.x),
          y: this.getMidpoint(a.y, b.y),
        };
        points.push(midpoint);
      }
    }

    return points;
  }

  /**
   * Draws main pointer in exact mouse coordinate.
   */
  private buildPointer() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(
      this.pointer.x,
      this.pointer.y,
      this.radius,
      0,
      2 * Math.PI
    );
    this.context.fill();
  }

  /**
   * Generates fading trail.
   * @param points Array of coordinates
   * @param colorProps RGB values of color
   */
  private buildLine(points: IPoint[], colorProps: IRgb) {
    let i = 0;

    this.context.strokeStyle = `rgba(${colorProps.r}, ${colorProps.g}, ${colorProps.b}, ${this.alpha})`;
    this.context.lineWidth = this.lineWidth;
    this.context.beginPath();
    this.context.moveTo(points[0], points[0]);
    points.shift();

    for (i; i < points.length; i++) {
      this.context.lineTo(points[i].x, points[i].y);
      this.context.strokeStyle = `rgba(${colorProps.r}, ${colorProps.g}, ${
        colorProps.b
      }, ${this.alpha * (i * 10)})`;
      this.context.stroke();
      this.context.beginPath();
      this.context.moveTo(points[i].x, points[i].y);
    }
  }

  /**
   * Fades trailing path
   */
  private fadeAway() {
    let context = this.context;
    // let alpha = this.alpha;
    let colorProps = this.hexToRgb(this.color);

    this.fadeInterval = setInterval(() => {
      context.clearRect(
        0,
        0,
        this.canvas.width as number,
        this.canvas.height as number
      );
      this.positions.shift();
      let points = this.generateMidpoints();

      if (!this.clear) {
        this.buildPointer();
      }

      if (points.length) {
        clearInterval(this.fadeInterval as ReturnType<typeof setInterval>);

        if (!colorProps) {
          throw new Error('Invalid color!');
        }

        this.buildLine(points, colorProps);
        this.fadeAway();
      }
    }, this.fadeDelay);
  }

  /**
   * Updates pointer position and generates light trail.
   * @param pointer
   */
  public update(pointer: IPoint) {
    this.pointer = pointer;
    this.clear = false;

    // Clear interval that removes fading trail.
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
    }

    this.context.clearRect(
      0,
      0,
      this.canvas.width as number,
      this.canvas.height as number
    );

    // Store latest pointer position.
    this.storeLastPosition(this.pointer.x, this.pointer.y);

    let points = this.generateMidpoints();
    let colorProps = this.hexToRgb(this.color);
    this.context.beginPath(); // Start path

    if (!colorProps) {
      throw new Error('Only valid colors allowed!');
    }

    this.buildPointer();
    this.buildLine(points, colorProps);
    this.fadeAway();
  }

  /**
   * Clears pointer
   */
  public clearPointer() {
    this.clear = true;
  }

  /**
   * Removes temporary canvas for laser pointer.
   */
  public remove() {
    this.context.clearRect(
      0,
      0,
      this.canvas.width as number,
      this.canvas.height as number
    );
    this.positions = [];
    this.canvas.remove();
  }
}
