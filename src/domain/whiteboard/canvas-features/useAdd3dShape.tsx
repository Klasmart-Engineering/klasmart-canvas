import { useContext, useEffect } from 'react';
import { WhiteboardContext } from '../WhiteboardContext';
import { v4 as uuidv4 } from 'uuid';
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';

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
    set3dImage,
    json3D,
    set3dJson,
    setShoud3dClose
  } = useContext(WhiteboardContext);

  /**
   * Handles the logic to add images and gifs as objects
   * and background images to the whiteboard.
   */
  useEffect(() => {
     if (!canvas || new3dImage === "" || json3D === "") return;  
     setShoud3dClose(false)
    fabric.Image.fromURL(new3dImage, (img) => {
      set3dImage("")
      const three = JSON.parse(json3D)
      // eventSerializer.push('three', {type: 'exporting3d', target: three.shapeType, id: "teacher"});
      console.log("drawing img in 2d", three)

      let top = 0
      let left = 0
      if(typeof three.canvasPosition !== "undefined"){
        top = three.canvasPosition.top
        left = three.canvasPosition.left
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
      if(typeof three.canvasPosition === "undefined"){
        objectImage.center()
      }
      set3dJson("")
      
      
    });
    
    
  }, [new3dImage/*, json3D*/]);
};
