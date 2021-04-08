import { ICanvasObject } from '../../../interfaces/objects/canvas-object';

/**
 * Get three object stored in canvasObject, updates it according the current canvasObject 
 * @param canvasObject - canvasObject image being translated to its related 3d shape
 * @returns {I3dObject} - threeObject with updated attributes
 */
const from2To3d = (canvasObject: ICanvasObject) => {
  /**
   * This rotation is needed due to the different approaches regarding CSS position 
   * of the 3d canvas and position according fabric.js
   */
  const canvasRotation = canvasObject.angle ?? 0;
  canvasObject.rotate(0)
  const threeObject = JSON.parse(canvasObject.threeObject as string);
  const width = (canvasObject.width ?? 1) * (canvasObject.scaleX ?? 1);
  const height = (canvasObject.height ?? 1) * (canvasObject.scaleY ?? 1);
  threeObject.canvasSize = { width, height };
  threeObject.canvasRotation = canvasRotation
  threeObject.canvasPosition = {
    left: canvasObject.left as number,
    top: canvasObject.top as number,
  };
  threeObject.isFlipped = canvasObject.flipX
  return threeObject;
};

export default from2To3d;
