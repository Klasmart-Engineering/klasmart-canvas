import { useEffect } from 'react';
import { SET, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
var useSynchronizedRemoved = function (canvas, userId, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle remote event. */
    useEffect(function () {
        var _a;
        var removed = function (id) {
            var _a, _b, _c;
            if (!shouldHandleRemoteEvent(id))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                var _a;
                if (obj.id && obj.id === id) {
                    (_a = canvas) === null || _a === void 0 ? void 0 : _a.remove(obj);
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
            undoRedoDispatch({
                type: SET_OTHER,
                payload: (_c = canvas) === null || _c === void 0 ? void 0 : _c.getObjects(),
                canvasId: userId,
            });
        };
        (_a = eventController) === null || _a === void 0 ? void 0 : _a.on('removed', removed);
        return function () {
            var _a;
            (_a = eventController) === null || _a === void 0 ? void 0 : _a.removeListener('removed', removed);
        };
    }, [
        canvas,
        eventController,
        shouldHandleRemoteEvent,
        undoRedoDispatch,
        userId,
    ]);
    /** Register and handle local event. */
    useEffect(function () {
        var _a;
        var objectRemoved = function (e) {
            var _a;
            if (shouldSerializeEvent(e.target.id))
                return;
            var payload = {
                id: e.target.id,
            };
            if (canvas) {
                var event_1 = { event: payload, type: 'removed' };
                undoRedoDispatch({
                    type: SET,
                    payload: canvas.getObjects(),
                    canvasId: userId,
                    event: event_1,
                });
            }
            (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('removed', payload);
        };
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('object:removed', objectRemoved);
        return function () {
            var _a;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('object:removed', objectRemoved);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
};
export default useSynchronizedRemoved;
//# sourceMappingURL=useSynchronizedRemoved.js.map