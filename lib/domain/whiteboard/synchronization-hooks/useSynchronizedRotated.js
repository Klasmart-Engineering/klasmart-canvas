var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { SET, SET_GROUP } from '../reducers/undo-redo';
var useSynchronizedRotated = function (canvas, userId, generatedBy, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle remote event. */
    useEffect(function () {
        var rotated = function (id, generatedBy, objectType, target) {
            if (!shouldHandleRemoteEvent(id, generatedBy))
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
                            generatedBy: generatedBy,
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
                            generatedBy: generatedBy,
                        });
                        obj.setCoords();
                    }
                }
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('rotated', rotated);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('rotated', rotated);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent]);
    /** Register and handle local event. */
    useEffect(function () {
        var objectRotated = function (e) {
            if (!e.target)
                return;
            var type = e.target.get('type');
            var activeIds = [];
            if (type === 'activeSelection') {
                if (!e.target || !e.target._objects)
                    return;
                var targetObjects = e.target._objects;
                targetObjects === null || targetObjects === void 0 ? void 0 : targetObjects.forEach(function (activeObject) {
                    if (!activeObject.id)
                        throw new Error('Rotated object without id');
                    if (!activeObject.generatedBy)
                        throw new Error('Rotated object without generatedBy');
                    if (activeObject.id && !shouldSerializeEvent(activeObject.id, activeObject.generatedBy))
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
                        originX: 'center',
                        originY: 'center',
                    };
                    var payload = {
                        type: type,
                        target: target,
                        id: activeObject.id || '',
                    };
                    activeIds.push(activeObject.id);
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('rotated', generatedBy, payload);
                });
                var svg = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject().toSVG();
                var payload = {
                    type: type,
                    svg: true,
                    target: { svg: svg },
                    id: userId + ":svg",
                };
                var event_1 = { event: payload, type: 'activeSelection', activeIds: activeIds };
                var filtered = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) {
                    return !o.group;
                });
                var active = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
                undoRedoDispatch({
                    type: SET_GROUP,
                    payload: __spreadArray(__spreadArray([], filtered, true), [active], false),
                    canvasId: userId,
                    event: event_1,
                });
            }
            else {
                var canvasObject = e.target;
                if (!canvasObject.id)
                    throw new Error('Rotated object without id');
                if (!canvasObject.generatedBy)
                    throw new Error('Rotated object without generatedBy');
                if (!shouldSerializeEvent(canvasObject.id, canvasObject.generatedBy))
                    return;
                var id = canvasObject.id;
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
                    var event_2 = { event: payload, type: 'rotated' };
                    undoRedoDispatch({
                        type: SET,
                        payload: canvas.getObjects(),
                        canvasId: userId,
                        event: event_2,
                    });
                }
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('rotated', generatedBy, payload);
            }
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:rotated', objectRotated);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:rotated', objectRotated);
        };
    }, [canvas, eventSerializer, generatedBy, shouldSerializeEvent, undoRedoDispatch, userId]);
};
export default useSynchronizedRotated;
//# sourceMappingURL=useSynchronizedRotated.js.map