import { useReducer } from 'react';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { TypedGroup } from '../../../interfaces/shapes/group';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { STATES_LIMIT } from '../../../config/undo-redo-values';

export const UNDO = 'CANVAS_UNDO';
export const REDO = 'CANVAS_REDO';
export const SET = 'CANVAS_SET';
export const SET_GROUP = 'CANVAS_SET_GROUP';
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
      object.toJSON([
        'strokeUniform',
        'id',
        'selectable',
        'evented',
        'shapeType',
      ])
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

const limitValidator = (list: IUndoRedoEvent[] | string[], limit: number) => {
  const cloned = [...list];

  if (list.length > limit) {
    cloned.shift();
  }

  return cloned;
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
      if (
        !action.event ||
        (action.event.type === 'removed' && state.activeStateIndex === null)
      ) {
        return state;
      }
      let states = [...state.states];
      let events = [...state.events];
      const selfItems = action.payload?.filter(
        (object: ICanvasObject) =>
          object.id && isLocalObject(object.id, action.canvasId as string)
      ) as [fabric.Object | TypedShape];

      const otherObjects = action.payload?.filter(
        (object: ICanvasObject) =>
          object.id && !isLocalObject(object.id, action.canvasId as string)
      ) as [fabric.Object | TypedShape];

      const currentState = objectStringifier(([
        ...selfItems,
        ...otherObjects,
      ] as unknown) as [fabric.Object | TypedShape]);

      // This block removed future states if a new event has
      // been created after an undo.
      if (
        state.activeStateIndex !== null &&
        state.activeStateIndex + 1 < state.states.length
      ) {
        states.splice(state.activeStateIndex + 1, 9e9);
      } else if (state.activeStateIndex === null) {
        states = [];
      }

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

      // Removes future events if a new event has been created after an undo.
      if (state.eventIndex >= 0 && state.eventIndex + 1 < state.events.length) {
        events.splice(state.eventIndex + 1, 9e9);
      } else if (state.eventIndex < 0) {
        events = [];
      }

      events = limitValidator(events, STATES_LIMIT) as IUndoRedoEvent[];

      if (action.event && !Array.isArray(action.event)) {
        events = [...events, action.event];
        stateItems = {
          ...stateItems,
          events,
          eventIndex: events.length - 1,
        };
      } else if (action.event && Array.isArray(action.event)) {
        events = [...events, ...action.event];
        stateItems = {
          ...stateItems,
          events,
          eventIndex: events.length - 1,
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

      let otherObjects = action.payload?.filter(
        (object: TypedShape | TypedGroup) => {
          return (
            !isLocalObject(object.id as string, action.canvasId as string) &&
            !(object as TypedGroup)._objects
          );
        }
      ) as [fabric.Object | TypedShape];

      selfItems = selfItems.map((o: TypedShape | TypedGroup) => {
        if (o.toObject) {
          return o.toObject(['id', 'selectable']);
        }

        return o;
      }) as [TypedShape | TypedGroup];

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

      // This block removed future states if a new event has
      // been created after an undo.
      if (
        state.activeStateIndex !== null &&
        state.activeStateIndex + 1 < state.states.length
      ) {
        states.splice(state.activeStateIndex + 1, 9e9);
      } else if (state.activeStateIndex === null) {
        states = [];
      }

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

      // Removes future events if a new event has been created after an undo.
      if (state.eventIndex >= 0 && state.eventIndex + 1 < state.events.length) {
        events.splice(state.eventIndex + 1, 9e9);
      } else if (state.eventIndex < 0) {
        events = [];
      }

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

      let eventIndex = state.eventIndex - 1;

      if (
        state.events[state.eventIndex] &&
        state.events[state.eventIndex].eventId
      ) {
        // This is a grouped event action, determine previous
        // event index prior to grouped event.
        eventIndex = determineNewIndex(
          state.eventIndex - 1,
          state.events[state.eventIndex - 1].eventId as string,
          state.events
        );
      }

      let activeStateIndex =
        state.activeStateIndex !== null && state.activeStateIndex >= 1
          ? state.activeStateIndex - 1
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
      // If no future states, return current state.
      if (
        state.activeStateIndex !== null &&
        state.activeStateIndex + 1 === state.states.length
      ) {
        return state;
      }

      if (!state.events.length) {
        return state;
      }

      let eventIndex = state.eventIndex + 1;
      if (
        state.events[state.eventIndex + 1] &&
        state.events[state.eventIndex + 1].eventId
      ) {
        // This is a grouped event action, determine previous
        // event index prior to grouped event.
        eventIndex = determineNewRedoIndex(
          state.eventIndex + 1,
          state.events[state.eventIndex + 1].eventId as string,
          state.events
        );
      }

      const activeStateIndex =
        state.activeStateIndex !== null
          ? (state.activeStateIndex as number) + 1
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
