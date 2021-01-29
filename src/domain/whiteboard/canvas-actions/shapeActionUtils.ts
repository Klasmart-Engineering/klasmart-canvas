import { Group } from "fabric/fabric-impl";
import { ICanvasBrush } from "../../../interfaces/brushes/canvas-brush";
import { ICanvasPathBrush } from "../../../interfaces/brushes/canvas-path-brush";
import { ICoordinate } from "../../../interfaces/brushes/coordinate";
import { TypedShape } from "../../../interfaces/shapes/shapes";
import { PaintBrush } from "../brushes/classes/paintBrush";
import { setCircleSize, setSize, setPathSize } from "../utils/scaling";
import { getBiggerDifference } from "../utils/shapes";


/**
 * Sets shape size
 * @param shape Shape 
 * @param e fabric event
 * @param perfectShapeIsActive Indicates if perfect shape is enabled
 * @param startPoint Start point coordinates
 * @param shapeToAdd Type of shape to add
 * @param brushType Brush type
 * @param canvas Fabric canvas
 * @param userId User id.
 */
export const setShapeSize = (
  shape: TypedShape,
  e: fabric.IEvent,
  perfectShapeIsActive: boolean,
  startPoint: fabric.Point,
  shapeToAdd: string,
  brushType: string,
  canvas: fabric.Canvas,
  userId: string,
) => {
  if (!e.pointer) return;

  let pointer: fabric.Point = e.pointer;
  let biggerDifference: number = 0;
  let newSize;

  if (perfectShapeIsActive) {
    biggerDifference = getBiggerDifference(pointer, startPoint);

    pointer.x = startPoint.x + biggerDifference;
    pointer.y = startPoint.y + biggerDifference;
  } else {
    pointer = e.pointer;
  }

  if (shapeToAdd === 'circle') {
    newSize = setCircleSize(
      shape as fabric.Ellipse,
      startPoint,
      pointer,
      brushType === 'pencil' || brushType === 'dashed'
    );
  } else if (shapeToAdd === 'rectangle' || shapeToAdd === 'triangle') {
    newSize = setSize(
      shape,
      startPoint,
      pointer,
      brushType === 'pencil' || brushType === 'dashed'
    );
  } else {
    newSize = setPathSize(shape, startPoint, pointer);
  }

  if (brushType === 'marker' || brushType === 'felt') {
    (shape as Group).forEachObject((line) => {
      line.set({
        top: Number(line.top) / Number(shape.scaleY),
        left: Number(line.left) / Number(shape.scaleX),
      });
    });

    shape.set({
      top: startPoint.y,
      left: startPoint.x,
    });

    (shape as Group).addWithUpdate();
    canvas?.renderAll();
  }

  if (brushType === 'paintbrush' && canvas && userId) {
    const brush = new PaintBrush(canvas, userId);
    const newPoints = ((shape as ICanvasPathBrush).basePath
      ?.points as ICoordinate[]).map((point) => {
        return {
          x: point.x * Number(shape.scaleX),
          y: point.y * Number(shape.scaleY),
        };
      });

    const newPath = brush.modifyPaintBrushPath(
      String(shape.id),
      newPoints,
      Number((shape as ICanvasPathBrush).basePath?.strokeWidth),
      String((shape as ICanvasPathBrush).basePath?.stroke),
      (shape as ICanvasBrush).basePath?.bristles || []
    );

    newPath.set({
      top: startPoint.y,
      left: startPoint.x,
    });

    (shape as ICanvasPathBrush).set({ ...newPath });
    (shape as Group).addWithUpdate();
    canvas.renderAll();
  }

  return newSize;
};

/**
 * Mouse move event handler.
 * @param canvas Canvas
 * @param setShapeSize Set shape size method
 * @param setShapeInProgress Set shape in progress method
 * @param shapeToAdd Sets shape to add
 * @param shape Indicates shape
 * @param resize Indicates if shape is being resized
 * @param startPoint Start point coordinates
 */
export const mouseMoveMain = (
  canvas: fabric.Canvas,
  setShapeSize: <T>(...args: T[]) => void,
  setShapeInProgress: <T>(...args: T[]) => void,
  shapeToAdd: string,
  shape: fabric.Object | TypedShape,
  resize: boolean,
  startPoint: fabric.Point
) => {

  return canvas?.on('mouse:move', (e: fabric.IEvent) => {
    if (!shapeToAdd || !shape || !resize) {
      return;
    }

    canvas.selection = false;
    // @ts-ignore
    setShapeSize(shape, e);

    let anchor = { ...startPoint, originX: 'left', originY: 'top' };

    if (startPoint && e.pointer && startPoint.x > e.pointer.x) {
      anchor = { ...anchor, originX: 'right' };
    }

    if (startPoint && e.pointer && startPoint.y > e.pointer.y) {
      anchor = { ...anchor, originY: 'bottom' };
    }

    shape.set(anchor);
    canvas.renderAll();

    setShapeInProgress({
      shape: shape,
      startPoint: startPoint,
    });
  });
}
