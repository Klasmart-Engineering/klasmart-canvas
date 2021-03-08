import { v4 as uuidv4 } from 'uuid';
import { shapePoints } from '../../../../assets/shapes-points';
import { ICanvasBrush } from '../../../../interfaces/brushes/canvas-brush';
import { ICanvasShapeBrush } from '../../../../interfaces/brushes/canvas-shape-brush';
import { ICoordinate } from '../../../../interfaces/brushes/coordinate';
import { IShapePointsIndex } from '../../../../interfaces/brushes/shape-points-index';
import { IShapeInProgress } from '../../../../interfaces/canvas-events/shape-in-progress';
import { IUndoRedoEvent } from '../../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../../interfaces/objects/canvas-object';
import { TypedShape } from '../../../../interfaces/shapes/shapes';
import { PaintEventSerializer } from '../../../../poc/whiteboard/event-serializer/PaintEventSerializer';
import { ChalkBrush } from '../../brushes/classes/chalkBrush';
import { MarkerBrush } from '../../brushes/classes/markerBrush';
import { PaintBrush } from '../../brushes/classes/paintBrush';
import { PenBrush } from '../../brushes/classes/penBrush';
import { setBasePathInNormalBrushes } from '../../brushes/utils/setBasePathInNormalBrushes';
import { ObjectEvent } from '../../event-serializer/PaintEventSerializer';
import { CanvasAction, SET } from '../../reducers/undo-redo';
import store from '../../redux/store';
import { setShapeSize } from '../shapeActionUtils';
import {
  requiredEllipseProps,
  requiredPencilDashedProps,
  requiredProps,
} from '../shapeProps';

/**
 * Mouse up event handler
 * @param canvas Fabric canvas
 * @param userId User ID
 * @param perfectShapeIsActive Indicates if perfect shape is active
 * @param shapeToAdd Shape to add
 * @param brushType Brush type
 * @param lineWidth Line width
 * @param penColor Pen, brush, or stroke color
 * @param setShapeInProgress Method to set shape in progress
 * @param eventSerializer Paint event serializer
 * @param dispatch Dispatch method for undo redo state.
 */
export const mouseUpAction = (
  canvas: fabric.Canvas,
  userId: string,
  perfectShapeIsActive: boolean,
  shapeToAdd: string,
  brushType: string,
  lineWidth: number,
  penColor: string,
  setShapeInProgress: React.Dispatch<
    React.SetStateAction<IShapeInProgress | null | undefined>
  >,
  eventSerializer: PaintEventSerializer,
  dispatch: (action: CanvasAction) => void
) => async (e: fabric.IEvent) => {
  let shape = store.getState().canvasBoardState.shape;
  if (!shape || !store.getState().canvasBoardState.resize) {
    return;
  }

  let startPoint = store.getState().canvasBoardState.startPoint;

  const size = setShapeSize(
    shape,
    e,
    perfectShapeIsActive,
    startPoint,
    shapeToAdd,
    brushType,
    canvas,
    userId
  );
  const id = `${userId}:${uuidv4()}`;
  store.dispatch({ type: 'SET_FALSE' });

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

        const setScaledPoint = (point: ICoordinate) => {
          return {
            x:
              (point.x * Number(shape.width) * Number(shape.scaleX)) /
              original.width,
            y:
              (point.y * Number(shape.height) * Number(shape.scaleY)) /
              original.height,
          };
        };

        const original = shapePoints[shapeName as keyof IShapePointsIndex];

        const points: ICoordinate[] = original.points.map((point) => {
          return setScaledPoint(point);
        });

        switch (brushType) {
          case 'pen':
            brush = new PenBrush(canvas, userId);
            const { min, max } = brush.setMinMaxWidth(lineWidth);
            const penPoints = points.map((point) => {
              return {
                x: point.x,
                y: point.y,
                width: (brush as PenBrush).getRandomInt(min, max),
              };
            });

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
        }

        if (!newPath) return;

        ((newPath as ICanvasObject) as ICanvasShapeBrush).set({
          id: id,
          name: shapeName,
          shapeType: 'shape',
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

      eventSerializer?.push('added', payload as ObjectEvent);

      const event = {
        event: payload,
        type: 'added',
      } as IUndoRedoEvent;

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

      eventSerializer?.push('added', payload as ObjectEvent);

      const event = { event: payload, type: 'added' } as IUndoRedoEvent;

      dispatch({
        type: SET,
        payload: (canvas?.getObjects() as unknown) as TypedShape[],
        canvasId: userId,
        event,
      });
    }

    store.dispatch({ type: 'SET_SHAPE_NULL' });
  }
};
