import { v4 as uuidv4 } from 'uuid';
import { findLocalObjects } from "./findLocalObjects";
import { findTopLeftOfCollection } from "./findTopLeftOfCollection";
import { TypedShape } from "../../../interfaces/shapes/shapes";
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { ObjectEvent, PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
import { IFloodFillData } from './floodFiller';
import { findObjectsByCoordinates } from './findObjectsByCoordinates';

export interface ITargetObject extends ICanvasObject {
  color: string;
}

export const updateAfterCustomFloodFill = async (
  itemId: string,
  image: fabric.Image,
  target: ITargetObject,
  clickedColor: string,
  canvas: fabric.Canvas, 
  userId: string, 
  data: IFloodFillData,
  eventSerializer: PaintEventSerializer,
  dataEdgeCoords: any
): Promise<ICanvasObject> => {
  let id = itemId;

  if (!id || target.color !== clickedColor) {
    // generate new ID, which will be for the image created by the new color.
    id = `${userId}:${uuidv4()}`;
  } else if (target.color === clickedColor) {
    canvas.remove(target);
  }

  (image as unknown as TypedShape).set({ 
    top: data.y / window.devicePixelRatio,
    left: data.x / window.devicePixelRatio,
    scaleX: .5 * (2 / window.devicePixelRatio),
    scaleY: .5 * (2 / window.devicePixelRatio),
    selectable: false,
    evented: false,
    id,
  });

  canvas.add(image);
  canvas.discardActiveObject();
  let objectsInPathAreaAll: any[] = [];


  dataEdgeCoords.forEach((o: any) => {
    objectsInPathAreaAll.push(findObjectsByCoordinates(o[0], findLocalObjects(userId, canvas.getObjects())));
  });

  objectsInPathAreaAll = objectsInPathAreaAll.flat();

  let objectsAtPoint = objectsInPathAreaAll.reduce((acc: TypedShape[], current: TypedShape) => {
    const found = acc.find((item: TypedShape) => item.id === current.id);

    if (!found) {
      return [ ...acc, current ];
    } else {
      return acc;
    }
  }, []);

  const { top, left } = findTopLeftOfCollection(objectsAtPoint);

  let singleObject = new fabric.Group(objectsAtPoint);
  let joinedIds: string[] = [];

  objectsAtPoint.forEach((o: TypedShape) => {
    o.set({
      skipState: true
    });

    if (o.id && o.id !== id) {
      joinedIds.push(o.id);
    }

    canvas.remove(o);
    eventSerializer.push('removed', { id: o.id as string });
  });

  const clonedImage: Promise<ICanvasObject> = new Promise((resolve, reject) => {
    singleObject.cloneAsImage((cloned: fabric.Object) => {
      if (!cloned) {
        reject();
      }

      (cloned as ICanvasObject).set({ 
        top: top as unknown as number,
        left: left as unknown as number,
        id,
        joinedIds
      });
      canvas.add(cloned);
      canvas.renderAll();

      const payload: ObjectEvent = {
        type: 'image',
        target: cloned as ICanvasObject,
        id,
      };

      eventSerializer.push('added', payload);

      resolve(cloned);
    });
  });

  return await clonedImage;
}
