import { useContext, useEffect } from 'react';
import { IBackgroundImageEvent } from '../event-serializer/PaintEventSerializer';
import {
  createBackgroundImage,
  createGif,
  createImageAsObject,
} from '../gifs-actions/util';
import { WhiteboardContext } from '../WhiteboardContext';
import { v4 as uuidv4 } from 'uuid';
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';


/**
 * Handles the logic for upload images on Whiteboard
 * (image objects and background images)
 * @param {fabric.Canvas} canvas - Canvas to set the image
 * @param {string} userId - User that will set the image
 */
export const useAdd3dShape = (canvas: fabric.Canvas, userId: string) => {
  // Getting context variables,
  const {
    new3dImage,
    update3dShape,
    json3D,
    set3dJson
  } = useContext(WhiteboardContext);

  /**
   * Handles the logic to add images and gifs as objects
   * and background images to the whiteboard.
   */
  useEffect(() => {
    if (!canvas) return;

    console.log(new3dImage)
    // const img = createImageAsObject(new3dImage as string, userId, canvas);
    fabric.Image.fromURL(new3dImage, (img) => {
      const objectImage: ICanvasObject = img.set({
        left: 0,
        top: 0,
      });
      // img.scaleToHeight(250);
      // img.scaleToWidth(250);
  
      objectImage.id = `${userId}:${uuidv4()}`;
      objectImage.threeObject = json3D
      canvas?.add(objectImage);
      objectImage.center()
      update3dShape("")
      set3dJson("")
      
    });
    
    
  }, [new3dImage]);
};
