import { useContext, useEffect } from 'react';
import { useUndoRedo, UNDO, REDO } from '../reducers/undo-redo';
import { Canvas } from 'fabric/fabric-impl';
import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
import { WhiteboardContext } from '../WhiteboardContext';
import { RenderLocalUndoRedo } from '../undo-redo-actions/RenderLocalUndoRedo';
import { RenderRemoteUndo } from '../undo-redo-actions/RenderRemoteUndo';
import { RenderRemoteRedo } from '../undo-redo-actions/RenderRemoteRedo';

// This file is a work in progress. Multiple events need to be considered,
// such as group events, that are currently not function (or break functionality).

/**
 * Custom hook to track canvas history.
 * @param canvas Canvas being manipulated
 * @param eventSerializer Event serializer
 * @param canvasId Canvas ID
 */
export const UndoRedo = (
  canvas: Canvas,
  eventSerializer: PaintEventSerializer,
  instanceId: string
) => {
  const { state, dispatch } = useUndoRedo();
  const { shapesAreSelectable } = useContext(WhiteboardContext);

  useEffect(() => {
    if (!state || !canvas) {
      return;
    }

    // Rerenders local canvas when an undo or redo event has been executed.
    if (state.actionType === UNDO || state.actionType === REDO) {
      RenderLocalUndoRedo(canvas, instanceId, state, shapesAreSelectable);
    }

    if (state.actionType === UNDO) {
      RenderRemoteUndo(canvas, state, eventSerializer);
    } else if (state.actionType === REDO) {
      RenderRemoteRedo(canvas, state, eventSerializer);
    }
  }, [
    state,
    canvas,
    dispatch,
    eventSerializer,
    instanceId,
    shapesAreSelectable,
  ]);

  return { state, dispatch };
};
