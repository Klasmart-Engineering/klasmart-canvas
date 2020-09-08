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
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { SET } from '../reducers/undo-redo';
var useSynchronizedModified = function (canvas, generatedBy, shouldSerializeEvent, shouldHandleRemoteEvent, userId, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle remote event. */
    useEffect(function () {
        var modified = function (id, generatedBy, objectType, target) {
            if (!shouldHandleRemoteEvent(id, generatedBy))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                var _a;
                if (obj.id && obj.id === id) {
                    if (objectType === 'textbox' && target.left && obj.left) {
                        obj.set({
                            text: target.text,
                            fontFamily: target.fontFamily,
                            stroke: (_a = target.fill) === null || _a === void 0 ? void 0 : _a.toString(),
                            top: target.top,
                            left: target.left + 1,
                            width: target.width,
                            generatedBy: generatedBy,
                        });
                        obj.set({ left: obj.left - 1 });
                        obj.setCoords();
                    }
                }
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        var payload = {
            id: modified.id,
        };
        if (canvas && payload.id) {
            var event_1 = { event: payload, type: 'modified' };
            undoRedoDispatch({
                type: SET,
                payload: canvas.getObjects(),
                canvasId: userId,
                event: event_1,
            });
        }
        eventController === null || eventController === void 0 ? void 0 : eventController.on('modified', modified);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('modified', modified);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent, undoRedoDispatch, userId]);
    /** Register and handle local events. */
    useEffect(function () {
        var objectModified = function (e) {
            if (!e.target)
                return;
            var canvasObject = e.target;
            if (!canvasObject.id)
                throw new Error('modified target without ID');
            if (!canvasObject.generatedBy)
                throw new Error('modified target without generatedBy');
            if (!shouldSerializeEvent(canvasObject.id, canvasObject.generatedBy))
                return;
            var type = canvasObject.get('type');
            // If text has been modified
            if (type === 'textbox' && canvasObject.id) {
                var target = __assign({}, (type === 'textbox' && {
                    text: canvasObject.text,
                    fontFamily: canvasObject.fontFamily,
                    stroke: e.target.fill,
                    top: e.target.top,
                    left: e.target.left,
                    width: e.target.width,
                }));
                var payload = {
                    type: type,
                    target: target,
                    id: e.target.id,
                };
                var event_2 = { event: payload, type: 'modified' };
                undoRedoDispatch({
                    type: SET,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                    event: event_2,
                });
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('modified', generatedBy, payload);
            }
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:modified', objectModified);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:modified', objectModified);
        };
    }, [canvas, eventSerializer, generatedBy, shouldSerializeEvent, undoRedoDispatch, userId]);
};
export default useSynchronizedModified;
//# sourceMappingURL=useSynchronizedModified.js.map