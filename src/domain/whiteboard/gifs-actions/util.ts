import { fabricGif } from './fabricGif';
import { v4 as uuidv4 } from 'uuid';
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { IImageOptions } from 'fabric/fabric-impl';

/**
 * Function to create gif as object
 *
 * @param image Image to upload
 * @param userId User id
 * @param canvas Canvas instance
 */
export async function createGif(
  image: string | File,
  userId: string,
  canvas: fabric.Canvas
) {
  try {
    const gif = await fabricGif(image, 200, 200, 2000);
    gif.set({ top: 0, left: 0 });
    gif.id = `${userId}:${uuidv4()}`;
    canvas.add(gif);

    fabric.util.requestAnimFrame(function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * Function to create an image object
 *
 * @param image Image to upload
 * @param userId User id
 * @param canvas Canvas instance
 */
export function createImageAsObject(
  image: string,
  userId: string,
  canvas: fabric.Canvas
) {
  return fabric.Image.fromURL(image, function (img) {
    const objectImage: ICanvasObject = img.set({
      left: 0,
      top: 0,
    });

    img.scaleToHeight(250);
    img.scaleToWidth(250);

    objectImage.id = `${userId}:${uuidv4()}`;
    canvas?.add(objectImage);
  });
}

interface IBackgroundImage extends IImageOptions {
  id?: string;
}

/**
 * Function to create a Background Image
 *
 * @param image Image to upload
 * @param userId User id
 * @param canvas Canvas instance
 */
export async function createBackgroundImage(
  image: string,
  userId: string,
  canvas: fabric.Canvas
) {
  return new Promise((resolve) => {
    fabric.Image.fromURL(image, function (img) {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: (canvas.width || 0) / (img.width || 0),
        scaleY: (canvas.height || 0) / (img.height || 0),
        originX: 'left',
        originY: 'top',
        id: `${userId}:${uuidv4()}`,
      } as IBackgroundImage);

      resolve();
    });
  });
}
