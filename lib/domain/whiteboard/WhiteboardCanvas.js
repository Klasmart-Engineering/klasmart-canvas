import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';
import React, { useCallback, useContext, useEffect, useState, } from 'react';
import { useSharedEventSerializer } from './SharedEventSerializerProvider';
import { WhiteboardContext } from './WhiteboardContext';
// @ts-ignore
import FontFaceObserver from 'fontfaceobserver';
import { useCanvasActions } from './canvas-actions/useCanvasActions';
import { DEFAULT_VALUES } from '../../config/toolbar-default-values';
import useSynchronizedAdded from './synchronization-hooks/useSynchronizedAdded';
import useSynchronizedMoved from './synchronization-hooks/useSynchronizedMoved';
import { isEmptyShape, isFreeDrawing, isShape } from './utils/shapes';
import '../../assets/style/whiteboard.css';
import { UndoRedo } from './hooks/useUndoRedoEffect';
import useSynchronizedColorChanged from './synchronization-hooks/useSynchronizedColorChanged';
import useSynchronizedFontFamilyChanged from './synchronization-hooks/useSynchronizedFontFamilyChanged';
import useSynchronizedModified from './synchronization-hooks/useSynchronizedModified';
import useSynchronizedRemoved from './synchronization-hooks/useSynchronizedRemoved';
import useSynchronizedRotated from './synchronization-hooks/useSynchronizedRotated';
import useSynchronizedScaled from './synchronization-hooks/useSynchronizedScaled';
import useSynchronizedSkewed from './synchronization-hooks/useSynchronizedSkewed';
import useSynchronizedReconstruct from './synchronization-hooks/useSynchronizedReconstruct';
import { SET } from './reducers/undo-redo';
export var WhiteboardCanvas = function (_a) {
    var children = _a.children, instanceId = _a.instanceId, userId = _a.userId, initialStyle = _a.initialStyle, pointerEvents = _a.pointerEvents, width = _a.width, height = _a.height, cssWidth = _a.cssWidth, cssHeight = _a.cssHeight;
    var _b = useState(), canvas = _b[0], setCanvas = _b[1];
    var _c = useState(), wrapper = _c[0], setWrapper = _c[1];
    var _d = useState(), lowerCanvas = _d[0], setLowerCanvas = _d[1];
    var _e = useState(), upperCanvas = _e[0], setUpperCanvas = _e[1];
    // Event serialization for synchronizing whiteboard state.
    var eventSerializer = useSharedEventSerializer().state.eventSerializer;
    var undoRedoDispatch = UndoRedo(canvas, eventSerializer, instanceId).dispatch;
    var _f = useContext(WhiteboardContext), text = _f.text, brushIsActive = _f.brushIsActive, textIsActive = _f.textIsActive, shapeIsActive = _f.shapeIsActive, fontFamily = _f.fontFamily, updateFontFamily = _f.updateFontFamily, fontColor = _f.fontColor, updateFontColor = _f.updateFontColor, penColor = _f.penColor, isLocalObject = _f.isLocalObject, eraseType = _f.eraseType, shape = _f.shape, shapeColor = _f.shapeColor, lineWidth = _f.lineWidth, updateCanvasActions = _f.updateCanvasActions, shapesAreSelectable = _f.shapesAreSelectable, eventedObjects = _f.eventedObjects, floodFillIsActive = _f.floodFillIsActive, updatePenColor = _f.updatePenColor, updateLineWidth = _f.updateLineWidth, updateShape = _f.updateShape, updateShapeColor = _f.updateShapeColor, floodFill = _f.floodFill;
    var _g = useCanvasActions(canvas), actions = _g.actions, mouseDown = _g.mouseDown;
    /**
     * Creates Canvas/Whiteboard instance
     */
    useEffect(function () {
        // @ts-ignore
        var canvasInstance = new fabric.Canvas(instanceId, {
            backgroundColor: undefined,
            isDrawingMode: false,
            selectionBorderColor: 'rgba(100, 100, 255, 1)',
            selectionLineWidth: 2,
            selectionColor: 'rgba(100, 100, 255, 0.1)',
            selectionDashArray: [10],
        });
        setCanvas(canvasInstance);
    }, [instanceId]);
    /**
   * Retrieve references to elements created by fabricjs. We'll need these to
   * tweak the style after canvas have been initialized.
   */
    useEffect(function () {
        var _a, _b;
        if (!canvas)
            return;
        var lowerCanvas = document.getElementById(instanceId);
        var wrapper = (_a = lowerCanvas) === null || _a === void 0 ? void 0 : _a.parentElement;
        var upperCanvas = (_b = wrapper) === null || _b === void 0 ? void 0 : _b.getElementsByClassName("upper-canvas")[0];
        if (wrapper)
            setWrapper(wrapper);
        if (lowerCanvas)
            setLowerCanvas(lowerCanvas);
        if (upperCanvas)
            setUpperCanvas(upperCanvas);
    }, [canvas, instanceId]);
    /**
     * Update the CSS Width/Height
     */
    useEffect(function () {
        if (wrapper && lowerCanvas && upperCanvas) {
            if (cssWidth) {
                wrapper.style.width = String(cssWidth);
                lowerCanvas.style.width = String(cssWidth);
                upperCanvas.style.width = String(cssWidth);
            }
            if (cssHeight) {
                wrapper.style.height = String(cssHeight);
                lowerCanvas.style.height = String(cssHeight);
                upperCanvas.style.height = String(cssHeight);
            }
        }
    }, [wrapper, lowerCanvas, upperCanvas, cssWidth, cssHeight]);
    /**
     * Update the pointer events to make canvas click through.
     */
    useEffect(function () {
        if (wrapper && lowerCanvas && upperCanvas) {
            var pointerEventsStyle = pointerEvents ? "auto" : "none";
            wrapper.style.pointerEvents = pointerEventsStyle;
            lowerCanvas.style.pointerEvents = pointerEventsStyle;
            upperCanvas.style.pointerEvents = pointerEventsStyle;
        }
    }, [lowerCanvas, pointerEvents, upperCanvas, wrapper]);
    /** Update objects selectable/evented state. */
    useEffect(function () {
        if (!canvas) {
            return;
        }
        canvas.getObjects().forEach(function (object) {
            object.set({
                selectable: shapesAreSelectable,
                evented: shapesAreSelectable,
            });
        });
        canvas.selection = shapesAreSelectable;
        canvas.renderAll();
    }, [canvas, shapesAreSelectable]);
    /**
     * Handles the logic to write text on the whiteboard
     * */
    useEffect(function () {
        var _a;
        if (textIsActive) {
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('mouse:down', function (e) {
                var _a, _b, _c, _d;
                if (e.target === null && e) {
                    var text_1 = new fabric.IText(' ', {
                        fontFamily: fontFamily,
                        fontSize: 30,
                        fontWeight: 400,
                        fill: fontColor,
                        fontStyle: 'normal',
                        top: (_a = e.pointer) === null || _a === void 0 ? void 0 : _a.y,
                        left: (_b = e.pointer) === null || _b === void 0 ? void 0 : _b.x,
                        cursorDuration: 500,
                    });
                    canvas.add(text_1);
                    canvas.setActiveObject(text_1);
                    text_1.enterEditing();
                    (_d = (_c = text_1) === null || _c === void 0 ? void 0 : _c.hiddenTextarea) === null || _d === void 0 ? void 0 : _d.focus();
                    text_1.on('editing:exited', function () {
                        var _a, _b;
                        var textCopy = text_1.text;
                        var toObject = text_1.toObject();
                        delete toObject.text;
                        delete toObject.type;
                        var clonedTextObj = JSON.parse(JSON.stringify(toObject));
                        clonedTextObj.id = userId + ":" + uuidv4();
                        if (typeof textCopy === 'string') {
                            text_1 = new fabric.Textbox(textCopy, clonedTextObj);
                        }
                        canvas.remove(canvas.getActiveObject());
                        canvas.add(text_1);
                        canvas.setActiveObject(text_1);
                        if (((_b = (_a = text_1) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.replace(/\s/g, '').length) === 0) {
                            canvas.remove(canvas.getActiveObject());
                            return;
                        }
                        text_1.on('selected', function () {
                            if (text_1.fontFamily) {
                                //@ts-ignore
                                updateFontColor(text_1.fill);
                                updateFontFamily(text_1.fontFamily);
                            }
                        });
                        text_1.on('modified', function () {
                            var _a, _b;
                            if (((_b = (_a = text_1) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.replace(/\s/g, '').length) === 0) {
                                canvas.remove(canvas.getActiveObject());
                            }
                        });
                    });
                }
            });
        }
        return function () {
            var _a;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('mouse:down');
        };
    }, [
        canvas,
        textIsActive,
        fontColor,
        fontFamily,
        updateFontFamily,
        updateFontColor,
        userId,
    ]);
    /**
     * Is executed when textIsActive changes its value,
     * basically to deselect any selected object
     */
    useEffect(function () {
        var _a, _b;
        if (!textIsActive) {
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.discardActiveObject();
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        }
    }, [canvas, pointerEvents, textIsActive]);
    /**
     * Activates or deactivates drawing mode.
     */
    useEffect(function () {
        if (brushIsActive && canvas) {
            canvas.freeDrawingBrush = new fabric.PencilBrush();
            //@ts-ignore
            canvas.freeDrawingBrush.canvas = canvas;
            canvas.freeDrawingBrush.color = penColor || DEFAULT_VALUES.PEN_COLOR;
            canvas.freeDrawingBrush.width = lineWidth;
            canvas.isDrawingMode = true;
            canvas.on('path:created', function (e) {
                e.path.selectable = false;
                e.path.evented = false;
                canvas.renderAll();
            });
        }
        else if (canvas && !brushIsActive) {
            canvas.isDrawingMode = false;
        }
        return function () {
            var _a;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('path:created');
        };
    }, [brushIsActive, canvas, lineWidth, penColor]);
    /**
     * Disables shape canvas mouse events.
     */
    useEffect(function () {
        if (!shapeIsActive && canvas) {
            canvas.off('mouse:move');
            canvas.off('mouse:up');
        }
    }, [shapeIsActive, canvas]);
    /**
     * Activates the mouseDown event if shape exists and shapeIsActive is true
     */
    useEffect(function () {
        var _a;
        if (shape && shapeIsActive) {
            actions.discardActiveObject();
            mouseDown(shape, shape.startsWith('filled') ? shapeColor : penColor);
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (object) {
                object.set({
                    evented: false,
                    selectable: false,
                });
            });
        }
        return function () {
            var _a, _b, _c;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('mouse:down');
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.off('mouse:move');
            (_c = canvas) === null || _c === void 0 ? void 0 : _c.off('mouse:up');
        };
    }, [canvas, shape, shapeIsActive, mouseDown, penColor, shapeColor, actions]);
    /**
     * General handler for keyboard events
     * 'Backspace' event for removing selected element from whiteboard
     * 'Escape' event for deselect active objects
     * */
    var keyDownHandler = useCallback(function (e) {
        // The following two blocks, used for undo and redo, can not
        // be integrated while there are two boards in the canvas.
        // if (e.which === 90 && e.ctrlKey && !e.shiftKey) {
        //   dispatch({ type: UNDO, canvasId });
        //   return;
        // }
        // if (e.which === 89 && e.ctrlKey) {
        //   dispatch({ type: REDO, canvasId });
        //   return;
        // }
        if (e.key === 'Backspace' && canvas) {
            var objects = canvas.getActiveObjects();
            objects.forEach(function (object) {
                var _a;
                if (!((_a = object) === null || _a === void 0 ? void 0 : _a.isEditing)) {
                    canvas.remove(object);
                    canvas.discardActiveObject().renderAll();
                }
            });
            return;
        }
        if (e.key === 'Escape' && canvas) {
            canvas.discardActiveObject();
            canvas.renderAll();
        }
    }, [canvas]);
    /**
     * Loads selected font. Default is Arial
     * */
    var fontFamilyLoader = useCallback(function (font) {
        var myFont = new FontFaceObserver(font);
        myFont
            .load()
            .then(function () {
            var _a;
            if ((_a = canvas) === null || _a === void 0 ? void 0 : _a.getActiveObject()) {
                canvas.getActiveObject().set('fontFamily', font);
                canvas.requestRenderAll();
            }
        })
            .catch(function (e) {
            console.log(e);
        });
    }, [canvas]);
    /**
     * Get the color of the clicked area in the Whiteboard
     * and returns it in hexadecimal code
     * @param {IEvent} event - click event
     */
    var getColorInCoord = useCallback(function (x, y) {
        if (canvas) {
            var colorData = canvas
                .getContext()
                .getImageData(x, y, 1, 1)
                .data.slice(0, 3);
            return ('#' +
                ((1 << 24) + (colorData[0] << 16) + (colorData[1] << 8) + colorData[2])
                    .toString(16)
                    .slice(1));
        }
        return null;
    }, [canvas]);
    /**
     * Reorder the current shapes letting the shapes over their container shape
     */
    var reorderShapes = useCallback(function () {
        var _a;
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (actual) {
            canvas.forEachObject(function (compare) {
                if (actual.isContainedWithinObject(compare)) {
                    canvas.bringForward(actual);
                }
            });
        });
    }, [canvas]);
    /**
     * Trigger the changes in the required variables
     * when a certain object is selected
     * @param {IEvent} event - event that contains the selected object
     */
    var manageChanges = useCallback(function (event) {
        // Free Drawing Line Selected
        if ((event.target && isFreeDrawing(event.target)) ||
            (event.target && isEmptyShape(event.target))) {
            updatePenColor(event.target.stroke || DEFAULT_VALUES.PEN_COLOR);
            updateLineWidth(event.target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH);
        }
        // Shape Selected
        if (event.target && isShape(event.target)) {
            updateShape(event.target.name || DEFAULT_VALUES.SHAPE);
            if (event.target.shapeType === 'shape') {
                updatePenColor(event.target.stroke || DEFAULT_VALUES.PEN_COLOR);
                updateLineWidth(event.target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH);
            }
            else if (event.target.fill) {
                updateShapeColor(event.target.fill.toString() || DEFAULT_VALUES.SHAPE_COLOR);
            }
        }
    }, [updateLineWidth, updatePenColor, updateShape, updateShapeColor]);
    /** Set up mangeChanges callback. */
    useEffect(function () {
        if (!canvas)
            return;
        canvas.on('selection:created', manageChanges);
        canvas.on('selection:updated', manageChanges);
        return function () {
            canvas.off('selection:created', manageChanges);
            canvas.off('selection:updated', manageChanges);
        };
    }, [canvas, manageChanges]);
    /**
     * Make a mouse down event below of the clicked shape
     * @param {IEvent} event - Contains the x, y coords of the clicked point
     */
    var manageShapeOutsideClick = useCallback(function (event) {
        var _a, _b;
        var foundShape = null;
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (object) {
            if (event.pointer &&
                isEmptyShape(object) &&
                object.containsPoint(event.pointer) &&
                object !== event.target) {
                foundShape = object;
            }
        });
        if (event.pointer) {
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.trigger('mouse:down', {
                target: foundShape,
                pointer: {
                    x: event.pointer.x,
                    y: event.pointer.y,
                },
            });
        }
    }, [canvas]);
    /**
     * Set the objects like evented if you select pointer or move tool
     */
    useEffect(function () {
        var _a;
        if (eventedObjects) {
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (object) {
                object.set({
                    evented: true,
                    selectable: true,
                });
            });
            actions.setHoverCursorObjects('move');
        }
    }, [actions, canvas, eventedObjects]);
    /**
     * Manages the logic for Flood-fill Feature
     */
    useEffect(function () {
        var _a, _b, _c, _d;
        var originalStroke = null;
        var originalFill = null;
        var clickedColor = null;
        var differentFill = '#dcdcdc';
        var differentStroke = '#c8c8c8';
        if (floodFillIsActive) {
            actions.setCanvasSelection(false);
            actions.setHoverCursorObjects('default');
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (object) {
                object.perPixelTargetFind = isEmptyShape(object) ? false : true;
                object.evented = true;
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
            reorderShapes();
            (_c = canvas) === null || _c === void 0 ? void 0 : _c.on('mouse:down', function (event) {
                // Click out of any object
                if (!event.target) {
                    canvas.backgroundColor = floodFill;
                }
                // Click on object shape
                if (event.target && event.pointer && isEmptyShape(event.target)) {
                    // Store the current stroke and fill colors to reset them
                    originalStroke = event.target.stroke;
                    originalFill = event.target.fill;
                    // Change stroke to a provisional color to be identified
                    event.target.set('stroke', differentStroke);
                    event.target.set('fill', differentFill);
                    canvas.renderAll();
                    clickedColor = getColorInCoord(event.pointer.x, event.pointer.y);
                    if (clickedColor === differentFill) {
                        // If user click inside of the shape
                        event.target.set('fill', floodFill);
                        event.target.set('stroke', originalStroke);
                    }
                    else if (clickedColor === differentStroke) {
                        // If user click in the border of the shape
                        event.target.set('stroke', originalStroke);
                        event.target.set('fill', originalFill);
                    }
                    else {
                        // If user click outside of the shape
                        event.target.set('stroke', originalStroke);
                        event.target.set('fill', originalFill);
                        if (event.e) {
                            manageShapeOutsideClick(event);
                        }
                    }
                }
                canvas.renderAll();
            });
        }
        else {
            actions.setCanvasSelection(true);
            actions.setHoverCursorObjects('move');
            (_d = canvas) === null || _d === void 0 ? void 0 : _d.forEachObject(function (object) {
                object.padding = 0;
            });
        }
    }, [actions, canvas, floodFill, floodFillIsActive, getColorInCoord, manageShapeOutsideClick, reorderShapes]);
    /**
     * If the input field (text) has length
     * will unselect whiteboard active objects
     * */
    useEffect(function () {
        if (text.length) {
            actions.discardActiveObject();
        }
    }, [actions, text]);
    /**
     * Add keyboard keydown event listener. It listen keyDownHandler function
     * Invokes fontFamilyLoader to set default and selected font family
     * */
    useEffect(function () {
        document.addEventListener('keydown', keyDownHandler, false);
        fontFamilyLoader(fontFamily);
        return function () {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [fontFamily, keyDownHandler, fontFamilyLoader]);
    var filterOutgoingEvents = useCallback(function (id) {
        if (!id)
            return false;
        var apply = isLocalObject(id, userId);
        if (apply) {
            console.log("send local event " + id + " to remote");
        }
        return apply;
    }, [isLocalObject, userId]);
    var filterIncomingEvents = useCallback(function (id) {
        if (!id)
            return false;
        // TODO: isLocalObject will not work in case we're reloading
        // the page and server resends all our events. They would be
        // discarded when they shouldn't be discarded. Another solution
        // could be to keep track of all 'local' objects we've created
        // this session and only filter those.
        // TODO: Filter based on the filterUsers list. We should only
        // display events coming from users in that list if the list
        // isn't undefined.
        var apply = !isLocalObject(id, userId);
        if (apply) {
            console.log("apply remote event " + id + " locally.");
        }
        return apply;
    }, [isLocalObject, userId]);
    useSynchronizedAdded(canvas, userId, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedMoved(canvas, userId, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedModified(canvas, filterOutgoingEvents, filterIncomingEvents);
    useSynchronizedRemoved(canvas, userId, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedRotated(canvas, userId, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedScaled(canvas, userId, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedSkewed(canvas, filterOutgoingEvents, filterIncomingEvents);
    useSynchronizedReconstruct(canvas, filterIncomingEvents);
    useSynchronizedColorChanged(canvas, userId, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedFontFamilyChanged(canvas, filterIncomingEvents);
    /**
     * Send synchronization event for penColor and fontColor changes.
     * */
    useEffect(function () {
        var _a;
        var objects = (_a = canvas) === null || _a === void 0 ? void 0 : _a.getActiveObjects();
        if (objects && objects.length) {
            objects.forEach(function (obj) {
                var _a, _b;
                if (isLocalObject(obj.id, userId)) {
                    var type = obj.get('type');
                    var target = function (type) {
                        return type === 'textbox'
                            ? { fill: obj.fill }
                            : { stroke: obj.stroke };
                    };
                    var payload = {
                        type: type,
                        target: target(type),
                        id: obj.id,
                    };
                    var event_1 = { event: payload, type: 'colorChanged' };
                    undoRedoDispatch({
                        type: SET,
                        payload: (_a = canvas) === null || _a === void 0 ? void 0 : _a.getObjects(),
                        canvasId: userId,
                        event: event_1,
                    });
                    (_b = eventSerializer) === null || _b === void 0 ? void 0 : _b.push('colorChanged', payload);
                }
            });
        }
    }, [isLocalObject, canvas, eventSerializer, userId, penColor, fontColor, undoRedoDispatch]);
    /**
     * Send synchronization event for fontFamily changes.
     * */
    useEffect(function () {
        var _a;
        var objects = (_a = canvas) === null || _a === void 0 ? void 0 : _a.getActiveObjects();
        if (objects && objects.length) {
            objects.forEach(function (obj) {
                var _a;
                if (isLocalObject(obj.id, userId)) {
                    var type = obj.get('type');
                    if (type === 'textbox') {
                        var target = {
                            fontFamily: fontFamily,
                        };
                        var payload = {
                            type: type,
                            target: target,
                            id: obj.id,
                        };
                        (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('fontFamilyChanged', payload);
                    }
                }
            });
        }
    }, [isLocalObject, canvas, eventSerializer, userId, fontFamily]);
    /**
     * If pointerEvents changes to false, all the selected objects
     * will be unselected
     */
    useEffect(function () {
        if (!pointerEvents && canvas) {
            canvas.discardActiveObject().renderAll();
        }
    }, [pointerEvents, canvas]);
    /**
     * When eraseType value changes, listeners and states
     * necessaries to erase objects are setted or removed
     */
    useEffect(function () {
        if (eraseType === 'object' && canvas) {
            actions.eraseObject();
            if (canvas.getActiveObjects().length === 1) {
                canvas.discardActiveObject().renderAll();
            }
        }
        else if (canvas) {
            actions.setCanvasSelection(true);
        }
        return function () {
            var _a, _b, _c;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('mouse:down');
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.off('mouse:up');
            (_c = canvas) === null || _c === void 0 ? void 0 : _c.off('mouse:over');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eraseType, canvas]);
    useEffect(function () {
        if (shape && shapeIsActive) {
            mouseDown(shape, shapeColor);
        }
        return function () {
            var _a, _b, _c;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('mouse:down');
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.off('mouse:move');
            (_c = canvas) === null || _c === void 0 ? void 0 : _c.off('mouse:up');
        };
    }, [canvas, shape, shapeIsActive, mouseDown, shapeColor]);
    /**
     * If lineWidth variable changes and a free line drawing is selected
     * that drawing line width will changes to the selected width on Toolbar
     */
    useEffect(function () {
        var _a;
        if ((_a = canvas) === null || _a === void 0 ? void 0 : _a.getActiveObjects()) {
            canvas.getActiveObjects().forEach(function (object) {
                if (isEmptyShape(object) || isFreeDrawing(object)) {
                    object.set('strokeWidth', lineWidth);
                }
            });
            canvas.renderAll();
        }
    }, [lineWidth, canvas]);
    // NOTE: Register canvas actions with context.
    useEffect(function () {
        updateCanvasActions(actions);
    }, [actions, updateCanvasActions]);
    // TODO: Possible to have dynamically sized canvas? With raw canvas it's
    // possible to set the "pixel (background)" size separately from the 
    // style size. So we can have a fixed resolution draw buffer and it will
    // be scaled based on the style size. This might be important to make
    // the canvas size adopt to the content behind it. The content behind
    // canvas doesn't have a fixed size and could vary between different 
    // activities etc. For now the user will have to pass in the exact 
    // width and height they want to have the canvas in. 
    return (React.createElement("canvas", { width: width, height: height, id: instanceId, style: initialStyle, onClick: function () {
            actions.addShape();
        } }, children));
};
//# sourceMappingURL=WhiteboardCanvas.js.map