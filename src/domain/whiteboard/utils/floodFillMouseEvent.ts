import { TypedShape } from "../../../interfaces/shapes/shapes";
import FloodFiller from "./floodFiller";
import { v4 as uuidv4 } from 'uuid';
import { fabric } from 'fabric';

export const setTemporaryCanvas = (height: number, width: number) => {
  const tempCanvas = document.createElement('canvas');
  const tempContext = tempCanvas.getContext('2d') as CanvasRenderingContext2D;
  tempCanvas.height = height;
  tempCanvas.width = width;

  return { tempCanvas, tempContext };
}

export const updateTemporary = (palette: any, tempCanvas: any, tempContext: any, data: any) => {
  tempContext.putImageData(palette, 0, 0);
  let newImgData = tempContext.getImageData(data.x, data.y, data.width, data.height);
  tempCanvas.width = data.width;
  tempCanvas.height = data.height;
  tempContext.putImageData(newImgData,0,0);
}

export const stripForeignObjects = (canvas: any, isLocalObject: any, userId: string) => {
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

const addForeignObjects = (canvas: any, placeholderNonLocal: TypedShape[]) => {
  placeholderNonLocal.forEach((o: TypedShape) => {
    canvas.add(o);
  });

  canvas.renderAll();
}


export const floodFillMouseEvent = async (
  event: fabric.IEvent,
  canvas: any,
  userId: string,
  isLocalObject: (p1: string, p2: string) => boolean | undefined,
  getColorInCoord: (n1: number, n2: number) => string | null,
  color: string,
) => {
  const { tempCanvas, tempContext } = setTemporaryCanvas(canvas.getHeight(), canvas.getWidth());
  const placeholderNonLocal = stripForeignObjects(canvas, isLocalObject, userId);
  const palette = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const context = canvas.getContext();
  const imgData = context.getImageData(0, 0, canvas.getWidth() * 2, canvas.getHeight() * 2);
  const floodFiller = new FloodFiller(imgData);

  // @ts-ignore
  let id = event.target.get('type') !== 'path' ? (event.target as TypedShape).id : null;
  const clickedColor = getColorInCoord(
    Math.round((event.pointer as { x: number; y: number }).x), 
    Math.round((event.pointer as { x: number; y: number }).y)
  );

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

  palette.data.set(new Uint8ClampedArray(data.coords)); 
  tempContext.putImageData(palette, 0, 0);
  let newImgData = tempContext.getImageData(data.x, data.y, data.width, data.height);

  tempCanvas.width = data.width;
  tempCanvas.height = data.height;
  tempContext.putImageData(newImgData,0,0);

  addForeignObjects(canvas, placeholderNonLocal);

  // @ts-ignore
  if (canvas.width - data.width <= 4 && canvas.height - data.height <= 4) {
    // Paint background as chosen color here!!!!!!!!!!
    return;
  }

  const tempData = tempCanvas.toDataURL();

  fabric.Image.fromURL(tempData, (image: any) => {

    if (!id || (event.target as any).color !== clickedColor) {
      // generate new ID, which will be for the image created by the new color.
      id = `${userId}:${uuidv4()}`;
    } else if ((event.target as any).color === clickedColor) {
      canvas.remove(event.target as fabric.Object);
    }

    image.set({ 
      top: data.y / 2,
      left: data.x / 2,
      scaleX: 0.5,
      scaleY: 0.5,
      selectable: false,
      evented: false,
      id,
      color
    });

    canvas.add(image);
    canvas.discardActiveObject();
  });

  tempCanvas.remove();
  return;
}
