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
import { useCallback, useContext, useMemo } from 'react';
import eraseObjectCursor from '../../../assets/cursors/erase-object.png';
import { WhiteboardContext } from '../WhiteboardContext';
import * as shapes from '../shapes/shapes';
import { isFreeDrawing, isShape } from '../utils/shapes';
import { UNDO, REDO, SET } from '../reducers/undo-redo';
import { setSize, setCircleSize, setPathSize } from '../utils/scaling';
import { v4 as uuidv4 } from 'uuid';
export var useCanvasActions = function (canvas, dispatch, canvasId, eventSerializer, userId) {
    var _a = useContext(WhiteboardContext), shapeIsActive = _a.shapeIsActive, updateFontColor = _a.updateFontColor, shape = _a.shape, shapeColor = _a.shapeColor, updatePenColor = _a.updatePenColor, updateShapeColor = _a.updateShapeColor, closeModal = _a.closeModal, penColor = _a.penColor, lineWidth = _a.lineWidth, isLocalObject = _a.isLocalObject;
    /**
     * Adds shape to whiteboard.
     * @param specific Indicates shape type that should be added in whiteboard.
     */
    var shapeSelector = useCallback(function (specific) {
        switch (specific || shape) {
            case 'rectangle':
                return shapes.rectangle(2, 2, penColor, false, lineWidth);
            case 'circle':
                return shapes.circle(2, 2, penColor, false, lineWidth);
            case 'triangle':
                return shapes.triangle(2, 4, penColor, false, lineWidth);
            case 'star':
                return shapes.star(2, 2, penColor, false, lineWidth);
            case 'arrow':
                return shapes.arrow(2, 2, penColor, false, lineWidth);
            case 'chatBubble':
                return shapes.chat(2, 2, penColor, false, lineWidth);
            case 'pentagon':
                return shapes.pentagon(penColor, false, lineWidth);
            case 'hexagon':
                return shapes.hexagon(penColor, false, lineWidth);
            case 'filledRectangle':
                return shapes.rectangle(2, 2, shapeColor, true, 0);
            case 'filledCircle':
                return shapes.circle(2, 2, shapeColor, true, 0);
            case 'filledTriangle':
                return shapes.triangle(2, 4, shapeColor, true, 0);
            case 'filledStar':
                return shapes.star(2, 2, shapeColor, true, 0);
            case 'filledArrow':
                return shapes.arrow(2, 2, shapeColor, true, 0);
            case 'filledChatBubble':
                return shapes.chat(2, 2, shapeColor, true, 0);
            case 'filledPentagon':
                return shapes.pentagon(shapeColor, true, 0);
            case 'filledHexagon':
                return shapes.hexagon(shapeColor, true, 0);
            default:
                return shapes.circle(2, 2, penColor, false, lineWidth);
        }
    }, [lineWidth, penColor, shape, shapeColor]);
    /**
     *
     * @param shape Shape that was added to canvas.
     * @param coordsStart Coordinates of initial click on canvas.
     * @param isCircle Indicates if shape added is a circle.
     */
    var mouseMove = useCallback(function (shape, coordsStart, specific) {
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:move', function (e) {
            if (!e.pointer)
                return;
            canvas.selection = false;
            if (specific === 'filledCircle' || specific === 'circle') {
                setCircleSize(shape, coordsStart, e.pointer);
            }
            else if (specific === 'filledRectangle' ||
                specific === 'filledTriangle' ||
                specific === 'rectangle' ||
                specific === 'triangle') {
                setSize(shape, coordsStart, e.pointer);
            }
            else {
                setPathSize(shape, coordsStart, e.pointer);
            }
            var anchor = __assign(__assign({}, coordsStart), { originX: 'left', originY: 'top' });
            if (e.pointer && coordsStart.x > e.pointer.x) {
                anchor = __assign(__assign({}, anchor), { originX: 'right' });
            }
            if (e.pointer && coordsStart.y > e.pointer.y) {
                anchor = __assign(__assign({}, anchor), { originY: 'bottom' });
            }
            shape.set(anchor);
            canvas.renderAll();
        });
    }, [canvas]);
    var clearOnMouseEvent = useCallback(function () {
        canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:down');
    }, [canvas]);
    /**
     * Clears all mouse event listeners from canvas.
     */
    var clearMouseEvents = useCallback(function () {
        canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:move');
        canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:up');
    }, [canvas]);
    /**
     * Mouse up event listener for canvas.
     */
    var mouseUp = useCallback(function (shape, coordsStart, specific) {
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:up', function (e) {
            if (!e.pointer)
                return;
            var size;
            if (specific === 'filledCircle' || specific === 'circle') {
                size = setCircleSize(shape, coordsStart, e.pointer);
            }
            else if (specific === 'filledRectangle' ||
                specific === 'filledTriangle' ||
                specific === 'rectangle' ||
                specific === 'triangle') {
                size = setSize(shape, coordsStart, e.pointer);
            }
            else {
                size = setPathSize(shape, coordsStart, e.pointer);
            }
            if (size.width <= 2 && size.height <= 2) {
                canvas.remove(shape);
            }
            else {
                shape.setCoords();
                canvas.renderAll();
                dispatch({ type: 'CANVAS_SET', payload: canvas.getObjects() });
            }
        });
    }, [canvas, dispatch]);
    /**
     * Mouse down event listener for canvas.
     * @param shape Shape being added on canvas.
     * @param isCircle Indicates if shape is a circle.
     */
    var mouseDown = useCallback(function (specific, color) {
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:down', function (e) {
            if (e.target || !e.pointer) {
                return;
            }
            var shape = shapeSelector(specific);
            if (e.pointer) {
                shape.set({
                    top: e.pointer.y,
                    left: e.pointer.x,
                    shapeType: 'shape',
                    name: specific,
                    strokeUniform: true,
                });
            }
            // fill and type properties just can be resetted if is an filled shape
            if (shape.fill !== 'transparent') {
                shape.set({
                    shapeType: 'filledShape',
                    fill: color || shapeColor,
                });
            }
            clearOnMouseEvent();
            mouseMove(shape, e.pointer, specific);
            mouseUp(shape, e.pointer, specific);
            canvas.add(shape);
        });
    }, [canvas, clearOnMouseEvent, mouseMove, mouseUp, shapeColor, shapeSelector]);
    /**
     * Add specific shape to whiteboard
     * */
    var addShape = useCallback(function (shapeToAdd) {
        // Required to prevent multiple shapes add at once
        // if user clicked more than one shape during selection.
        if (!shapeIsActive) {
            return;
        }
        var resize = false;
        var startPoint;
        var shape;
        /**
         * Set the new size of a recently created shape
         * @param {TypedShape} shape - Shape to change its size
         * @param {IEvent} e - Current event, necessary to know
         * where is the pointer
         */
        var setShapeSize = function (shape, e) {
            if (!e.pointer)
                return;
            if (shapeToAdd === 'circle') {
                return setCircleSize(shape, startPoint, e.pointer);
            }
            else if (shapeToAdd === 'rectangle' || shapeToAdd === 'triangle') {
                return setSize(shape, startPoint, e.pointer);
            }
            else {
                return setPathSize(shape, startPoint, e.pointer);
            }
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:down', function (e) {
            if (e.target || resize) {
                return;
            }
            shape = shapeSelector(shapeToAdd);
            if (e.pointer) {
                shape.set({
                    top: e.pointer.y,
                    left: e.pointer.x,
                    shapeType: 'shape',
                    name: shapeToAdd,
                    strokeUniform: true,
                });
                startPoint = e.pointer;
            }
            canvas.add(shape);
            resize = true;
        });
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:move', function (e) {
            if (!shapeToAdd || !shape || !resize) {
                return;
            }
            canvas.selection = false;
            setShapeSize(shape, e);
            var anchor = __assign(__assign({}, startPoint), { originX: 'left', originY: 'top' });
            if (startPoint && e.pointer && startPoint.x > e.pointer.x) {
                anchor = __assign(__assign({}, anchor), { originX: 'right' });
            }
            if (startPoint && e.pointer && startPoint.y > e.pointer.y) {
                anchor = __assign(__assign({}, anchor), { originY: 'bottom' });
            }
            shape.set(anchor);
            canvas.renderAll();
        });
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:up', function (e) {
            if (!shape || !resize) {
                return;
            }
            var size = setShapeSize(shape, e);
            var id = userId + ":" + uuidv4();
            resize = false;
            if (size && size.width <= 2 && size.height <= 2) {
                canvas.remove(shape);
            }
            else {
                shape.set({ id: id });
                shape.setCoords();
                canvas.setActiveObject(shape);
                canvas.renderAll();
                var type = shape.type;
                var payload = {};
                var target_1 = {
                    type: type,
                    id: id,
                };
                var requiredProps = [
                    'id',
                    'height',
                    'width',
                    'left',
                    'top',
                    'strokeWidth',
                    'stroke',
                    'fill',
                    'name',
                    'scaleX',
                    'scaleY',
                    'strokeUniform',
                    'originX',
                    'originY',
                ];
                var requiredEllipseProps = [
                    'id',
                    'ry',
                    'rx',
                    'left',
                    'top',
                    'strokeWidth',
                    'stroke',
                    'fill',
                    'strokeUniform',
                    'originY',
                    'originX',
                ];
                if (type !== 'ellipse') {
                    requiredProps.forEach(function (prop) {
                        var _a;
                        if (shape && shape[prop]) {
                            target_1 = __assign(__assign({}, target_1), (_a = {}, _a[prop] = shape[prop], _a));
                        }
                    });
                    payload = {
                        type: type,
                        target: target_1,
                        id: id,
                    };
                }
                else {
                    requiredEllipseProps.forEach(function (prop) {
                        var _a;
                        if (shape && shape[prop]) {
                            target_1 = __assign(__assign({}, target_1), (_a = {}, _a[prop] = shape[prop], _a));
                        }
                    });
                    payload = {
                        type: type,
                        target: target_1,
                        id: id,
                    };
                }
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', payload);
                var event_1 = { event: payload, type: 'added' };
                dispatch({
                    type: SET,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                    event: event_1,
                });
            }
        });
    }, [canvas, shapeIsActive, shapeSelector, eventSerializer, userId, dispatch]);
    /**
     * Changes the penColor value and if one or more objects are selected
     * also changes the stroke color in free drawing and empty shape objects
     * @param {string} color - new color to change
     */
    var changeStrokeColor = useCallback(function (color) {
        updatePenColor(color);
        var activeObjects = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObjects();
        if (!activeObjects)
            return;
        activeObjects.forEach(function (object) {
            if ((isShape(object) && object.shapeType === 'shape') ||
                isFreeDrawing(object)) {
                object.set('stroke', color);
            }
        });
        canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
    }, [canvas, updatePenColor]);
    /**
     * Add specific color to selected shape
     * */
    var fillColor = useCallback(function (color) {
        updateShapeColor(color);
        clearOnMouseEvent();
        clearMouseEvents();
        mouseDown(shape, color);
        if ((canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject()) &&
            canvas.getActiveObject().fill !== 'transparent') {
            canvas.getActiveObject().set('fill', color);
            canvas.renderAll();
            // TODO: Handle Undo/Redo dispatch.
            dispatch({ type: SET, payload: canvas.getObjects() });
        }
    }, [
        canvas,
        clearMouseEvents,
        clearOnMouseEvent,
        mouseDown,
        shape,
        updateShapeColor,
        dispatch,
    ]);
    /**
     * Add specific color to selected text or group of texts
     * @param {string} color - color to set
     */
    var textColor = useCallback(function (color) {
        updateFontColor(color);
        if ((canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject()) &&
            canvas.getActiveObject().text) {
            canvas.getActiveObject().set('fill', color);
            canvas.renderAll();
            var object = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
            var payload = {
                type: 'textbox',
                target: { fill: color },
                id: object.id,
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('fontColorChanged', payload);
            return;
        }
        canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().forEach(function (obj) {
            if (obj.id) {
                var type = obj.get('type');
                if (type === 'textbox') {
                    var target = function (type) {
                        if (type === 'textbox') {
                            return {
                                fill: color,
                            };
                        }
                    };
                    obj.set({
                        fill: color,
                    });
                    var payload = {
                        type: type,
                        target: target(type),
                        id: obj.id,
                    };
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('fontColorChanged', payload);
                }
            }
        });
    }, [canvas, updateFontColor, eventSerializer]);
    /**
     * Clears all whiteboard elements
     * */
    var clearWhiteboardClearAll = useCallback(function () {
        canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().forEach(function (obj) {
            if (obj.id) {
                var target = {
                    id: obj.id,
                    target: {
                        strategy: 'allowClearAll',
                    },
                };
                obj.set({ groupClear: true });
                canvas === null || canvas === void 0 ? void 0 : canvas.remove(obj);
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', target);
            }
        });
        // Add cleared whiteboard to undo / redo state.
        var event = { event: [], type: 'clearedWhiteboard' };
        dispatch({
            type: SET,
            payload: [],
            canvasId: userId,
            event: event,
        });
    }, [canvas, eventSerializer, dispatch, userId]);
    /**
     * Clears all whiteboard elements
     * */
    var clearWhiteboardClearMySelf = useCallback(function () {
        canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().forEach(function (obj) {
            if (obj.id && isLocalObject(obj.id, userId)) {
                var target = {
                    id: obj.id,
                    target: {
                        strategy: 'allowClearMyself',
                    },
                };
                obj.set({ groupClear: true });
                canvas === null || canvas === void 0 ? void 0 : canvas.remove(obj);
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', target);
            }
        });
        closeModal();
        // Add cleared whiteboard to undo / redo state.
        var event = { event: [], type: 'clearedWhiteboard' };
        dispatch({
            type: SET,
            payload: [],
            canvasId: userId,
            event: event,
        });
        // If isLocalObject is added in dependencies an infinity loop happens
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvas, closeModal, canvasId, eventSerializer]);
    /**
     * Clears all whiteboard with allowClearOthers strategy
     * */
    var clearWhiteboardAllowClearOthers = useCallback(function (userId) {
        canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().forEach(function (obj) {
            if (obj.id) {
                var object = obj.id.split(':');
                if (!object.length) {
                    throw new Error('Invalid ID');
                }
                if (object[0] === userId) {
                    canvas === null || canvas === void 0 ? void 0 : canvas.remove(obj);
                }
                var target = {
                    id: obj.id,
                    target: {
                        strategy: 'allowClearOthers',
                        userId: userId,
                    },
                };
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', target);
            }
        });
    }, [canvas, eventSerializer]);
    /**
     * Set Canvas Whiteboard selection ability
     * @param {boolean} selection - value to set in canvas and objects selection
     */
    var setCanvasSelection = useCallback(function (selection) {
        if (canvas) {
            canvas.selection = selection;
            // canvas.forEachObject((object: fabric.Object) => {
            // @ts-ignore
            // if (isLocalObject(object.id, userId)) {
            //   object.set({
            //     selectable: selection,
            //   });
            // }
            // });
            canvas.renderAll();
        }
    }, [canvas]);
    /**
     * Set the cursor to be showed when a object hover happens
     * @param {string} cursor - Cursor name to show
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var setHoverCursorObjects = useCallback(function (cursor) {
        if (canvas) {
            canvas.forEachObject(function (object) {
                object.hoverCursor = cursor;
            });
            canvas.renderAll();
        }
    }, [canvas]);
    /**
     * Creates the listeners to erase objects from the whiteboard
     */
    var eraseObject = useCallback(function () {
        var eraser = false;
        var activeObjects = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObjects();
        canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().forEach(function (object) {
            if ((object.id && isLocalObject(object.id, userId)) ||
                !object.id) {
                object.set({
                    evented: true,
                    hoverCursor: "url(\"" + eraseObjectCursor + "\"), auto",
                });
            }
            else if (object.id) {
                object.set({
                    hoverCursor: 'default',
                });
            }
        });
        if ((activeObjects === null || activeObjects === void 0 ? void 0 : activeObjects.length) && activeObjects.length > 1) {
            canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject().set({
                hoverCursor: "url(\"" + eraseObjectCursor + "\"), auto",
            });
        }
        // When mouse down eraser is able to remove objects
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:down', function (e) {
            var _a;
            if (eraser) {
                return false;
            }
            canvas.defaultCursor = "url(\"" + eraseObjectCursor + "\"), auto";
            eraser = true;
            // if the click is made over an object
            if (e.target &&
                !e.target._objects &&
                ((e.target.id && isLocalObject(e.target.id, userId)) ||
                    !e.target.id)) {
                canvas.remove(e.target);
                canvas.renderAll();
            }
            // if the click is made over an object group
            if ((_a = e.target) === null || _a === void 0 ? void 0 : _a._objects) {
                e.target._objects.forEach(function (object) {
                    canvas.remove(object);
                });
                canvas.discardActiveObject();
                canvas.renderAll();
            }
        });
        // When mouse is over an object
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:over', function (e) {
            if (!eraser) {
                return false;
            }
            if ((e.target &&
                e.target.id &&
                isLocalObject(e.target.id, userId)) ||
                (e.target && !e.target.id)) {
                canvas.remove(e.target);
                canvas.renderAll();
            }
        });
        // When mouse up eraser is unable to remove objects
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:up', function () {
            if (!eraser) {
                return false;
            }
            canvas.defaultCursor = 'default';
            eraser = false;
        });
        // If isLocalObject is added in dependencies an infinity loop happens
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvas, canvasId]);
    /**
     * Deselect the actual selected object
     */
    var discardActiveObject = useCallback(function () {
        canvas === null || canvas === void 0 ? void 0 : canvas.discardActiveObject().renderAll();
    }, [canvas]);
    var undo = useCallback(function () {
        dispatch({ type: UNDO, canvasId: canvasId });
    }, [dispatch, canvasId]);
    var redo = useCallback(function () {
        dispatch({ type: REDO, canvasId: canvasId });
    }, [dispatch, canvasId]);
    var state = useMemo(function () {
        var actions = {
            fillColor: fillColor,
            changeStrokeColor: changeStrokeColor,
            textColor: textColor,
            clearWhiteboardClearAll: clearWhiteboardClearAll,
            discardActiveObject: discardActiveObject,
            addShape: addShape,
            eraseObject: eraseObject,
            setCanvasSelection: setCanvasSelection,
            setHoverCursorObjects: setHoverCursorObjects,
            undo: undo,
            redo: redo,
            clearWhiteboardAllowClearOthers: clearWhiteboardAllowClearOthers,
            clearWhiteboardClearMySelf: clearWhiteboardClearMySelf,
        };
        return { actions: actions, mouseDown: mouseDown };
    }, [
        addShape,
        changeStrokeColor,
        clearWhiteboardClearAll,
        discardActiveObject,
        eraseObject,
        fillColor,
        mouseDown,
        setCanvasSelection,
        setHoverCursorObjects,
        textColor,
        undo,
        redo,
        clearWhiteboardAllowClearOthers,
        clearWhiteboardClearMySelf,
    ]);
    return state;
};
//# sourceMappingURL=useCanvasActions.js.map