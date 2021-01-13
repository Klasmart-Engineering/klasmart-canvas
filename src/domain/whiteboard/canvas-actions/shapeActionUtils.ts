import { Group } from "fabric/fabric-impl";
import { useCallback } from "react";
import { shapePoints } from "../../../assets/shapes-points";
import { ICanvasBrush } from "../../../interfaces/brushes/canvas-brush";
import { ICanvasPathBrush } from "../../../interfaces/brushes/canvas-path-brush";
import { ICanvasShapeBrush } from "../../../interfaces/brushes/canvas-shape-brush";
import { ICoordinate } from "../../../interfaces/brushes/coordinate";
import { IShapePointsIndex } from "../../../interfaces/brushes/shape-points-index";
import { ICanvasObject } from "../../../interfaces/objects/canvas-object";
import { TypedShape } from "../../../interfaces/shapes/shapes";
import { ChalkBrush } from "../brushes/classes/chalkBrush";
import { MarkerBrush } from "../brushes/classes/markerBrush";
import { PaintBrush } from "../brushes/classes/paintBrush";
import { PenBrush } from "../brushes/classes/penBrush";
import { setBasePathInNormalBrushes } from "../brushes/utils/setBasePathInNormalBrushes";
import { SET } from "../reducers/undo-redo";
import { setCircleSize, setSize, setPathSize } from "../utils/scaling";
import { isShape, getBiggerDifference, penPointsMapping, setScaledPoint } from "../utils/shapes";
import { v4 as uuidv4 } from 'uuid';
import shape from "@material-ui/core/styles/shape";
import store from "../redux/store";

interface IShapeInProgress {
  shape: TypedShape;
  startPoint: fabric.Point;
}

const requiredPencilDashedProps = [
  'id',
  'height',
  'width',
  'left',
  'top',
  'scaleX',
  'scaleY',
  'originX',
  'originY',
  'basePath',
];

const requiredProps = [
  'id',
  'height',
  'width',
  'left',
  'top',
  'strokeWidth',
  'stroke',
  'fill',
  'name',
  'scaleX',
  'scaleY',
  'strokeUniform',
  'originX',
  'originY',
  'strokeMiterLimit',
  'strokeLineJoin',
  'strokeDashArray',
  'strokeLineCap',
  'strokeLineJoin',
];

const requiredEllipseProps = [
  'id',
  'ry',
  'rx',
  'left',
  'top',
  'strokeWidth',
  'stroke',
  'fill',
  'strokeUniform',
  'originY',
  'originX',
  'strokeDashArray',
  'strokeLineCap',
  'strokeLineJoin',
];

/**
 * Set the new size of a recently created shape
 * @param {TypedShape} shape - Shape to change its size
 * @param {IEvent} e - Current event, necessary to know
 * where is the pointer
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

export const mouseMoveMain = (
  canvas: fabric.Canvas,
  setShapeSize: any,
  setShapeInProgress: any,
  shapeToAdd: string,
  shape: any,
  resize: boolean,
  startPoint: any
) => {

  return canvas?.on('mouse:move', (e: fabric.IEvent) => {
    if (!shapeToAdd || !shape || !resize) {
      return;
    }

    canvas.selection = false;
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
