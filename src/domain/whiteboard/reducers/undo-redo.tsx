import { useReducer } from 'react';
import { TypedShape } from '../../../interfaces/shapes/shapes';

export const UNDO = 'CANVAS_UNDO';
export const REDO = 'CANVAS_REDO';
export const SET = 'CANVAS_SET';
export const MODIFY = 'CANVAS_MODIFY';

/**
 * Model for storing the canvas history for undo/redo functionality.
 * States stored as stringified objects, since fabric requires it when
 * reloading state.
 */
export interface CanvasHistoryState {
  /**
   * Stringified objects of all states.
   */
  states: string[];

  /**
   * Indicates action being taken, such as undo or redo.
   */
  actionType: string | null;

  /**
   * Indicates the index of the active state.
   */
  activeStateIndex: number | null;

  /**
   * Active state.
   */
  activeState: string | null;
}

/**
 * Dispatch action used by reducer for canvas history.
 */
export interface CanvasAction {
  /**
   * Type of action, such as undo, redo, set, modify.
   */
  type: string;

  /**
   * Array of fabric objects.
   */
  payload?: fabric.Object[];
}

/**
 * Canvas history default state.
 */
const defaultState: CanvasHistoryState = {
  states: [],
  actionType: null,
  activeStateIndex: null,
  activeState: null,
};

/**
 * Stringifies objects into proper format to store in state
 * and render to canvas.
 * @param payload
 */
const objectStringifier = (payload: [fabric.Object | TypedShape]) => {
  let formatted: (string)[] = [];

  if (payload) {
    formatted = payload.map((object: fabric.Object | TypedShape) => (
      object.toJSON(['strokeUniform'])
    ));
  }

  return JSON.stringify({ objects: formatted });
};

/**
 * History state reducer.
 * @param state Canvas state.
 * @param action Action
 */
const reducer = (
  state: CanvasHistoryState = defaultState,
  action: CanvasAction
): CanvasHistoryState => {

  switch (action.type) {
    // Sets state when new object is created.
    case SET: {
      const currentState = objectStringifier(action.payload as [fabric.Object | TypedShape]);
      let states = [...state.states];

      if (
        (state.activeStateIndex !== null &&
        state.activeStateIndex + 1 < state.states.length)
      ) {
        states.splice(state.activeStateIndex + 1, 9e9);
      } else if (state.activeState === null) {
        states = [];
      }

      states = [...states, currentState];

      return {
        ...state,
        states,
        actionType: SET,
        activeStateIndex: states.length - 1,
        activeState: currentState,
      };
    }

    // Sets state when an object is modified.
    case MODIFY: {
      const currentState = objectStringifier(action.payload as [fabric.Object | TypedShape]);
      const states = [...state.states, currentState];

      return {
        ...state,
        states,
        actionType: MODIFY,
        activeStateIndex: states.length - 1,
        activeState: currentState,
      };
    }

    // Steps back to previous state.
    case UNDO: {
      const activeStateIndex =
        state.activeStateIndex !== null && state.activeStateIndex >= 1
          ? state.activeStateIndex - 1
          : null;

      const activeState =
        activeStateIndex !== null && activeStateIndex >= 0
          ? state.states[activeStateIndex]
          : null;

      return {
        ...state,
        actionType: UNDO,
        activeStateIndex,
        activeState,
      };
    }

    // Steps forward to more recent state.
    case REDO: {

      // If no future states, return current state.
      if (
        state.activeStateIndex !== null &&
        state.activeStateIndex + 1 === state.states.length
      ) {
        return state;
      }

      const activeStateIndex =
        state.activeStateIndex !== null
          ? (state.activeStateIndex as number) + 1
          : 0;

      const activeState =
        activeStateIndex !== null && activeStateIndex >= 0
          ? state.states[activeStateIndex]
          : null;

      return {
        ...state,
        actionType: REDO,
        activeStateIndex,
        activeState,
      };
    }

    // Retuns default state.
    default: {
      return defaultState;
    }
  }
};

/**
 * Reducer hook.
 */
export const useUndoRedo = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return { state, dispatch };
};
