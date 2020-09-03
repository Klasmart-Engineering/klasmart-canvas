import { useEffect } from 'react';
import { SET, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
var useSynchronizedRemoved = function (canvas, userId, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle remote event. */
    useEffect(function () {
        var removed = function (objectId, target) {
            switch (target.strategy) {
                case 'allowClearMyself':
                    if (!shouldHandleRemoteEvent(objectId))
                        return;
                    canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                        if (obj.id === objectId) {
                            canvas === null || canvas === void 0 ? void 0 : canvas.remove(obj);
                        }
                    });
                    break;
                case 'allowClearAll':
                    if (shouldHandleRemoteEvent(objectId))
                        return;
                    canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                        canvas === null || canvas === void 0 ? void 0 : canvas.remove(obj);
                    });
                    break;
                case 'allowClearOthers':
                    if (shouldHandleRemoteEvent(objectId))
                        return;
                    canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                        if (obj.id) {
                            var object = obj.id.split(':');
                            if (!object.length) {
                                throw new Error('Invalid ID');
                            }
                            if (object[0] === target.userId) {
                                canvas === null || canvas === void 0 ? void 0 : canvas.remove(obj);
                            }
                        }
                    });
                    break;
                default:
                    canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                        if (obj.id && obj.id === objectId) {
                            canvas === null || canvas === void 0 ? void 0 : canvas.remove(obj);
                        }
                    });
            }
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
            if (shouldHandleRemoteEvent(objectId)) {
                undoRedoDispatch({
                    type: SET_OTHER,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                });
            }
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('removed', removed);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('removed', removed);
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
        var objectRemoved = function (e) {
            if (!e.target)
                return;
            if (e.target.id &&
                !shouldSerializeEvent(e.target.id))
                return;
            var payload = {
                id: e.target.id,
            };
            var canvasEvent = e.target;
            var groupObjects = (canvasEvent === null || canvasEvent === void 0 ? void 0 : canvasEvent._objects) || [];
            if (canvas &&
                payload.id &&
                (!(canvasEvent === null || canvasEvent === void 0 ? void 0 : canvasEvent._objects) || groupObjects.length > 0) &&
                !e.target.groupClear) {
                var event_1 = { event: payload, type: 'removed' };
                undoRedoDispatch({
                    type: SET,
                    payload: canvas.getObjects(),
                    canvasId: userId,
                    event: event_1,
                });
            }
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', payload);
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:removed', objectRemoved);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:removed', objectRemoved);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
};
export default useSynchronizedRemoved;
//# sourceMappingURL=useSynchronizedRemoved.js.map