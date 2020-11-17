import { TypedShape } from '../../../interfaces/shapes/shapes';

interface IPixel {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IPixeledObject {
  x: number;
  y: number;
  pixelMap: IPixelMap;
}

interface IPixelMap {
  data: {
    x: number;
    y: number;
  }[];
  resolution: number;
}

/**
 * Checks the objects in objectsList
 * to know if are really intersecting mainObject
 * @param {TypedShape} mainObject - Flood-fill object
 * @param {TypedShape} objectsList - Objects to compare with mainObject
 * @param {fabric.Canvas} canvas - Canvas in which the objects are
 */
export const findIntersectedObjects = (
  mainObject: TypedShape,
  objectsList: TypedShape[],
  canvas: fabric.Canvas
) => {
  /**
   * Maps the object's ubication to find its pixels
   * @param {TypedShape} object - Object to find pixels
   * @param {number} resolution - Resolution image. A bigger number
   * means better performance but worse precision.
   */
  const pixelMapping = (
    object: TypedShape,
    resolution: number
  ): IPixeledObject => {
    toogleOtherObjects(object, false);
    debugger;

    let pixelMap = [];
    const ctx = canvas.getContext();

    const width = object.getScaledWidth();
    const height = object.getScaledHeight();
    const startPoint = {
      x: Number(object.left),
      y: Number(object.top),
    };

    for (let y = startPoint.y; y <= startPoint.y + height; y += resolution) {
      for (let x = startPoint.x; x <= startPoint.x + width; x += resolution) {
        let pixel = ctx.getImageData(
          x * window.devicePixelRatio,
          y * window.devicePixelRatio,
          resolution * window.devicePixelRatio,
          resolution * window.devicePixelRatio
        );

        if (!isTransparent(pixel)) {
          pixelMap.push({
            x: Math.round(x),
            y: Math.round(y),
          });
        }
      }
    }

    toogleOtherObjects(object, true);
    debugger;

    return {
      x: Math.round(startPoint.x),
      y: Math.round(startPoint.y),
      pixelMap: {
        data: pixelMap,
        resolution: resolution,
      },
    };
  };

  /**
   * Checks if exists a collision in the given pixels
   * @param {IPixel} source - Pixel to compare
   * @param {IPixel} target - Pixel to compare
   */
  const isPixelCollision = (source: IPixel, target: IPixel) => {
    return !(
      source.y + source.height < target.y ||
      source.y > target.y + target.height ||
      source.x + source.width < target.x ||
      source.x > target.x + target.width
    );
  };

  /**
   * Compares each source pixel with each target pixel
   * to find a collision in one of them
   * @param {IPixeledObject} source - Object to compare
   * @param {IPixeledObject} target - Object to compare
   */
  const findPixelCollision = (
    source: IPixeledObject,
    target: IPixeledObject
  ) => {
    for (let s = 0; s < source.pixelMap.data.length; s += 1) {
      const sourcePixel = source.pixelMap.data[s];
      const sourceArea: IPixel = {
        x: sourcePixel.x + source.x,
        y: sourcePixel.y + source.y,
        width: target.pixelMap.resolution,
        height: target.pixelMap.resolution,
      };

      for (let t = 0; t < target.pixelMap.data.length; t += 1) {
        const targetPixel = target.pixelMap.data[t];
        const targetArea: IPixel = {
          x: targetPixel.x + target.x,
          y: targetPixel.y + target.y,
          width: target.pixelMap.resolution,
          height: target.pixelMap.resolution,
        };

        if (isPixelCollision(sourceArea, targetArea)) {
          return true;
        }
      }
    }

    return false;
  };

  /**
   * Show/hide all the objects in canvas except the current object
   * @param {TypedShape} currentObject - Object to ignore
   * @param {boolean} status - Flag to show or hide objects
   * (true: show, false: hide)
   */
  const toogleOtherObjects = (currentObject: TypedShape, status: boolean) => {
    objectsList.forEach((obj) => {
      if (currentObject !== obj) {
        obj.set({
          visible: status,
        });
      }
    });

    canvas.renderAll();
  };

  /**
   * Checks the given image data to know if represents a transparent color
   * @param {ImageData} image - Data to check
   */
  const isTransparent = (image: ImageData) => {
    for (let i = 0; i < image.data.length; i += 4) {
      if (image.data[i + 3] !== 0) {
        return false;
      }
    }

    return true;
  };

  mainObject.set({
    // top: Number(mainObject.top) - 2,
    // left: Number(mainObject.left) - 2,
    // scaleX: (Number(mainObject.width) + 4) / Number(mainObject.width),
    // scaleY: (Number(mainObject.height) + 4) / Number(mainObject.height),
    // backgroundColor: '#ababab',
    // top: (Number(mainObject.top) - 1) / window.devicePixelRatio,
    // left: (Number(mainObject.left) - 1) / window.devicePixelRatio,
    // scaleX:
    //   (Number(mainObject.width) + 1) /
    //   Number(mainObject.width) /
    //   window.devicePixelRatio,
    // scaleY:
    //   (Number(mainObject.width) + 1) /
    //   Number(mainObject.width) /
    //   window.devicePixelRatio,
  });
  canvas.renderAll();

  console.log(mainObject);

  const mainObjectPixels: IPixeledObject = pixelMapping(mainObject, 8);
  console.log(mainObjectPixels);

  return objectsList.filter((o: TypedShape) => {
    let collision = false;

    if (o === mainObject) return true;

    if (mainObject.intersectsWithObject(o) && o !== mainObject) {
      const pixels = pixelMapping(o, 8);
      console.log(pixels);

      collision = findPixelCollision(pixels, mainObjectPixels);
    }

    return collision;
  });
};
