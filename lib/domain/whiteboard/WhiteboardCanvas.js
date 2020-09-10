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
import { fabric } from 'fabric';
import floodFillCursor from '../../assets/cursors/flood-fill.png';
import { v4 as uuidv4 } from 'uuid';
import React, { useCallback, useContext, useEffect, useState, } from 'react';
import { useSharedEventSerializer } from './SharedEventSerializerProvider';
import { WhiteboardContext } from './WhiteboardContext';
import FontFaceObserver from 'fontfaceobserver';
import { useCanvasActions } from './canvas-actions/useCanvasActions';
import { DEFAULT_VALUES } from '../../config/toolbar-default-values';
import useSynchronizedAdded from './synchronization-hooks/useSynchronizedAdded';
import useSynchronizedMoved from './synchronization-hooks/useSynchronizedMoved';
import { isEmptyShape, isFreeDrawing, isShape, isText } from './utils/shapes';
import '../../assets/style/whiteboard.css';
import { UndoRedo } from './hooks/useUndoRedoEffect';
import useSynchronizedColorChanged from './synchronization-hooks/useSynchronizedColorChanged';
import useSynchronizedFontFamilyChanged from './synchronization-hooks/useSynchronizedFontFamilyChanged';
import useSynchronizedRemoved from './synchronization-hooks/useSynchronizedRemoved';
import useSynchronizedRotated from './synchronization-hooks/useSynchronizedRotated';
import useSynchronizedScaled from './synchronization-hooks/useSynchronizedScaled';
import useSynchronizedSkewed from './synchronization-hooks/useSynchronizedSkewed';
import useSynchronizedReconstruct from './synchronization-hooks/useSynchronizedReconstruct';
import useSynchronizedPointer from './synchronization-hooks/useSynchronizedPointer';
import useSynchronizedSetToolbarPermissions from './synchronization-hooks/useSynchronizedSetToolbarPermissions';
import useSynchronizedFontColorChanged from './synchronization-hooks/useSynchronizedFontColorChanged';
import { SET, SET_GROUP } from './reducers/undo-redo';
import useSynchronizedLineWidthChanged from './synchronization-hooks/useSynchronizedLineWidthChanged';
import useFixedAspectScaling from './utils/useFixedAspectScaling';
import { PainterEvents } from './event-serializer/PainterEvents';
import useSynchronizedModified from './synchronization-hooks/useSynchronizedModified';
export var WhiteboardCanvas = function (_a) {
    var children = _a.children, instanceId = _a.instanceId, userId = _a.userId, initialStyle = _a.initialStyle, pointerEvents = _a.pointerEvents, pixelWidth = _a.pixelWidth, pixelHeight = _a.pixelHeight, display = _a.display, scaleMode = _a.scaleMode, centerHorizontally = _a.centerHorizontally, centerVertically = _a.centerVertically, filterUsers = _a.filterUsers, filterGroups = _a.filterGroups;
    var _b = useState(), canvas = _b[0], setCanvas = _b[1];
    var _c = useState(), wrapper = _c[0], setWrapper = _c[1];
    var _d = useState(), lowerCanvas = _d[0], setLowerCanvas = _d[1];
    var _e = useState(), upperCanvas = _e[0], setUpperCanvas = _e[1];
    var _f = useState(uuidv4()), generatedBy = _f[0], setGeneratedBy = _f[1];
    var _g = useFixedAspectScaling(wrapper === null || wrapper === void 0 ? void 0 : wrapper.parentElement, pixelWidth / pixelHeight, scaleMode || 'ScaleToFit', centerHorizontally || false, centerVertically || false), width = _g.width, height = _g.height, top = _g.top, left = _g.left;
    // Event serialization for synchronizing whiteboard state.
    var _h = useSharedEventSerializer(), _j = _h.state, eventSerializer = _j.eventSerializer, eventController = _j.eventController, requestAllEvents = _h.requestAllEvents;
    var undoRedoDispatch = UndoRedo(canvas, eventSerializer, generatedBy, userId).dispatch;
    var _k = useContext(WhiteboardContext), text = _k.text, brushIsActive = _k.brushIsActive, textIsActive = _k.textIsActive, shapeIsActive = _k.shapeIsActive, fontFamily = _k.fontFamily, updateFontFamily = _k.updateFontFamily, fontColor = _k.fontColor, updateFontColor = _k.updateFontColor, penColor = _k.penColor, eraseType = _k.eraseType, shape = _k.shape, shapeColor = _k.shapeColor, lineWidth = _k.lineWidth, updateCanvasActions = _k.updateCanvasActions, shapesAreSelectable = _k.shapesAreSelectable, shapesAreEvented = _k.shapesAreEvented, eventedObjects = _k.eventedObjects, floodFillIsActive = _k.floodFillIsActive, updatePenColor = _k.updatePenColor, updateLineWidth = _k.updateLineWidth, updateShape = _k.updateShape, updateShapeColor = _k.updateShapeColor, floodFill = _k.floodFill, laserIsActive = _k.laserIsActive, allowPointer = _k.allowPointer, universalPermits = _k.universalPermits, toolbarIsEnabled = _k.toolbarIsEnabled, setToolbarIsEnabled = _k.setToolbarIsEnabled;
    var _l = useCanvasActions(userId, instanceId, generatedBy, canvas, undoRedoDispatch, eventSerializer), actions = _l.actions, mouseDown = _l.mouseDown;
    /**
     * Creates Canvas/Whiteboard instance
     */
    useEffect(function () {
        var canvasInstance = new fabric.Canvas(instanceId, {
            backgroundColor: undefined,
            isDrawingMode: false,
            allowTouchScrolling: false,
            selectionBorderColor: 'rgba(100, 100, 255, 1)',
            selectionLineWidth: 2,
            selectionColor: 'rgba(100, 100, 255, 0.1)',
            selectionDashArray: [10],
        });
        setCanvas(canvasInstance);
    }, [instanceId]);
    /**
     * Reset the canvas state in case the event controller will replay all events.
     */
    useEffect(function () {
        if (!canvas)
            return;
        if (!eventController)
            return;
        var reset = function () {
            canvas.clear();
            // NOTE: Regenerate generatedBy so our own events gets applied again after the clear.
            setGeneratedBy(uuidv4());
        };
        eventController.on('aboutToReplayAll', reset);
        return function () {
            eventController.removeListener('aboutToReplayAll', reset);
        };
    }, [canvas, eventController]);
    /**
     * Enable or disable allow touch scroll based on pointer events.
     */
    useEffect(function () {
        if (!canvas)
            return;
        canvas.allowTouchScrolling = !pointerEvents;
    }, [pointerEvents, canvas]);
    /**
     * Retrieve references to elements created by fabricjs. We'll need these to
     * tweak the style after canvas have been initialized.
     */
    useEffect(function () {
        if (!canvas)
            return;
        var lowerCanvas = document.getElementById(instanceId);
        var wrapper = lowerCanvas === null || lowerCanvas === void 0 ? void 0 : lowerCanvas.parentElement;
        var upperCanvas = wrapper === null || wrapper === void 0 ? void 0 : wrapper.getElementsByClassName('upper-canvas')[0];
        if (wrapper) {
            setWrapper(wrapper);
            // TODO: We may want to make the position style
            // controlled by property or variable.
            wrapper.style.position = 'absolute';
            if (initialStyle && initialStyle.zIndex) {
                wrapper.style.zIndex = String(initialStyle.zIndex);
            }
        }
        if (lowerCanvas)
            setLowerCanvas(lowerCanvas);
        if (upperCanvas)
            setUpperCanvas(upperCanvas);
    }, [canvas, initialStyle, instanceId]);
    /**
     * Update wrapper display state.
     */
    useEffect(function () {
        if (!wrapper)
            return;
        if (display === false) {
            wrapper.style.display = 'none';
        }
        else {
            wrapper.style.removeProperty('display');
        }
    }, [wrapper, display]);
    /**
     * Update the CSS Width/Height
     */
    useEffect(function () {
        if (wrapper && lowerCanvas && upperCanvas) {
            var widthStyle = width + "px";
            wrapper.style.width = widthStyle;
            lowerCanvas.style.width = widthStyle;
            upperCanvas.style.width = widthStyle;
            var heightStyle = height + "px";
            wrapper.style.height = heightStyle;
            lowerCanvas.style.height = heightStyle;
            upperCanvas.style.height = heightStyle;
            var wrapperTransform = "translate(" + left + "px, " + top + "px)";
            wrapper.style.transform = wrapperTransform;
            wrapper.style.top = '0px';
            wrapper.style.left = '0px';
        }
    }, [wrapper, lowerCanvas, upperCanvas, width, height, left, top]);
    /**
     * Update the pointer events to make canvas click through.
     */
    useEffect(function () {
        if (wrapper && lowerCanvas && upperCanvas) {
            var pointerEventsStyle = pointerEvents ? 'auto' : 'none';
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
            if ((object.id && PainterEvents.isCreatedWithId(object.id, userId)) || !object.id) {
                object.set({
                    selectable: shapesAreSelectable,
                    evented: shapesAreSelectable || shapesAreEvented,
                });
            }
        });
        canvas.selection = shapesAreSelectable;
        canvas.renderAll();
    }, [canvas, shapesAreEvented, shapesAreSelectable, userId]);
    /**
     * Handles the logic to write text on the whiteboard
     * */
    useEffect(function () {
        if (textIsActive) {
            canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:down', function (e) {
                var _a, _b, _c;
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
                    (_c = text_1.hiddenTextarea) === null || _c === void 0 ? void 0 : _c.focus();
                    text_1.on('editing:exited', function () {
                        var _a;
                        var textCopy = text_1.text;
                        var toObject = text_1.toObject();
                        delete toObject.text;
                        delete toObject.type;
                        var clonedTextObj = JSON.parse(JSON.stringify(toObject));
                        if (typeof textCopy === 'string') {
                            text_1 = new fabric.Textbox(textCopy, clonedTextObj);
                        }
                        canvas.remove(canvas.getActiveObject());
                        var canvasObject = text_1;
                        canvasObject.set('generatedBy', generatedBy);
                        canvas.add(canvasObject);
                        canvas.setActiveObject(canvasObject);
                        if (((_a = canvasObject.text) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, '').length) === 0) {
                            canvas.remove(canvasObject);
                            return;
                        }
                        canvasObject.on('modified', function () {
                            var _a;
                            if (((_a = canvasObject.text) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, '').length) === 0) {
                                canvas.remove(canvasObject);
                            }
                        });
                    });
                }
            });
        }
        return function () {
            if (!eraseType) {
                canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:down');
            }
        };
    }, [canvas, textIsActive, fontColor, fontFamily, updateFontFamily, updateFontColor, userId, eraseType, generatedBy]);
    /**
     * Is executed when textIsActive changes its value,
     * basically to deselect any selected object
     */
    useEffect(function () {
        if (!textIsActive) {
            canvas === null || canvas === void 0 ? void 0 : canvas.discardActiveObject();
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        }
    }, [canvas, pointerEvents, textIsActive]);
    /**
     * Activates or deactivates drawing mode.
     */
    useEffect(function () {
        var pathCreated = function (e) {
            if (!e.path)
                throw new Error('path:created event without path object.');
            e.path.strokeUniform = true;
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        if (brushIsActive && canvas) {
            canvas.freeDrawingBrush = new fabric.PencilBrush();
            canvas.freeDrawingBrush.canvas = canvas;
            canvas.freeDrawingBrush.color = penColor || DEFAULT_VALUES.PEN_COLOR;
            canvas.freeDrawingBrush.width = lineWidth;
            canvas.isDrawingMode = toolbarIsEnabled;
            canvas.on('path:created', pathCreated);
        }
        else if (canvas && !brushIsActive) {
            canvas.isDrawingMode = false;
        }
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('path:created', pathCreated);
        };
    }, [brushIsActive, canvas, lineWidth, penColor, toolbarIsEnabled]);
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
        if (shape && shapeIsActive && toolbarIsEnabled) {
            actions.discardActiveObject();
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (object) {
                if (object.id && PainterEvents.isCreatedWithId(object.id, userId)) {
                    object.set({
                        evented: false,
                        selectable: false,
                    });
                }
            });
            actions.addShape(shape);
        }
        return function () {
            if (!textIsActive && !floodFillIsActive && !shapesAreEvented) {
                canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:down');
            }
            if (eraseType !== 'object') {
                canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:up');
            }
            if (!laserIsActive) {
                canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:move');
            }
        };
    }, [canvas, shape, shapeIsActive, mouseDown, penColor, shapeColor, actions, textIsActive, userId, floodFillIsActive, shapesAreSelectable, eraseType, shapesAreEvented, laserIsActive, toolbarIsEnabled]);
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
                    e.preventDefault();
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
     * Send synchronization event for fontFamily changes.
     * */
    var fontFamilyLoader = useCallback(function (font) {
        var myFont = new FontFaceObserver(font);
        myFont
            .load()
            .then(function () {
            if (canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject()) {
                canvas.getActiveObject().set('fontFamily', font);
                canvas.requestRenderAll();
                var objects = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObjects();
                if (objects && objects.length) {
                    objects.forEach(function (obj) {
                        if (obj.id && PainterEvents.isCreatedWithId(obj.id, userId)) {
                            var type = obj.get('type');
                            if (type === 'textbox') {
                                var target = {
                                    fontFamily: obj.fontFamily,
                                };
                                var payload = {
                                    type: type,
                                    target: target,
                                    id: obj.id,
                                };
                                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('fontFamilyChanged', generatedBy, payload);
                            }
                        }
                    });
                }
            }
        })
            .catch(function (e) {
            console.log(e);
        });
    }, [canvas, eventSerializer, generatedBy, userId]);
    /**
     * Get the color of the clicked area in the Whiteboard
     * and returns it in hexadecimal code
     * @param {IEvent} event - click event
     */
    var getColorInCoord = useCallback(function (x, y) {
        if (canvas) {
            var colorData = canvas
                .getContext()
                .getImageData(x * window.devicePixelRatio, y * window.devicePixelRatio, 1, 1)
                .data.slice(0, 3);
            return ('#' +
                ((1 << 24) +
                    (colorData[0] << 16) +
                    (colorData[1] << 8) +
                    colorData[2])
                    .toString(16)
                    .slice(1));
        }
        return null;
    }, [canvas]);
    /**
     * Reorder the current shapes letting the shapes over their container shape
     */
    var reorderShapes = useCallback(function () {
        var temporal;
        var actualIndex;
        var compareIndex;
        var getObjectIndex = function (object, canvas) {
            return canvas.getObjects().indexOf(object);
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (actual) {
            canvas.forEachObject(function (compare) {
                actualIndex = getObjectIndex(actual, canvas);
                compareIndex = getObjectIndex(compare, canvas);
                if (actual.isContainedWithinObject(compare) &&
                    actualIndex < compareIndex) {
                    temporal = getObjectIndex(actual, canvas);
                    actual.moveTo(compareIndex);
                    compare.moveTo(temporal);
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
        reorderShapes();
        // Free Drawing Line Selected
        if (!shapeIsActive &&
            !brushIsActive &&
            ((event.target && isFreeDrawing(event.target)) ||
                (event.target && isEmptyShape(event.target)))) {
            var canvasObject = event.target;
            canvasObject.set('generatedBy', generatedBy);
            updatePenColor(event.target.stroke || DEFAULT_VALUES.PEN_COLOR);
            updateLineWidth(event.target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH);
        }
        // Shape Selected
        if (event.target && isShape(event.target) && !shapeIsActive) {
            updateShape(event.target.name || DEFAULT_VALUES.SHAPE);
            var canvasObject = event.target;
            canvasObject.set('generatedBy', generatedBy);
            if (event.target.shapeType === 'shape' &&
                !brushIsActive) {
                updatePenColor(event.target.stroke || DEFAULT_VALUES.PEN_COLOR);
                updateLineWidth(event.target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH);
            }
            else if (event.target.fill && !brushIsActive) {
                updateShapeColor(event.target.fill.toString() || DEFAULT_VALUES.SHAPE_COLOR);
            }
        }
        // Text Selected
        if (event.target && isText(event.target)) {
            var canvasObject = event.target;
            canvasObject.set('generatedBy', generatedBy);
            var newFont = event.target.fontFamily;
            var newFontColor = event.target.fill;
            if (newFont && newFontColor) {
                updateFontFamily(newFont);
                updateFontColor(newFontColor.toString());
            }
        }
    }, [reorderShapes, shapeIsActive, brushIsActive, generatedBy, updatePenColor, updateLineWidth, updateShape, updateShapeColor, updateFontFamily, updateFontColor]);
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
        var foundShape = null;
        canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (object) {
            if (event.pointer &&
                isEmptyShape(object) &&
                object.containsPoint(event.pointer) &&
                object !== event.target) {
                foundShape = object;
            }
        });
        if (event.pointer) {
            canvas === null || canvas === void 0 ? void 0 : canvas.trigger('mouse:down', {
                target: foundShape,
                pointer: {
                    x: event.pointer.x,
                    y: event.pointer.y,
                },
            });
        }
    }, [canvas]);
    /**
     * Set the given visibility in all the controls in the given object.
     * @param {ICanvasObject} object - Object to set controls visibility.
     * @param {boolean} visibility - Visibility state.
     */
    var setObjectControlsVisibility = function (object, visibility) {
        object.setControlsVisibility({
            bl: visibility,
            br: visibility,
            mb: visibility,
            ml: visibility,
            mr: visibility,
            mt: visibility,
            tl: visibility,
            tr: visibility,
            mtr: visibility,
        });
    };
    /**
     * Set the objects like evented if you select pointer or move tool
     */
    useEffect(function () {
        if (eventedObjects) {
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (object) {
                if (object.id && PainterEvents.isCreatedWithId(object.id, userId)) {
                    setObjectControlsVisibility(object, true);
                    object.set({
                        evented: true,
                        selectable: true,
                        lockMovementX: false,
                        lockMovementY: false,
                        hasBorders: true,
                        // TODO: This might not be the best place to set the generatedBy property. It might be better
                        // to set it whenever any object has been selected. It's required to be set because otherwise
                        // the events for movement wont be sent (because the generatedBy will either be outdated or not
                        // set at all).
                        generatedBy: generatedBy,
                    });
                }
            });
            actions.setHoverCursorObjects('move');
        }
    }, [actions, canvas, eventedObjects, generatedBy, userId]);
    /**
     * Manages the logic for Flood-fill Feature
     */
    useEffect(function () {
        var originalStroke = null;
        var originalFill = null;
        var originalBackground = null;
        var clickedColor = null;
        var differentFill = '#dcdcdc';
        var differentStroke = '#dbdbdb';
        var differentBackground = '#dadada';
        var isLocalShape = function (shape) {
            return shape.id && PainterEvents.isCreatedWithId(shape.id, userId);
        };
        if (floodFillIsActive && canvas && toolbarIsEnabled) {
            canvas.defaultCursor = "url(\"" + floodFillCursor + "\") 2 15, default";
            canvas.forEachObject(function (object) {
                setObjectControlsVisibility(object, false);
                object.set({
                    selectable: false,
                    evented: true,
                    lockMovementX: true,
                    lockMovementY: true,
                    hasBorders: false,
                    hoverCursor: isLocalShape(object)
                        ? "url(\"" + floodFillCursor + "\") 2 15, default"
                        : 'not-allowed',
                    perPixelTargetFind: isShape(object) ? false : true,
                });
            });
            reorderShapes();
            canvas.renderAll();
            canvas.on('mouse:down', function (event) {
                // Click out of any object
                if (!event.target) {
                    canvas.backgroundColor = floodFill;
                    var payload = {
                        type: 'background',
                        target: {
                            fill: floodFill,
                        },
                        id: '',
                    };
                    var eventState = {
                        event: __assign(__assign({}, payload), { id: userId + ":background" }),
                        type: 'colorChanged',
                    };
                    undoRedoDispatch({
                        type: SET,
                        payload: canvas.getObjects(),
                        canvasId: userId,
                        event: eventState,
                    });
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('colorChanged', generatedBy, payload);
                }
                // Click on object shape
                if (event.target &&
                    event.pointer &&
                    isEmptyShape(event.target) &&
                    event.target.id) {
                    // Store the current stroke and fill colors to reset them
                    originalStroke = event.target.stroke;
                    originalFill = event.target.fill;
                    originalBackground = canvas.backgroundColor;
                    // Change stroke to a provisional color to be identified
                    event.target.set({
                        stroke: differentStroke,
                        fill: differentFill,
                    });
                    canvas.backgroundColor = differentBackground;
                    canvas.renderAll();
                    clickedColor = getColorInCoord(event.pointer.x, event.pointer.y);
                    if (clickedColor === differentFill &&
                        event.target.id) {
                        // If user click inside of the shape
                        event.target.set({
                            fill: floodFill,
                            stroke: originalStroke,
                        });
                        canvas.discardActiveObject();
                        canvas.backgroundColor = originalBackground;
                        var payload = {
                            type: 'shape',
                            target: {
                                fill: event.target.fill,
                                objectsOrdering: canvas
                                    .getObjects()
                                    .map(function (obj, index) {
                                    return { id: obj.id, index: index };
                                }),
                            },
                            id: event.target.id || '',
                        };
                        var eventState = {
                            event: payload,
                            type: 'colorChanged',
                        };
                        undoRedoDispatch({
                            type: SET,
                            payload: canvas.getObjects(),
                            canvasId: userId,
                            event: eventState,
                        });
                        eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('colorChanged', generatedBy, payload);
                    }
                    else if (clickedColor === differentStroke) {
                        // If user click in the border of the shape
                        event.target.set({
                            stroke: originalStroke,
                            fill: originalFill,
                        });
                        canvas.backgroundColor = originalBackground;
                    }
                    else {
                        // If user click outside of the shape
                        event.target.set({
                            stroke: originalStroke,
                            fill: originalFill,
                        });
                        canvas.backgroundColor = originalBackground;
                        if (event.e) {
                            manageShapeOutsideClick(event);
                        }
                    }
                }
                canvas.renderAll();
            });
        }
        return function () {
            if (canvas) {
                canvas.defaultCursor = 'default';
            }
            if (!floodFillIsActive && eraseType !== 'object') {
                canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (object) {
                    object.set({
                        hoverCursor: 'default',
                        evented: false,
                        perPixelTargetFind: false,
                    });
                });
            }
            if (!textIsActive && eraseType !== 'object') {
                canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:down');
            }
        };
    }, [actions, canvas, floodFill, floodFillIsActive, getColorInCoord, manageShapeOutsideClick, userId, textIsActive, eventSerializer, reorderShapes, eraseType, undoRedoDispatch, toolbarIsEnabled, generatedBy]);
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
    var filterOutgoingEvents = useCallback(function (_id, eventGeneratedBy) {
        // NOTE: If there's no generatedBy it's assumed the event originated from a change made 
        // in the local canvas, in that case the event will always be sent. This way it's just 
        // important to make sure every remote change assigns the generatedBy value. Important
        // to note is that objects generatedBy value will remain. So if it's set from before
        // the event might not be sent.
        if (!eventGeneratedBy) {
            return true;
        }
        ;
        return eventGeneratedBy === generatedBy;
    }, [generatedBy]);
    var filterIncomingEvents = useCallback(function (id, eventGeneratedBy) {
        if (!eventGeneratedBy)
            return false;
        if (!eventSerializer)
            return true;
        var eventGroup = PainterEvents.getEventGroup(id);
        if (filterGroups === undefined && eventGroup !== undefined) {
            return false;
        }
        if (filterGroups !== undefined) {
            if (eventGroup === undefined) {
                return false;
            }
            if (filterGroups.find(function (group) { return eventGroup === group; }) === undefined) {
                return false;
            }
        }
        if (filterUsers !== undefined) {
            if (filterUsers.find(function (user) { return PainterEvents.isCreatedWithId(id, user); }) === undefined) {
                return false;
            }
        }
        return eventGeneratedBy !== generatedBy;
    }, [eventSerializer, filterGroups, filterUsers, generatedBy]);
    useSynchronizedAdded(canvas, userId, generatedBy, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedMoved(canvas, userId, generatedBy, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedRemoved(canvas, userId, generatedBy, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedRotated(canvas, userId, generatedBy, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedScaled(canvas, userId, generatedBy, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedSkewed(canvas, generatedBy, filterOutgoingEvents, filterIncomingEvents);
    useSynchronizedReconstruct(canvas, filterIncomingEvents, userId, undoRedoDispatch);
    useSynchronizedColorChanged(canvas, userId, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedFontFamilyChanged(canvas, filterIncomingEvents);
    useSynchronizedPointer(canvas, !allowPointer, universalPermits, filterIncomingEvents, userId, penColor, laserIsActive, allowPointer, generatedBy);
    useSynchronizedSetToolbarPermissions(canvas, userId, filterIncomingEvents, setToolbarIsEnabled);
    useSynchronizedFontColorChanged(canvas, userId, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedLineWidthChanged(canvas, userId, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedModified(canvas, generatedBy, filterOutgoingEvents, filterIncomingEvents, userId, undoRedoDispatch);
    /**
     * Send synchronization event for penColor changes.
     * */
    useEffect(function () {
        var objects = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObjects();
        if (objects && objects.length) {
            objects.forEach(function (obj) {
                var type = obj.get('type');
                if (obj.id && PainterEvents.isCreatedWithId(obj.id, userId) && type !== 'textbox') {
                    var target = function () {
                        return { stroke: obj.stroke };
                    };
                    var payload = {
                        type: type,
                        target: target(),
                        id: obj.id,
                    };
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('colorChanged', generatedBy, payload);
                }
            });
        }
        /* If isLocalObject is added on dependencies,
        an unecessary colorChange event is triggered */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvas, eventSerializer, userId, penColor, fontColor, undoRedoDispatch]);
    /**
     * Send synchronization event for lineWidth changes
     */
    useEffect(function () {
        var objects = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObjects();
        var validTypes = [
            'rect',
            'ellipse',
            'triangle',
            'polygon',
            'path',
        ];
        if (objects && objects.length) {
            objects.forEach(function (obj) {
                var type = obj.get('type');
                if (obj.id &&
                    PainterEvents.isCreatedWithId(obj.id, userId) &&
                    validTypes.includes(type)) {
                    var target = function () {
                        return { strokeWidth: lineWidth };
                    };
                    var payload = {
                        type: type,
                        target: target(),
                        id: obj.id,
                    };
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('lineWidthChanged', generatedBy, payload);
                }
            });
        }
    }, [canvas, eventSerializer, generatedBy, lineWidth, userId]);
    useEffect(function () {
        if (fontColor && canvas) {
            var obj = canvas.getActiveObject();
            if (!obj)
                return;
            var type = obj === null || obj === void 0 ? void 0 : obj.get('type');
            if (type !== 'textbox')
                return;
            var payload = {
                type: type,
                target: { fill: obj === null || obj === void 0 ? void 0 : obj.fill },
                id: obj === null || obj === void 0 ? void 0 : obj.id,
            };
            var event_1 = { event: payload, type: 'colorChanged' };
            undoRedoDispatch({
                type: SET,
                payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                canvasId: userId,
                event: event_1,
            });
        }
    }, [fontColor, canvas, undoRedoDispatch, userId]);
    useEffect(function () {
        if (penColor && canvas) {
            var obj = canvas.getActiveObject();
            if (!obj)
                return;
            var type = obj === null || obj === void 0 ? void 0 : obj.get('type');
            if (type === 'textbox')
                return;
            var payload = {
                type: type,
                target: { stroke: obj === null || obj === void 0 ? void 0 : obj.stroke },
                id: obj === null || obj === void 0 ? void 0 : obj.id,
            };
            var event_2 = { event: payload, type: 'colorChanged' };
            undoRedoDispatch({
                type: SET,
                payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                canvasId: userId,
                event: event_2,
            });
        }
    }, [penColor, canvas, undoRedoDispatch, userId]);
    useEffect(function () {
        if (lineWidth && canvas) {
            var obj = canvas.getActiveObject();
            if (!obj)
                return;
            var type = obj === null || obj === void 0 ? void 0 : obj.get('type');
            if (type === 'textbox')
                return;
            if ((obj === null || obj === void 0 ? void 0 : obj.strokeWidth) === lineWidth)
                return;
            var payload = {
                type: type,
                target: { strokeWidth: obj === null || obj === void 0 ? void 0 : obj.strokeWidth },
                id: obj === null || obj === void 0 ? void 0 : obj.id,
            };
            var event_3 = { event: payload, type: 'lineWidthChanged' };
            undoRedoDispatch({
                type: SET,
                payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                canvasId: userId,
                event: event_3,
            });
        }
    }, [lineWidth, canvas, undoRedoDispatch, userId]);
    useEffect(function () {
        var _a;
        if (canvas && fontFamily) {
            var obj = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
            var type_1 = obj === null || obj === void 0 ? void 0 : obj.get('type');
            if (type_1 === 'textbox' && obj) {
                var target = {
                    fontFamily: fontFamily,
                };
                var payload = {
                    type: type_1,
                    target: target,
                    id: obj === null || obj === void 0 ? void 0 : obj.id,
                };
                var event_4 = { event: payload, type: 'fontFamilyChanged' };
                obj.set({ fontFamily: fontFamily });
                undoRedoDispatch({
                    type: SET,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                    event: event_4,
                });
            }
            else if ((obj === null || obj === void 0 ? void 0 : obj.type) === 'activeSelection') {
                var events_1 = [];
                var eventId_1 = uuidv4();
                (_a = obj._objects) === null || _a === void 0 ? void 0 : _a.forEach(function (object) {
                    var payload = {
                        type: type_1,
                        target: { fontFamily: fontFamily },
                        id: object.id,
                    };
                    var event = { event: payload, type: 'activeSelection', eventId: eventId_1 };
                    events_1.push(event);
                    object.set({ fontFamily: fontFamily });
                });
                var mappedObjects = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().map(function (object) {
                    if (!object.group) {
                        return object.toJSON([
                            'strokeUniform',
                            'id',
                            'selectable',
                            'evented',
                            'shapeType',
                        ]);
                    }
                    var matrix = object.calcTransformMatrix();
                    var options = fabric.util.qrDecompose(matrix);
                    var transformed = object.toJSON([
                        'strokeUniform',
                        'id',
                        'selectable',
                        'evented',
                        'shapeType',
                    ]);
                    var top = object.group.height / 2 + object.top + object.group.top;
                    var left = object.group.width / 2 + object.left + object.group.left;
                    events_1.forEach(function (event) {
                        if (event.event.id === object.id) {
                            event.event.target.top = top;
                            event.event.target.left = left;
                        }
                    });
                    return __assign(__assign({}, transformed), { top: top,
                        left: left, scaleX: options.scaleX, scaleY: options.scaleY });
                });
                undoRedoDispatch({
                    type: SET_GROUP,
                    payload: mappedObjects,
                    canvasId: userId,
                    event: events_1,
                });
            }
        }
    }, [canvas, fontFamily, undoRedoDispatch, userId]);
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
        if (eraseType === 'object' && canvas && toolbarIsEnabled) {
            actions.eraseObject();
            if (canvas.getActiveObjects().length === 1) {
                canvas.discardActiveObject().renderAll();
            }
        }
        return function () {
            if (!textIsActive) {
                canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:down');
            }
            canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:up');
            canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:over');
        };
    }, [eraseType, canvas, actions, textIsActive, toolbarIsEnabled]);
    useEffect(function () {
        if (shape && shapeIsActive) {
            mouseDown(shape, shapeColor);
        }
        return function () {
            if (!textIsActive) {
                canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:down');
            }
            canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:move');
            canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:up');
        };
    }, [canvas, shape, shapeIsActive, mouseDown, shapeColor, textIsActive]);
    /**
     * If lineWidth variable changes and a free line drawing is selected
     * that drawing line width will changes to the selected width on Toolbar
     */
    useEffect(function () {
        if (canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObjects()) {
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
        var registerActions = actions;
        updateCanvasActions({ op: "add", value: registerActions });
        return function () {
            updateCanvasActions({ op: "remove", value: registerActions });
        };
    }, [actions, updateCanvasActions]);
    // TODO: Will be re-added once only one board is visible.
    /*
    const keyDown = (e: any) => {
      if (e.which === 90 && e.ctrlKey && !e.shiftKey) {
        undoRedoDispatch({ type: UNDO, canvasId: instanceId });
        return;
      }
  
      if (e.which === 89 && e.ctrlKey) {
        undoRedoDispatch({ type: REDO, canvasId: instanceId });
        return;
      }
    };
    */
    /**
     * Makes local objects unselectable when toolbar is disabled by the teacher.
     * */
    useEffect(function () {
        canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (object) {
            if (object.id && PainterEvents.isCreatedWithId(object.id, userId)) {
                object.set({
                    evented: toolbarIsEnabled,
                    selectable: toolbarIsEnabled,
                });
            }
        });
    }, [canvas, toolbarIsEnabled, userId]);
    /**
     * Request all events to be resent after canvas is created.
     */
    useEffect(function () {
        if (!canvas)
            return;
        requestAllEvents();
    }, [canvas, requestAllEvents, userId, filterGroups, filterUsers]);
    return (React.createElement("canvas", { width: pixelWidth, height: pixelHeight, id: instanceId, style: initialStyle, tabIndex: 0, onClick: function () {
            actions.addShape(shape);
        } }, children));
};
//# sourceMappingURL=WhiteboardCanvas.js.map