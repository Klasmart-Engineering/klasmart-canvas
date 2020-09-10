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
import { PainterEvents } from '../event-serializer/PainterEvents';
export var useCanvasActions = function (userId, canvasId, generatedBy, canvas, dispatch, eventSerializer) {
    var _a = useContext(WhiteboardContext), permissions = _a.permissions, shapeIsActive = _a.shapeIsActive, updateFontColor = _a.updateFontColor, shape = _a.shape, shapeColor = _a.shapeColor, updatePenColor = _a.updatePenColor, updateShapeColor = _a.updateShapeColor, penColor = _a.penColor, lineWidth = _a.lineWidth, updateClearIsActive = _a.updateClearIsActive;
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
            var canvasObject = shape;
            canvasObject.set(anchor);
            canvasObject.set({ generatedBy: generatedBy });
            canvas.renderAll();
        });
    }, [canvas, generatedBy]);
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
            var canvasObject = shape;
            canvasObject.set({ generatedBy: generatedBy });
            if (size.width <= 2 && size.height <= 2) {
                canvas.remove(canvasObject);
            }
            else {
                canvasObject.setCoords();
                canvas.renderAll();
                dispatch({ type: 'CANVAS_SET', payload: canvas.getObjects() });
            }
        });
    }, [canvas, dispatch, generatedBy]);
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
            var canvasObject = shape;
            canvasObject.set({
                generatedBy: generatedBy
            });
            clearOnMouseEvent();
            mouseMove(shape, e.pointer, specific);
            mouseUp(shape, e.pointer, specific);
            canvas.add(canvasObject);
        });
    }, [canvas, clearOnMouseEvent, generatedBy, mouseMove, mouseUp, shapeColor, shapeSelector]);
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
        /**
         * Removes the recent created shape and set resize variable in false
         */
        var cancelShapeCreation = function () {
            if (resize) {
                canvas === null || canvas === void 0 ? void 0 : canvas.remove(shape);
                resize = false;
            }
        };
        /**
         * Return the movement hability in the current target shape
         * @param {IEvent} event - current event, necessary to know
         * which is the current target shape
         */
        var allowMovementInShape = function (event) {
            if (event.target) {
                event.target.set({
                    lockMovementX: false,
                    lockMovementY: false,
                });
            }
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:down', function (e) {
            if (resize) {
                return;
            }
            // Locking movement to avoid shapes moving
            if (e.target) {
                e.target.set({
                    lockMovementX: true,
                    lockMovementY: true,
                });
            }
            shape = shapeSelector(shapeToAdd);
            var canvasObject = shape;
            canvasObject.set({ generatedBy: generatedBy });
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
            canvas.add(canvasObject);
            resize = true;
            /*
              Canceling shapes creation in object:scaling
              and object:rotating events
            */
            canvas.on({
                'object:scaling': cancelShapeCreation,
                'object:rotating': cancelShapeCreation,
            });
            /*
              When the shape was resized or rotated
              the shape's movement is allowed
            */
            canvas.on({
                'object:scaled': allowMovementInShape,
                'object:rotated': allowMovementInShape,
            });
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
                /*
                  Setting the recent created shape like evented
                  to can be resized and rotated
                */
                shape.set({
                    evented: true,
                    hoverCursor: 'default',
                });
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
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', generatedBy, payload);
                var event_1 = { event: payload, type: 'added' };
                dispatch({
                    type: SET,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                    event: event_1,
                });
            }
        });
    }, [shapeIsActive, canvas, shapeSelector, generatedBy, userId, eventSerializer, dispatch]);
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
            var canvasObject = object;
            canvasObject.set({ generatedBy: generatedBy });
            if ((isShape(object) && object.shapeType === 'shape') ||
                isFreeDrawing(object)) {
                object.set('stroke', color);
            }
        });
        canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
    }, [canvas, generatedBy, updatePenColor]);
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
            var canvasObject = canvas.getActiveObject();
            canvasObject.set({ generatedBy: generatedBy });
            canvasObject.set('fill', color);
            canvas.renderAll();
            // TODO: Handle Undo/Redo dispatch.
            dispatch({ type: SET, payload: canvas.getObjects() });
        }
    }, [updateShapeColor, clearOnMouseEvent, clearMouseEvents, mouseDown, shape, canvas, generatedBy, dispatch]);
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
            object.set({ generatedBy: generatedBy });
            if (!object.isEditing) {
                var payload = {
                    type: 'textbox',
                    target: { fill: color },
                    id: object.id,
                };
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('fontColorChanged', generatedBy, payload);
            }
            return;
        }
        canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObjects().forEach(function (obj) {
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
                        generatedBy: generatedBy,
                    });
                    var payload = {
                        type: type,
                        target: target(type),
                        id: obj.id,
                    };
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('fontColorChanged', generatedBy, payload);
                }
            }
        });
    }, [updateFontColor, canvas, generatedBy, eventSerializer]);
    /**
     * Clear shapes from the canvas.
     * @param filterUsers: Only remove shapes created by users listed in the filter array. If the filter array
     * is undefined all shapes will be cleared regardless of who created them.
     */
    var clear = useCallback(function (filterUsers) {
        if (!canvas)
            throw new Error("Can't clear beacause canvas is undefined.");
        if (filterUsers === undefined && !permissions.allowClearAll)
            throw new Error('Insufficient permissions: Not allowed to clear all canvas shapes.');
        // IMPORTANT: The ID's in filterUsers and ID's in userId might contain group as well
        // in the format of {userId}:{group}. In these permission checks and object selection
        // the group shouldn't matter. So the PainterEvents.getUserId is used to extract the
        // userId without group part.
        var myUserId = PainterEvents.getUserId(userId);
        if (filterUsers) {
            if ((filterUsers.includes(myUserId) || filterUsers.includes(userId)) && !permissions.allowClearMyself)
                throw new Error('Insufficient permissions: Not allowed to clear own shapes.');
            if (filterUsers.find(function (id) { return PainterEvents.getUserId(id) !== myUserId; }) !== undefined && !permissions.allowClearOthers)
                throw new Error('Insufficient permissions: Not allowed to clear other shapes.');
        }
        else {
            if (!permissions.allowClearAll)
                throw new Error('Insufficient permissions: Not allowed to clear all canvas shapes.');
        }
        // TODO: Is the 'clearIsActive' necessary?
        updateClearIsActive(true);
        var removeObjects = canvas.getObjects().filter(function (obj) {
            if (obj.id === undefined)
                return false;
            if (filterUsers === undefined)
                return true;
            var objectId = obj.id;
            var filter = filterUsers.find(function (userId) {
                return PainterEvents.isCreatedWithId(objectId, userId);
            }) !== undefined;
            return filter;
        });
        removeObjects.forEach(function (obj) {
            obj.set({ groupClear: true, generatedBy: generatedBy });
        });
        canvas.remove.apply(canvas, removeObjects);
        var event = { event: [], type: 'clearedWhiteboard' };
        dispatch({
            type: SET,
            payload: [],
            canvasId: userId,
            event: event,
        });
        updateClearIsActive(false);
    }, [canvas, dispatch, generatedBy, permissions.allowClearAll, permissions.allowClearMyself, permissions.allowClearOthers, updateClearIsActive, userId]);
    var clearSelf = useCallback(function () {
        clear([userId]);
    }, [clear, userId]);
    /**
     * Set Canvas Whiteboard selection ability
     * @param {boolean} selection - value to set in canvas and objects selection
     */
    var setCanvasSelection = useCallback(function (selection) {
        if (canvas) {
            canvas.selection = selection;
            canvas.renderAll();
        }
    }, [canvas]);
    /**
     * Set the cursor to be showed when a object hover happens
     * @param {string} cursor - Cursor name to show
     */
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
            if ((object.id && PainterEvents.isCreatedWithId(object.id, userId)) ||
                !object.id) {
                object.set({
                    evented: true,
                    hoverCursor: "url(\"" + eraseObjectCursor + "\"), auto",
                    lockMovementX: true,
                    lockMovementY: true,
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
                ((e.target.id && PainterEvents.isCreatedWithId(e.target.id, userId)) ||
                    !e.target.id)) {
                var canvasObject = e.target;
                canvasObject.set({ generatedBy: generatedBy });
                canvas.remove(canvasObject);
                canvas.renderAll();
            }
            // if the click is made over an object group
            if ((_a = e.target) === null || _a === void 0 ? void 0 : _a._objects) {
                e.target._objects.forEach(function (object) {
                    object.set({ generatedBy: generatedBy });
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
                PainterEvents.isCreatedWithId(e.target.id, userId)) ||
                (e.target && !e.target.id)) {
                var canvasObject = e.target;
                canvasObject.set({ generatedBy: generatedBy });
                canvas.remove(canvasObject);
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
    }, [canvas, generatedBy, userId]);
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
            discardActiveObject: discardActiveObject,
            addShape: addShape,
            eraseObject: eraseObject,
            setCanvasSelection: setCanvasSelection,
            setHoverCursorObjects: setHoverCursorObjects,
            undo: undo,
            redo: redo,
            clear: clear,
            clearSelf: clearSelf
        };
        return { actions: actions, mouseDown: mouseDown };
    }, [fillColor, changeStrokeColor, textColor, discardActiveObject, addShape, eraseObject, setCanvasSelection, setHoverCursorObjects, undo, redo, clear, clearSelf, mouseDown]);
    return state;
};
//# sourceMappingURL=useCanvasActions.js.map