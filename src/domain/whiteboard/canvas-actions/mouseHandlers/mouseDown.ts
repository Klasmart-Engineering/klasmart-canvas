import { TypedShape } from "../../../../interfaces/shapes/shapes";
import store from "../../redux/store";
import { cancelShapeCreation, allowMovementInShape } from "../objectHandlers";

export const mouseDownAction = (
  canvas: fabric.Canvas,
  brushType: string,
  shapeSelector: (arg1: any) => any,
  shapeToAdd: any,
  specialShapeSelector: any,
  lineWidth: number,
  penColor: string
) => (async (e: fabric.IEvent) => {
  if (store.getState().canvasBoardState.resize) {
    return;
  }

  // Locking movement to avoid shapes moving
  if (e.target) {
    e.target.set({
      lockMovementX: true,
      lockMovementY: true,
    });
  }

  if (brushType === 'pencil' || brushType === 'dashed') {
    let shape = shapeSelector(shapeToAdd);
    store.dispatch({ type: 'SET_SHAPE', payload: shape });
  } else {
    let shape = await specialShapeSelector({ canvas, shape: shapeToAdd, brushType, lineWidth, penColor }) as TypedShape;
    store.dispatch({ type: 'SET_SHAPE', payload: shape });
  }

  let shape = store.getState().canvasBoardState.shape;

  if (!shape) return;

  if (e.pointer) {
    shape.set({
      top: e.pointer.y,
      left: e.pointer.x,
      shapeType: 'shape',
      name: shapeToAdd,
      strokeUniform: true,
    });

    // startPoint = e.pointer;
    store.dispatch({ type: 'SET_START_POINT', payload: e.pointer });
  }

  canvas?.add(shape);
  store.dispatch({ type: 'SET_TRUE' });

  /*
    Canceling shapes creation in object:scaling
    and object:rotating events
  */
  canvas?.on({
    'object:scaling': cancelShapeCreation(canvas),
    'object:rotating': cancelShapeCreation(canvas),
  });

  /*
    When the shape was resized or rotated
    the shape's movement is allowed
  */
  canvas?.on({
    'object:scaled': allowMovementInShape,
    'object:rotated': allowMovementInShape,
  });
});