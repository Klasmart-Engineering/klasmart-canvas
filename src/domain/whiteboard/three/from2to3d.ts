import { ICanvasObject } from '../../../interfaces/objects/canvas-object';

/**
 * Get three object stored in canvasObject, updates it according the current canvasObject 
 * @param canvasObject - canvasObject image being translated to its related 3d shape
 * @returns {I3dObject} - threeObject with updated attributes
 */
const from2To3d = (canvasObject: ICanvasObject) => {
  
  const threeObject = JSON.parse(canvasObject.threeObject as string);
  const width = (canvasObject.width ?? 1) * (canvasObject.scaleX ?? 1);
  const height = (canvasObject.height ?? 1) * (canvasObject.scaleY ?? 1);
  threeObject.canvasSize = { width, height };
  threeObject.canvasRotation = canvasObject.angle ?? 0;
  threeObject.canvasPosition = {
    left: canvasObject.left as number,
    top: canvasObject.top as number,
  };

  return threeObject;
};

export default from2To3d;
