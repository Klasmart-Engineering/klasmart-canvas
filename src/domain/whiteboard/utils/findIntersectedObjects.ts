import { TypedShape } from '../../../interfaces/shapes/shapes';
import { Canvas } from 'fabric/fabric-impl';

export const findIntersectedObjects = (
  mainObject: TypedShape,
  objectsList: TypedShape[],
  canvas: Canvas
) => {
  let originalStroke;
  const differentStroke = '#ababab';

  const isTouchingMainObject = (object: TypedShape) => {
    if (object === mainObject) return true;

    if (mainObject.intersectsWithObject(object)) {
      if (object.type === 'image') return true;

      console.log();
      originalStroke = object.stroke;
      object.set({
        stroke: differentStroke,
      });
      canvas.renderAll();

      let data = canvas
        .getContext()
        .getImageData(
          Number(mainObject.oCoords?.tl.x) - 10,
          Number(mainObject.oCoords?.tl.y) - 10,
          Number(mainObject.width) + 10,
          Number(mainObject.height) + 10
        ).data;

      for (let i = 0; i < data.length; i += 4) {
        let currentColor = [data[i], data[i + 1], data[i + 2], data[i + 3]];

        if (rgbaDataToHexadecimalColor(currentColor) === differentStroke) {
          object.set({
            stroke: originalStroke,
          });
          canvas.renderAll();

          return true;
        }
      }

      object.set({
        stroke: originalStroke,
      });
      canvas.renderAll();
    }

    return false;
  };

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

  return objectsList.filter((o: TypedShape) => isTouchingMainObject(o));
};
