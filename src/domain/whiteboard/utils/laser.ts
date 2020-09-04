import fabric from "fabric/fabric-impl";

interface IPoint { 
  x: number,
  y: number
}

export class Laser {
  public pointer: IPoint;
  public canvas: any;// fabric.Canvas;
  public positions: IPoint[];
  private motionTrailLength: number;
  private fadeInterval:  ReturnType<typeof setInterval> | null;
  private context: any;
  private clear: boolean;
  private color: string;
  private fadeDelay: number;

  constructor(canvas: fabric.Canvas, color: string, fadeDelay?: number, trailLength?: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = 'position: absolute; z-index: 3; pointer-events: none;';

    this.canvas.width = canvas.width;
    this.canvas.height = canvas.height;
    this.fadeInterval = null;
    this.clear = false;
    this.color = color;
    this.fadeDelay = fadeDelay && fadeDelay > 25 ? 25 : fadeDelay || 15;

    // Create temporary canvas for laser pointer.
    let fabricCanvas = canvas.getElement();

    // canvas.get
    // fabricCanvas.parentNode?.insertBefore(this.canvas, fabricCanvas)
    // fabricCanvas.parentNode?.insertBefore(this.canvas, (fabricCanvas.parentNode.lastElementChild as ChildNode).nextSibling);
    fabricCanvas.parentNode?.insertBefore(this.canvas, fabricCanvas);


    this.positions = [];
    this.pointer = { x: 0, y: 0 };
    this.motionTrailLength = trailLength && trailLength > 100 ? 100 : trailLength || 20;

    this.context = this.canvas.getContext('2d');
  }

  
  private hexToRgb(color: string)  {
    let parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

    return parsed ? {
      r: parseInt(parsed[1], 16),
      g: parseInt(parsed[2], 16),
      b: parseInt(parsed[3], 16),
    } : null;
  }

  private storeLastPosition(xPos: number, yPos: number) {
    this.positions.push({
      x: xPos,
      y: yPos
    });
   
    if (this.positions.length > this.motionTrailLength) {
      this.positions.shift();
    }
  }

  private getMidpoint(c1: number, c2: number) {
    return (c1 + c2) / 2;
  }

  private generateMidpoints() {
    let points = [];

    for (let i = 0; i < this.positions.length; i++) {
      points.push(this.positions[i]);
      
      if (this.positions[i + 1]) {
        let a = this.positions[i];
        let b = this.positions[i + 1];
        let midpoint = { x: this.getMidpoint(a.x, b.x), y: this.getMidpoint(a.y, b.y) };
        points.push(midpoint)
      }
    }

    return points;
  }

  private buildPointer() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(this.pointer.x, this.pointer.y, 2.5, 0, 2 * Math.PI);
    this.context.fill();
  }

  private fadeAway() {
    let context = this.context;
    let alpha = 0.01;
    let colorProps = this.hexToRgb(this.color);

    this.fadeInterval = setInterval(() => {
      context.clearRect(0, 0, this.canvas.width as number, this.canvas.height as number);
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

        context.strokeStyle = `rgba(${colorProps.r}, ${colorProps.g}, ${colorProps.b}, ${alpha})`;
        context.lineWidth = '5';
        context.moveTo(points[0], points[0]);
        points.shift();
      
        for (var i = 0; i < points.length - 1; i++) {
          context.lineTo(points[i].x, points[i].y);
          context.strokeStyle = `rgba(${colorProps.r}, ${colorProps.g}, ${colorProps.b}, ${alpha * ( i * 10)})`;
          context.stroke();
          context.beginPath();
          context.moveTo(points[i].x, points[i].y);
        }

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

    this.context.clearRect(0, 0, this.canvas.width as number, this.canvas.height as number);

    // Store latest pointer position.
    this.storeLastPosition(this.pointer.x, this.pointer.y);


    let points = this.generateMidpoints();
    let alpha = 0.005;
    let colorProps = this.hexToRgb(this.color);
    
    this.context.beginPath(); // Start path

    if (!colorProps) {
      throw new Error('Only valid colors allowed!');
    }

    this.buildPointer();

    this.context.strokeStyle = `rgba(${colorProps.r}, ${colorProps.g}, ${colorProps.b}, ${alpha})`;
    this.context.lineWidth = '5';
    this.context.moveTo(points[0].x, points[0].y);
    points.shift();
  
    for (var i = 0; i < points.length - 1; i++) {
      this.context.lineTo(points[i].x, points[i].y);
      this.context.strokeStyle = `rgba(${colorProps.r}, ${colorProps.g}, ${colorProps.b}, ${alpha * ( i * 10)})`;
      this.context.stroke();
      
      this.context.beginPath();
      this.context.moveTo(points[i].x, points[i].y);
    }

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
    this.context.clearRect(0, 0, this.canvas.width as number, this.canvas.height as number);
    this.positions = [];
    this.canvas.remove();
  }
}
