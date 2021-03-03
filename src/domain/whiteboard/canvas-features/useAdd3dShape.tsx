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


/**
 * Handles the logic for upload images on Whiteboard
 * (image objects and background images)
 * @param {fabric.Canvas} canvas - Canvas to set the image
 * @param {string} userId - User that will set the image
 */
export const useAdd3dShape = (canvas: fabric.Canvas) => {
  // Getting context variables
  // const {
  //   new3dShape
  // } = useContext(WhiteboardContext);

  /**
   * Handles the logic to add images and gifs as objects
   * and background images to the whiteboard.
   */
  useEffect(() => {
    if (!canvas) return;

    // console.log(new3dShape)
    // fabric.Image.fromURL(new3dShape, function(oImg) {
    //     canvas.add(oImg);
    //   });
    
  });
};
