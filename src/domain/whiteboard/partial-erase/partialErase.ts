import { fabric } from 'fabric';
import { ICanvasDrawingEvent } from '../../../interfaces/canvas-events/canvas-drawing-event';
import { ICanvasFreeDrawingBrush } from '../../../interfaces/free-drawing/canvas-free-drawing-brush';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { v4 as uuidv4 } from 'uuid';
import { ICanvasMouseEvent } from '../../../interfaces/canvas-events/canvas-mouse-event';

export class PartialErase {
  private id: string;
  private canvas: fabric.Canvas;
  private tempCanvas: fabric.Canvas;
  private rawCanvas: HTMLCanvasElement;
  private lineWidth: number;
  private eraseObjectCursor: string;
  private allToolbarIsEnabled: boolean;
  private partialEraseIsActive: boolean;
  private rawContext: any;

  public coordinates: any[];

  constructor(
    id: string,
    canvas: fabric.Canvas,
    lineWidth: number,
    eraseObjectCursor: string,
    allToolbarIsEnabled: boolean,
    partialEraseIsActive: boolean
  ) {
    this.coordinates = [];
    this.id = id;
    this.canvas = canvas;
    this.rawCanvas = document.createElement('canvas');
    this.rawCanvas.style.cssText =
      'position: absolute; z-index: 3;';

    this.canvas.getElement().parentNode?.insertBefore(this.rawCanvas, this.canvas.getElement());

    this.tempCanvas = new fabric.Canvas(
      this.rawCanvas,
      {
        width: canvas.getWidth(),
        height: canvas.getHeight()
      }
    );

    this.lineWidth = lineWidth;
    this.eraseObjectCursor = eraseObjectCursor;
    this.allToolbarIsEnabled = allToolbarIsEnabled;
    this.partialEraseIsActive = partialEraseIsActive;

    this.moveSelfToTemp();
    this.initateErasePaths();
    this.tempCanvas.on('path:created', this.pathCreated);
    this.rawContext = this.rawCanvas.getContext('2d');

    

    this.tempCanvas.on('mouse:move', (e: any) => {

      if ((e.e as MouseEvent).buttons) {
        this.coordinates.push(e.absolutePointer);
        this.buildTempEraseLine();
      }
    });
  }

  public buildTempEraseLine = () => {
    let rawContext = this.rawCanvas.getContext('2d');
    let i = 1;

   if (rawContext) {
      rawContext.globalCompositeOperation = 'destination-out';
      rawContext.strokeStyle = `rgba(0,0,0,1)`;
      rawContext.lineWidth = this.lineWidth;
      rawContext.beginPath();
      rawContext.moveTo(this.coordinates[0].x, this.coordinates[0].y);

      for (i; i < this.coordinates.length; i++) {
        rawContext.lineTo(this.coordinates[i].x, this.coordinates[i].y);
        rawContext.strokeStyle = `rgba(0,0,0,1)`;
        rawContext.stroke();
        rawContext.beginPath();
        rawContext.moveTo(this.coordinates[i].x, this.coordinates[i].y);
      }
    }
  }

  private initateErasePaths = () => {

    this.tempCanvas.freeDrawingBrush = new fabric.PencilBrush();
    (this.tempCanvas.freeDrawingBrush as ICanvasFreeDrawingBrush).canvas = this.tempCanvas;
    this.tempCanvas.freeDrawingBrush.color = 'rgba(0,0,0,0)';
    this.tempCanvas.freeDrawingBrush.width = this.lineWidth;
    this.tempCanvas.freeDrawingCursor = `url("${this.eraseObjectCursor}"), auto`;
    this.tempCanvas.isDrawingMode = this.allToolbarIsEnabled || this.partialEraseIsActive;
  }

  private moveSelfToTemp = () => {
    this.canvas.getObjects().forEach((o: any) => {
      if (this.isOwned(this.id, o.id)) {
        this.tempCanvas.add(o);
        this.canvas.remove(o);
      }
    });

    this.canvas.renderAll();
    this.tempCanvas.renderAll();
  }

  private moveSelfToPermanent = () => {
    this.tempCanvas.setActiveObject(
      new fabric.Group(this.tempCanvas.getObjects().filter((o: any) => (o.isPartialErased)))
    ).renderAll();
    let group = this.tempCanvas.getActiveObjects()[0];

    this.tempCanvas.getObjects().forEach((o: any) => {
      if (!o.isPartialErased) {
        this.canvas.add(o);
      }
    });

    this.canvas.renderAll();

    group.cloneAsImage((image: any) => {
      image.set({
        top: group.top,
        left: group.left,
        id: this.generateId()
      });
      this.canvas.add(image);
    });

    this.canvas.renderAll();
  }

  private destroy = () => {
    this.tempCanvas.dispose();
    this.canvas.getElement().parentNode?.removeChild(this.rawCanvas);
  }

  private isOwned = (selfId: string, objectId: string) => {
    return objectId.split(':')[0] === selfId;
  }

  private generateId = () => {
    return `${this.id}:${uuidv4()}`;
  }

  private pathCreated = (e: ICanvasDrawingEvent) => {
    if (e.path) {
      e.path.stroke = 'white';
      e.path.strokeUniform = true;
      e.path.globalCompositeOperation = 'destination-out';
      e.path.evented = false;
      e.path.selectable = false;
      e.path.isPartialErased = true;
      e.path?.bringToFront();
      e.path.id = this.generateId();

      this.tempCanvas.forEachObject((obj: ICanvasObject) => {
        const intersect = obj.intersectsWithObject(
          (e.path as unknown) as TypedShape,
          true,
          true
        );

        if (intersect) {
          obj.set({
            isPartialErased: true,
          });
        }
      });
      this.tempCanvas.renderAll();
      this.moveSelfToPermanent();
      this.destroy();
    }
  };
}
