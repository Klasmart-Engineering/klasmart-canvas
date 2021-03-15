import { useContext, useEffect } from 'react';

import { fabric } from 'fabric';

import { ICanvasObject } from '../../../interfaces/objects/canvas-object';

import { WhiteboardContext } from '../WhiteboardContext';


/**

 * Handles logic for showing user info on object hover

 * @param {fabric.Canvas} canvas - Canvas to draw

 * @param {string} displayUserInfo - display option

 */

export const use2To3d = (canvas: fabric.Canvas) => {
  // Getting necessary context variables

  const { is3dActive, set3dActive, set3dJson, new3dImage, setResizing3d } = useContext(
    WhiteboardContext
  );

  const to3D = (canvasObject: ICanvasObject) => {
    console.log(canvasObject);
    const three = JSON.parse(
      (canvasObject as ICanvasObject).threeObject as string
    );
    three.canvasStyle = { left: canvasObject.left, top: canvasObject.top };
    const width = (canvasObject.width ?? 1) * (canvasObject.scaleX ?? 1);
    const height = (canvasObject.height ?? 1) * (canvasObject.scaleY ?? 1);
    three.canvasSize = { width, height };
    const threeObjectString = JSON.stringify(three);

    canvas.remove(canvasObject);
    set3dJson(threeObjectString);
    set3dActive(true);
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
      to3D(canvasObject);
    }
  };

  const eventHandler = function (e: fabric.IEvent) {
    checkIfHasClickedSome3dObject(e);
  };

  /**

   * Activate hover tooltip.

   */

  const redrawOnResize = (e: fabric.IEvent) => {
    const canvasObject = e.target as ICanvasObject;
    if (canvasObject.hasOwnProperty('threeObject')) {
      // setResizing3d(true)
      to3D(canvasObject);
    }
  };

  useEffect(() => {
    if (canvas && is3dActive) {
      canvas.on('mouse:down', eventHandler);
    }

    return () => {
      canvas?.off('mouse:down', eventHandler);
    };
  }, [is3dActive]);

  /**
   * Handles the logic to add images and gifs as objects
   * and background images to the whiteboard.
   */
  useEffect(() => {
    if (!canvas) return;

    canvas.on('object:scaled', redrawOnResize);

    return () => {
      canvas?.off('object:scaled', redrawOnResize);
    };
  }, [new3dImage]);
};
