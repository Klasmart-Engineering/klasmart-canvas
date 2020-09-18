import { v4 as uuidv4 } from 'uuid';
import { findIntersectedObjects } from "./findIntersectedObjects";
import { findLocalObjects } from "./findLocalObjects";
import { findTopLeftOfCollection } from "./findTopLeftOfCollection";
import { TypedShape } from "../../../interfaces/shapes/shapes";
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';

export const updateAfterCustomFloodFill = (
  itemId: string,
  image: fabric.Image,
  event: any,
  clickedColor: string,
  canvas: fabric.Canvas, 
  userId: string, 
  data: any,
  eventSerializer: any
) => {
  let id = itemId;

  if (!id || (event.target as any).color !== clickedColor) {
    // generate new ID, which will be for the image created by the new color.
    id = `${userId}:${uuidv4()}`;
  } else if ((event.target as any).color === clickedColor) {
    canvas.remove(event.target as fabric.Object);
  }

  (image as unknown as TypedShape).set({ 
    top: data.y / 2,
    left: data.x / 2,
    scaleX: 0.5,
    scaleY: 0.5,
    selectable: false,
    evented: false,
    id,
  });

  canvas.add(image);
  canvas.discardActiveObject();

  const objectsAtPoint = findIntersectedObjects(image as TypedShape, findLocalObjects(userId, canvas.getObjects()));            
  const { top, left } = findTopLeftOfCollection(objectsAtPoint);

  let singleObject = new fabric.Group(objectsAtPoint);

  objectsAtPoint.forEach((o: TypedShape) => {
    canvas.remove(o);
    eventSerializer.push('removed', { id: o.id });
  });

  singleObject.cloneAsImage((cloned: any) => {
    cloned.set({ top, left, id });
    canvas.add(cloned);

    const payload: ObjectEvent = {
      type: 'image',
      target: cloned as ICanvasObject,
      id,
    };

    eventSerializer.push('added', payload);
  });
}
