import { IUndoRedoSingleEvent } from '../../../interfaces/canvas-events/undo-redo-single-event';
import { CanvasHistoryState } from '../reducers/undo-redo';

/**
 * Extract from the given state the necessary variables
 * to be used in undo/redo actions
 * @param {CanvasHistoryState} state - Current state to extract variables
 */
export const getStateVariables = (state: CanvasHistoryState) => {
  const currentEvent = state.events[state.eventIndex];
  const currentObject = currentEvent?.event as IUndoRedoSingleEvent;
  const currentState = state.states[state.activeStateIndex as number];
  const nextEvent = state.events[state.eventIndex + 1];
  const nextObject = nextEvent?.event as IUndoRedoSingleEvent;
  const background = state.backgrounds[state.activeStateIndex as number];

  return { currentEvent, currentObject, currentState, nextEvent, nextObject, background };
};
