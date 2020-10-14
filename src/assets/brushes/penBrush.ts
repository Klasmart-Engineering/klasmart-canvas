import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';

export class PenBrush extends fabric.PencilBrush {
  private canvas: Canvas;
  private ctx: CanvasRenderingContext2D;
  private isDrawing: boolean = false;
  private points: { x: number; y: number; width: number }[] = [];
  private paths: fabric.Path[] = [];

  constructor(canvas: Canvas) {
    super();
    this.canvas = canvas;
    this.ctx = this.canvas.getContext();
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onMouseDown(e: { x: number; y: number }) {
    this.isDrawing = true;
    this.points.push({
      x: e.x,
      y: e.y,
      width: this.getRandomInt(this.width / 2, this.width),
    });
  }

  onMouseMove(e: { x: number; y: number }) {
    if (!this.isDrawing) return;

    this.points.push({
      x: e.x,
      y: e.y,
      width: this.getRandomInt(this.width / 2, this.width),
    });

    if (this.points.length > 1) {
      this.paths.push(
        new fabric.Path(
          super
            .convertPointsToSVGPath([
              {
                x: this.points[this.points.length - 2].x,
                y: this.points[this.points.length - 2].y,
              },
              {
                x: this.points[this.points.length - 1].x,
                y: this.points[this.points.length - 1].y,
              },
            ])
            .join(''),
          {
            strokeWidth: this.points[this.points.length - 1].width,
            stroke: this.color,
            strokeLineCap: 'round',
            strokeLineJoin: 'round',
          }
        )
      );
    }

    // this.canvas.fire('path:created', {
    //   path: this.paths[this.paths.length - 1],
    // });

    for (let i = 1; i < this.points.length; i++) {
      this.ctx.beginPath();
      this.ctx.lineJoin = 'round';
      this.ctx.lineCap = 'round';
      this.ctx.moveTo(this.points[i - 1].x, this.points[i - 1].y);
      this.ctx.lineWidth = this.points[i].width;
      this.ctx.strokeStyle = this.color;
      this.ctx.lineTo(this.points[i].x, this.points[i].y);
      this.ctx.stroke();
    }
  }

  onMouseUp() {
    this.isDrawing = false;

    let path = new fabric.Group(this.paths);

    this.canvas.add(path);
    this.canvas.requestRenderAll();
    path.setCoords();

    this.paths = [];
    this.points.length = 0;
  }
}
