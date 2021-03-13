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


  const redrawOnResize = (e: fabric.IEvent) => {
    // const target = 
      console.log(e)
      //(e.target as ICanvasObject)
  }

  /**
   * Handles the logic to add images and gifs as objects
   * and background images to the whiteboard.
   */
  useEffect(() => {
    if (!canvas) return;

    console.log(new3dImage)
    // const img = createImageAsObject(new3dImage as string, userId, canvas);
    fabric.Image.fromURL(new3dImage, (img) => {

      const three = JSON.parse(json3D)

      let top = 0
      let left = 0
      if(typeof three.canvasStyle !== "undefined"){
        top = three.canvasStyle.top
        left = three.canvasStyle.left
      }
      const objectImage: ICanvasObject = img.set({
        left,
        top,
        width: three.canvasSize.width,
        height: three.canvasSize.height,
      });
      
      objectImage.id = `${userId}:${uuidv4()}`;
      objectImage.threeObject = json3D
      canvas?.add(objectImage);
      if(typeof three.canvasStyle === "undefined"){
        console.log(three.canvasStyle)
        objectImage.center()
      }
      update3dShape("")
      set3dJson("")
      canvas.on('object:scaled', redrawOnResize);
      
    });

    return () => {
      canvas?.off('object:scaled', redrawOnResize);
    };
    
    
  }, [new3dImage]);
};
