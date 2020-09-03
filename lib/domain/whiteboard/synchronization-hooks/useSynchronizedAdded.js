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
import { useEffect, useContext } from 'react';
import { PainterEvents } from '../event-serializer/PainterEvents';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
import { SET, SET_OTHER } from '../reducers/undo-redo';
import { chat, star, arrow, hexagon, pentagon } from '../shapes/shapes';
import { DEFAULT_VALUES } from '../../../config/toolbar-default-values';
import { WhiteboardContext } from '../WhiteboardContext';
var useSynchronizedAdded = function (canvas, userId, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var floodFillIsActive = useContext(WhiteboardContext).floodFillIsActive;
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle path:created event. */
    useEffect(function () {
        var pathCreated = function (e) {
            if (!e.path) {
                return;
            }
            e.path.id = PainterEvents.createId(userId);
            // if (!shouldSerializeEvent(e.path.id)) return;
            var target = {
                stroke: e.path.stroke,
                strokeWidth: e.path.strokeWidth,
                path: e.path.path,
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', PainterEvents.pathCreated(target, e.path.id, userId));
            var stateTarget = __assign(__assign({}, target), { top: e.path.top, left: e.path.left });
            if (canvas) {
                var event_1 = {
                    event: {
                        id: e.path.id,
                        target: stateTarget,
                        type: 'path',
                    },
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
        canvas === null || canvas === void 0 ? void 0 : canvas.on('path:created', pathCreated);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('path:created', pathCreated);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
    /** Register and handle object:added event. */
    useEffect(function () {
        var objectAdded = function (e) {
            var _a, _b, _c;
            if (!((_a = e.target) === null || _a === void 0 ? void 0 : _a.id))
                return;
            if (e.target.fromJSON)
                return;
            if (!shouldSerializeEvent(e.target.id))
                return;
            var type = (e.target.get('type') || 'path');
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
                target: __assign(__assign({}, target), { top: e.target.top, left: e.target.left }),
                id: e.target.id,
            };
            if (canvas && ((_c = (_b = payload.target) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.trim().length)) {
                var event_2 = { event: payload, type: 'added' };
                undoRedoDispatch({
                    type: SET,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                    event: event_2,
                });
            }
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', payload);
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:added', objectAdded);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:added', objectAdded);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
    /**
     * Generates a new shape based on shape name.
     * @param target Object data.
     */
    var generateGenericShape = function (target) {
        switch (target.name) {
            case 'chatBubble': {
                return chat(target.width, target.height, target.stroke, target.filled, target.strokeWidth);
            }
            case 'star': {
                return star(target.width, target.height, target.stroke, target.filled, target.strokeWidth);
            }
            case 'hexagon': {
                return hexagon(target.stroke, target.filled, target.strokeWidth);
            }
            case 'pentagon': {
                return pentagon(target.stroke, target.filled, target.strokeWidth);
            }
            default: {
                return arrow(target.width, target.height, target.stroke, target.filled, target.strokeWidth);
            }
        }
    };
    /** Register and handle remote added event. */
    useEffect(function () {
        var added = function (id, objectType, target) {
            // TODO: We'll want to filter events based on the user ID. This can
            // be done like this. Example of extracting user id from object ID:
            // let { user } = new ShapeID(id);
            // Help!
            // if (eventSerializer?.didSerializeEvent(id)) return;
            // TODO: We'll have to replace this with the user based filtering. Because
            // we want to allow bi-directional events (Teacher <-> Student) as opposed
            // to (Teacher --> Student).
            // Events come from another user
            // Pass as props to user context
            // Ids of shapes + userId  uuid()
            if (!shouldHandleRemoteEvent(id))
                return;
            if (objectType === 'textbox') {
                var text = new fabric.Textbox(target.text || '', {
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
                text.id = id;
                canvas === null || canvas === void 0 ? void 0 : canvas.add(text);
                undoRedoDispatch({
                    type: SET_OTHER,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                });
                return;
            }
            var shape = null;
            if (objectType === 'path' && !target.name) {
                var pencil = new fabric.PencilBrush();
                pencil.color = target.stroke || '#000';
                pencil.width = target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH;
                // Convert Points to SVG Path
                var res = pencil.createPath(target.path || '');
                res.id = id;
                res.selectable = false;
                res.evented = false;
                res.strokeUniform = true;
                canvas === null || canvas === void 0 ? void 0 : canvas.add(res);
                canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
            }
            else if ((objectType === 'path' || objectType === 'polygon') &&
                target.name) {
                shape = generateGenericShape(target);
            }
            if (objectType === 'rect') {
                shape = new fabric.Rect();
            }
            if (objectType === 'triangle') {
                shape = new fabric.Triangle();
            }
            if (objectType === 'ellipse') {
                shape = new fabric.Ellipse();
            }
            if (shape) {
                target = __assign(__assign({}, target), { selectable: false, evented: floodFillIsActive, hoverCursor: floodFillIsActive ? 'not-allowed' : 'move' });
                shape.set(target);
                canvas === null || canvas === void 0 ? void 0 : canvas.add(shape);
                canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
            }
            undoRedoDispatch({
                type: SET_OTHER,
                payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                canvasId: userId,
            });
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('added', added);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('added', added);
        };
    }, [
        canvas,
        eventController,
        floodFillIsActive,
        shouldHandleRemoteEvent,
        undoRedoDispatch,
        userId,
    ]);
};
export default useSynchronizedAdded;
//# sourceMappingURL=useSynchronizedAdded.js.map