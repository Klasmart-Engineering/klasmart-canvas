import { ObjectEvent } from "../../event-serializer/PaintEventSerializer";
import store from "../../redux/store";
import { setShapeSize } from "../shapeActionUtils";

export const mouseMoveAction = (
  canvas: fabric.Canvas,
  userId: string,
  perfectShapeIsActive: boolean,
  shapeToAdd: string,
  brushType: string,
  setShapeInProgress: any,
  eventSerializer: any,
) => ((e: fabric.IEvent) => {
  let shape = store.getState().canvasBoardState.shape;
  if (!shapeToAdd || !shape || !store.getState().canvasBoardState.resize) {
    return;
  }

  canvas.selection = false;
  let startPoint = store.getState().canvasBoardState.startPoint;
  setShapeSize(shape, e, perfectShapeIsActive, startPoint, shapeToAdd, brushType, canvas, userId);

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

  let type = shape.type;
  let target = {
    type: shape.name,
    shape,
  };

  let payload = {
    type,
    target,
    id: 'teacher',
  } as ObjectEvent;

  eventSerializer?.push('moving', payload);
});
