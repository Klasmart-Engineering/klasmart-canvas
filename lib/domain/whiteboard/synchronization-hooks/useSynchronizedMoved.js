var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { useCallback, useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { SET, SET_OTHER, SET_GROUP } from '../reducers/undo-redo';
var useSynchronizedMoved = function (canvas, userId, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    var moveSelectedObject = useCallback(function (type, e) {
        if (!e.target ||
            !e.target.id ||
            (e.target.id && !shouldSerializeEvent(e.target.id)))
            return;
        var target = {
            angle: e.target.angle,
            top: e.target.top,
            left: e.target.left,
            scaleX: e.target.scaleX,
            scaleY: e.target.scaleY,
            flipX: e.target.flipX,
            flipY: e.target.flipY,
            originX: e.target.originX,
            originY: e.target.originY,
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
        eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('moved', payload);
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
    var moveSelectedGroup = useCallback(function (type, e) {
        var activeIds = [];
        if (!e.target || !e.target._objects)
            return;
        e.target._objects.forEach(function (activeObject) {
            if (!shouldSerializeEvent(activeObject.id))
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
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('moved', payload);
        });
        var payload = {
            type: type,
            svg: true,
            target: null,
            id: userId + ":group",
        };
        var event = { event: payload, type: 'activeSelection', activeIds: activeIds };
        var filtered = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) {
            return !o.group;
        });
        var active = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
        active === null || active === void 0 ? void 0 : active.set({ id: userId + ":group" });
        undoRedoDispatch({
            type: SET_GROUP,
            payload: __spreadArrays(filtered, [active]),
            canvasId: userId,
            event: event,
        });
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
    /** Register and handle object:moved event. */
    useEffect(function () {
        var objectMoved = function (e) {
            if (!e.target)
                return;
            var type = (e.target.get('type') || 'path');
            if (type === 'activeSelection') {
                moveSelectedGroup(type, e);
            }
            else {
                moveSelectedObject(type, e);
            }
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:moved', objectMoved);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:moved', objectMoved);
        };
    }, [canvas, eventSerializer, moveSelectedGroup, moveSelectedObject]);
    /** Register and handle remote moved event. */
    useEffect(function () {
        var moved = function (id, objectType, target) {
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
                            angle: target.angle || 0,
                            top: target.top,
                            left: target.left,
                            scaleX: target.scaleX || 1,
                            scaleY: target.scaleY || 1,
                            flipX: target.flipX || false,
                            flipY: target.flipY || false,
                            originX: target.originX || 'left',
                            originY: target.originY || 'top',
                        });
                        obj.setCoords();
                        undoRedoDispatch({
                            type: SET_OTHER,
                            payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                            canvasId: userId
                        });
                    }
                }
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('moved', moved);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('moved', moved);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent, undoRedoDispatch, userId]);
};
export default useSynchronizedMoved;
//# sourceMappingURL=useSynchronizedMoved.js.map