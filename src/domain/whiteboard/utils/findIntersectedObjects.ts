import { TypedShape } from '../../../interfaces/shapes/shapes';
import { Canvas } from 'fabric/fabric-impl';

export const findIntersectedObjects = (
  mainObject: TypedShape,
  objectsList: TypedShape[],
  canvas: Canvas
) => {
  /* Color to set in the stroke of the current compared object
    to could difference it in the mainObject color data */
  const differentStroke = '#ababab';

  /**
   * Color to set in the mainObject's background to better the algorithm
   * and exclude that objects that are in the mainObject's area but are not
   * in the mainObject's fill
   */
  const differentBackground = '#acacac';

  /**
   * Check if really the given object is intersecting the mainObject
   * @param {TypedShape} object - object to check
   */
  const isTouchingMainObject = (object: TypedShape) => {
    /* If comparation is with same object,
      this will be pass directly like intersectedObject */
    if (object === mainObject) return true;

    if (mainObject.intersectsWithObject(object)) {
      if (object.type === 'image') {
        showOtherObjects(false, object);
        canvas.renderAll();

        let data = getMainObjectColorData();

        return imageIsTouching(data, object);
      } else {
        if (!object.stroke) return;

        let originalStroke = object.stroke;

        mainObject.set({
          backgroundColor: differentBackground,
        });

        object.set({
          stroke: differentStroke,
        });
        canvas.renderAll();

        let data = getMainObjectColorData();

        return commonObjectIsTouching(data, object, originalStroke);
      }
    }

    return false;
  };

  /**
   * Coverts the given colorData to Hexadecimal Code
   * @param {number[]} colorData - RGB color values
   */
  const rgbaDataToHexadecimalColor = (colorData: number[]) => {
    return `#${(
      (1 << 24) +
      (colorData[0] << 16) +
      (colorData[1] << 8) +
      colorData[2]
    )
      .toString(16)
      .slice(1)}`;
  };

  /**
   * Executes the necessary evaluations to check
   * if the given image object is really touching the mainObject
   * @param {Uint8ClampedArray} colorData - color data to review
   * @param {TypedShape} currentObject - actual compared object
   */
  const imageIsTouching = (
    colorData: Uint8ClampedArray,
    currentObject: TypedShape
  ) => {
    for (let i = 0; i < colorData.length; i += 4) {
      let currentColor = [
        colorData[i],
        colorData[i + 1],
        colorData[i + 2],
        colorData[i + 3],
      ];

      if (
        rgbaDataToHexadecimalColor(currentColor) !== canvas.backgroundColor &&
        colorData[i + 3] !== 0
      ) {
        showOtherObjects(true, currentObject);
        canvas.renderAll();
        return true;
      }
    }

    showOtherObjects(true, currentObject);
    canvas.renderAll();
    return false;
  };

  /**
   * Executes the necessary evaluations to check
   * if the given object is really touching the mainObject
   * @param {Uint8ClampedArray} colorData - color data to review
   * @param {TypedShape} currentObject - actual compared object
   * @param {string} originalStroke - original stroke color
   * for the currentObject
   */
  const commonObjectIsTouching = (
    colorData: Uint8ClampedArray,
    currentObject: TypedShape,
    originalStroke: string
  ) => {
    for (let i = 0; i < colorData.length; i += 4) {
      let currentColor = [
        colorData[i],
        colorData[i + 1],
        colorData[i + 2],
        colorData[i + 3],
      ];

      if (rgbaDataToHexadecimalColor(currentColor) === differentStroke) {
        mainObject.set({
          backgroundColor: 'transparent',
        });

        currentObject.set({
          stroke: originalStroke,
        });
        canvas.renderAll();

        return true;
      }
    }

    mainObject.set({
      backgroundColor: 'transparent',
    });

    currentObject.set({
      stroke: originalStroke,
    });

    canvas.renderAll();
    return false;
  };

  /**
   * Show/hide the rest of elements that currently are not compared,
   * but are intersecting the mainObject
   * @param {boolean} status - status (true for show, false for hide)
   * @param {TypedShape} currentObject - current compared object with mainObject
   */
  const showOtherObjects = (status: boolean, currentObject: TypedShape) => {
    objectsList.forEach((obj) => {
      if (mainObject.intersectsWithObject(obj) && currentObject !== obj) {
        obj.set({
          visible: status,
        });
      }
    });
  };

  /**
   * Get the current mainObject color data
   */
  const getMainObjectColorData = () => {
    return canvas
      .getContext()
      .getImageData(
        Number(mainObject.oCoords?.tl.x) - 1,
        Number(mainObject.oCoords?.tl.y) - 1,
        Number(mainObject.width) + 1,
        Number(mainObject.height) + 1
      ).data;
  };

  return objectsList.filter((o: TypedShape) => isTouchingMainObject(o));
};
