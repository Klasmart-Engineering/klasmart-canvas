import { useContext, useEffect } from 'react';
import { WhiteboardContext } from '../WhiteboardContext';
import { v4 as uuidv4 } from 'uuid';
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { I3dObject } from '../three/I3dObject';
import { useCallback } from 'react';
import { is3DShape } from '../utils/shapes';

/**
 * Handles logic for adding a 2d image representation of a 3d shape after
 * it was exported from its 3d canvas.
 * @param {fabric.Canvas} canvas - Canvas to draw
 * @param {string} userId - user id
 */
export const useAdd3dShape = (canvas: fabric.Canvas, userId: string) => {
  /**
   * Getting context variables.
   */
  const {
    new3dImage,
    set3dImage,
    json3D,
    groupRedrawing3dStatus,
    setGroupRedrawing3dStatus,
    redrawing3dObjects,
    setRedrawing3dObjects,
    set3dSelected,
  } = useContext(WhiteboardContext);

  /**
   * Translate a 3d json or a data url image to a fabric image object
   * @param three
   * @param dataURL
   */
  const translate3dTo2dImage = useCallback(
    (three: I3dObject, dataURL: string = '') => {
      if (dataURL === '') dataURL = three.dataURL;
      fabric.Image.fromURL(dataURL, (img) => {
        let top = 0;
        let left = 0;
        if (typeof three.canvasPosition !== 'undefined') {
          top = three.canvasPosition.top;
          left = three.canvasPosition.left;
        }
        const objectImage: ICanvasObject = img.set({
          left,
          top,
          lockScalingFlip: true,
          lockRotation: true
        });
        objectImage.rotate(three.canvasRotation)
        objectImage.scaleToHeight(three.canvasSize.height);
        objectImage.scaleToWidth(three.canvasSize.width);
        
        console.log(three.object2dId)
        objectImage.id = three.object2dId ?? `${userId}:3D:${uuidv4()}`;
        objectImage.threeObject = JSON.stringify(three);
        objectImage.target = objectImage;

        // const objects = canvas.getObjects()
        // for(let object of objects){
        //   if(is3DShape(object)){
        //     if(three.canvasId === JSON.parse((object as ICanvasObject).threeObject as string).canvasId){
        //       canvas.remove(object)  
        //     }
        //   } 
        // }
        canvas.add(objectImage);
        if (typeof three.canvasPosition === 'undefined') {
          objectImage.center();
        }
      });
    },
    [canvas, userId]
  );

  /**
   * Hook reactive to new 3d data url image change in order to translate it to 2d canvas.
   */
  useEffect(() => {
    if (!canvas || new3dImage === '' || json3D === '') return;
    const three = JSON.parse(json3D);
    translate3dTo2dImage(three, new3dImage);
    set3dImage('');
    set3dSelected(false);
  }, [
    new3dImage,
    canvas,
    json3D,
    set3dImage,
    set3dSelected,
    translate3dTo2dImage
  ]);

  /**
   * Hook reactive to 3d group objects status change in order to translate them to 2d canvas.
   */
  useEffect(() => {
    if (!canvas) return;
    if (groupRedrawing3dStatus === 'exporting') {
      for (let item of redrawing3dObjects) {
        translate3dTo2dImage(item);
      }
      setGroupRedrawing3dStatus('');
      const emptyRedrawing3dObjects: I3dObject[] = [];
      setRedrawing3dObjects(emptyRedrawing3dObjects);
      set3dSelected(false);
    }
  }, [
    groupRedrawing3dStatus,
    canvas,
    redrawing3dObjects,
    set3dSelected,
    setGroupRedrawing3dStatus,
    setRedrawing3dObjects,
    translate3dTo2dImage
  ]);
};
