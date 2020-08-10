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
export var MODIFY = 'CANVAS_MODIFY';
export var UPDATE_OTHER = 'CANVAS_UPDATE_OTHER';
export var SET_OTHER = 'CANVAS_SET_OTHER';
/**
 * Canvas history default state.
 */
var defaultState = {
    states: [],
    otherObjects: [],
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
            return object.toJSON(['strokeUniform', 'id']);
        });
    }
    return JSON.stringify({ objects: formatted });
};
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
 * History state reducer.
 * @param state Canvas state.
 * @param action Action
 */
var reducer = function (state, action) {
    if (state === void 0) { state = defaultState; }
    var _a, _b, _c, _d;
    switch (action.type) {
        // Sets state when new object is created.
        case SET: {
            // Once all object types are synched, this if statement can be removed.
            if (!action.event) {
                return state;
            }
            var states = __spreadArrays(state.states);
            var events = __spreadArrays(state.events);
            var selfItems = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.filter(function (object) {
                return isLocalObject(object.id, action.canvasId);
            });
            var otherObjects = (_b = action.payload) === null || _b === void 0 ? void 0 : _b.filter(function (object) { return !isLocalObject(object.id, action.canvasId); });
            var currentState = objectStringifier(__spreadArrays(selfItems, otherObjects));
            // Canvas emits multiple identical events, this block
            // is meant to prevent identical events from being stored
            // and causing inconsitencies with undo and redo actions.
            // This block should only be removed if that issue with canvas is fixed.
            if (action.event.type !== 'added' && action.event.type !== 'removed') {
                var lastEvent = JSON.stringify(state.events[state.events.length - 1].event);
                var currentEvent = JSON.stringify(action.event.event);
                if (lastEvent === currentEvent) {
                    return state;
                }
            }
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
            var activeObjects = action.activeObjects && action.activeObjects.length
                ? objectStringifier(action.activeObjects)
                : [];
            var stateItems = __assign(__assign({}, state), { states: states, actionType: SET, activeStateIndex: states.length - 1, activeState: currentState, otherObjects: objectStringifier(otherObjects), activeObjects: activeObjects });
            // Removes future events if a new event has been created after an undo.
            if (state.eventIndex >= 0 && state.eventIndex + 1 < state.events.length) {
                events.splice(state.eventIndex + 1, 9e9);
            }
            else if (state.eventIndex < 0) {
                events = [];
            }
            if (action.event) {
                events = __spreadArrays(events, [action.event]);
                stateItems = __assign(__assign({}, stateItems), { events: events, eventIndex: events.length - 1 });
            }
            return stateItems;
        }
        // Steps back to previous state.
        case UNDO: {
            if (state.activeStateIndex === null) {
                return state;
            }
            var activeStateIndex = state.activeStateIndex !== null && state.activeStateIndex >= 1
                ? state.activeStateIndex - 1
                : null;
            var activeSelfState = activeStateIndex !== null && activeStateIndex >= 0
                ? state.states[activeStateIndex]
                : JSON.stringify({ objects: [] });
            var activeSelfStateObjects = JSON.parse(activeSelfState).objects;
            var otherStateObjects = JSON.parse(state.otherObjects).objects;
            var activeState = JSON.stringify({
                objects: __spreadArrays(activeSelfStateObjects, otherStateObjects),
            });
            return __assign(__assign({}, state), { actionType: UNDO, activeStateIndex: activeStateIndex,
                activeState: activeState, eventIndex: state.eventIndex - 1 });
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
            var activeStateIndex = state.activeStateIndex !== null
                ? state.activeStateIndex + 1
                : 0;
            var activeSelfState = activeStateIndex !== null && activeStateIndex >= 0
                ? state.states[activeStateIndex]
                : JSON.stringify({ objects: [] });
            var activeSelfStateObjects = JSON.parse(activeSelfState).objects;
            var otherStateObjects = JSON.parse(state.otherObjects).objects;
            var activeState = JSON.stringify({
                objects: __spreadArrays(activeSelfStateObjects, otherStateObjects),
            });
            return __assign(__assign({}, state), { actionType: REDO, activeStateIndex: activeStateIndex,
                activeState: activeState, eventIndex: state.eventIndex + 1 });
        }
        // Creates a new current state if a new event has been received by serializer from a non local canvas.
        case SET_OTHER: {
            var selfItems = (_c = action.payload) === null || _c === void 0 ? void 0 : _c.filter(function (object) {
                return isLocalObject(object.id, action.canvasId);
            });
            var otherObjects = (_d = action.payload) === null || _d === void 0 ? void 0 : _d.filter(function (object) { return !isLocalObject(object.id, action.canvasId); });
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