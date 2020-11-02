import { fabric } from 'fabric';
import { ICoordinate } from '../../../interfaces/brushes/coordinate';

export class CrayonBrush extends fabric.PencilBrush {
  private canvas: fabric.Canvas;
  private ctx: CanvasRenderingContext2D;
  private opacity: number = 0.6;
  private point: fabric.Point;
  private latest: fabric.Point | null = null;
  private size: number = 0;
  private baseWidth: number = 20;
  // private latestStrokeLength: number = 0;
  private separation: number = 5;

  constructor(canvas: fabric.Canvas) {
    super();
    this.canvas = canvas;
    this.ctx = this.canvas.getContext();
    this.point = new fabric.Point(0, 0);
    this.width = 30;
  }

  public onMouseDown(e: ICoordinate) {
    this.ctx.globalAlpha = this.opacity;
    this.size = this.width / 2 + this.baseWidth;
    this.setPoint(e);
  }

  public onMouseMove(e: ICoordinate) {
    this.updatePoint(e);
    this.draw(this.ctx);
  }

  public onMouseUp() {}

  private setPoint(point: ICoordinate) {
    if (this.latest) {
      this.latest.setFromPoint(this.point);
    } else {
      this.latest = new fabric.Point(point.x, point.y);
    }
  }

  private updatePoint(point: ICoordinate) {
    if (!this.latest) return;
    this.setPoint(point);
    // this.latestStrokeLength = this.point
    //   .subtract(this.latest)
    //   .distanceFrom(new fabric.Point(0, 0));
  }

  private getRandom(max: number, min?: number) {
    return Math.floor(Math.random() * (max - Number(min) + 1)) + Number(min);
  }

  private draw(ctx: CanvasRenderingContext2D) {
    if (!this.latest) return;
    var i, j, p, r, c, x, y, w, h, v, s, stepNum, dotSize, dotNum, range;

    v = this.point.subtract(this.latest);
    s = Math.ceil(this.size / 2);
    stepNum = Math.floor(v.distanceFrom(new fabric.Point(0, 0)) / s) + 1;
    // (v as fabric.Point).normalize(s);

    dotSize = this.getRandom(50, 2);
    // dotSize =
    //   this.separation *
    //   fabric.util.clamp(
    //     (this._inkAmount / this._latestStrokeLength) * 3,
    //     1,
    //     0.5
    //   );
    dotNum = Math.ceil(this.size * this.separation);

    range = this.size / 2;

    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    for (i = 0; i < dotNum; i++) {
      for (j = 0; j < stepNum; j++) {
        p = this.latest.add(v.multiply(j));
        r = this.getRandom(range, 0);
        c = this.getRandom(Math.PI * 2, 0);

        w = this.getRandom(dotSize, dotSize / 2);
        h = this.getRandom(dotSize, dotSize / 2);
        x = p.x + r * Math.sin(c) - w / 2;
        y = p.y + r * Math.cos(c) - h / 2;

        ctx.rect(x, y, w, h);
      }
    }
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
}
