import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { WhiteboardContext } from '../WhiteboardContext';
import {  is3DShape } from '../utils/shapes';


/**

 * Handles logic for showing user info on object hover

 * @param {fabric.Canvas} canvas - Canvas to draw

 * @param {string} displayUserInfo - display option

 */

export const use2To3d = (canvas: fabric.Canvas) => {
  // Getting necessary context variables

  const { is3dActive, set3dActive, set3dJson, new3dImage, setRedrawing3d, setEditing3d, set3dCanvasPosition } = useContext(
    WhiteboardContext
  );

  const to3D = (canvasObject: ICanvasObject) => {
    
    const three = JSON.parse(
      (canvasObject as ICanvasObject).threeObject as string
    );
    three.canvasPosition = { left: canvasObject.left, top: canvasObject.top };
    set3dCanvasPosition(three.canvasPosition)
    const width = (canvasObject.width ?? 1) * (canvasObject.scaleX ?? 1);
    const height = (canvasObject.height ?? 1) * (canvasObject.scaleY ?? 1);
    three.canvasSize = { width, height };
    console.log("exporting from 2d...", three);
    const threeObjectString = JSON.stringify(three);

    canvas.remove(canvasObject);
    set3dJson(threeObjectString);
  };

  /**

   * Check if pointer is hovering some fabric canvas object

   * @param {fabric.Ievent} e - fabric event

   */

  const checkIfHasClickedSome3dObject = (e: fabric.IEvent) => {
    if (!e.pointer) return;

    const { pointer } = e;

    const canvasObjects = canvas.getObjects();

    const canvasObject = canvasObjects.find((obj) =>
      obj.containsPoint(pointer)
    );

    if (
      canvasObject &&
      typeof canvasObject !== 'undefined' &&
      canvasObject.hasOwnProperty('threeObject')
    ) {
      return canvasObject
    }
    return false
  };

  const onMouseDown = function (e: fabric.IEvent) {
    const canvasObject = checkIfHasClickedSome3dObject(e)
    if(canvasObject){
      console.log("3d clicked")
      to3D(canvasObject);
      setEditing3d(true)
      set3dActive(true);
    }
  };

  /**

   * Activate hover tooltip.

   */

  const redraw = (e: fabric.IEvent) => {
    const canvasObject = e.target as ICanvasObject;
    if(is3DShape(canvasObject)){
      console.log("(scaled/moved) redrawing...")
      to3D(canvasObject);
      setRedrawing3d(true)
      set3dActive(true);
    }
  };

  useEffect(() => {
    if (canvas) {
      canvas.on('mouse:down', onMouseDown);
    }

    return () => {
      canvas?.off('mouse:down', onMouseDown);
    };
  }, [is3dActive, canvas]);

  /**
   * Handles the logic to add images and gifs as objects
   * and background images to the whiteboard.
   */
  useEffect(() => {
    if (!canvas) return;

    canvas.on('object:scaled', redraw);
    canvas.on('object:moved', redraw);

    return () => {
      canvas?.off('object:scaled', redraw);
      canvas?.off('object:moved', redraw);
    };
  }, [new3dImage, canvas]);
  
};
