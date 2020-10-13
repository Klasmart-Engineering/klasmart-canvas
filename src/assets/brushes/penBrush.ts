import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';

export class PenBrush extends fabric.BaseBrush {
  private canvas: Canvas;
  private ctx: any;
  private isDrawing: boolean = false;
  private points: { x: number; y: number; width: number }[] = [];
  // private width: number;
  // private color: string;

  constructor(canvas: Canvas, width: number, color: string) {
    super();
    this.canvas = canvas;
    this.width = width;
    this.color = color;
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

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.points.push({
      x: e.x,
      y: e.y,
      width: this.getRandomInt(this.width / 2, this.width),
    });

    for (var i = 1; i < this.points.length; i++) {
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
    this.points.length = 0;
  }
}
