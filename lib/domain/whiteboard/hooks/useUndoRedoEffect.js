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
import { useEffect } from 'react';
import { useUndoRedo, UNDO, REDO } from '../reducers/undo-redo';
// This file is a work in progress. Multiple events need to be considered,
// such as group events, that are currently not function (or break functionality).
/**
 * Reconstructs an object based on past events.
 * @param id Object ID.
 * @param events Array of events
 * @param numToRemove Number of events to ignore.
 */
var objectReconstructor = function (id, events, numToRemove) {
    var filtered = events.filter(function (event) {
        return event.event.id === id;
    });
    if (numToRemove) {
        filtered.splice(-numToRemove);
    }
    var mapped = filtered.map(function (event) {
        return event.event;
    });
    var reconstructedTarget = {};
    mapped.forEach(function (object) {
        reconstructedTarget = __assign(__assign({}, reconstructedTarget), object.target);
    });
    return __assign(__assign({}, filtered[filtered.length - 1]), { event: __assign(__assign({}, filtered[0].event), { target: reconstructedTarget }) });
};
/**
 * Custom hook to track canvas history.
 * @param canvas Canvas being manipulated
 * @param eventSerializer Event serializer
 * @param canvasId Canvas ID
 */
export var UndoRedo = function (canvas, eventSerializer, _canvasId) {
    var _a = useUndoRedo(), state = _a.state, dispatch = _a.dispatch;
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f;
        if (!state || !canvas) {
            return;
        }
        var nextEvent = state.events[state.eventIndex + 1];
        // Rerenders canvas when an undo or redo event has been executed.
        if ((state.actionType === UNDO && nextEvent.type !== 'activeSelection') ||
            state.actionType === REDO) {
            canvas.clear();
            canvas.loadFromJSON(state.activeState, function () { });
        }
        if (state.actionType === UNDO) {
            var event_1 = state.events[state.eventIndex];
            var payload = {
                id: nextEvent.event.id,
            };
            // Serialize the event for synchronization
            if (nextEvent.type === 'added') {
                (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('removed', payload);
            }
            else if (nextEvent.type !== 'activeSelection') {
                var id_1 = event_1.event.id;
                var allEvents = __spreadArrays(state.events);
                var futureEvents = allEvents.splice(state.eventIndex + 1);
                futureEvents = futureEvents.filter(function (e) { return e.event.id === id_1; });
                var reconstructedEvent = objectReconstructor(id_1, state.events, futureEvents.length);
                if (reconstructedEvent.type !== 'added') {
                    console.log(reconstructedEvent);
                    (_b = eventSerializer) === null || _b === void 0 ? void 0 : _b.push('reconstruct', reconstructedEvent.event);
                }
                else {
                    (_c = eventSerializer) === null || _c === void 0 ? void 0 : _c.push('removed', payload);
                    (_d = eventSerializer) === null || _d === void 0 ? void 0 : _d.push('added', reconstructedEvent.event);
                }
            }
        }
        else if (state.actionType === REDO) {
            var event_2 = state.events[state.eventIndex];
            if (event_2.type === 'added') {
                (_e = eventSerializer) === null || _e === void 0 ? void 0 : _e.push('added', event_2.event);
            }
            else {
                var id_2 = event_2.event.id;
                var allEvents = __spreadArrays(state.events);
                var futureEvents = allEvents.splice(state.eventIndex + 1);
                futureEvents = futureEvents.filter(function (e) { return e.event.id === id_2; });
                var reconstructed = objectReconstructor(id_2, state.events, futureEvents.length);
                (_f = eventSerializer) === null || _f === void 0 ? void 0 : _f.push(reconstructed.type, reconstructed.event);
            }
        }
        return function () {
            var _a, _b, _c;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('object:added');
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.off('object:modified');
            (_c = canvas) === null || _c === void 0 ? void 0 : _c.off('object:removed');
        };
    }, [state, canvas, dispatch, eventSerializer]);
    return { state: state, dispatch: dispatch };
};
//# sourceMappingURL=useUndoRedoEffect.js.map