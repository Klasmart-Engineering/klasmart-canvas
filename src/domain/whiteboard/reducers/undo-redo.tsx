import { useReducer } from 'react';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { TypedGroup } from '../../../interfaces/shapes/group';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import {
  STATES_LIMIT,
  CANVAS_OBJECT_PROPS,
} from '../../../config/undo-redo-values';
import { is3DShape } from '../utils/shapes';

export const UNDO = 'CANVAS_UNDO';
export const REDO = 'CANVAS_REDO';
export const SET = 'CANVAS_SET';
export const SET_GROUP = 'CANVAS_SET_GROUP';
export const UPDATE_OTHER = 'CANVAS_UPDATE_OTHER';
export const SET_OTHER = 'CANVAS_SET_OTHER';
export const SET_BACKGROUND = 'CANVAS_SET_BACKGROUND';

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
   * Objects created on another canvas.
   */
  otherObjects: string;

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

  /**
   * List of events
   */
  events: IUndoRedoEvent[];

  /**
   * Current event chosen, used for undo and redo events.
   */
  eventIndex: number;

  /**
   * Used for group manipulation.
   */
  activeObjects: ICanvasObject[];

  /**
   * Stores background state in order to rerender if needed.
   */
  backgrounds: (string | fabric.Image | null)[];
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
  payload?: fabric.Object [];

  /**
   * ID of canvas.
   */
  canvasId?: string;

  /**
   * Event to be added to list.
   */
  event?: IUndoRedoEvent;

  /**
   * Payload of objects from other canvas.
   */
  otherPayload?: fabric.Object;

  /**
   * Event ID. Used to determine if an event is grouped.
   */
  eventId?: string | undefined;

  /**
   * Canvas background payload
   */
  background?: fabric.Image;
}

/**
 * Canvas history default state.
 */
const defaultState: CanvasHistoryState = {
  states: [],
  otherObjects: '',
  actionType: null,
  activeStateIndex: null,
  activeState: null,
  events: [],
  eventIndex: -1,
  activeObjects: [], // This is a work in progress, does not work.
  backgrounds: [],
};

/**
 * Stringifies objects into proper format to store in state
 * and render to canvas.
 * @param payload
 */
const objectStringifier = (payload: (fabric.Object | TypedShape)[]): string => {
  let formatted: string[] = [];

  if (payload) {
    formatted = payload.map((object: fabric.Object | TypedShape) =>
      object.toJSON(CANVAS_OBJECT_PROPS)
    );
  }

  return JSON.stringify({ objects: formatted });
};

/**
 * Determine if an object belongs to local canvas.
 * @param id Object ID
 * @param canvasId Canvas ID
 */
const isLocalObject = (id: string, canvasId: string): boolean => {
  if (!id) {
    return false;
  }

  const object = id.split(':');

  if (!object.length) {
    throw new Error('Invalid ID');
  }

  return object[0] === canvasId;
};

/**
 * Determines new event index on undo.
 * @param newIndex New umodified event index.
 * @param eventId Event ID
 * @param events List of events
 */
const determineNewIndex = (newIndex: number, eventId: string, events: any) => {
  let i = newIndex;

  for (i; i >= 0; i--) {
    if (events[i].eventId !== eventId) {
      return i;
    }
  }

  return -1;
};

/**
 * Determines new event index on redo.
 * @param newIndex New umodified event index.
 * @param eventId Event ID
 * @param events List of events
 */
const determineNewRedoIndex = (
  newIndex: number,
  eventId: string,
  events: any
) => {
  let i = newIndex;

  for (i; i < events.length; i++) {
    if (events[i].eventId !== eventId) {
      return i - 1;
    }
  }

  return events.length - 1;
};

const limitValidator = (
  list: IUndoRedoEvent[] | string[],
  limit: number
): (string | IUndoRedoEvent)[] => {
  const cloned = [...list];

  if (list.length > limit) {
    cloned.shift();
  }

  return cloned;
};

const filterById = (
  canvasId: string,
  objects: ICanvasObject[] | undefined,
  isLocal: boolean
) => {
  return objects?.filter((object: ICanvasObject) =>
    isLocal
      ? object.id && isLocalObject(object.id, canvasId)
      : object.id && !isLocalObject(object.id, canvasId)
  ) as [fabric.Object | TypedShape];
};

/**
 * Removes future states if a new state has
 * been created after an undo.
 */
const spliceStates = (
  activeStateIndex: number | null,
  statesList: string[]
): string[] => {
  let states = [...statesList];

  if (activeStateIndex !== null && activeStateIndex + 1 < states.length) {
    states.splice(activeStateIndex + 1, 9e9);
  } else if (activeStateIndex === null) {
    states = [];
  }

  return states;
};

const spliceBackgroundStates = (
  activeStateIndex: number | null,
  backgroundStates: any[]
): string[] => {
  let states = [...backgroundStates];

  if (activeStateIndex !== null && activeStateIndex + 1 < states.length) {
    states.splice(activeStateIndex + 1, 9e9);
  } else if (activeStateIndex === null) {
    states = [];
  }

  return states;
};

/**
 * Removes future events if a new event has
 * been created after an undo.
 */
const spliceEvents = (
  eventIndex: number,
  eventsList: IUndoRedoEvent[]
): IUndoRedoEvent[] => {
  // Removes future events if a new event has been created after an undo.
  let events = [...eventsList];

  if (eventIndex >= 0 && eventIndex + 1 < events.length) {
    events.splice(eventIndex + 1, 9e9);
  } else if (eventIndex < 0) {
    events = [];
  }

  return events;
};

/**
 * Get Steps for jumping from or to, undo/redo. It will be always 1 for groups and 2d objects 
 * It will be 2 if the event object of the new state is 3d due to the 3d need of redrawing (remove, add) on every 2d step.
 * @param {CanvasHistoryState} state 
 * @param {string} sense forward or backward
 */
const getSteps = (state: CanvasHistoryState, sense: 'forward' | 'backward') => {

  const backOrForwardStateIsValid = (backOrForwardIndex: number) => {
    return state.events[backOrForwardIndex] && 
    state.events[backOrForwardIndex].type && 
    state.events[backOrForwardIndex].event && 
    (state.events[backOrForwardIndex].event as any).hasOwnProperty("id") && 
    (state.events[backOrForwardIndex].event as any).id.includes(':3D:')
  }

  let steps = 1 
  let backOrForwardIndex = sense === 'backward' ? state.eventIndex - 1 : state.eventIndex + 1;
  
  if (
    backOrForwardStateIsValid(backOrForwardIndex) && 
    state.events[backOrForwardIndex].type === 'removed'
  ) {
    const threeObjectId = (state.events[backOrForwardIndex].event as any).id
    backOrForwardIndex = sense === 'backward' ? backOrForwardIndex -= 1 : backOrForwardIndex += 1;
    if (
      backOrForwardStateIsValid(backOrForwardIndex) && 
      state.events[backOrForwardIndex].type === 'added' &&
      threeObjectId === (state.events[backOrForwardIndex].event as any).id
    ) {
      steps = 2 
    }
  }

  return steps
}

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
      if (!action.background) {
        if (
          !action.event ||
          (action.event.type === 'removed' && state.activeStateIndex === null) ||
          (action.event.type !== 'backgroundColorChanged' &&
            !action.payload?.length &&
            !state.states.length)
        ) {
          return state;
        }
      }

      let states = [...state.states];
      let events = [...state.events];

      const selfItems = filterById(
        action.canvasId as string,
        action.payload,
        true
      );
      const otherObjects = filterById(
        action.canvasId as string,
        action.payload,
        false
      );

      const currentState = objectStringifier(([
        ...selfItems,
        ...otherObjects,
      ] as unknown) as [fabric.Object | TypedShape]);

      states = spliceStates(state.activeStateIndex, state.states);
      let backgrounds = spliceBackgroundStates(state.activeStateIndex, state.backgrounds);

      // Formats and creates new state.
      const mappedSelfState = objectStringifier(selfItems);
      states = limitValidator(
        [...states, mappedSelfState],
        STATES_LIMIT
      ) as string[];

      let stateItems = {
        ...state,
        states,
        actionType: SET,
        activeStateIndex: states.length - 1,
        activeState: currentState,
        otherObjects: objectStringifier(otherObjects),
      };
      
      events = spliceEvents(state.eventIndex, events);
      events = limitValidator(events, STATES_LIMIT) as IUndoRedoEvent[];

      if (action.event && !Array.isArray(action.event)) {
        events = [...events, action.event];
        stateItems = {
          ...stateItems,
          events,
          eventIndex: events.length - 1,
          backgrounds: [ ...backgrounds, action.background || null ],
        };
      } else if (action.event && Array.isArray(action.event)) {
        events = [...events, ...action.event];
        stateItems = {
          ...stateItems,
          events,
          eventIndex: events.length - 1,
          backgrounds: [ ...backgrounds, action.background || null ],
        };
      }

      return stateItems;
    }

    case SET_GROUP: {
      let states = [...state.states];
      let events = [...state.events];

      let selfItems = action.payload?.filter(
        (object: TypedShape | TypedGroup) => {
          if ((object as TypedGroup)._objects) {
            return object;
          }

          return isLocalObject(object.id as string, action.canvasId as string);
        }
      ) as [fabric.Object | TypedShape];

      selfItems = selfItems.map((o: TypedShape | TypedGroup) => {
        if (o.toObject) {
          return o.toObject(['id', 'selectable']);
        }

        return o;
      }) as [TypedShape | TypedGroup];

      let otherObjects = action.payload?.filter(
        (object: TypedShape | TypedGroup) => {
          return (
            !isLocalObject(object.id as string, action.canvasId as string) &&
            !(object as TypedGroup)._objects
          );
        }
      ) as [fabric.Object | TypedShape];

      otherObjects = otherObjects.map((o: TypedShape | TypedGroup) => {
        if (o.toObject) {
          return o.toObject(['id', 'selectable']);
        }

        return o;
      }) as [TypedShape | TypedGroup];

      const currentState = JSON.stringify({
        objects: ([...selfItems, ...otherObjects] as unknown) as [
          fabric.Object | TypedShape
        ],
      });

      states = spliceStates(state.activeStateIndex, state.states);

      // Formats and creates new state.
      const mappedSelfState = JSON.stringify({ objects: selfItems });
      states = limitValidator(
        [...states, mappedSelfState],
        STATES_LIMIT
      ) as string[];

      let newEvent = { ...action.event, selfState: mappedSelfState };

      let stateItems = {
        ...state,
        states,
        actionType: SET,
        activeStateIndex: states.length - 1,
        activeState: currentState,
        otherObjects: JSON.stringify({ objects: otherObjects }),
      };

      events = spliceEvents(state.eventIndex, state.events);
      events = limitValidator(events, STATES_LIMIT) as IUndoRedoEvent[];

      if (Array.isArray(action.event)) {
        events = [...events, ...action.event];
      } else {
        events = [...events, newEvent] as IUndoRedoEvent[];
      }

      stateItems = {
        ...stateItems,
        events,
        eventIndex: events.length - 1,
      };

      return stateItems;
    }

    // Steps back to previous state.
    case UNDO: {
      if (
        state.activeStateIndex === null ||
        (state.activeStateIndex === 0 && state.states.length === STATES_LIMIT)
      ) {
        return state;
      }

      const steps = getSteps(state, 'backward')

      let eventIndex = state.eventIndex - steps;

      if (
        state.events[state.eventIndex] &&
        state.events[state.eventIndex].eventId
      ) {
        // This is a grouped event action, determine previous
        // event index prior to grouped event.
        eventIndex = determineNewIndex(
          state.eventIndex - steps,
          state.events[state.eventIndex - steps].eventId as string,
          state.events
        );
      }

      let activeStateIndex =
        state.activeStateIndex !== null && state.activeStateIndex >= 1
          ? state.activeStateIndex - steps
          : null;

      if (activeStateIndex === null && state.states.length === STATES_LIMIT) {
        activeStateIndex = 0;
        eventIndex = 0;
      }

      const activeSelfState =
        activeStateIndex !== null && activeStateIndex >= 0
          ? state.states[activeStateIndex]
          : JSON.stringify({ objects: [] });

      const activeSelfStateObjects = JSON.parse(activeSelfState).objects;
      const otherStateObjects = JSON.parse(state.otherObjects as string)
        .objects;
      const activeState = JSON.stringify({
        objects: [...activeSelfStateObjects, ...otherStateObjects],
      });

      const newState = {
        ...state,
        actionType: UNDO,
        activeStateIndex,
        activeState,
        eventIndex,
      };

      return newState;
    }

    // Steps forward to more recent state.
    case REDO: {

      const steps = getSteps(state, 'forward')
      
      // If no future states, return current state.
      if (
        state.activeStateIndex !== null &&
        state.activeStateIndex + steps === state.states.length
      ) {
        return state;
      }

      if (!state.events.length) {
        return state;
      }

      let eventIndex = state.eventIndex + steps;
      if (
        state.events[state.eventIndex + steps] &&
        state.events[state.eventIndex + steps].eventId
      ) {
        // This is a grouped event action, determine previous
        // event index prior to grouped event.
        eventIndex = determineNewRedoIndex(
          state.eventIndex + steps,
          state.events[state.eventIndex + steps].eventId as string,
          state.events
        );
      }

      const activeStateIndex =
        state.activeStateIndex !== null
          ? (state.activeStateIndex as number) + steps
          : 0;

      const activeSelfState =
        activeStateIndex !== null && activeStateIndex >= 0
          ? state.states[activeStateIndex]
          : JSON.stringify({ objects: [] });

      const activeSelfStateObjects = JSON.parse(activeSelfState).objects;
      const otherStateObjects = JSON.parse(state.otherObjects as string)
        .objects;
      const activeState = JSON.stringify({
        objects: [...activeSelfStateObjects, ...otherStateObjects],
      });

      return {
        ...state,
        actionType: REDO,
        activeStateIndex,
        activeState,
        eventIndex,
      };
    }

    // Creates a new current state if a new event has been received by serializer from a non local canvas.
    case SET_OTHER: {
      if (!action.payload) {
        return state;
      }

      const selfItems = action.payload?.filter(
        (object: ICanvasObject) =>
          object.id && isLocalObject(object.id, action.canvasId as string)
      ) as [fabric.Object | TypedShape];
      const otherObjects = action.payload?.filter(
        (object: ICanvasObject) =>
          object.id && !isLocalObject(object.id, action.canvasId as string)
      ) as [fabric.Object | TypedShape];
      const currentState = objectStringifier([...selfItems, ...otherObjects]);

      return {
        ...state,
        actionType: SET_OTHER,
        activeState: currentState,
        otherObjects: objectStringifier(otherObjects),
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
