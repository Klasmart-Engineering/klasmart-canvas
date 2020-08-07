import { useReducer } from 'react';
import { TypedShape } from '../../../interfaces/shapes/shapes';

export const UNDO = 'CANVAS_UNDO';
export const REDO = 'CANVAS_REDO';
export const SET = 'CANVAS_SET';
export const MODIFY = 'CANVAS_MODIFY';
export const UPDATE_OTHER = 'CANVAS_UPDATE_OTHER';
export const SET_OTHER = 'CANVAS_SET_OTHER';

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

  otherObjects: any;

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

  events: any[];

  eventIndex: number;
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

  canvasId?: string;

  event?: any;

  otherPayload?: fabric.Object;
}

/**
 * Canvas history default state.
 */
const defaultState: CanvasHistoryState = {
  states: [],
  otherObjects: [],
  actionType: null,
  activeStateIndex: null,
  activeState: null,
  events: [],
  eventIndex: -1,
};

/**
 * Stringifies objects into proper format to store in state
 * and render to canvas.
 * @param payload
 */
const objectStringifier = (payload: [fabric.Object | TypedShape]): string => {
  let formatted: (string)[] = [];

  if (payload) {
    formatted = payload.map((object: fabric.Object | TypedShape) => (
      object.toJSON(['strokeUniform', 'id'])
    ));
  }

  return JSON.stringify({ objects: formatted });
};

const isLocalObject = (id: string, canvasId: string): boolean => {
  const object = id.split(':');

  if (!object.length) {
    throw new Error('Invalid ID');
  }

  return object[0] === canvasId;
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
      let states = [...state.states];
      let events = [...state.events];
      let selfItems = action.payload?.filter((object: any) => (isLocalObject(object.id, action.canvasId as string))) as [fabric.Object | TypedShape];
      let otherObjects = action.payload?.filter((object: any) => (!isLocalObject(object.id, action.canvasId as string))) as [fabric.Object | TypedShape];
      const currentState = objectStringifier([...selfItems, ...otherObjects] as [fabric.Object | TypedShape]);

      // Canvas emits multiple identical events, this block
      // is meant to prevent identical events from being stored
      // and causing inconsitencies with undo and redo actions.
      // This block should only be removed if that issue with canvas is fixed.
      if (
        action.event.type !== 'added' &&
        action.event.type !== 'removed'
      ) {
        const lastEvent = JSON.stringify(state.events[state.events.length -1].event);
        const currentEvent = JSON.stringify(action.event.event);
        
        if (lastEvent === currentEvent) {
          return state;
        }
      }

      // This block removed future states if a new event has
      // been created after an undo.
      if (
        (state.activeStateIndex !== null &&
        state.activeStateIndex + 1 < state.states.length)
      ) {
        states.splice(state.activeStateIndex + 1, 9e9);
      } else if (state.activeStateIndex === null) {
        states = [];
      }

      // Formats and creates new state.
      let mappedSelfState = objectStringifier(selfItems);
      states = [...states, mappedSelfState];

      let stateItems = {
        ...state,
        states,
        actionType: SET,
        activeStateIndex: states.length - 1,
        activeState: currentState,
        otherObjects: objectStringifier(otherObjects),
      };

      // Removes future events if a new event has been created after an undo.
      if (state.eventIndex >= 0 && state.eventIndex + 1 < state.events.length) {
        events.splice(state.eventIndex + 1, 9e9);
      } else if (state.eventIndex < 0) {
        events = [];
      }

      if (action.event) {
        events = [ ...events, action.event ];
        stateItems = {
          ...stateItems,
          events,
          eventIndex: events.length - 1
        }
      }

      return stateItems;
    }

    // Steps back to previous state.
    case UNDO: {
      if (state.activeStateIndex === null) {
        return state;
      }

      const activeStateIndex =
        state.activeStateIndex !== null && state.activeStateIndex >= 1
          ? state.activeStateIndex - 1
          : null;

      const activeSelfState =
        activeStateIndex !== null && activeStateIndex >= 0
          ? state.states[activeStateIndex]
          : JSON.stringify({ objects: [] });
      
      const activeSelfStateObjects = JSON.parse(activeSelfState).objects;
      const otherStateObjects = JSON.parse(state.otherObjects).objects;
      const activeState = JSON.stringify({ objects: [ ...activeSelfStateObjects, ...otherStateObjects ]});

      return {
        ...state,
        actionType: UNDO,
        activeStateIndex,
        activeState,
        eventIndex: state.eventIndex - 1
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

      const activeSelfState =
        activeStateIndex !== null && activeStateIndex >= 0
          ? state.states[activeStateIndex]
          : JSON.stringify({ objects: [] });;

      const activeSelfStateObjects = JSON.parse(activeSelfState).objects;
      const otherStateObjects = JSON.parse(state.otherObjects).objects;
      const activeState = JSON.stringify({ objects: [ ...activeSelfStateObjects, ...otherStateObjects ]});

      return {
        ...state,
        actionType: REDO,
        activeStateIndex,
        activeState,
        eventIndex: state.eventIndex + 1
      };
    }

    // Creates a new current state if a new event has been received by serializer from a non local canvas.
    case SET_OTHER: {
      let selfItems = action.payload?.filter((object: any) => (isLocalObject(object.id, action.canvasId as string))) as [fabric.Object | TypedShape];
      let otherObjects = action.payload?.filter((object: any) => (!isLocalObject(object.id, action.canvasId as string))) as [fabric.Object | TypedShape];
      const currentState = objectStringifier([...selfItems, ...otherObjects] as [fabric.Object | TypedShape]);

      let stateItems = {
        ...state,
        actionType: SET_OTHER,
        activeState: currentState,
        otherObjects: objectStringifier(otherObjects),
      };

      return stateItems;
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
