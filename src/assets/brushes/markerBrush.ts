import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';

export class MarkerBrush extends fabric.PencilBrush {
  private canvas: Canvas;
  private ctx: CanvasRenderingContext2D;
  private isDrawing: boolean = false;
  private lastPoint: { x: number; y: number } | null = null;

  constructor(canvas: Canvas) {
    super();
    this.canvas = canvas;
    this.ctx = this.canvas.getContext();
  }

  onMouseDown(e: { x: number; y: number }) {
    this.isDrawing = true;
    this.lastPoint = { x: e.x, y: e.y };
  }

  onMouseMove(e: { x: number; y: number }) {
    if (!this.isDrawing || !this.lastPoint) return;

    this.ctx.beginPath();

    this.ctx.globalAlpha = 1;
    this.ctx.moveTo(this.lastPoint.x - 4, this.lastPoint.y - 4);
    this.ctx.lineTo(e.x - 4, e.y - 4);
    this.ctx.stroke();

    this.ctx.globalAlpha = 0.6;
    this.ctx.moveTo(this.lastPoint.x - 2, this.lastPoint.y - 2);
    this.ctx.lineTo(e.x - 2, e.y - 2);
    this.ctx.stroke();

    this.ctx.globalAlpha = 0.4;
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.ctx.lineTo(e.x, e.y);
    this.ctx.stroke();

    this.ctx.globalAlpha = 0.3;
    this.ctx.moveTo(this.lastPoint.x + 2, this.lastPoint.y + 2);
    this.ctx.lineTo(e.x + 2, e.y + 2);
    this.ctx.stroke();

    this.ctx.globalAlpha = 0.2;
    this.ctx.moveTo(this.lastPoint.x + 4, this.lastPoint.y + 4);
    this.ctx.lineTo(e.x + 4, e.y + 4);
    this.ctx.stroke();

    this.lastPoint = { x: e.x, y: e.y };
  }

  onMouseUp() {
    this.isDrawing = false;
  }
}
