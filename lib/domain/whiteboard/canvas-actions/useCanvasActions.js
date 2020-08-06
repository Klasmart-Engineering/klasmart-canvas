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
import { WhiteboardContext } from '../WhiteboardContext';
import * as shapes from '../shapes/shapes';
export var useCanvasActions = function (canvas) {
    var _a = useContext(WhiteboardContext), shapeIsActive = _a.shapeIsActive, updateFontColor = _a.updateFontColor, shape = _a.shape, shapeColor = _a.shapeColor, updatePenColor = _a.updatePenColor, updateShapeColor = _a.updateShapeColor, closeModal = _a.closeModal, setCircleSize = _a.setCircleSize, setSize = _a.setSize, setPathSize = _a.setPathSize;
    /**
     * Adds shape to whiteboard.
     * @param specific Indicates shape type that should be added in whiteboard.
     */
    var shapeSelector = useCallback(function (specific) {
        switch (specific || shape) {
            case 'rectangle':
                return shapes.rectangle(2, 2, shapeColor);
            case 'triangle':
                return shapes.triangle(2, 4, shapeColor);
            case 'star':
                return shapes.star(2, 2, shapeColor);
            case 'rightArrow':
                return shapes.arrow(2, 2, shapeColor);
            case 'chatBubble':
                return shapes.chat(2, 2, shapeColor);
            case 'pentagon':
                return shapes.pentagon(shapeColor);
            case 'hexagon':
                return shapes.hexagon(shapeColor);
            default:
                return shapes.circle(2, 2, shapeColor);
        }
    }, [shape, shapeColor]);
    /**
     *
     * @param shape Shape that was added to canvas.
     * @param coordsStart Coordinates of initial click on canvas.
     * @param isCircle Indicates if shape added is a circle.
     */
    var mouseMove = useCallback(function (shape, coordsStart, specific) {
        var _a;
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('mouse:move', function (e) {
            if (specific === 'circle') {
                setCircleSize(shape, coordsStart, e.pointer);
            }
            else if (specific === 'rectangle' || specific === 'triangle') {
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
    }, [setCircleSize, setPathSize, setSize, canvas]);
    var clearOnMouseEvent = useCallback(function () {
        var _a;
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('mouse:down');
    }, [canvas]);
    /**
     * Mouse up event listener for canvas.
     */
    var mouseUp = useCallback(function (shape, coordsStart, specific) {
        var _a;
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('mouse:up', function (e) {
            var size;
            if (specific === 'circle') {
                size = setCircleSize(shape, coordsStart, e.pointer);
            }
            else if (specific === 'rectangle' || specific === 'triangle') {
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
            }
        });
    }, [setCircleSize, setPathSize, setSize, canvas]);
    /**
     * Clears all mouse event listeners from canvas.
     */
    var clearMouseEvents = useCallback(function () {
        var _a, _b;
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('mouse:move');
        (_b = canvas) === null || _b === void 0 ? void 0 : _b.off('mouse:up');
    }, [canvas]);
    /**
     * Mouse down event listener for canvas.
     * @param shape Shape being added on canvas.
     * @param isCircle Indicates if shape is a circle.
     */
    var mouseDown = useCallback(function (specific, color) {
        var _a;
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('mouse:down', function (e) {
            if (e.target) {
                return;
            }
            if (!e.pointer) {
                return;
            }
            var shape = shapeSelector(specific);
            if (e.pointer) {
                shape.set({
                    top: e.pointer.y,
                    left: e.pointer.x,
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
    var addShape = useCallback(function (specific) {
        // Required to prevent multiple shapes add at once
        // if user clicked more than one shape during selection.
        if (!shapeIsActive) {
            return;
        }
        clearOnMouseEvent();
        clearMouseEvents();
        mouseDown(specific || shape, shapeColor);
    }, [
        clearMouseEvents,
        clearOnMouseEvent,
        mouseDown,
        shape,
        shapeColor,
        shapeIsActive,
    ]);
    var changeStrokeColor = useCallback(function (color) {
        var _a;
        updatePenColor(color);
        if ((_a = canvas) === null || _a === void 0 ? void 0 : _a.getActiveObject()) {
            canvas.getActiveObject().set('stroke', color);
            canvas.renderAll();
        }
    }, [canvas, updatePenColor]);
    /**
     * Add specific color to selected shape
     * */
    var fillColor = useCallback(function (color) {
        var _a;
        updateShapeColor(color);
        clearOnMouseEvent();
        clearMouseEvents();
        mouseDown(shape, color);
        if ((_a = canvas) === null || _a === void 0 ? void 0 : _a.getActiveObject()) {
            canvas.getActiveObject().set('fill', color);
            canvas.renderAll();
        }
    }, [
        canvas,
        clearMouseEvents,
        clearOnMouseEvent,
        mouseDown,
        shape,
        updateShapeColor,
    ]);
    /**
     * Add specific color to selected text
     * @param {string} color - color to set
     */
    var textColor = useCallback(function (color) {
        var _a;
        updateFontColor(color);
        if (((_a = canvas) === null || _a === void 0 ? void 0 : _a.getActiveObject()) &&
            canvas.getActiveObject().text) {
            canvas.getActiveObject().set('fill', color);
            // @ts-ignore
            canvas.renderAll();
        }
    }, [canvas, updateFontColor]);
    /**
     * Clears all whiteboard elements
     * */
    var clearWhiteboard = useCallback(function () {
        if (canvas) {
            canvas.clear();
            canvas.backgroundColor = 'white';
            canvas.renderAll();
        }
        closeModal();
    }, [canvas, closeModal]);
    /**
     * Set Canvas Whiteboard selection ability
     * @param {boolean} selection - value to set in canvas and objects selection
     */
    var setCanvasSelection = useCallback(function (selection) {
        if (canvas) {
            canvas.selection = selection;
            canvas.forEachObject(function (object) {
                object.selectable = selection;
            });
            canvas.renderAll();
        }
    }, [canvas]);
    /**
     * Creates the listeners to erase objects from the whiteboard
     */
    var eraseObject = useCallback(function () {
        var _a, _b, _c;
        var eraser = false;
        var activeObjects = null;
        // Deactivate selection
        setCanvasSelection(false);
        // When mouse down eraser is able to remove objects
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('mouse:down', function (e) {
            if (eraser) {
                return false;
            }
            // if the click is made over an object
            if (e.target) {
                activeObjects = canvas.getActiveObjects();
                canvas.remove(e.target);
                canvas.renderAll();
            }
            // if the click is made over an object group
            if (e.target && activeObjects.length) {
                activeObjects.forEach(function (object) {
                    canvas.remove(object);
                });
                canvas.discardActiveObject().renderAll();
            }
            eraser = true;
        });
        // When mouse is over an object
        (_b = canvas) === null || _b === void 0 ? void 0 : _b.on('mouse:over', function (e) {
            if (!eraser) {
                return false;
            }
            canvas.remove(e.target);
            canvas.renderAll();
        });
        // When mouse up eraser is unable to remove objects
        (_c = canvas) === null || _c === void 0 ? void 0 : _c.on('mouse:up', function () {
            if (!eraser) {
                return false;
            }
            eraser = false;
        });
    }, [canvas, setCanvasSelection]);
    /**
     * Deselect the actual selected object
     */
    var discardActiveObject = useCallback(function () {
        var _a;
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.discardActiveObject().renderAll();
    }, [canvas]);
    var state = useMemo(function () {
        var actions = {
            fillColor: fillColor,
            changeStrokeColor: changeStrokeColor,
            textColor: textColor,
            clearWhiteboard: clearWhiteboard,
            discardActiveObject: discardActiveObject,
            addShape: addShape,
            eraseObject: eraseObject,
            setCanvasSelection: setCanvasSelection,
        };
        return { actions: actions, mouseDown: mouseDown };
    }, [
        addShape,
        changeStrokeColor,
        clearWhiteboard,
        discardActiveObject,
        eraseObject,
        fillColor,
        mouseDown,
        setCanvasSelection,
        textColor,
    ]);
    return state;
};
//# sourceMappingURL=useCanvasActions.js.map