var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useCallback, useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { SET, SET_OTHER, SET_GROUP } from '../reducers/undo-redo';
var useSynchronizedMoved = function (canvas, userId, generatedBy, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    var moveSelectedObject = useCallback(function (type, e) {
        if (!e.target)
            return;
        var canvasObject = e.target;
        if (!canvasObject.id)
            throw new Error('Moved target without id.');
        if (!canvasObject.generatedBy)
            throw new Error('Moved target without generatedBy.');
        if (!shouldSerializeEvent(canvasObject.id, canvasObject.generatedBy))
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
            id: canvasObject.id,
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
        eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('moved', generatedBy, payload);
    }, [canvas, eventSerializer, generatedBy, shouldSerializeEvent, undoRedoDispatch, userId]);
    var moveSelectedGroup = useCallback(function (type, e) {
        var activeIds = [];
        if (!e.target || !e.target._objects)
            return;
        e.target._objects.forEach(function (activeObject) {
            if (!activeObject.id)
                throw new Error('Moved target without id.');
            if (!activeObject.generatedBy)
                throw new Error('Moved target without generatedBy.');
            if (!shouldSerializeEvent(activeObject.id, activeObject.generatedBy))
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
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('moved', generatedBy, payload);
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
            payload: __spreadArray(__spreadArray([], filtered, true), [active], false),
            canvasId: userId,
            event: event,
        });
    }, [canvas, eventSerializer, generatedBy, shouldSerializeEvent, undoRedoDispatch, userId]);
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
        var moved = function (id, generatedBy, objectType, target) {
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
                            angle: target.angle || 0,
                            top: target.top,
                            left: target.left,
                            scaleX: target.scaleX || 1,
                            scaleY: target.scaleY || 1,
                            flipX: target.flipX || false,
                            flipY: target.flipY || false,
                            originX: target.originX || 'left',
                            originY: target.originY || 'top',
                            generatedBy: generatedBy
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