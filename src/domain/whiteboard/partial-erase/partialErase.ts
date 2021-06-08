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
import { CanvasAction, SET } from '../reducers/undo-redo';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { PaintEventSerializer } from '../../../poc/whiteboard/event-serializer/PaintEventSerializer';
import { IImageOptions, Pattern, Point } from 'fabric/fabric-impl';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { IUndoRedoSingleEvent } from '../../../interfaces/canvas-events/undo-redo-single-event';

/**
 * Class that handles all partial erasure methods.
 */
export class PartialErase {
  /**
   * User ID
   */
  private id: string;

  /**
   * Permanent canvas.
   */
  private canvas: fabric.Canvas;

  /**
   * Temporary canvas will erasing will take place.
   */
  private tempCanvas: fabric.Canvas;

  /**
   * Raw canvas will erasing will take place.
   */
  private rawCanvas: HTMLCanvasElement;

  /**
   * Eraser width.
   */
  private lineWidth: number;

  /**
   * Eraser cursor.
   */
  private eraseObjectCursor: string;

  /**
   * Indicates if all tools in toolbar are enabled. Typically
   * true for teachers.
   */
  private allToolbarIsEnabled: boolean;

  /**
   * Indicates if partial eraser is active.
   */
  private partialEraseIsActive: boolean;

  /**
   * Dispatcher for undo / redo functionality
   */
  private undoRedoDispatch: React.Dispatch<CanvasAction>;

  /**
   * Indicates if eraser is active.
   */
  private active: boolean;

  /**
   * Event synchronizer methods.
   */
  public eventSerializer: PaintEventSerializer;

  /**
   * Mouse coordinates.
   */
  public coordinates: { x: number; y: number }[];

  /**
   * Indicates if user has permission to do a partial erase action.
   */
  public hasPermission: boolean;

  /**
   * Indicates if canvas has an erasable background owned to user.
   */
  public hasBackground: boolean;

  /**
   * background Id
   */
  public backgroundId: string | null;

  /**
   * Temporary background canvas
   */
  private bgRawCanvas: any;

  /**
   * Indicates if user has owned objects in board
   */
  private hasSelfObjects: boolean;

  /**
   * Indicates if user has permissison for images and owns background
   */
  private hasBgPermission: boolean;

  /**
   * Canvas background image fabric.js object.
   */
  private backgroundImage: ICanvasObject | null;

  /** @ignore */
  constructor(
    id: string,
    canvas: fabric.Canvas,
    lineWidth: number,
    eraseObjectCursor: string,
    allToolbarIsEnabled: boolean,
    partialEraseIsActive: boolean,
    hasPermission: boolean,
    eventSerializer: PaintEventSerializer,
    undoRedoDispatch: React.Dispatch<CanvasAction>
  ) {
    this.eventSerializer = eventSerializer;
    this.coordinates = [];
    this.id = id;
    this.canvas = canvas;
    this.rawCanvas = document.createElement('canvas');
    this.rawCanvas.classList.add('raw-canvas')
    this.rawCanvas.style.cssText = 'position: absolute; z-index: 3;';
    this.undoRedoDispatch = undoRedoDispatch;
    this.active = false;
    this.hasBackground = canvas.backgroundImage ? true : false;
    this.backgroundId = null;
    this.bgRawCanvas = null;
    this.hasSelfObjects = false;
    this.hasBgPermission = this.hasBackground ? this.isOwned(id, (canvas.backgroundImage as unknown as ICanvasObject).id as string) : false;
    this.backgroundImage = this.hasBackground ? this.canvas.backgroundImage as ICanvasObject : null;

    if (this.hasBackground && this.hasBgPermission) {
      this.backgroundId = this.backgroundImage?.id as string;
      this.generateBackground();

      this.canvas.on('background:modified', (e) => {
       
        if (!e || !(e as unknown as ICanvasObject).id) {
          this.generateBackground(null);
          return;
        }

        // @ts-ignore
        const src = (e as unknown as fabric.Image)?.getElement ? e : null;
        this.generateBackground(src);
      });
    }

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
    this.hasPermission = hasPermission;

    this.moveSelfToTemp();
    this.tempCanvas.on('path:created', this.pathCreated);
  }

  private generateBackground = (src?: any) => {
    if (this.bgRawCanvas) {
      this.bgRawCanvas.remove();
      this.bgRawCanvas = null;
    }

    if (!this.bgRawCanvas) {
      this.bgRawCanvas = document.createElement('canvas');
      this.bgRawCanvas.width = this.canvas.width;
      this.bgRawCanvas.height = this.canvas.height;
      this.bgRawCanvas.style.position = 'absolute';
    }

    if (!src) {
      this.canvas.getElement().before(this.bgRawCanvas);
    } else {
      this.tempCanvas.getElement().before(this.bgRawCanvas);
    }

    let background = new Image();

    if (!src && (this.canvas.backgroundImage as fabric.Image)?.getElement) {
      this.hasBackground = true;
      background.src = (this.canvas.backgroundImage as fabric.Image)?.getElement().currentSrc;
    } else if (src && src.getElement) {
      this.hasBackground = true;
      background.src = src.getElement().currentSrc;
    } else {
      this.hasBackground = false;
      return;
    }

    background.onload = () => {
      const ctx = this.bgRawCanvas.getContext('2d');
      let width;
      let height;

      if (!src) {
        // @ts-ignore  - linter ignoring backgroundImage type and optional chaining.
        width = background.width * this.canvas.backgroundImage?.scaleX;
        // @ts-ignore  - linter ignoring backgroundImage type and optional chaining.
        height = background.height * this.canvas.backgroundImage?.scaleY;
      } else {
        width = background.width * src.scaleX;
        height = background.height * src.scaleY;
      }

      ctx.drawImage(background, 0, 0, width, height);

      this.canvas.backgroundImage = '';
      this.canvas.renderAll();
    }
  }

  /**
   * Initiates erasing availability.
   */
  public init = () => {
    this.tempCanvas.freeDrawingBrush = new fabric.PencilBrush();
    (this.tempCanvas
      .freeDrawingBrush as ICanvasFreeDrawingBrush).canvas = this.tempCanvas;
    this.tempCanvas.freeDrawingBrush.color = 'rgba(0,0,0,0)';
    this.tempCanvas.freeDrawingBrush.width = this.lineWidth;
    this.tempCanvas.freeDrawingCursor = `url("${this.eraseObjectCursor}"), auto`;
    this.tempCanvas.isDrawingMode =
      this.allToolbarIsEnabled ||
      this.hasPermission ||
      this.partialEraseIsActive;

    this.tempCanvas.on('mouse:move', (e: ICanvasMouseEvent) => {
      if ((e.e as MouseEvent).buttons) {
        if (!this.active) {
          this.active = true;
          this.moveSelfToTemp();
        }
        this.coordinates.push(e.absolutePointer as Point);
        this.buildTempEraseLine();
      } else {
        this.active = false;
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
    let bgContext;

    if (rawContext) {
      rawContext.globalCompositeOperation = 'destination-out';
      rawContext.lineCap = 'round';
      rawContext.strokeStyle = `rgba(0,0,0,1)`;
      rawContext.lineWidth = this.lineWidth;
      rawContext.beginPath();
      rawContext.moveTo(this.coordinates[0].x, this.coordinates[0].y);

      if (this.hasBackground && this.hasBgPermission) {
        bgContext = this.bgRawCanvas.getContext('2d');
        bgContext.globalCompositeOperation = 'destination-out';
        bgContext.lineCap = 'round';
        bgContext.strokeStyle = `rgba(0,0,0,1)`;
        bgContext.lineWidth = this.lineWidth;
        bgContext.beginPath();
        bgContext.moveTo(this.coordinates[0].x, this.coordinates[0].y);
      }

      for (i; i < this.coordinates.length; i++) {
        rawContext.lineTo(this.coordinates[i - 1].x, this.coordinates[i - 1].y);
        rawContext.strokeStyle = `rgba(0,0,0,1)`;
        rawContext.stroke();
        rawContext.beginPath();
        rawContext.moveTo(this.coordinates[i].x, this.coordinates[i].y);

        if (this.hasBackground && this.hasBgPermission) {
          bgContext.lineTo(this.coordinates[i - 1].x, this.coordinates[i - 1].y);
          bgContext.strokeStyle = `rgba(0,0,0,1)`;
          bgContext.stroke();
          bgContext.beginPath();
          bgContext.moveTo(this.coordinates[i].x, this.coordinates[i].y);
        }

        // Remove most rendered points. Leave a segment of rendered points
        // for a smoother path.
        if (this.coordinates.length > 4) {
          this.coordinates.shift();
        }
      }
    }
  };

  /**
   * Moves owned objects to temporary canvas for partial erasing.
   */
  private moveSelfToTemp = () => {
    let objects: ICanvasObject[] = [];

    this.canvas.getObjects().forEach((o: ICanvasObject) => {
      if (this.isOwned(this.id, o.id as string)) {
        this.hasSelfObjects = true;
        this.tempCanvas.add(o);
        objects.push(o);
        o.set({ isActiveErase: true });
        this.canvas.remove(o);
      }
    });

    this.canvas.renderAll();
    this.tempCanvas.renderAll();
  };

  private loadFromJSON = (
    objects: ICanvasObject[],
    backgroundColor?: string | Pattern | undefined
  ): Promise<void> =>
    new Promise((resolve) => {
      let mapped = JSON.stringify({ objects: objects.map((o: ICanvasObject) => ({ ...o, fromJSON: true })) });
      this.canvas.loadFromJSON(mapped, () => {
        if (backgroundColor) {
          this.canvas.backgroundColor = backgroundColor;
        }

        resolve();
      });
    });

  /**
   * Group self owned objects
   */
  private groupObjects = () => {
    this.canvas
      .getObjects()
      .forEach((o: TypedShape | TypedPolygon | TypedGroup | IPathTarget) => {
        if (this.isOwned(this.id, o.id as string)) {
          (o as TypedShape).set({ selectable: true, evented: true });

          if ((o as TypedGroup)._objects && !(o as ICanvasBrush).basePath) {
            (o as TypedGroup).toActiveSelection();
            this.canvas.discardActiveObject();
          }
        }
      });
  }

  private backgroundToPermanent = async (): Promise<void> => {
    return new Promise((resolve) => {
      const dataURL = this.bgRawCanvas.toDataURL();

      fabric.Image.fromURL(dataURL, (image) => {
        this.bgRawCanvas.remove();
        this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas), {
          id: this.backgroundId
        } as IImageOptions);
        resolve();
      });
    });
  }

  /**
   * Moves objects from temporary canvas to permanent canvas.
   */
  private moveSelfToPermanent = async (id?: string | null, destroy?: boolean) => {
    const backgroundColor: string | Pattern | undefined = this.canvas
      .backgroundColor;
    const partiallyErased = this.tempCanvas
      .getObjects()
      .filter(
        (o: TypedShape | IPathTarget) => (o as IPathTarget).isPartialErased
      );

    this.tempCanvas
      .setActiveObject(new fabric.Group(partiallyErased))
      .renderAll();

    let group = this.tempCanvas.getActiveObjects()[0];

    let objects = this.tempCanvas
      .getObjects()
      .filter(
        (o: TypedShape | IPathTarget) => !(o as IPathTarget).isPartialErased
      );

    objects = objects.map((o: TypedShape | IPathTarget) => {
      return o.toJSON(CANVAS_OBJECT_PROPS);
    });

    let foreignObjects = this.canvas
      .getObjects()
      .map((o: TypedShape | IPathTarget) => {
        return o.toJSON(CANVAS_OBJECT_PROPS);
      });

    objects = [...objects, ...foreignObjects];

    await this.loadFromJSON(objects, backgroundColor);

    this.groupObjects();
    this.canvas.renderAll();

    if (this.tempCanvas.getContext()) {
      this.tempCanvas.clear();
    }

    if (this.hasBackground && this.hasBgPermission && destroy) {
      await this.backgroundToPermanent();
      return;
    }


    if (this.hasBackground && this.hasBgPermission && !destroy) {
      const bgImage = this.bgRawCanvas.toDataURL();

      const payload: ObjectEvent = {
        type: 'backgroundImage',
        target: { src: bgImage },
        id: `${this.id}:${uuidv4()}`,
      };

      this.eventSerializer.push('added', payload);
    }

    if (this.hasSelfObjects && (!(this.hasBackground && this.hasBgPermission) || (this.hasBackground && this.hasBgPermission && !destroy))) {
      group.cloneAsImage((image: TypedShape) => {
        image.set({
          top: group.top,
          left: group.left,
          id: id || this.generateId(),
        });

        this.canvas.add(image);
        image.bringToFront();
        this.canvas.renderAll();
        image.bringToFront();
      });
    }
  };

  /**
   * Destroys temporary canvas.
   */
  public destroy = () => {
    if (this.tempCanvas.getObjects().length) {
      this.moveSelfToPermanent();
    }

    if (this.hasBackground && this.hasBgPermission) {
      this.moveSelfToTemp();
      this.moveSelfToPermanent(null, true);
    }

    this.canvas.off('background:modified');
    this.tempCanvas.off('mouse:move');
    this.tempCanvas.dispose();
    this.canvas.getElement().parentNode?.removeChild(this.rawCanvas);
  };

  /**
   *
   * @param selfId Onwer ID
   * @param objectId Object ID
   */
  private isOwned = (selfId: string, objectId: string) => {
    return objectId?.split(':')[0] === selfId;
  };

  /**
   * Generate ID for joined objects.
   */
  private generateId = () => {
    return `${this.id}:${uuidv4()}`;
  };

  /**
   * Checks when path is created and merges erase path with existing objects if erased.
   * @param e Canvas event.
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
      e.path.isErasePath = true;

      let joinedIds: string[] = [];

      let objectsToErase = this.tempCanvas.getObjects().length > 1;

      if (objectsToErase) {
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

            joinedIds.push(obj.id as string);
            partiallyErased.push(obj);
            this.tempCanvas.remove(obj);

            if (obj.id) {
              this.eventSerializer.push('removed', { id: obj.id as string });
            }
          }
        });
      }

      this.tempCanvas
        .setActiveObject(new fabric.Group(partiallyErased))
        .renderAll();

      let group = this.tempCanvas.getActiveObjects()[0];

      let id = this.generateId();

      group.cloneAsImage((image: ICanvasObject) => {
        image.set({
          top: group.top,
          left: group.left,
          id,
          isPartialErased: true,
          joinedIds,
        });

        this.tempCanvas.add(image);

        let payload: ObjectEvent = {
          id: id as string,
          type: 'image',
          target: image.toJSON(CANVAS_OBJECT_PROPS) as ICanvasObject,
        };

        this.updateState(payload);
        this.eventSerializer.push('added', payload);
      });

      if (this.hasBackground && this.hasBgPermission) {
        const payloadBg = {
          id: this.backgroundId,
          target: {
            strategy: 'allowClearMyself',
            isBackgroundImage: true,
          },
        };

        this.eventSerializer.push('removed', payloadBg as ObjectEvent);
      }

      this.tempCanvas.renderAll();
      this.moveSelfToPermanent(id);
    }
  };

  /**
   * Updates undo / redo state.
   * @param eventPayload Event to store in state
   */
  private updateState = (eventPayload: ObjectEvent) => {
    let payload = [
      ...this.canvas.getObjects()
    ];

    let tempCanvasObjects = this.tempCanvas.getObjects();
    let nonErasePathObjects = tempCanvasObjects.filter((path: any) => !path.isErasePath);

    // @ts-ignore
    if (nonErasePathObjects.length > 1 || (nonErasePathObjects.length === 1 && nonErasePathObjects[0].joinedIds?.length)) {
      payload = [
        ...payload,
        ...this.tempCanvas.getObjects(),
      ];
    }

    const eventData = { event: eventPayload, type: 'added' };

    let statePayload = {
      type: SET,
      payload,
      canvasId: this.id,
      event: (eventData as unknown) as IUndoRedoEvent,
    };

    if (this.hasBackground && this.hasBgPermission) {
      const bgImage = this.bgRawCanvas.toDataURL();
      let background = {
        ...(this.backgroundImage?.toJSON(CANVAS_OBJECT_PROPS)),
        backgroundImageEditable: true,
        src: bgImage,
        scaleX: 1,
        scaleY: 1,
      }

      // @ts-ignore - linter ignoring optinonal props.
      statePayload = { ...statePayload, background: background } as CanvasAction;
    };

    this.undoRedoDispatch(statePayload);
  };
}
