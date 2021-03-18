import { IShapeInProgress } from '../../../../interfaces/canvas-events/shape-in-progress';
import {
  ObjectEvent,
  PaintEventSerializer,
} from '../../event-serializer/PaintEventSerializer';
import store from '../../redux/store';
import { setShapeSize } from '../shapeActionUtils';

/**
 * Mouse move handler
 * @param canvas Fabric canvas
 * @param userId User ID
 * @param perfectShapeIsActive Indicates if perfect shape is active
 * @param shapeToAdd Indicates shape to add
 * @param brushType Brush type
 * @param setShapeInProgress Method to set shape in progress
 * @param eventSerializer Paint event serializer
 */
export const mouseMoveAction = (
  canvas: fabric.Canvas,
  userId: string,
  perfectShapeIsActive: boolean,
  shapeToAdd: string,
  brushType: string,
  setShapeInProgress: React.Dispatch<
    React.SetStateAction<IShapeInProgress | null | undefined>
  >,
  eventSerializer: PaintEventSerializer
) => (e: fabric.IEvent) => {
  let shape = store.getState().canvasBoardState.shape;

  if (!shapeToAdd || !shape || !store.getState().canvasBoardState.resize) {
    return;
  }

  canvas.selection = false;
  let startPoint = store.getState().canvasBoardState.startPoint;
  setShapeSize(
    shape,
    e,
    perfectShapeIsActive,
    startPoint,
    shapeToAdd,
    brushType,
    canvas,
    userId
  );

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
    id: userId,
  } as ObjectEvent;

  eventSerializer?.push('moving', payload);
};
