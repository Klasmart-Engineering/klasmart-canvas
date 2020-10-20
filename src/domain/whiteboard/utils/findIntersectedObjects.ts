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

  const validColors = [
    '#ffffff',
    '#e6e6e6',
    '#808080',
    '#000000',
    '#f8433f',
    '#5fe119',
    '#347dfa',
    '#44f9f9',
    '#f289fe',
    '#fbe739',
    '#fb823f',
    '#8880fc',
    '#0c7cfa',
  ];

  let originalBackground: string;
  originalBackground = mainObject.backgroundColor || 'transparent';
  mainObject.set('backgroundColor', '#acacac');
  canvas.renderAll();

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

        canvas.renderAll();
        let originalStroke = object.stroke;

        showOtherObjects(false, object);
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
  const imageIsTouching = (colorData: ImageData, currentObject: TypedShape) => {
    for (let i = 0; i < colorData.data.length; i += 4) {
      let currentColor = [
        colorData.data[i],
        colorData.data[i + 1],
        colorData.data[i + 2],
        colorData.data[i + 3],
      ];

      if (
        rgbaDataToHexadecimalColor(currentColor) !== canvas.backgroundColor &&
        colorData.data[i + 3] !== 0
      ) {
        showOtherObjects(true, currentObject);
        canvas.renderAll();
        return true;
      }
    }

    showOtherObjects(true, currentObject);
    // mainObject.set('backgroundColor', originalBackground);
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
    colorData: ImageData,
    currentObject: TypedShape,
    originalStroke: string
  ) => {
    console.log(originalStroke);
    const pointIsNeighbor = (i: number) => {
      let upLeftPoint =
        i % colorData.width && colorData.data[i - colorData.width * 4 - 4] !== 0
          ? rgbaDataToHexadecimalColor([
              colorData.data[i - colorData.width * 4 - 1],
              colorData.data[i - colorData.width * 4 - 2],
              colorData.data[i - colorData.width * 4 - 3],
              colorData.data[i - colorData.width * 4 - 4],
            ])
          : '#aN';

      let upPoint =
        colorData.data[i - colorData.width * 4 + 3] !== 0
          ? rgbaDataToHexadecimalColor([
              colorData.data[i - colorData.width * 4],
              colorData.data[i - colorData.width * 4 + 1],
              colorData.data[i - colorData.width * 4 + 2],
              colorData.data[i - colorData.width * 4 + 3],
            ])
          : '#aN';

      let upRightPoint =
        i % colorData.width !== colorData.width - 1 &&
        colorData.data[i - colorData.width * 4 + 7] !== 0
          ? rgbaDataToHexadecimalColor([
              colorData.data[i - colorData.width * 4 + 4],
              colorData.data[i - colorData.width * 4 + 5],
              colorData.data[i - colorData.width * 4 + 6],
              colorData.data[i - colorData.width * 4 + 7],
            ])
          : '#aN';

      let leftPoint =
        i % colorData.width && colorData.data[i - 4] !== 0
          ? rgbaDataToHexadecimalColor([
              colorData.data[i - 1],
              colorData.data[i - 2],
              colorData.data[i - 3],
              colorData.data[i - 4],
            ])
          : '#aN';

      let rightPoint =
        i % colorData.width !== colorData.width - 1 &&
        colorData.data[i + 7] !== 0
          ? rgbaDataToHexadecimalColor([
              colorData.data[i + 4],
              colorData.data[i + 5],
              colorData.data[i + 6],
              colorData.data[i + 7],
            ])
          : '#aN';

      let downLeftPoint =
        i % colorData.width && colorData.data[i + colorData.width * 4 - 4] !== 0
          ? rgbaDataToHexadecimalColor([
              colorData.data[i + colorData.width * 4 - 1],
              colorData.data[i + colorData.width * 4 - 2],
              colorData.data[i + colorData.width * 4 - 3],
              colorData.data[i + colorData.width * 4 - 4],
            ])
          : '#aN';

      let downPoint =
        colorData.data[i + colorData.width * 4 + 3] !== 0
          ? rgbaDataToHexadecimalColor([
              colorData.data[i + colorData.width * 4],
              colorData.data[i + colorData.width * 4 + 1],
              colorData.data[i + colorData.width * 4 + 2],
              colorData.data[i + colorData.width * 4 + 3],
            ])
          : '#aN';

      let downRightPoint =
        i % colorData.width !== colorData.width - 1 &&
        colorData.data[i + colorData.width * 4 + 7] !== 0
          ? rgbaDataToHexadecimalColor([
              colorData.data[i + colorData.width * 4 + 4],
              colorData.data[i + colorData.width * 4 + 5],
              colorData.data[i + colorData.width * 4 + 6],
              colorData.data[i + colorData.width * 4 + 7],
            ])
          : '#aN';

      console.log(
        upLeftPoint,
        upPoint,
        upRightPoint,
        leftPoint,
        rightPoint,
        downLeftPoint,
        downPoint,
        downRightPoint
      );

      return (
        validColors.includes(upLeftPoint) ||
        validColors.includes(upPoint) ||
        validColors.includes(upRightPoint) ||
        validColors.includes(leftPoint) ||
        validColors.includes(rightPoint) ||
        validColors.includes(downLeftPoint) ||
        validColors.includes(downPoint) ||
        validColors.includes(downRightPoint)
      );
    };

    for (let i = 0; i < colorData.data.length; i += 4) {
      let currentColor = [
        colorData.data[i],
        colorData.data[i + 1],
        colorData.data[i + 2],
        colorData.data[i + 3],
      ];

      if (
        rgbaDataToHexadecimalColor(currentColor) === differentStroke &&
        pointIsNeighbor(i)
      ) {
        showOtherObjects(true, currentObject);
        currentObject.set({
          stroke: originalStroke,
        });
        // canvas.renderAll();

        mainObject.set('backgroundColor', originalBackground);
        canvas.renderAll();

        return true;
      }
    }

    showOtherObjects(true, currentObject);
    currentObject.set({
      stroke: originalStroke,
    });

    mainObject.set('backgroundColor', originalBackground);
    // canvas.renderAll();
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
    let currentData = canvas
      .getContext()
      .getImageData(
        Number(mainObject.oCoords?.tl.x) - 1,
        Number(mainObject.oCoords?.tl.y) - 1,
        Number(mainObject.width) + 1,
        Number(mainObject.height) + 1
      );

    return currentData;
  };

  return objectsList.filter((o: TypedShape) => isTouchingMainObject(o));
};
