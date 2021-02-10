import { useEffect, useContext } from 'react';
import { fabric } from 'fabric';
import { UserInfoTooltip } from '../brushes/classes/userInfoTooltip';
/**
 * Handles logic for showing user info on object hover
 * @param {fabric.Canvas} canvas - Canvas to draw
 */
export const useObjectHover = (canvas: fabric.Canvas, displayUserInfo: string) => {
  
  let tooltipShapesGroup: fabric.Group;
  let tooltip = new UserInfoTooltip(displayUserInfo);

  const showTooltip = (
    hoveredObject: fabric.Object
  ) => {

    if (!hoveredObject.hasOwnProperty('id')) {
      return;
    }

    tooltip.setObject(hoveredObject);
    tooltipShapesGroup = tooltip.getDrawing();
    canvas.add(tooltipShapesGroup);
    // setTimeout(()=> {hideTooltip()}, 2000)
  };

  const hideTooltip = () => {
    canvas.remove(tooltipShapesGroup);
  };

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
   * Activates hover tooltip.
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
