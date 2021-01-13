import store from "../redux/store";

export const cancelShapeCreation = (canvas: fabric.Canvas) => {
  return () => {
    if (store.getState().canvasBoardState.resize) {
      store.dispatch({ type: 'SET_FALSE' });
    }

    let shape = store.getState().canvasBoardState.shape;

    if (!shape.id || shape.id === 'provisional') {
      canvas?.remove(shape);
      store.dispatch({ type: 'SET_SHAPE_NULL' });
    }
  }
};

/**
 * Return the movement hability in the current target shape
 * @param {IEvent} event - current event, necessary to know
 * which is the current target shape
 */
export const allowMovementInShape = (event: fabric.IEvent) => {
  if (event.target) {
    event.target.set({
      lockMovementX: false,
      lockMovementY: false,
    });
  }
};