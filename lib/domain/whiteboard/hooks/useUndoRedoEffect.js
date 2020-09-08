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
import { useEffect } from 'react';
import { useUndoRedo, UNDO, REDO } from '../reducers/undo-redo';
// This file is a work in progress. Multiple events need to be considered,
// such as group events, that are currently not function (or break functionality).
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
 * Get's previous set color for canvas background.
 * @param currentIndex Current event index.
 * @param events List of events.
 */
var getPreviousBackground = function (currentIndex, events) {
    var i = currentIndex;
    if (i < 0) {
        return '#fff';
    }
    for (i; i >= 0; i--) {
        if (events[i].event.type === 'background') {
            return events[i].event.target.fill;
        }
    }
    return '#fff';
};
/**
 * Custom hook to track canvas history.
 * @param canvas Canvas being manipulated
 * @param eventSerializer Event serializer
 * @param canvasId Canvas ID
 */
export var UndoRedo = function (canvas, eventSerializer, generatedBy, instanceId) {
    var _a = useUndoRedo(), state = _a.state, dispatch = _a.dispatch;
    useEffect(function () {
        var _a;
        if (!state || !canvas) {
            return;
        }
        var nextEvent = state.events[state.eventIndex + 1];
        // Rerenders local canvas when an undo or redo event has been executed.
        if ((state.actionType === UNDO) ||
            state.actionType === REDO) {
            var mapped = JSON.parse(state.activeState).objects.map(function (object) {
                if (object.objects) {
                    var _objects = object.objects;
                    var mappedObjects = _objects.map(function (o) {
                        return __assign(__assign({}, o), { fromJSON: true });
                    });
                    return __assign(__assign({}, object), { fromJSON: true, objects: mappedObjects });
                }
                return __assign(__assign({}, object), { fromJSON: true });
            });
            canvas.loadFromJSON(JSON.stringify({ objects: mapped }), function () {
                canvas.getObjects().forEach(function (o) {
                    if (isLocalObject(o.id, instanceId)) {
                        o.set({ selectable: true, evented: true });
                        if (o._objects) {
                            o.toActiveSelection();
                            canvas.discardActiveObject();
                        }
                    }
                });
                var fill = getPreviousBackground(state.eventIndex, state.events);
                canvas.backgroundColor = fill;
                canvas.renderAll();
            });
        }
        if (state.actionType === UNDO) {
            var payload = {
                id: ((_a = nextEvent.event) === null || _a === void 0 ? void 0 : _a.id) || '',
            };
            // Serialize the event for synchronization
            if (nextEvent.type === 'added') {
                // If undoing the creation of an object, remove.
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', generatedBy, payload);
            }
            else if (nextEvent.type !== 'activeSelection') {
                var currentEvent = state.events[state.eventIndex];
                if ((nextEvent === null || nextEvent === void 0 ? void 0 : nextEvent.event).type === 'background') {
                    var fill = getPreviousBackground(state.eventIndex, state.events);
                    canvas.backgroundColor = fill;
                    canvas.renderAll();
                    var payload_1 = {
                        id: nextEvent.event.id,
                        target: { background: fill },
                        type: 'reconstruct'
                    };
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('reconstruct', generatedBy, payload_1);
                    return;
                }
                ;
                if (currentEvent && currentEvent.type !== 'activeSelection' && currentEvent.type !== 'remove') {
                    var id_1 = nextEvent.event.id;
                    var objects = JSON.parse(state.states[state.activeStateIndex]).objects;
                    var object = objects.filter(function (o) { return (o.id === id_1); })[0];
                    var payload_2 = {
                        id: id_1,
                        target: { objects: [object] },
                        type: 'reconstruct'
                    };
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('reconstruct', generatedBy, payload_2);
                }
                else if (state.activeStateIndex !== null) {
                    var objects = JSON.parse(state.states[state.activeStateIndex]).objects;
                    var payload_3 = {
                        id: nextEvent.event.id,
                        target: { objects: objects },
                        type: 'reconstruct'
                    };
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('reconstruct', generatedBy, payload_3);
                }
            }
            else {
                if ((state.events[state.eventIndex].type === 'activeSelection' &&
                    state.events[state.eventIndex + 1] &&
                    state.events[state.eventIndex + 1].type === 'activeSelection') ||
                    state.events[state.eventIndex].type === 'added') {
                    var id = state.events[state.eventIndex].event.id;
                    var objects = JSON.parse(state.states[state.activeStateIndex]).objects;
                    var payload_4 = {
                        id: id,
                        target: { objects: objects },
                        type: 'reconstruct'
                    };
                    if (state.events[state.eventIndex + 1].type === 'activeSelection' &&
                        state.events[state.eventIndex].type === 'added') {
                        eventSerializer.push('removed', generatedBy, { id: state.events[state.eventIndex + 1].event.id });
                    }
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('reconstruct', generatedBy, payload_4);
                }
                else {
                    var objects = JSON.parse(state.states[state.activeStateIndex]).objects;
                    var payload_5 = {
                        id: nextEvent.event.id,
                        target: { objects: objects },
                        type: 'reconstruct'
                    };
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('reconstruct', generatedBy, payload_5);
                }
            }
        }
        else if (state.actionType === REDO) {
            var event_1 = state.events[state.eventIndex];
            if ((event_1 === null || event_1 === void 0 ? void 0 : event_1.event).type === 'background') {
                canvas.backgroundColor = event_1.event.target.fill || '#fff';
                canvas.renderAll();
                var payload = {
                    id: event_1.event.id,
                    target: { background: event_1.event.target.fill || 'fff' },
                    type: 'reconstruct'
                };
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('reconstruct', generatedBy, payload);
                return;
            }
            ;
            if (event_1.type === 'added') {
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', generatedBy, event_1.event);
            }
            else if (event_1.type === 'removed') {
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', generatedBy, { id: event_1.event.id });
            }
            else if (event_1 && event_1.type !== 'activeSelection') {
                var id_2 = event_1.event.id;
                var objects = JSON.parse(state.states[state.activeStateIndex]).objects;
                var object = objects.filter(function (o) { return (o.id === id_2); })[0];
                var payload = {
                    id: id_2,
                    target: { objects: [object] },
                    type: 'reconstruct'
                };
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('reconstruct', generatedBy, payload);
            }
            else {
                var id = state.events[state.eventIndex].event.id;
                var objects = JSON.parse(state.states[state.activeStateIndex]).objects;
                var payload = {
                    id: id,
                    target: { objects: objects },
                    type: 'reconstruct'
                };
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('reconstruct', generatedBy, payload);
            }
        }
    }, [state, canvas, dispatch, eventSerializer, instanceId, generatedBy]);
    return { state: state, dispatch: dispatch };
};
//# sourceMappingURL=useUndoRedoEffect.js.map