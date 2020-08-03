import { useEffect } from 'react';
import { useUndoRedo, SET, UNDO, REDO, MODIFY } from '../reducers/undo-redo';

/**
 * Custom hook to track canvas history.
 * @param canvas Canvas being manipulated.
 */
export const UndoRedo = (canvas: any) => {
  const { state, dispatch } = useUndoRedo();

  useEffect(() => {
    if (!state || !canvas) {
      return;
    }

    // Dispatches an update to the state when an object has been modified.
    canvas?.on('object:modified', () => {
      dispatch({ type: MODIFY, payload: canvas.getObjects() });
    });

    // Dispatches an update to the state when an object has been removed.
    canvas?.on('object:removed', (e: any) => {
      if (e.target?.type === 'i-text') {
        return;
      }

      dispatch({ type: SET, payload: canvas.getObjects() });
    });
    
    // Rerenders canvas when an undo or redo event has been executed.
    if (state.actionType === UNDO || state.actionType === REDO) {
      canvas.clear();
      canvas.loadFromJSON(state.activeState, () => {});
    }

    return(() => {
      canvas?.off('object:added');
      canvas?.off('object:modified');
      canvas?.off('object:removed');
    });

  }, [state, canvas, dispatch]);

  return { state, dispatch };
}
