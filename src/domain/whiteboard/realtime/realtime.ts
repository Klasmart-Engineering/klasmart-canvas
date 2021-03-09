import { fabric } from 'fabric';
import { shapePoints } from '../../../assets/shapes-points';
import { IBrushType } from '../../../interfaces/brushes/brush-type';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { ICanvasPathBrush } from '../../../interfaces/brushes/canvas-path-brush';
import { ICanvasShapeBrush } from '../../../interfaces/brushes/canvas-shape-brush';
import { ICoordinate } from '../../../interfaces/brushes/coordinate';
import { IShapePointsIndex } from '../../../interfaces/brushes/shape-points-index';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { ChalkBrush } from '../brushes/classes/chalkBrush';
import { DashedBrush } from '../brushes/classes/dashedBrush';
import { MarkerBrush } from '../brushes/classes/markerBrush';
import { PaintBrush } from '../brushes/classes/paintBrush';
import { PenBrush } from '../brushes/classes/penBrush';
import * as shapes from '../shapes/shapes';

/**
 * Point interface.
 */
interface IPoint {
  x: number;
  y: number;
}

export interface IRealtimeData {
  type: string;
  target: fabric.Object;
  coordinates?: IPoint[];
  shape?: { [key: string]: string | number | ICanvasShapeBrush | undefined };
}

/**x
 * Class to handle realtime creation of objects.
 */
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
  private color!: { r: number; g: number; b: number };

  /**
   * Line width of object being added.
   */
  private lineWidth!: number;

  /**
   * Canvas context
   */
  private context: any;

  /**
   * Temporary canvas will erasing will take place.
   */
  private tempCanvas: fabric.Canvas | null;

  /**
   * Indicates shape to be drawn
   */
  private type: string | null;

  /**
   * Canvas width
   */
  private width: number;

  /**
   * Canvas height
   */
  private height: number;

  /**
   *
   * @param width Canvas width
   * @param height Canvas height
   * @param id User / instance id
   */
  constructor(width: number, height: number, id: string) {
    this.canvas = document.createElement('canvas');
    this.canvas.id = id;

    this.canvas.style.cssText =
      'position: absolute; z-index: 3; pointer-events: none;';

    this.canvas.width = width as number;
    this.canvas.height = height as number;
    this.pointer = null;
    this.points = [];
    this.context = null;
    this.type = null;
    this.tempCanvas = null;
    this.width = width;
    this.height = height;
  }

  /**
   * Initiates realtime process for adding elements to canvas.
   * @param canvas Canavs
   * @param type type of object being added
   * @param color Coloro of object being added
   * @param lineWidth Line width of object being added
   */
  public init(
    canvas: fabric.Canvas,
    type: string,
    color: string,
    lineWidth: number
  ) {
    if (type !== 'pencil' && type !== 'text') {
      this.tempCanvas = new fabric.Canvas(this.canvas, {
        width: this.width,
        height: this.height,
      });
    }

    let fabricCanvas = canvas?.getElement();
    fabricCanvas?.parentNode?.insertBefore(this.canvas, fabricCanvas);
    this.context = this.canvas.getContext('2d');
    this.color = this.hexToRgb(color);
    this.lineWidth = lineWidth;
    this.type = type;
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
   *
   * @param target Contains shape information.
   */
  public async draw(target: IRealtimeData) {
    if (!((target.shape as unknown) as ICanvasShapeBrush)?.basePath) {
      switch (this.type) {
        case 'pencil': {
          this.drawPath(target.coordinates as IPoint[]);
          break;
        }
        case 'rectangle': {
          this.rectDraw(target);
          break;
        }
        case 'circle': {
          this.ellipseDraw(target);
          break;
        }
        case 'triangle': {
          this.triangleDraw(target);
          break;
        }
        case 'pentagon': {
          this.pentagonDraw(target);
          break;
        }
        case 'hexagon': {
          this.hexagonDraw(target);
          break;
        }
        case 'star': {
          this.starDraw(target);
          break;
        }
        case 'chatBubble': {
          this.chatDraw(target);
          break;
        }
        case 'arrow': {
          this.arrowDraw(target);
          break;
        }
        default: {
          this.customBrushPath(target);
        }
      }
    } else if (this.type) {
      let shape = await this.customBrushShape(this.type, target);

      if (shape) {
        this.clear();
        this.tempCanvas?.add(shape);
        this.tempCanvas?.renderAll();
      }
    }
  }

  /**
   * Draws a path.
   * @param points Path points
   */
  public drawPath(points: IPoint[]) {
    if (!points) {
      return;
    }

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
  public rectDraw(target: any) {
    this.clear();

    if (!target || !target.shape) {
      return;
    }

    const rect = shapes.rectangle(
      target.shape.width,
      target.shape.height,
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeDashArray?.length
    );

    rect.set({
      top: target.shape.top,
      left: target.shape.left,
      originX: target.shape.originX,
      originY: target.shape.originY,
    });

    this.tempCanvas?.add(rect);
    this.tempCanvas?.renderAll();
  }

  /**
   * Draws circle
   * @param target Data of shape to be drawn.
   */
  public ellipseDraw(target: any) {
    this.clear();
    const ellipse = shapes.circle(
      target.shape.width / 2,
      target.shape.height / 2,
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeDashArray?.length
    );
    ellipse.set({
      top: target.shape.top,
      left: target.shape.left,
      originX: target.shape.originX,
      originY: target.shape.originY,
    });
    this.tempCanvas?.add(ellipse);
    this.tempCanvas?.renderAll();
  }

  public triangleDraw(target: any) {
    this.tempCanvas?.clear();
    const triangle = shapes.triangle(
      target.shape.width,
      target.shape.height,
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeDashArray?.length
    );

    triangle.set({
      top: target.shape.top,
      left: target.shape.left,
      originX: target.shape.originX,
      originY: target.shape.originY,
    });

    this.tempCanvas?.add(triangle);
    this.tempCanvas?.renderAll();
  }

  /**
   *
   * @param target Shape information
   */
  private shapeProps(shape: IRealtimeData['shape']) {
    return {
      top: shape?.top,
      left: shape?.left,
      originX: shape?.originX,
      originY: shape?.originY,
      scaleX: shape?.scaleX,
      scaleY: shape?.scaleY,
    };
  }

  /**
   * Draws pentagon
   * @param target Shape information
   */
  public pentagonDraw(target: any) {
    this.tempCanvas?.clear();
    const pentagon = shapes.pentagon(
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeDashArray?.length
    );

    // @ts-ignore
    pentagon.set(this.shapeProps(target.shape));

    this.tempCanvas?.add(pentagon);
    this.tempCanvas?.renderAll();
  }

  /**
   * Draws hegaxon
   * @param target Shape information
   */
  public hexagonDraw(target: any) {
    this.tempCanvas?.clear();
    const hexagon = shapes.hexagon(
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeDashArray?.length
    );

    // @ts-ignore
    hexagon.set(this.shapeProps(target.shape));
    this.tempCanvas?.add(hexagon);
    this.tempCanvas?.renderAll();
  }

  /**
   * Draws star
   * @param target Shape inforamtion
   */
  public starDraw(target: any) {
    this.tempCanvas?.clear();
    const star = shapes.star(
      2,
      2,
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeDashArray?.length
    );

    // @ts-ignore
    star.set(this.shapeProps(target.shape));
    this.tempCanvas?.add(star);
    this.tempCanvas?.renderAll();
  }

  /**
   * Draws chat bubble
   * @param target Shape information
   */
  public chatDraw(target: any) {
    this.tempCanvas?.clear();
    const chat = shapes.chat(
      2,
      2,
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeDashArray?.length
    );

    // @ts-ignore
    chat.set(this.shapeProps(target.shape));
    this.tempCanvas?.add(chat);
    this.tempCanvas?.renderAll();
  }

  /**
   * Draws arrow
   * @param target Shape information
   */
  public arrowDraw(target: any) {
    this.tempCanvas?.clear();
    const arrow = shapes.arrow(
      2,
      2,
      target.shape.stroke,
      false,
      target.shape.strokeWidth,
      target.shape.strokeDashArray?.length
    );

    // @ts-ignore
    arrow.set(this.shapeProps(target.shape));
    this.tempCanvas?.add(arrow);
    this.tempCanvas?.renderAll();
  }

  /**
   * Real time text drawing process.
   * @param target
   */
  public textDraw(target: any) {
    this.clear();
    this.context.font = `${target.fontSize}px ${target.fontFamily}`;
    this.context.fillStyle = target.fill || '#000000';
    this.context.fillText(
      target.text,
      target.left,
      target.top + target.height - 7
    );
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

    this.tempCanvas?.clear();
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

  /**
   * Fix the dimensions of the given shape
   * @param newShape - Shape to set dimensions
   * @param targetShape - Reference shape to set dimensions in the new one
   * @param brushType - Shape Brush Type
   */
  private fixCustomBrushShapeDimensions(
    newShape: ICanvasObject,
    targetShape: ICanvasObject,
    brushType: IBrushType
  ) {
    newShape.set({
      scaleX: targetShape.scaleX,
      scaleY: targetShape.scaleY,
      top: targetShape.top,
      left: targetShape.left,
      originX: targetShape.originX,
      originY: targetShape.originY,
    });

    if (
      brushType === 'paintbrush' ||
      brushType === 'marker' ||
      brushType === 'felt'
    ) {
      const scaleX = Number(targetShape.width) / Number(newShape.width);
      const scaleY = Number(targetShape.height) / Number(newShape.height);
      let top = targetShape.top;
      let left = targetShape.left;

      newShape.set({
        top: targetShape.top,
        left: targetShape.left,
        width: targetShape.width,
        height: targetShape.height,
        scaleX,
        scaleY,
      });

      if (brushType === 'paintbrush') {
        const brush = new PaintBrush(
          this.tempCanvas as fabric.Canvas,
          this.canvas.id
        );
        const newPoints = ((newShape as ICanvasPathBrush).basePath
          ?.points as ICoordinate[]).map((point) => {
          return {
            x: point.x * Number(newShape?.scaleX),
            y: point.y * Number(newShape?.scaleY),
          };
        });

        const newPath = brush.modifyPaintBrushPath(
          'provisional',
          newPoints,
          Number((newShape as ICanvasPathBrush).basePath?.strokeWidth),
          String((newShape as ICanvasPathBrush).basePath?.stroke),
          (newShape as ICanvasBrush).basePath?.bristles || []
        );

        (newShape as ICanvasPathBrush).set({ ...newPath });

        (newShape as fabric.Group).addWithUpdate();

        newShape.set({
          top,
          left,
        });

        (newShape as fabric.Group).addWithUpdate();
      } else {
        (newShape as fabric.Group).forEachObject((line) => {
          line.set({
            top: Number(line.top) / Number(newShape?.scaleY),
            left: Number(line.left) / Number(newShape?.scaleX),
          });
        });

        (newShape as fabric.Group).addWithUpdate();

        newShape.set({
          top,
          left,
        });

        (newShape as fabric.Group).addWithUpdate();
      }
    }

    return newShape;
  }

  /**
   * Draws a custom brush shape in tempCanvas
   * @param shape - Shape to draw
   * @param target - Object with the required properties to render the shape
   */
  private async customBrushShape(shape: string, target: any) {
    const userId: string = this.canvas.id;
    const original = shapePoints[shape as keyof IShapePointsIndex];
    const brushType = target.shape.basePath.type;
    const lineWidth = target.shape.basePath.strokeWidth;
    const penColor = target.shape.basePath.stroke;

    let brush: PenBrush | MarkerBrush | PaintBrush | ChalkBrush;
    let newShape: fabric.Object | null = null;

    if (!original) {
      return;
    }

    switch (brushType) {
      case 'pen':
        brush = new PenBrush(this.tempCanvas as fabric.Canvas, userId);

        const { min, max } = brush.setMinMaxWidth(lineWidth);
        const penPoints = original.points.map((point) => {
          return {
            x: point.x,
            y: point.y,
            width: (brush as PenBrush).getRandomInt(min, max),
          };
        });

        newShape = brush.createPenPath(
          'provisional',
          penPoints,
          lineWidth,
          penColor
        );
        break;

      case 'marker':
      case 'felt':
        brush = new MarkerBrush(
          this.tempCanvas as fabric.Canvas,
          userId,
          brushType
        );
        newShape = brush.createMarkerPath(
          'provisional',
          original.points,
          lineWidth,
          penColor
        );
        break;

      case 'paintbrush':
        brush = new PaintBrush(this.tempCanvas as fabric.Canvas, userId);
        newShape = brush.modifyPaintBrushPath(
          'provisional',
          original.points,
          lineWidth,
          penColor,
          target.shape.basePath.bristles
        );
        break;

      case 'chalk':
      case 'crayon':
        const imagePromise = new Promise<fabric.Object>((resolve, reject) => {
          try {
            fabric.Image.fromURL(target.shape.basePath.imageData, (image) => {
              resolve(image);
            });
          } catch (e) {
            reject(e);
          }
        });

        newShape = await imagePromise;
    }

    if (!newShape) return;

    newShape = this.fixCustomBrushShapeDimensions(
      newShape,
      target.shape,
      brushType
    );

    return newShape;
  }

  /**
   * Draws a custom brush path in tempCanvas
   * @param target - Object with the required properties to render the shape
   */
  private async customBrushPath(target: any) {
    let brush: DashedBrush | PenBrush | MarkerBrush | PaintBrush | ChalkBrush;
    let newPath;

    if (!this.tempCanvas) return;

    this.clear();

    switch (target.type) {
      case 'dashed':
        brush = new DashedBrush(
          this.tempCanvas as fabric.Canvas,
          this.canvas.id
        );

        newPath = brush.createDashedPath(
          'provisional',
          target.coordinates,
          target.lineWidth,
          target.color
        );
        break;

      case 'pen':
        brush = new PenBrush(this.tempCanvas as fabric.Canvas, this.canvas.id);

        const { min, max } = brush.setMinMaxWidth(target.lineWidth);
        const points = target.coordinates.map((point: ICoordinate) => {
          return {
            x: point.x,
            y: point.y,
            width: (brush as PenBrush).getRandomInt(min, max),
          };
        });

        newPath = brush.createPenPath(
          'provisional',
          points,
          target.lineWidth,
          target.color
        );
        break;

      case 'marker':
      case 'felt':
        brush = new MarkerBrush(
          this.tempCanvas as fabric.Canvas,
          this.canvas.id,
          target.type
        );

        newPath = brush.createMarkerPath(
          'provisional',
          target.coordinates,
          target.lineWidth,
          target.color
        );
        break;

      case 'paintbrush':
        brush = new PaintBrush(
          this.tempCanvas as fabric.Canvas,
          this.canvas.id
        );

        const bristles = brush.makeBrush(target.color, target.lineWidth);

        newPath = brush.modifyPaintBrushPath(
          'provisional',
          target.coordinates,
          target.lineWidth,
          target.color,
          bristles
        );
        break;

      case 'chalk':
      case 'crayon':
        // const currentCanvas = new fabric.Canvas(this.canvas);
        // currentCanvas.freeDrawingBrush = new ChalkBrush(
        //   currentCanvas,
        //   this.canvas.id,
        //   target.type
        // );

        // currentCanvas.freeDrawingBrush.color = target.color;
        // currentCanvas.freeDrawingBrush.width = target.lineWidth;
        // currentCanvas.isDrawingMode = true;

        // (target.coordinates as ICoordinate[]).forEach(
        //   (coordinate: { x: number; y: number }, index: number) => {
        //     if (!index) {
        //       currentCanvas?.trigger('mouse:down', {
        //         pointer: {
        //           x: coordinate.x,
        //           y: coordinate.y,
        //         },
        //       });

        //       return;
        //     }
        //     currentCanvas?.trigger('mouse:move', {
        //       pointer: {
        //         x: coordinate.x,
        //         y: coordinate.y,
        //       },
        //     });
        //   }
        // );

        brush = new ChalkBrush(
          this.tempCanvas as fabric.Canvas,
          this.canvas.id,
          target.type
        );

        const clearRects = brush.createChalkEffect(
          target.coordinates,
          target.lineWidth
        );

        newPath = await brush.createChalkPath(
          'provisional',
          target.coordinates,
          target.lineWidth,
          target.color,
          clearRects
        );
        break;
    }

    if (!newPath) return;

    this.tempCanvas?.add(newPath);
    this.tempCanvas?.renderAll();
  }
}
