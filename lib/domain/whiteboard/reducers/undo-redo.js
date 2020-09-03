var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { useReducer } from 'react';
export var UNDO = 'CANVAS_UNDO';
export var REDO = 'CANVAS_REDO';
export var SET = 'CANVAS_SET';
export var SET_GROUP = 'CANVAS_SET_GROUP';
export var UPDATE_OTHER = 'CANVAS_UPDATE_OTHER';
export var SET_OTHER = 'CANVAS_SET_OTHER';
/**
 * Canvas history default state.
 */
var defaultState = {
    states: [],
    otherObjects: '',
    actionType: null,
    activeStateIndex: null,
    activeState: null,
    events: [],
    eventIndex: -1,
    activeObjects: [],
};
/**
 * Stringifies objects into proper format to store in state
 * and render to canvas.
 * @param payload
 */
var objectStringifier = function (payload) {
    var formatted = [];
    if (payload) {
        formatted = payload.map(function (object) {
            return object.toJSON([
                'strokeUniform',
                'id',
                'selectable',
                'evented',
                'shapeType',
            ]);
        });
    }
    return JSON.stringify({ objects: formatted });
};
/**
 * Determine if an object belongs to local canvas.
 * @param id Object ID
 * @param canvasId Canvas ID
 */
var isLocalObject = function (id, canvasId) {
    if (!id) {
        return false;
    }
    var object = id.split(':');
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
var determineNewIndex = function (newIndex, eventId, events) {
    var i = newIndex;
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
var determineNewRedoIndex = function (newIndex, eventId, events) {
    var i = newIndex;
    for (i; i < events.length; i++) {
        if (events[i].eventId !== eventId) {
            return i - 1;
        }
    }
    return events.length - 1;
};
/**
 * History state reducer.
 * @param state Canvas state.
 * @param action Action
 */
var reducer = function (state, action) {
    var _a, _b, _c, _d, _e, _f;
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        // Sets state when new object is created.
        case SET: {
            if (!action.event ||
                (action.event.type === 'removed' && state.activeStateIndex === null)) {
                return state;
            }
            var states = __spreadArrays(state.states);
            var events = __spreadArrays(state.events);
            var selfItems = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.filter(function (object) {
                return object.id && isLocalObject(object.id, action.canvasId);
            });
            var otherObjects = (_b = action.payload) === null || _b === void 0 ? void 0 : _b.filter(function (object) {
                return object.id && !isLocalObject(object.id, action.canvasId);
            });
            var currentState = objectStringifier(__spreadArrays(selfItems, otherObjects));
            // This block removed future states if a new event has
            // been created after an undo.
            if (state.activeStateIndex !== null &&
                state.activeStateIndex + 1 < state.states.length) {
                states.splice(state.activeStateIndex + 1, 9e9);
            }
            else if (state.activeStateIndex === null) {
                states = [];
            }
            // Formats and creates new state.
            var mappedSelfState = objectStringifier(selfItems);
            states = __spreadArrays(states, [mappedSelfState]);
            var stateItems = __assign(__assign({}, state), { states: states, actionType: SET, activeStateIndex: states.length - 1, activeState: currentState, otherObjects: objectStringifier(otherObjects) });
            // Removes future events if a new event has been created after an undo.
            if (state.eventIndex >= 0 && state.eventIndex + 1 < state.events.length) {
                events.splice(state.eventIndex + 1, 9e9);
            }
            else if (state.eventIndex < 0) {
                events = [];
            }
            if (action.event && !Array.isArray(action.event)) {
                events = __spreadArrays(events, [action.event]);
                stateItems = __assign(__assign({}, stateItems), { events: events, eventIndex: events.length - 1 });
            }
            else if (action.event && Array.isArray(action.event)) {
                events = __spreadArrays(events, action.event);
                stateItems = __assign(__assign({}, stateItems), { events: events, eventIndex: events.length - 1 });
            }
            return stateItems;
        }
        case SET_GROUP: {
            var states = __spreadArrays(state.states);
            var events = __spreadArrays(state.events);
            var selfItems = (_c = action.payload) === null || _c === void 0 ? void 0 : _c.filter(function (object) {
                if (object._objects) {
                    return object;
                }
                return isLocalObject(object.id, action.canvasId);
            });
            var otherObjects = (_d = action.payload) === null || _d === void 0 ? void 0 : _d.filter(function (object) {
                return (!isLocalObject(object.id, action.canvasId) &&
                    !object._objects);
            });
            selfItems = selfItems.map(function (o) {
                if (o.toObject) {
                    return o.toObject(['id', 'selectable']);
                }
                return o;
            });
            otherObjects = otherObjects.map(function (o) {
                if (o.toObject) {
                    return o.toObject(['id', 'selectable']);
                }
                return o;
            });
            var currentState = JSON.stringify({
                objects: __spreadArrays(selfItems, otherObjects),
            });
            // This block removed future states if a new event has
            // been created after an undo.
            if (state.activeStateIndex !== null &&
                state.activeStateIndex + 1 < state.states.length) {
                states.splice(state.activeStateIndex + 1, 9e9);
            }
            else if (state.activeStateIndex === null) {
                states = [];
            }
            // Formats and creates new state.
            var mappedSelfState = JSON.stringify({ objects: selfItems });
            states = __spreadArrays(states, [mappedSelfState]);
            var newEvent = __assign(__assign({}, action.event), { selfState: mappedSelfState });
            var stateItems = __assign(__assign({}, state), { states: states, actionType: SET, activeStateIndex: states.length - 1, activeState: currentState, otherObjects: JSON.stringify({ objects: otherObjects }) });
            // Removes future events if a new event has been created after an undo.
            if (state.eventIndex >= 0 && state.eventIndex + 1 < state.events.length) {
                events.splice(state.eventIndex + 1, 9e9);
            }
            else if (state.eventIndex < 0) {
                events = [];
            }
            if (Array.isArray(action.event)) {
                events = __spreadArrays(events, action.event);
            }
            else {
                events = __spreadArrays(events, [newEvent]);
            }
            stateItems = __assign(__assign({}, stateItems), { events: events, eventIndex: events.length - 1 });
            return stateItems;
        }
        // Steps back to previous state.
        case UNDO: {
            if (state.activeStateIndex === null) {
                return state;
            }
            var eventIndex = state.eventIndex - 1;
            if (state.events[state.eventIndex] &&
                state.events[state.eventIndex].eventId) {
                // This is a grouped event action, determine previous
                // event index prior to grouped event.
                eventIndex = determineNewIndex(state.eventIndex - 1, state.events[state.eventIndex - 1].eventId, state.events);
            }
            var activeStateIndex = state.activeStateIndex !== null && state.activeStateIndex >= 1
                ? state.activeStateIndex - 1
                : null;
            var activeSelfState = activeStateIndex !== null && activeStateIndex >= 0
                ? state.states[activeStateIndex]
                : JSON.stringify({ objects: [] });
            var activeSelfStateObjects = JSON.parse(activeSelfState).objects;
            var otherStateObjects = JSON.parse(state.otherObjects)
                .objects;
            var activeState = JSON.stringify({
                objects: __spreadArrays(activeSelfStateObjects, otherStateObjects),
            });
            var newState = __assign(__assign({}, state), { actionType: UNDO, activeStateIndex: activeStateIndex,
                activeState: activeState,
                eventIndex: eventIndex });
            return newState;
        }
        // Steps forward to more recent state.
        case REDO: {
            // If no future states, return current state.
            if (state.activeStateIndex !== null &&
                state.activeStateIndex + 1 === state.states.length) {
                return state;
            }
            if (!state.events.length) {
                return state;
            }
            var eventIndex = state.eventIndex + 1;
            if (state.events[state.eventIndex + 1] &&
                state.events[state.eventIndex + 1].eventId) {
                // This is a grouped event action, determine previous
                // event index prior to grouped event.
                eventIndex = determineNewRedoIndex(state.eventIndex + 1, state.events[state.eventIndex + 1].eventId, state.events);
            }
            var activeStateIndex = state.activeStateIndex !== null
                ? state.activeStateIndex + 1
                : 0;
            var activeSelfState = activeStateIndex !== null && activeStateIndex >= 0
                ? state.states[activeStateIndex]
                : JSON.stringify({ objects: [] });
            var activeSelfStateObjects = JSON.parse(activeSelfState).objects;
            var otherStateObjects = JSON.parse(state.otherObjects)
                .objects;
            var activeState = JSON.stringify({
                objects: __spreadArrays(activeSelfStateObjects, otherStateObjects),
            });
            return __assign(__assign({}, state), { actionType: REDO, activeStateIndex: activeStateIndex,
                activeState: activeState,
                eventIndex: eventIndex });
        }
        // Creates a new current state if a new event has been received by serializer from a non local canvas.
        case SET_OTHER: {
            var selfItems = (_e = action.payload) === null || _e === void 0 ? void 0 : _e.filter(function (object) {
                return object.id && isLocalObject(object.id, action.canvasId);
            });
            var otherObjects = (_f = action.payload) === null || _f === void 0 ? void 0 : _f.filter(function (object) {
                return object.id && !isLocalObject(object.id, action.canvasId);
            });
            var currentState = objectStringifier(__spreadArrays(selfItems, otherObjects));
            return __assign(__assign({}, state), { actionType: SET_OTHER, activeState: currentState, otherObjects: objectStringifier(otherObjects) });
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
export var useUndoRedo = function () {
    var _a = useReducer(reducer, defaultState), state = _a[0], dispatch = _a[1];
    return { state: state, dispatch: dispatch };
};
//# sourceMappingURL=undo-redo.js.map