import { useCallback, useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { SET } from '../reducers/undo-redo';
var useSynchronizedMoved = function (canvas, userId, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    var moveSelectedObject = useCallback(function (type, e) {
        var _a;
        if (!shouldSerializeEvent(e.target.id))
            return;
        var target = {
            angle: e.target.angle,
            top: e.target.top,
            left: e.target.left,
            scaleX: e.target.scaleX,
            scaleY: e.target.scaleY,
            flipX: e.target.flipX,
            flipY: e.target.flipY,
        };
        var payload = {
            type: type,
            target: target,
            id: e.target.id,
        };
        if (canvas) {
            var event_1 = { event: payload, type: 'moved' };
            undoRedoDispatch({
                type: SET,
                payload: canvas.getObjects(),
                canvasId: userId,
                event: event_1,
            });
        }
        (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('moved', payload);
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
    var moveSelectedGroup = useCallback(function (type, e) {
        e.target._objects.forEach(function (activeObject) {
            var _a;
            if (!shouldSerializeEvent(activeObject.id))
                return;
            var matrix = activeObject.calcTransformMatrix();
            var options = fabric.util.qrDecompose(matrix);
            var target = {
                angle: options.angle,
                top: options.translateY,
                left: options.translateX,
                scaleX: options.scaleX,
                scaleY: options.scaleY,
                flipX: activeObject.flipX,
                flipY: activeObject.flipY,
            };
            var payload = {
                type: type,
                target: target,
                id: activeObject.id,
            };
            if (canvas) {
                var event_2 = { event: payload, type: 'activeSelection' };
                undoRedoDispatch({
                    type: SET,
                    payload: canvas.getObjects(),
                    canvasId: userId,
                    event: event_2,
                    otherPayload: undefined,
                    activeObjects: e.target._objects,
                });
            }
            (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('moved', payload);
        });
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
    /** Register and handle object:moved event. */
    useEffect(function () {
        var _a;
        var objectMoved = function (e) {
            var type = e.target.get('type');
            if (type === 'activeSelection') {
                moveSelectedGroup(type, e);
            }
            else {
                moveSelectedObject(type, e);
            }
        };
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('object:moved', objectMoved);
        return function () {
            var _a;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('object:moved', objectMoved);
        };
    }, [canvas, eventSerializer, moveSelectedGroup, moveSelectedObject]);
    /** Register and handle remote moved event. */
    useEffect(function () {
        var _a;
        var moved = function (id, objectType, target) {
            var _a, _b;
            if (!shouldHandleRemoteEvent(id))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    if (objectType === 'activeSelection') {
                        obj.set({
                            angle: target.angle,
                            top: target.top,
                            left: target.left,
                            scaleX: target.scaleX,
                            scaleY: target.scaleY,
                            flipX: target.flipX,
                            flipY: target.flipY,
                            originX: 'center',
                            originY: 'center',
                        });
                    }
                    else {
                        obj.set({
                            angle: target.angle,
                            top: target.top,
                            left: target.left,
                            scaleX: target.scaleX,
                            scaleY: target.scaleY,
                            flipX: target.flipX,
                            flipY: target.flipY,
                            originX: 'left',
                            originY: 'top',
                        });
                    }
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        };
        (_a = eventController) === null || _a === void 0 ? void 0 : _a.on('moved', moved);
        return function () {
            var _a;
            (_a = eventController) === null || _a === void 0 ? void 0 : _a.removeListener('moved', moved);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent]);
};
export default useSynchronizedMoved;
//# sourceMappingURL=useSynchronizedMoved.js.map