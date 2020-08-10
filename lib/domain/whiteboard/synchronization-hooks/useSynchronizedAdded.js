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
import { PainterEvents } from '../event-serializer/PainterEvents';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { SET, SET_OTHER } from '../reducers/undo-redo';
var useSynchronizedAdded = function (canvas, userId, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle path:created event. */
    useEffect(function () {
        var _a;
        var pathCreated = function (e) {
            var _a;
            e.path.id = PainterEvents.createId(userId);
            if (!shouldSerializeEvent(e.path.id))
                return;
            var target = {
                stroke: e.path.stroke,
                strokeWidth: e.path.strokeWidth,
                path: e.path.path,
            };
            (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('added', PainterEvents.pathCreated(target, e.path.id, userId));
            if (canvas) {
                var event_1 = {
                    event: PainterEvents.pathCreated(target, e.path.id, userId),
                    type: 'added',
                };
                undoRedoDispatch({
                    type: SET,
                    payload: canvas.getObjects(),
                    canvasId: userId,
                    event: event_1,
                });
            }
        };
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('path:created', pathCreated);
        return function () {
            var _a;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('path:created', pathCreated);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
    /** Register and handle object:added event. */
    useEffect(function () {
        var _a;
        var objectAdded = function (e) {
            var _a;
            if (!e.target.id)
                return;
            if (!shouldSerializeEvent(e.target.id))
                return;
            var type = e.target.get('type');
            if (type === 'path') {
                return;
            }
            var target = __assign({}, (type === 'textbox' && {
                text: e.target.text,
                fontFamily: e.target.fontFamily,
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
            if (canvas) {
                var event_2 = { event: payload, type: 'added' };
                undoRedoDispatch({
                    type: SET,
                    payload: canvas.getObjects(),
                    canvasId: userId,
                    event: event_2,
                });
            }
            (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('added', payload);
        };
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('object:added', objectAdded);
        return function () {
            var _a;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('object:added', objectAdded);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
    /** Register and handle remote added event. */
    useEffect(function () {
        var _a;
        var added = function (id, objectType, target) {
            // TODO: We'll want to filter events based on the user ID. This can
            // be done like this. Example of extracting user id from object ID:
            // let { user } = new ShapeID(id);
            // Help!
            // if (eventSerializer?.didSerializeEvent(id)) return;
            var _a, _b, _c;
            // TODO: We'll have to replace this with the user based filtering. Because
            // we want to allow bi-directional events (Teacher <-> Student) as opposed
            // to (Teacher --> Student).
            // Events come from another user
            // Pass as props to user context
            // Ids of shapes + userId  uuid()
            if (!shouldHandleRemoteEvent(id))
                return;
            if (objectType === 'textbox') {
                var text = new fabric.Textbox(target.text, {
                    fontSize: 30,
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontFamily: target.fontFamily,
                    fill: target.stroke,
                    top: target.top,
                    left: target.left,
                    width: target.width,
                    selectable: false,
                });
                // @ts-ignore
                text.id = id;
                (_a = canvas) === null || _a === void 0 ? void 0 : _a.add(text);
                return;
            }
            if (objectType === 'path') {
                var pencil = new fabric.PencilBrush();
                pencil.color = target.stroke || '#000';
                pencil.width = target.strokeWidth;
                // Convert Points to SVG Path
                var res = pencil.createPath(target.path);
                // @ts-ignore
                res.id = id;
                res.selectable = false;
                res.evented = false;
                (_b = canvas) === null || _b === void 0 ? void 0 : _b.add(res);
                undoRedoDispatch({
                    type: SET_OTHER,
                    payload: (_c = canvas) === null || _c === void 0 ? void 0 : _c.getObjects(),
                    canvasId: userId,
                });
            }
        };
        (_a = eventController) === null || _a === void 0 ? void 0 : _a.on('added', added);
        return function () {
            var _a;
            (_a = eventController) === null || _a === void 0 ? void 0 : _a.removeListener('added', added);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent, undoRedoDispatch, userId]);
};
export default useSynchronizedAdded;
//# sourceMappingURL=useSynchronizedAdded.js.map