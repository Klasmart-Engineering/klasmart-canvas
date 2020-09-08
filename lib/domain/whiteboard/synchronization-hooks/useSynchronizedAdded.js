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
var useSynchronizedAdded = function (canvas, userId, generatedBy, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var floodFillIsActive = useContext(WhiteboardContext).floodFillIsActive;
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle path:created event. */
    useEffect(function () {
        var pathCreated = function (e) {
            if (!e.path)
                throw new Error("path:created event without path.");
            // NOTE: This object already have an ID, so it's not a newly created object. The object
            // create event shouldn't be serialized and sent because it was created because of
            // an incoming event from someone else.
            if (e.path.id)
                return;
            PainterEvents.generateAndSetIdForTarget(userId, generatedBy, e.path);
            if (!e.path.id)
                throw new Error("path doesn't have any ID");
            var target = {
                stroke: e.path.stroke,
                strokeWidth: e.path.strokeWidth,
                path: e.path.path,
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', generatedBy, PainterEvents.pathCreated(target, e.path.id, userId));
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
        if (canvas) {
            canvas.on('path:created', pathCreated);
            return function () {
                canvas.off('path:created', pathCreated);
            };
        }
    }, [canvas, eventSerializer, generatedBy, shouldSerializeEvent, undoRedoDispatch, userId]);
    /** Register and handle object:added event. */
    useEffect(function () {
        var objectAdded = function (e) {
            var _a, _b;
            if (!e.target)
                throw new Error("object:added without any target");
            if (e.target.fromJSON)
                return;
            var type = (e.target.get('type') || 'path');
            // NOTE: Path events is handled separately by the 'path:created' handler.
            if (type === 'path')
                return;
            // NOTE: This object already have an ID, so it's not a newly created object. The object
            // create event shouldn't be serialized and sent because it was created because of
            // an incoming event from someone else.
            if (e.target.id)
                return;
            PainterEvents.generateAndSetIdForTarget(userId, generatedBy, e.target);
            if (!e.target.id)
                throw new Error("object doesn't have any ID");
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
            if (canvas && ((_b = (_a = payload.target) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.trim().length)) {
                var event_2 = { event: payload, type: 'added' };
                undoRedoDispatch({
                    type: SET,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                    event: event_2,
                });
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', generatedBy, payload);
            }
        };
        if (canvas) {
            canvas.on('object:added', objectAdded);
            return function () {
                canvas.off('object:added', objectAdded);
            };
        }
    }, [canvas, eventSerializer, generatedBy, shouldSerializeEvent, undoRedoDispatch, userId]);
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
        var added = function (id, generatedBy, objectType, target) {
            // Events come from another user
            // Pass as props to user context
            // Ids of shapes + userId  uuid()
            if (!shouldHandleRemoteEvent(id, generatedBy))
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
                var canvasObject = text;
                canvasObject.set({
                    id: id,
                    generatedBy: generatedBy
                });
                canvas === null || canvas === void 0 ? void 0 : canvas.add(canvasObject);
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
                var canvasObject = res;
                canvasObject.set({
                    id: id,
                    selectable: false,
                    evented: false,
                    strokeUniform: true,
                    generatedBy: generatedBy,
                });
                canvas === null || canvas === void 0 ? void 0 : canvas.add(canvasObject);
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
                target = __assign(__assign({}, target), { id: id, selectable: false, evented: floodFillIsActive, hoverCursor: floodFillIsActive ? 'not-allowed' : 'move', generatedBy: generatedBy });
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