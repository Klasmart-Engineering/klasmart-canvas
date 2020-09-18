import { TypedShape } from "../../../interfaces/shapes/shapes";
import FloodFiller from "./floodFiller";
import { fabric } from 'fabric';
import { changeBackgroundColor } from "./changeBackgroundColor";
import { updateAfterCustomFloodFill } from "./updateAfterCustomFloodFill";
import { SET } from "../reducers/undo-redo";
import { IUndoRedoEvent } from "../../../interfaces/canvas-events/undo-redo-event";
import { ObjectEvent } from "../event-serializer/PaintEventSerializer";

/**
 * Sets up a temporary canvas to be used for object manipulation
 * @param height Canvas height
 * @param width Canvas width
 */
const setTemporaryCanvas = (height: number, width: number) => {
  const tempCanvas = document.createElement('canvas');
  const tempContext = tempCanvas.getContext('2d') as CanvasRenderingContext2D;
  tempCanvas.height = height;
  tempCanvas.width = width;

  return { tempCanvas, tempContext };
}

/**
 * Updates temporary canvas with data from permanent canvas.
 * @param palette 
 * @param tempCanvas 
 * @param tempContext 
 * @param data 
 */
const updateTemporary = (palette: any, tempCanvas: any, tempContext: any, data: any) => {
  tempContext.putImageData(palette, 0, 0);
  let newImgData = tempContext.getImageData(data.x, data.y, data.width, data.height);
  tempCanvas.width = data.width;
  tempCanvas.height = data.height;
  tempContext.putImageData(newImgData,0,0);
}

/**
 * Removes foreign objects from local board.
 * @param canvas 
 * @param isLocalObject 
 * @param userId 
 */
const stripForeignObjects = (canvas: fabric.Canvas, isLocalObject: any, userId: string) => {
  let placeholderNonLocal: TypedShape[] = [];
    
  canvas.getObjects().forEach((o: TypedShape) => {
    if (!isLocalObject(o.id as string, userId)) {
      placeholderNonLocal.push(o);
      canvas.remove(o);
    }
  });

  canvas.renderAll();
  return placeholderNonLocal;
}

/**
 * Adds foreign objects to local board.
 * @param canvas 
 * @param placeholderNonLocal 
 */
const addForeignObjects = (canvas: fabric.Canvas, placeholderNonLocal: TypedShape[]) => {
  placeholderNonLocal.forEach((o: TypedShape) => {
    canvas.add(o);
  });

  canvas.renderAll();
}

/**
 * Handles flood fill on mouse click for background color or custom paths.
 * @param event 
 * @param canvas 
 * @param userId 
 * @param isLocalObject 
 * @param color 
 * @param eventSerializer 
 * @param undoRedoDispatch 
 */
export const floodFillMouseEvent = async (
  event: fabric.IEvent,
  canvas: fabric.Canvas,
  userId: string,
  isLocalObject: (p1: string, p2: string) => boolean | undefined,
  color: string,
  eventSerializer: any,
  undoRedoDispatch: any,
) => {
  const { tempCanvas, tempContext } = setTemporaryCanvas(canvas.getHeight() * 2, canvas.getWidth() * 2);
    
  // // temporary remove non local objects
  let placeholderNonLocal = stripForeignObjects(canvas, isLocalObject, userId);
  const palette = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const context = canvas.getContext();
  const imgData = context.getImageData(0, 0, canvas.getWidth() * 2, canvas.getHeight() * 2);
  const floodFiller = new FloodFiller(imgData);
  let id = event.target && event.target.get('type') !== 'path' ? (event.target as TypedShape).id : null;

  let data = await floodFiller.fill(
    { 
      x: Math.round((event.pointer as { x: number; y: number }).x) * 2,
      y: Math.round((event.pointer as { x: number; y: number }).y) * 2,
    },
    color,
    0
  );

  if (!data) {
    return;
  }

  const clickedColor = floodFiller.getReplacedColor();

  // @ts-ignore
  palette.data.set(new Uint8ClampedArray(data.coords)); 
  updateTemporary(palette, tempCanvas, tempContext, data);

  placeholderNonLocal.forEach((o: TypedShape) => {
    canvas.add(o);
  });

  canvas.renderAll();

  // @ts-ignore
  if (canvas.width - (data.width / 2) <= 4 && canvas.height - (data.height / 2) <= 4) {
    changeBackgroundColor(canvas, eventSerializer, undoRedoDispatch, color, userId);
    return;
  }

  const tempData = tempCanvas.toDataURL();
  let target;

  fabric.Image.fromURL(tempData, (image: any) => {
    target = image;
    updateAfterCustomFloodFill(id as string, image, event, clickedColor, canvas, userId, data, eventSerializer);

    const payload: ObjectEvent = {
      id: id as string,
      type: 'image',
      target
    };

    const eventData = { event: payload, type: 'added' };
    
    undoRedoDispatch({
      type: SET,
      payload: canvas.getObjects(),
      canvasId: userId,
      event: (eventData as unknown) as IUndoRedoEvent,
    });
  });

  addForeignObjects(canvas, placeholderNonLocal);

  tempCanvas.remove();
}
