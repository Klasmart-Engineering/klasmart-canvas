var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { SET, SET_GROUP } from '../reducers/undo-redo';
var useSynchronizedScaled = function (canvas, userId, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle remote event. */
    useEffect(function () {
        var scaled = function (id, objectType, target) {
            if (!shouldHandleRemoteEvent(id))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    if (objectType === 'activeSelection' && target.left && obj.left) {
                        obj.set({
                            angle: target.angle,
                            top: target.top,
                            left: target.left + 1,
                            scaleX: target.scaleX,
                            scaleY: target.scaleY,
                            flipX: target.flipX,
                            flipY: target.flipY,
                            originX: 'center',
                            originY: 'center',
                        });
                        obj.set({ left: obj.left - 1 });
                        obj.setCoords();
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
                            originX: target.originX || 'left',
                            originY: target.originY || 'top',
                        });
                        obj.setCoords();
                    }
                }
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('scaled', scaled);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('scaled', scaled);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent]);
    useEffect(function () {
        var objectScaled = function (e) {
            if (!e.target)
                return;
            var type = e.target.get('type');
            var activeIds = [];
            if (type === 'activeSelection' && e.target._objects) {
                var groupObjects = e.target._objects || [];
                groupObjects.forEach(function (activeObject) {
                    if (activeObject.id && !shouldSerializeEvent(activeObject.id))
                        return;
                    var matrix = activeObject.calcTransformMatrix();
                    var options = fabric.util.qrDecompose(matrix);
                    var flipX = function () {
                        var _a, _b;
                        if (activeObject.flipX && ((_a = e.target) === null || _a === void 0 ? void 0 : _a.flipX)) {
                            return false;
                        }
                        return activeObject.flipX || ((_b = e.target) === null || _b === void 0 ? void 0 : _b.flipX);
                    };
                    var flipY = function () {
                        var _a, _b;
                        if (activeObject.flipY && ((_a = e.target) === null || _a === void 0 ? void 0 : _a.flipY)) {
                            return false;
                        }
                        return activeObject.flipY || ((_b = e.target) === null || _b === void 0 ? void 0 : _b.flipY);
                    };
                    var angle = function () {
                        var _a, _b;
                        if (((_a = e.target) === null || _a === void 0 ? void 0 : _a.angle) !== 0) {
                            return (_b = e.target) === null || _b === void 0 ? void 0 : _b.angle;
                        }
                        return activeObject.angle;
                    };
                    var target = {
                        angle: angle(),
                        top: options.translateY,
                        left: options.translateX,
                        scaleX: options.scaleX,
                        scaleY: options.scaleY,
                        flipX: flipX(),
                        flipY: flipY(),
                    };
                    var payload = {
                        type: type,
                        target: target,
                        id: activeObject.id || '',
                    };
                    activeIds.push(activeObject.id);
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('scaled', payload);
                });
                var payload = {
                    type: type,
                    svg: true,
                    target: null,
                    id: userId + ":group",
                };
                var event_1 = { event: payload, type: 'activeSelection', activeIds: activeIds };
                var filtered = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) {
                    return !o.group;
                });
                var active = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
                undoRedoDispatch({
                    type: SET_GROUP,
                    payload: __spreadArrays(filtered, [active]),
                    canvasId: userId,
                    event: event_1,
                });
            }
            else {
                if (!e.target.id) {
                    return;
                }
                if (!shouldSerializeEvent(e.target.id))
                    return;
                var type_1 = e.target.get('type');
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
                    type: type_1,
                    target: target,
                    id: e.target.id,
                };
                if (canvas) {
                    var event_2 = { event: payload, type: 'scaled' };
                    undoRedoDispatch({
                        type: SET,
                        payload: canvas.getObjects(),
                        canvasId: userId,
                        event: event_2,
                    });
                }
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('scaled', payload);
            }
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:scaled', objectScaled);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:scaled', objectScaled);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
};
export default useSynchronizedScaled;
//# sourceMappingURL=useSynchronizedScaled.js.map