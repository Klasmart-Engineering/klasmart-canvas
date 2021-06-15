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
  instanceId: string,
) => {
  const { state, dispatch } = useUndoRedo();
  const { shapesAreSelectable, setBackgroundColorInCanvas, setLocalImage, setBackgroundImageIsPartialErasable } = useContext(
    WhiteboardContext
  );

  /**
   * Handles logic for render changes in undo/redo actions in local whiteboard
   */
  useEffect(() => {
    if (!state || !canvas) {
      return;
    }

    // Rerenders local canvas when an undo or redo event has been executed.
    if (state.actionType === UNDO || state.actionType === REDO) {
      // console.log("undo/redo", state.actionType)
      RenderLocalUndoRedo(
        canvas,
        instanceId,
        state,
        state.actionType as 'UNDO' | 'REDO',
        shapesAreSelectable,
        setBackgroundColorInCanvas,
        setLocalImage,
        setBackgroundImageIsPartialErasable,
      );
    }
  }, [
    canvas,
    instanceId,
    setBackgroundColorInCanvas,
    shapesAreSelectable,
    state,
  ]);

  /**
   * Handles logic for render changes in undo/redo actions in remote whiteboards
   */
  useEffect(() => {
    if (state.actionType === UNDO) {
      RenderRemoteUndo(canvas, instanceId, state, eventSerializer, setLocalImage, setBackgroundImageIsPartialErasable);
    } else if (state.actionType === REDO) {
      RenderRemoteRedo(canvas, instanceId, state, eventSerializer);
    }
  }, [canvas, eventSerializer, instanceId, state]);

  return { state, dispatch };
};
