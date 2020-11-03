import { fabric } from 'fabric';
import tinycolor from 'tinycolor2';
import { ICoordinate } from '../../../interfaces/brushes/coordinate';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { IClearRect } from '../../../interfaces/brushes/clear-rects';
import { v4 as uuidv4 } from 'uuid';

export class ChalkBrush extends fabric.PencilBrush {
  private canvas: fabric.Canvas;
  private ctx: CanvasRenderingContext2D;
  private userId: string;
  private isDrawing: boolean;
  private lastPoint: ICoordinate;

  private points: ICoordinate[];
  private clearRects: IClearRect[];

  constructor(canvas: fabric.Canvas, userId: string) {
    super();
    this.canvas = canvas;
    this.userId = userId;
    this.ctx = this.canvas.getContext();
    this.isDrawing = false;
    this.lastPoint = { x: 0, y: 0 };
    this.points = [];
    this.clearRects = [];
  }

  private draw(point: ICoordinate) {
    // const { r, g, b } = tinycolor(this.color).toRgb();
    // const rgbColor = `${r}, ${g}, ${b}`;

    this.ctx.fillStyle = this.color;
    this.ctx.lineWidth = this.width;
    this.ctx.lineCap = 'round';
    // this.ctx.strokeStyle = `rgba(${rgbColor}, ${0.4 + Math.random() * 0.2})`;

    this.points.push(point);

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.ctx.lineTo(point.x, point.y);
    this.ctx.stroke();

    // Chalk Effect
    const length = Math.round(
      Math.sqrt(
        Math.pow(point.x - this.lastPoint.x, 2) +
          Math.pow(point.y - this.lastPoint.y, 2)
      ) /
        (5 / this.width)
    );

    const unit: ICoordinate = {
      x: (point.x - this.lastPoint.x) / length,
      y: (point.y - this.lastPoint.y) / length,
    };

    for (let i = 0; i < length; i += 1) {
      const current: ICoordinate = {
        x: this.lastPoint.x + i * unit.x,
        y: this.lastPoint.y + i * unit.y,
      };

      const random: ICoordinate = {
        x: current.x + (Math.random() - 0.5) * this.width * 1.2,
        y: current.y + (Math.random() - 0.5) * this.width * 1.2,
      };

      const generatedRect: IClearRect = {
        originPoint: random,
        width: 3,
        height: 1,
      };

      this.ctx.clearRect(
        generatedRect.originPoint.x,
        generatedRect.originPoint.y,
        generatedRect.width,
        generatedRect.height
      );

      this.clearRects.push(generatedRect);
    }

    this.lastPoint = point;
  }

  public createChalkPath(
    id: string,
    points: ICoordinate[],
    width: number,
    color: string,
    clearRects: IClearRect[]
  ) {
    const line = super
      .convertPointsToSVGPath(
        points.map((point) => {
          return new fabric.Point(point.x, point.y);
        })
      )
      .join('');

    const path = new fabric.Group([
      new fabric.Path(line, {
        fill: 'transparent',
        stroke: tinycolor(color).brighten(20).toHexString(),
        strokeWidth: width,
        strokeLineJoin: 'round',
        strokeLineCap: 'round',
        strokeUniform: true,
      }),
      ...clearRects.map((rect: IClearRect) => {
        return new fabric.Rect({
          left: rect.originPoint.x,
          top: rect.originPoint.y,
          width: rect.width * 0.9,
          height: rect.height * 0.9,
          fill: '#ffffff',
          stroke: '#ffffff',
          strokeWidth: 0,
        });
      }),
    ]);

    (path as ICanvasBrush).set({
      id: id,
      basePath: {
        type: 'chalk',
        points: points,
        stroke: color,
        strokeWidth: width,
        clearRects: clearRects,
      },
    });

    return path;
  }

  public createChalkEffect(points: ICoordinate[], width: number) {
    let clearRects: IClearRect[] = [];
    let lastPoint: ICoordinate;

    console.log(points);
    points.forEach((point) => {
      if (!lastPoint) {
        lastPoint = point;
      } else {
        const length = Math.round(
          Math.sqrt(
            Math.pow(point.x - lastPoint.x, 2) +
              Math.pow(point.y - lastPoint.y, 2)
          ) /
            (5 / width)
        );

        const unit: ICoordinate = {
          x: (point.x - lastPoint.x) / length,
          y: (point.y - lastPoint.y) / length,
        };

        for (let i = 0; i < length; i += 1) {
          const current: ICoordinate = {
            x: lastPoint.x + i * unit.x,
            y: lastPoint.y + i * unit.y,
          };

          const random: ICoordinate = {
            x: current.x + (Math.random() - 0.5) * width * 1.2,
            y: current.y + (Math.random() - 0.5) * width * 1.2,
          };

          const generatedRect: IClearRect = {
            originPoint: random,
            width: 3,
            height: 1,
          };

          clearRects.push(generatedRect);
        }
      }
    });

    return clearRects;
  }

  public onMouseDown(e: ICoordinate) {
    this.isDrawing = true;
    this.lastPoint = e;

    this.points.push(e);
    this.ctx.strokeStyle = tinycolor(this.color).brighten(25).toHexString();

    this.draw({ x: e.x + 1, y: e.y + 1 });
  }

  public onMouseMove(e: ICoordinate) {
    if (!this.isDrawing) return;

    this.draw(e);
  }

  public onMouseUp() {
    this.isDrawing = false;

    const path = this.createChalkPath(
      `${this.userId}:${uuidv4()}`,
      this.points,
      this.width,
      this.color,
      this.clearRects
    );

    this.points = [];
    this.clearRects = [];

    this.canvas.add(path);
    path.addWithUpdate();
    this.canvas.renderAll();
  }
}
