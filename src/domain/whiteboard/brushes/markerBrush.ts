import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';

export class MarkerBrush extends fabric.PencilBrush {
  private canvas: Canvas;
  private ctx: CanvasRenderingContext2D;
  private isDrawing: boolean = false;
  private lastPoint: { x: number; y: number } | null = null;
  private points: { x: number; y: number }[] = [];

  constructor(canvas: Canvas) {
    super();
    this.canvas = canvas;
    this.ctx = this.canvas.getContext();
  }

  onMouseDown(e: { x: number; y: number }) {
    this.isDrawing = true;
    this.lastPoint = { x: e.x, y: e.y };
    this.points.push(e);
  }

  onMouseMove(e: { x: number; y: number }) {
    if (!this.isDrawing || !this.lastPoint) return;

    this.points.push(e);
    this.ctx.beginPath();

    this.ctx.lineCap = this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.width / 5;

    console.log(this.width);

    this.ctx.globalAlpha = 1;
    this.ctx.moveTo(
      this.lastPoint.x - this.width / 8,
      this.lastPoint.y - this.width / 8
    );
    this.ctx.lineTo(e.x - this.width / 8, e.y - this.width / 8);
    this.ctx.stroke();

    this.ctx.globalAlpha = 0.6;
    this.ctx.moveTo(
      this.lastPoint.x - this.width / 4,
      this.lastPoint.y - this.width / 4
    );
    this.ctx.lineTo(e.x - this.width / 4, e.y - this.width / 4);
    this.ctx.stroke();

    this.ctx.globalAlpha = 0.8;
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.ctx.lineTo(e.x, e.y);
    this.ctx.stroke();

    this.ctx.globalAlpha = 0.3;
    this.ctx.moveTo(
      this.lastPoint.x + this.width / 4,
      this.lastPoint.y + this.width / 4
    );
    this.ctx.lineTo(e.x + this.width / 4, e.y + this.width / 4);
    this.ctx.stroke();

    this.ctx.globalAlpha = 0.4;
    this.ctx.moveTo(
      this.lastPoint.x + this.width / 8,
      this.lastPoint.y + this.width / 8
    );
    this.ctx.lineTo(e.x + this.width / 8, e.y + this.width / 8);
    this.ctx.stroke();

    this.lastPoint = { x: e.x, y: e.y };
    this.ctx.globalAlpha = 1;
  }

  onMouseUp() {
    this.isDrawing = false;

    // console.log(super.convertPointsToSVGPath(this.points).join(''));
    // let path = new fabric.Group([
    //   new fabric.Path(
    //     super
    //       .convertPointsToSVGPath(
    //         this.points.map((point) => {
    //           return {
    //             x: point.x - this.width / 8,
    //             y: point.y - this.width / 8,
    //           };
    //         })
    //       )
    //       .join(''),
    //     { fill: 'transparent', stroke: this.color }
    //   ),
    //   new fabric.Path(
    //     super
    //       .convertPointsToSVGPath(
    //         this.points.map((point) => {
    //           return {
    //             x: point.x - this.width / 4,
    //             y: point.y - this.width / 4,
    //           };
    //         })
    //       )
    //       .join(''),
    //     { fill: 'transparent', stroke: this.color }
    //   ),
    //   new fabric.Path(super.convertPointsToSVGPath(this.points).join(''), {
    //     fill: 'transparent',
    //     stroke: this.color,
    //   }),
    //   new fabric.Path(
    //     super
    //       .convertPointsToSVGPath(
    //         this.points.map((point) => {
    //           return {
    //             x: point.x + this.width / 4,
    //             y: point.y + this.width / 4,
    //           };
    //         })
    //       )
    //       .join(''),
    //     { fill: 'transparent', stroke: this.color }
    //   ),
    //   new fabric.Path(
    //     super
    //       .convertPointsToSVGPath(
    //         this.points.map((point) => {
    //           return {
    //             x: point.x + this.width / 8,
    //             y: point.y + this.width / 8,
    //           };
    //         })
    //       )
    //       .join(''),
    //     { fill: 'transparent', stroke: this.color }
    //   ),
    // ]);

    // this.points = [];

    // console.log(path);
    // this.canvas.add(path);
    // this.canvas.requestRenderAll();
    // path.setCoords();
  }
}
