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
    // Hiding the the rest of objects to get just iamge data for this object
    toogleOtherObjects(object, false);

    let pixelMap = [];
    const ctx = canvas.getContext();

    // Getting bounding rect in case of object is rotated
    const bound = object.getBoundingRect();

    const width = Number(object.width) * Number(object.scaleX);
    const height = Number(object.height) * Number(object.scaleY);
    const startPoint = {
      x: Number(bound.left),
      y: Number(bound.top),
    };

    // Mapping each pixel in object to get the no transparent pixels
    for (let y = startPoint.y; y <= startPoint.y + height; y += resolution) {
      for (let x = startPoint.x; x <= startPoint.x + width; x += resolution) {
        let pixel = ctx.getImageData(
          x * window.devicePixelRatio,
          y * window.devicePixelRatio,
          resolution * window.devicePixelRatio,
          resolution * window.devicePixelRatio
        );

        if (!isTransparent(pixel)) {
          pixelMap.push({ x, y });
        }
      }
    }

    // Showing again the previous hidden objects
    toogleOtherObjects(object, true);

    return {
      x: startPoint.x,
      y: startPoint.y,
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
    // Checking each colored pixel coordinate in source object
    for (let s = 0; s < source.pixelMap.data.length; s += 1) {
      const sourcePixel = source.pixelMap.data[s];
      const sourceArea: IPixel = {
        x: sourcePixel.x,
        y: sourcePixel.y,
        width: target.pixelMap.resolution,
        height: target.pixelMap.resolution,
      };

      // Checking each colored pixel coordinate in target object
      for (let t = 0; t < target.pixelMap.data.length; t += 1) {
        const targetPixel = target.pixelMap.data[t];
        const targetArea: IPixel = {
          x: targetPixel.x,
          y: targetPixel.y,
          width: target.pixelMap.resolution,
          height: target.pixelMap.resolution,
        };

        // Comparing source and target's current pixel
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
    // Checking each alpha channel in image data
    for (let i = 0; i < image.data.length; i += 4) {
      if (image.data[i + 3] > 0) {
        return true;
      }
    }

    return false;
  };

  // Pixels Data in Flood-fill object
  const mainObjectPixels: IPixeledObject = pixelMapping(mainObject, 2);

  return objectsList.filter((o: TypedShape) => {
    let collision = false;

    // if current object is flood-fill object, filter is no needed
    if (o === mainObject) return true;

    // If bounding box collision happens, the next step is check pixel collision
    if (mainObject.intersectsWithObject(o) && o !== mainObject) {
      // Pixels Data in current object
      const pixels = pixelMapping(o, 2);

      collision = findPixelCollision(pixels, mainObjectPixels);
    }

    return collision;
  });
};
