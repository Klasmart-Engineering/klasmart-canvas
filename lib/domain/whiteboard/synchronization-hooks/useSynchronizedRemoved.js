import { useEffect, useContext } from 'react';
import { SET, SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { WhiteboardContext } from '../WhiteboardContext';
var useSynchronizedRemoved = function (canvas, userId, generatedBy, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    var clearIsActive = useContext(WhiteboardContext).clearIsActive;
    /** Register and handle remote event. */
    useEffect(function () {
        var removed = function (objectId, generatedBy) {
            if (!canvas)
                return;
            if (!shouldHandleRemoteEvent(objectId, generatedBy))
                return;
            var removeObject = canvas.getObjects().find(function (obj) { return obj.id === objectId; });
            if (!removeObject) {
                console.error("Couldn't find object with ID: " + objectId);
                return;
            }
            removeObject.set({ generatedBy: generatedBy });
            canvas.remove(removeObject);
            canvas.renderAll();
            undoRedoDispatch({
                type: SET_OTHER,
                payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                canvasId: userId,
            });
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
            var _a;
            if (!e.target)
                throw new Error('object:removed event without target.');
            var target = e.target;
            if (!target.id)
                throw new Error('object:removed event without target id');
            // NOTE: Skip sending events for removed i-text boxes.
            if (target.isType('i-text'))
                return;
            if (!shouldSerializeEvent(target.id, target.generatedBy))
                return;
            var payload = { id: target.id };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', generatedBy, payload);
            // TODO: It seems canvas is required here because of the
            // payload for undo/redo stack. Should investigate if we
            // can get rid of the canvas instance dependency within
            // the callback. Just storing the properties necessary
            // to restore the removed object instead.
            if (!canvas)
                return;
            var groupObjects = target._objects || [];
            // TODO: Verify this is the correct condition for undo dispatch when removing objects.
            if (groupObjects.length > 0 && !target.groupClear && !clearIsActive) {
                if (e.target.text &&
                    !((_a = e.target.text) === null || _a === void 0 ? void 0 : _a.trim()))
                    return;
                var event_1 = { event: payload, type: 'removed' };
                undoRedoDispatch({
                    type: SET,
                    payload: canvas.getObjects(),
                    canvasId: userId,
                    event: event_1,
                });
            }
        };
        if (canvas) {
            canvas.on('object:removed', objectRemoved);
            return function () {
                canvas.off('object:removed', objectRemoved);
            };
        }
    }, [canvas, clearIsActive, eventSerializer, generatedBy, shouldSerializeEvent, undoRedoDispatch, userId]);
};
export default useSynchronizedRemoved;
//# sourceMappingURL=useSynchronizedRemoved.js.map