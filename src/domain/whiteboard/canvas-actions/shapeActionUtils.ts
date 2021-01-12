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
import { isShape, getBiggerDifference } from "../utils/shapes";
import { v4 as uuidv4 } from 'uuid';

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
const setShapeSize = (
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
 * Removes the recent created shape and set resize variable in false
 */
const cancelShapeCreation = (resize: boolean, canvas: fabric.Canvas, shape: TypedShape) => {
  return () => {
    if (resize) {
      resize = false;
    }

    if (!shape.id || shape.id === 'provisional') {
      canvas?.remove(shape);
    }
  }
};

/**
 * Return the movement hability in the current target shape
 * @param {IEvent} event - current event, necessary to know
 * which is the current target shape
 */
const allowMovementInShape = (event: fabric.IEvent) => {
  if (event.target) {
    event.target.set({
      lockMovementX: false,
      lockMovementY: false,
    });
  }
};

export const mouseDownMain = (
  canvas: fabric.Canvas,
  resize: boolean,
  brushType: string,
  shapeSelector: any,
  shapeToAdd: any,
  specialShapeSelector: any,
  lineWidth: number,
  penColor: string
): ((e: fabric.IEvent) => Promise<any>) => (
  async (e: fabric.IEvent): Promise<void> => {
    let shape;
    let startPoint;
    console.log('loaded...');

    if (resize) {
      console.log('something is wrong....');
      return;
    }

    // Locking movement to avoid shapes moving
    if (e.target) {
      console.log('e:::: ', e.target);
      e.target.set({
        lockMovementX: true,
        lockMovementY: true,
      });
    }

    if (brushType === 'pencil' || brushType === 'dashed') {
      shape = shapeSelector(shapeToAdd);
    } else {
      shape = await specialShapeSelector({ canvas, shape: shapeToAdd, brushType, lineWidth, penColor}) as TypedShape;

      if (!shape) return;

      if (e.pointer) {
        shape.set({
          top: e.pointer.y,
          left: e.pointer.x,
          shapeType: 'shape',
          name: shapeToAdd,
          strokeUniform: true,
        });

        startPoint = e.pointer;
      }

      canvas.add(shape);
      resize = true;

      /*
        Canceling shapes creation in object:scaling
        and object:rotating events
      */
      canvas.on({
        'object:scaling': cancelShapeCreation(resize, canvas, shape),
        'object:rotating': cancelShapeCreation(resize, canvas, shape),
      });

      /*
        When the shape was resized or rotated
        the shape's movement is allowed
      */
      canvas.on({
        'object:scaled': allowMovementInShape,
        'object:rotated': allowMovementInShape,
      });
    }
  }
);

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

const setScaledPoint = (shape: any, original: any, point: ICoordinate) => {
  return {
    x:
      (point.x * Number(shape.width) * Number(shape.scaleX)) /
      original.width,
    y:
      (point.y * Number(shape.height) * Number(shape.scaleY)) /
      original.height,
  };
};

const penPointsMapping = (points: any[], brush: any, min: number, max: number) => (
  points.map((point) => (
    {
      x: point.x,
      y: point.y,
      width: (brush as PenBrush).getRandomInt(min, max),
    }
  )
));

export const mouseUpMain = (
  canvas: fabric.Canvas,
  resize: boolean,
  shape: any,
  setShapeSize: any,
  setShapeInProgress: any,
  eventSerializer: any,
  dispatch: any,
  userId: string,
  brushType: string,
  perfectShapeIsActive: boolean,
  lineWidth: number,
  penColor: string,
) => {
  return canvas.on('mouse:up', async (e: fabric.IEvent) => {
    if (!shape || !resize) {
      return;
    }

    const size = setShapeSize(shape, e);
    const id = `${userId}:${uuidv4()}`;
    resize = false;

    if (size && size.width <= 2 && size.height <= 2) {
      canvas.remove(shape);
    } else {
      if (brushType === 'pencil' || brushType === 'dashed') {
        shape.set({ id });
        shape.setCoords();

        /*
        Setting the recent created shape like evented
        to can be resized and rotated
        */
        shape.set({
          strokeDashArray:
            brushType === 'dashed' ? [Number(shape.strokeWidth) * 2] : [],
          evented: true,
          hoverCursor: 'default',
          lockUniScaling: perfectShapeIsActive,
        });

        setBasePathInNormalBrushes(shape as ICanvasShapeBrush);

        canvas.setActiveObject(shape);
        canvas.renderAll();
      } else {
        canvas.remove(shape);

        if (userId) {
          let brush: PenBrush | MarkerBrush | PaintBrush | ChalkBrush;
          let newPath;
          const shapeName = String(shape.name);
          const original =
            shapePoints[shapeName as keyof IShapePointsIndex];
          const points: ICoordinate[] = original.points.map((point) => {
            return setScaledPoint(shape, original, point);
          });

          switch (brushType) {
            case 'pen':
              brush = new PenBrush(canvas, userId);
              const { min, max } = brush.setMinMaxWidth(lineWidth);
              const penPoints = penPointsMapping(points, brush, min, max);
              
              newPath = (brush as PenBrush).createPenPath(
                String((shape as ICanvasObject).id),
                penPoints,
                lineWidth,
                penColor
              );
              break;

            case 'marker':
            case 'felt':
              brush = new MarkerBrush(canvas, userId, brushType);

              newPath = (brush as MarkerBrush).createMarkerPath(
                String((shape as ICanvasObject).id),
                points,
                lineWidth,
                penColor
              );
              break;

            case 'paintbrush':
              brush = new PaintBrush(canvas, userId);

              const bristles = (brush as PaintBrush).makeBrush(
                penColor,
                lineWidth
              );

              newPath = (brush as PaintBrush).modifyPaintBrushPath(
                String((shape as ICanvasObject).id),
                points,
                lineWidth,
                penColor,
                bristles
              );
              break;

            case 'chalk':
            case 'crayon':
              brush = new ChalkBrush(canvas, userId, brushType);

              const clearRects = (brush as ChalkBrush).createChalkEffect(
                points,
                lineWidth
              );

              await (brush as ChalkBrush)
                .createChalkPath(
                  String((shape as ICanvasObject).id),
                  points,
                  lineWidth,
                  penColor,
                  clearRects
                )
                .then((image: ICanvasBrush) => {
                  newPath = image;
                })
                .catch((error: string) => {
                  console.warn(error);
                });
              break;
          } // end switch statement

          if (!newPath) return;

          ((newPath as ICanvasObject) as ICanvasShapeBrush).set({
            id: id,
            name: shapeName,
            top: shape.top,
            left: shape.left,
            angle: shape.angle,
            flipX: shape.flipX,
            flipY: shape.flipY,
            originX: shape.originX,
            originY: shape.originY,
            evented: true,
            hoverCursor: 'default',
            lockUniScaling: perfectShapeIsActive,
          });

          canvas.remove(shape);
          shape = newPath as TypedShape;
          canvas.add(newPath);

          canvas.setActiveObject(newPath);
          canvas.renderAll();
        }
      }

      setShapeInProgress(null);

      if (brushType !== 'pencil' && brushType !== 'dashed') {
        let type = shape.type;
        let payload = {};
        let target = {
          type,
          id,
        };

        const requiredProps = requiredPencilDashedProps;
        requiredProps.forEach((prop: string) => {
          if (shape && (shape as any)[prop]) {
            target = { ...target, [prop]: (shape as any)[prop] };
          }
        });

        payload = {
          type,
          target,
          id,
        };

        eventSerializer?.push('added', payload);

        const event = { event: payload, type: 'added' };

        dispatch({
          type: SET,
          payload: (canvas?.getObjects() as unknown) as TypedShape[],
          canvasId: userId,
          event,
        });
      } else {
        let type = shape.type;
        let payload = {};
        let target = {
          type,
          id,
        };

        if (type !== 'ellipse') {
          requiredProps.forEach((prop: string) => {
            if (shape && (shape as any)[prop]) {
              target = { ...target, [prop]: (shape as any)[prop] };
            }
          });

          payload = {
            type,
            target,
            id,
          };
        } else {
          requiredEllipseProps.forEach((prop: string) => {
            if (shape && (shape as any)[prop]) {
              target = { ...target, [prop]: (shape as any)[prop] };
            }
          });

          payload = {
            type,
            target,
            id,
          };
        }

        eventSerializer?.push('added', payload);

        const event = { event: payload, type: 'added' };

        dispatch({
          type: SET,
          payload: (canvas?.getObjects() as unknown) as TypedShape[],
          canvasId: userId,
          event,
        });
      }
    }
  });
}

export function useAddShape(
  shapeIsActive: boolean,
  shapeInProgress:  IShapeInProgress | null | undefined,
  setShapeInProgress: any,
  canvas?: fabric.Canvas,
  brushType?: string,
  shapeSelector?: any,
  specialShapeSelector?: any,
  lineWidth?: number,
  penColor?: string,
) {
  const value = useCallback((shapeToAdd: string) => {
    // Required to prevent multiple shapes add at once
    // if user clicked more than one shape during selection.
    if (!shapeIsActive || !canvas) {
      return;
    }

    let resize: boolean = false;
    let startPoint: fabric.Point;
    let shape: TypedShape;

    // If shape creation was interrupted by a change in perfectShapeIsActive
    if (shapeInProgress) {
      resize = true;
      shape = shapeInProgress.shape;
      startPoint = shapeInProgress.startPoint;
    }

    const activeObject = canvas?.getActiveObject();

    if (activeObject && isShape(activeObject)) {
      activeObject.set('evented', true);
    }

    // mouseDownMain(canvas, resize, brushType as string, shapeSelector, shapeToAdd, specialShapeSelector, lineWidth as number, penColor as string);
    // mouseMove(canva, setShapeSize, setShapeInProgress, shapeToAdd, );
  }, [
    shapeIsActive,
    shapeInProgress,
    shapeIsActive,
    canvas,
  ]);

  return value;
}
