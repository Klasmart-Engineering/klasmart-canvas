import { useEffect } from 'react';
import { fabric } from 'fabric';
import { UserInfoTooltip } from '../brushes/classes/userInfoTooltip';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
/**
 * Handles logic for showing user info on object hover
 * @param {fabric.Canvas} canvas - Canvas to draw
 * @param {string} displayUserInfo - display option
 */
export const useObjectHover = (
  canvas: fabric.Canvas,
  displayUserInfo: string
) => {
  let tooltipShapesGroup: fabric.Group;
  const tooltip = UserInfoTooltip.createInstance(displayUserInfo);

  /**
   * Get tooltip and add it to the canvas
   * @param {fabric.Object} hoveredObject - hovered object
   */
  const showTooltip = (hoveredObject: fabric.Object) => {
    if (
      !tooltip ||
      !hoveredObject.hasOwnProperty('id') ||
      tooltip.hasTheSameObject(hoveredObject)
    ) {
      return;
    }

    tooltipShapesGroup = tooltip.getDrawing(hoveredObject, displayUserInfo);
    canvas.add(tooltipShapesGroup);
  };

  /**
   * Remove tooltip from canvas and unlink it from the object
   */
  const hideTooltip = () => {
    const canvasObjects = canvas.getObjects();
    if (tooltip && tooltip.isShown()) {
      tooltip.removeObject();
    }
    for (let x = 0; x < canvasObjects.length; x++) {
      if (
        canvasObjects[x].hasOwnProperty('id') &&
        (canvasObjects[x] as ICanvasObject).id === 'tooltip'
      )
        canvas.remove(canvasObjects[x]);
    }
  };

  /**
   * Check if pointer is hovering some fabric canvas object
   * @param {fabric.Ievent} e - fabric event
   */
  const checkIfIsHoverSomeObject = (e: fabric.IEvent) => {
    hideTooltip();
    if (!e.pointer) return;
    const { pointer } = e;
    const canvasObjects = canvas.getObjects();
    const canvasObject = canvasObjects.find((obj) =>
      obj.containsPoint(pointer)
    );

    if (canvasObject) showTooltip(canvasObject);
  };

  /**
   * Activate hover tooltip.
   */
  useEffect(() => {
    if (canvas && displayUserInfo !== 'none') {
      canvas.on('mouse:move', function (e) {
        checkIfIsHoverSomeObject(e);
      });
    }

    return () => {
      canvas?.off('mouse:move');
    };
  });
};
