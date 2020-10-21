import { fabric } from 'fabric';
import { ICanvasDrawingEvent } from '../../../interfaces/canvas-events/canvas-drawing-event';
import { ICanvasFreeDrawingBrush } from '../../../interfaces/free-drawing/canvas-free-drawing-brush';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { TypedPolygon, TypedShape } from '../../../interfaces/shapes/shapes';
import { v4 as uuidv4 } from 'uuid';
import { ICanvasMouseEvent } from '../../../interfaces/canvas-events/canvas-mouse-event';
import { CANVAS_OBJECT_PROPS } from '../../../config/undo-redo-values';
import { IPathTarget } from '../../../interfaces/canvas-events/path-target';
import { TypedGroup } from '../../../interfaces/shapes/group';
import { SET } from '../reducers/undo-redo';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';

/**
 * Class that handles all partial erasure methods.
 */
export class PartialErase {
  private id: string;
  private canvas: fabric.Canvas;
  private tempCanvas: fabric.Canvas;
  private rawCanvas: HTMLCanvasElement;
  private lineWidth: number;
  private eraseObjectCursor: string;
  private allToolbarIsEnabled: boolean;
  private partialEraseIsActive: boolean;
  private undoRedoDispatch: any;
  public eventSerializer: any;
  

  public coordinates: any[];

  constructor(
    id: string,
    canvas: fabric.Canvas,
    lineWidth: number,
    eraseObjectCursor: string,
    allToolbarIsEnabled: boolean,
    partialEraseIsActive: boolean,
    eventSerializer: any,
    undoRedoDispatch: any,
  ) {
    this.eventSerializer = eventSerializer;
    this.coordinates = [];
    this.id = id;
    this.canvas = canvas;
    this.rawCanvas = document.createElement('canvas');
    this.rawCanvas.style.cssText = 'position: absolute; z-index: 3;';
    this.undoRedoDispatch = undoRedoDispatch;


    this.canvas
      .getElement()
      .parentNode?.insertBefore(this.rawCanvas, this.canvas.getElement());

    this.tempCanvas = new fabric.Canvas(this.rawCanvas, {
      width: canvas.getWidth(),
      height: canvas.getHeight(),
    });

    this.lineWidth = lineWidth;
    this.eraseObjectCursor = eraseObjectCursor;
    this.allToolbarIsEnabled = allToolbarIsEnabled;
    this.partialEraseIsActive = partialEraseIsActive;

    this.moveSelfToTemp();
    this.tempCanvas.on('path:created', this.pathCreated);
  }

  /**
   * 
   */
  public init = () => {
    this.tempCanvas.freeDrawingBrush = new fabric.PencilBrush();
    (this.tempCanvas
      .freeDrawingBrush as ICanvasFreeDrawingBrush).canvas = this.tempCanvas;
    this.tempCanvas.freeDrawingBrush.color = 'rgba(0,0,0,0)';
    this.tempCanvas.freeDrawingBrush.width = this.lineWidth;
    this.tempCanvas.freeDrawingCursor = `url("${this.eraseObjectCursor}"), auto`;
    this.tempCanvas.isDrawingMode =
      this.allToolbarIsEnabled || this.partialEraseIsActive;

    this.tempCanvas.on('mouse:move', (e: any) => {
      if ((e.e as MouseEvent).buttons) {
        this.coordinates.push(e.absolutePointer);
        this.buildTempEraseLine();
      } else {
        this.coordinates = [];
      }
    });
  };

  /**
   * Erases pixes along specified path
   */
  public buildTempEraseLine = () => {
    let rawContext = this.rawCanvas.getContext('2d');
    let i = 1;

    if (rawContext) {
      rawContext.globalCompositeOperation = 'destination-out';
      rawContext.lineCap = 'round';
      rawContext.strokeStyle = `rgba(0,0,0,1)`;
      rawContext.lineWidth = this.lineWidth;
      rawContext.beginPath();
      rawContext.moveTo(this.coordinates[0].x, this.coordinates[0].y);

      for (i; i < this.coordinates.length; i++) {
        console.log(this.coordinates.length, i);
        rawContext.lineTo(this.coordinates[0].x, this.coordinates[0].y);
        rawContext.strokeStyle = `rgba(0,0,0,1)`;
        rawContext.stroke();
        rawContext.beginPath();
        rawContext.moveTo(this.coordinates[i].x, this.coordinates[i].y);

        // Remove most rendered points. Leave a segment of rendered points
        // for a smoother path.
        if (this.coordinates.length > 5) {
          this.coordinates.shift();
        }
      }
    }
  };

  /**
   * Moves owned objects to temporary canvas for partial erasing. 
   */
  private moveSelfToTemp = () => {
    let objects: any[] = [];

    this.canvas.getObjects().forEach((o: any) => {
      if (this.isOwned(this.id, o.id)) {
        this.tempCanvas.add(o);
        objects.push(o);

        this.canvas.remove(o);
      }
    });

    this.canvas.renderAll();
    this.tempCanvas.renderAll();
  };

  /**
   * Moves objects from temporary canvas to permanent canvas.
   */
  private moveSelfToPermanent = () => {
    const partiallyErased = this.tempCanvas.getObjects().filter((o: any) => o.isPartialErased);

    this.tempCanvas
      .setActiveObject(
        new fabric.Group(
          partiallyErased
        )
      )
      .renderAll();
  
    let group = this.tempCanvas.getActiveObjects()[0];

    let objects = this.tempCanvas.getObjects().filter((o: any) => {
      if (!o.isPartialErased) {
        return o;
      }
    });

    objects = objects.map((o: any) => {
      return o.toJSON(CANVAS_OBJECT_PROPS);
    });

    let foreignObjects = this.canvas.getObjects().map((o: any) => {
      return o.toJSON(CANVAS_OBJECT_PROPS);
    });

    objects = [...objects, ...foreignObjects];

    this.canvas.loadFromJSON(JSON.stringify({ objects }), () => {
      this.canvas
        .getObjects()
        .forEach((o: TypedShape | TypedPolygon | TypedGroup | IPathTarget) => {
          if (this.isOwned(this.id, o.id as string)) {
            // if (!(o as IPathTarget).isPartialErased) {
            (o as TypedShape).set({ selectable: true, evented: true });
            // }

            if ((o as TypedGroup)._objects) {
              (o as TypedGroup).toActiveSelection();
              this.canvas.discardActiveObject();
            }
          }
        });

      group.cloneAsImage((image: any) => {
        image.set({
          top: group.top,
          left: group.left,
          id: this.generateId(),
        });
        this.canvas.add(image);
      });

      this.canvas.renderAll();
    });
  };

  /**
   * Destroys temporary canvas.
   */
  public destroy = () => {
    this.tempCanvas.off('mouse:move');
    this.moveSelfToPermanent();
    this.tempCanvas.dispose();
    this.canvas.getElement().parentNode?.removeChild(this.rawCanvas);
  };

  /**
   * 
   * @param selfId Onwer ID
   * @param objectId Object ID
   */
  private isOwned = (selfId: string, objectId: string) => {
    return objectId.split(':')[0] === selfId;
  };

  /**
   * Generate ID for joined objects.
   */
  private generateId = () => {
    return `${this.id}:${uuidv4()}`;
  };

  /**
   * 
   * @param e 
   */
  private pathCreated = (e: ICanvasDrawingEvent) => {
    if (e.path) {
      let partiallyErased: fabric.Object[] = [];
      e.path.stroke = '#ffffff';
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

          partiallyErased.push(obj);
          this.tempCanvas.remove(obj);
          this.eventSerializer.push('removed', { id: obj.id });
        }
      });

      this.tempCanvas
        .setActiveObject(
          new fabric.Group(
            partiallyErased
          )
        )
        .renderAll();
    
      let group = this.tempCanvas.getActiveObjects()[0];
      let id = this.generateId();

      group.cloneAsImage((image: any) => {
        image.set({
          top: group.top,
          left: group.left,
          id,
        });
        this.tempCanvas.add(image);
        const payload = {
          type: 'image',
          target: image,
          id,
        };
        this.eventSerializer.push('added', payload);
      });

      this.tempCanvas.renderAll();
      this.updateState();
    }
  };

  private updateState = () => {
    const payload = [ ...this.canvas.getObjects(), ...this.tempCanvas.getObjects() ];
    const eventData = { event: payload, type: 'partialErase' };

    this.undoRedoDispatch({
      type: SET,
      payload,
      canvasId: this.id,
      event: (eventData as unknown) as IUndoRedoEvent,
    });
  }
}
