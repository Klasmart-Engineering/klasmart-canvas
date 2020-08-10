import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { SET } from '../reducers/undo-redo';
var useSynchronizedRotated = function (canvas, userId, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle remote event. */
    useEffect(function () {
        var _a;
        var rotated = function (id, objectType, target) {
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
        (_a = eventController) === null || _a === void 0 ? void 0 : _a.on('rotated', rotated);
        return function () {
            var _a;
            (_a = eventController) === null || _a === void 0 ? void 0 : _a.removeListener('rotated', rotated);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent]);
    /** Register and handle local event. */
    useEffect(function () {
        var _a;
        var objectRotated = function (e) {
            var _a;
            var type = e.target.get('type');
            if (type === 'activeSelection') {
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
                    (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('rotated', payload);
                });
            }
            else {
                if (!e.target.id) {
                    return;
                }
                var id = e.target.id;
                var target = {
                    top: e.target.top,
                    left: e.target.left,
                    angle: e.target.angle,
                    scaleX: e.target.scaleX,
                    scaleY: e.target.scaleY,
                    flipX: e.target.flipX,
                    flipY: e.target.flipY,
                };
                var payload = {
                    type: type,
                    target: target,
                    id: id,
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
                (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('rotated', payload);
            }
        };
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('object:rotated', objectRotated);
        return function () {
            var _a;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('object:rotated', objectRotated);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
};
export default useSynchronizedRotated;
//# sourceMappingURL=useSynchronizedRotated.js.map