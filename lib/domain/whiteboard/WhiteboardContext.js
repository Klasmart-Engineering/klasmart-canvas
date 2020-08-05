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
import { v4 as uuidv4 } from 'uuid';
import React, { createContext, useCallback, useEffect, useState, } from 'react';
// @ts-ignore
import FontFaceObserver from 'fontfaceobserver';
import { fabric } from 'fabric';
import * as shapes from './shapes/shapes';
import { useText } from './hooks/useText';
import { useFontFamily } from './hooks/useFontFamily';
import { useShapeColor } from './hooks/useShapeColor';
import { useShape } from './hooks/useShape';
import { useWhiteboardClearModal } from './hooks/useWhiteboardClearModal';
import { setSize, setCircleSize, setPathSize } from './utils/scaling';
import { usePointerEvents } from './hooks/usePointerEvents';
import { useFontColor } from './hooks/useFontColor';
import { useTextIsActive } from './hooks/useTextIsActive';
import { useShapeIsActive } from './hooks/useShapeIsActive';
import { useBrushIsActive } from './hooks/useBrushIsActive';
import './whiteboard.css';
import { useEraseType } from './hooks/useEraseType';
import { DEFAULT_VALUES } from '../../config/toolbar-default-values';
import { useSharedEventSerializer } from './SharedEventSerializerProvider';
import { EventPainterController } from './event-serializer/EventPainterController';
import { PainterEvents } from './event-serializer/PainterEvents';
// @ts-ignore
export var WhiteboardContext = createContext();
export var WhiteboardProvider = function (_a) {
    var children = _a.children, canvasId = _a.canvasId, canvasWidth = _a.canvasWidth, canvasHeight = _a.canvasHeight, toolbar = _a.toolbar;
    var _b = useText(), text = _b.text, updateText = _b.updateText;
    var _c = useFontColor(), fontColor = _c.fontColor, updateFontColor = _c.updateFontColor;
    var _d = useFontFamily(), fontFamily = _d.fontFamily, updateFontFamily = _d.updateFontFamily;
    var _e = useShapeColor(), shapeColor = _e.shapeColor, updateShapeColor = _e.updateShapeColor;
    var _f = useShape(), shape = _f.shape, updateShape = _f.updateShape;
    var _g = useEraseType(), eraseType = _g.eraseType, updateEraseType = _g.updateEraseType;
    var _h = usePointerEvents(false), pointerEvents = _h.pointerEvents, setPointerEvents = _h.setPointerEvents;
    var _j = useState(undefined), canvas = _j[0], setCanvas = _j[1];
    var _k = useWhiteboardClearModal(), ClearWhiteboardModal = _k.ClearWhiteboardModal, openModal = _k.openModal, closeModal = _k.closeModal;
    var _l = useTextIsActive(), textIsActive = _l.textIsActive, updateTextIsActive = _l.updateTextIsActive;
    var _m = useShapeIsActive(), shapeIsActive = _m.shapeIsActive, updateShapeIsActive = _m.updateShapeIsActive;
    var _o = useBrushIsActive(), brushIsActive = _o.brushIsActive, updateBrushIsActive = _o.updateBrushIsActive;
    // Provisional (just for change value in Toolbar selectors) they can be modified in the future
    var _p = useState(DEFAULT_VALUES.POINTER), pointer = _p[0], updatePointer = _p[1];
    var _q = useState(DEFAULT_VALUES.PEN_LINE), penLine = _q[0], updatePenLine = _q[1];
    var _r = useState(DEFAULT_VALUES.PEN_COLOR), penColor = _r[0], updatePenColor = _r[1];
    var _s = useState(DEFAULT_VALUES.THICKNESS), thickness = _s[0], updateThickness = _s[1];
    var _t = useState(DEFAULT_VALUES.FLOOD_FILL), floodFill = _t[0], updateFloodFill = _t[1];
    var _u = useState(DEFAULT_VALUES.STAMP), stamp = _u[0], updateStamp = _u[1];
    // Event serialization for synchronizing whiteboard state.
    var eventSerializer = useSharedEventSerializer().state.eventSerializer;
    var _v = useState(), remotePainter = _v[0], setRemotePainter = _v[1];
    var isLocalObject = function (id, canvasId) {
        var object = id.split(':');
        if (!object.length) {
            throw new Error('Invalid ID');
        }
        return object[0] === canvasId;
    };
    /**
     * Creates Canvas/Whiteboard instance
     */
    useEffect(function () {
        // @ts-ignore
        var canvasInstance = new fabric.Canvas(canvasId, {
            backgroundColor: undefined,
            width: Number(canvasWidth),
            height: Number(canvasHeight),
            isDrawingMode: false,
        });
        setCanvas(canvasInstance);
    }, [canvasHeight, canvasWidth, canvasId]);
    /**
     * Set up the EventPainterController (remotePainter) it will handle incoming
     * events (from the server) and convert those into commands we can use for
     * updating our local whiteboard.
     */
    useEffect(function () {
        if (!eventSerializer)
            return;
        var remotePainter = new EventPainterController();
        // NOTE: We will receive events from the server as arrays of serialized
        // events. When joining a room the user will receive a big list of events
        // of all that's been painted so far. After they received the initial big
        // list the will receive individual events or smaller chunks of events as
        // others users (and themselves) interact more with the whiteboard.
        // The function receiving events might look like this:
        var handleRemoteEvent = function (payload) {
            // IMPORTANT: We should keep in mind the user's own events
            // will appear in this list as well. The server doesn't do
            // any filtering based on the user at this point.
            // Once the events have been received, there needs to be some code
            // transforming the event data into commands for drawing or updating
            // objects on the canvas.
            remotePainter.handlePainterEvent([payload]);
        };
        // NOTE: This handler simulates receiving events from the server
        // usually we wouldn't feed remote events directly in to the event
        // serializer.
        eventSerializer.on('event', handleRemoteEvent);
        setRemotePainter(remotePainter);
        return function () {
            eventSerializer.removeListener('event', handleRemoteEvent);
        };
    }, [eventSerializer]);
    /**
     * Handles the logic to write text on the whiteboard
     * */
    useEffect(function () {
        var _a;
        if (textIsActive) {
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('mouse:down', function (options) {
                var _a, _b;
                if (options.target === null) {
                    var text_1 = new fabric.IText(' ', {
                        fontFamily: fontFamily,
                        fontSize: 30,
                        fontWeight: 400,
                        fill: fontColor,
                        fontStyle: 'normal',
                        top: options.e.offsetY,
                        left: options.e.offsetX,
                        cursorDuration: 500,
                    });
                    canvas.add(text_1);
                    canvas.setActiveObject(text_1);
                    text_1.enterEditing();
                    (_b = (_a = text_1) === null || _a === void 0 ? void 0 : _a.hiddenTextarea) === null || _b === void 0 ? void 0 : _b.focus();
                    text_1.on('editing:exited', function () {
                        var _a, _b;
                        var textCopy = text_1.text;
                        var toObject = text_1.toObject();
                        delete toObject.text;
                        delete toObject.type;
                        var clonedTextObj = JSON.parse(JSON.stringify(toObject));
                        clonedTextObj.id = canvasId + ":" + uuidv4();
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
        canvasId,
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
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.color = penColor || '#000';
            canvas.freeDrawingBrush.width = 10;
        }
        else if (canvas && !brushIsActive) {
            canvas.isDrawingMode = false;
        }
    }, [brushIsActive, canvas, penColor]);
    /**
     * Disables shape canvas mouse events.
     */
    useEffect(function () {
        if (!shapeIsActive && canvas) {
            canvas.off('mouse:move');
            canvas.off('mouse:up');
            canvas.off('mouse:down');
        }
    }, [shapeIsActive, canvas]);
    /**
     * General handler for keyboard events
     * 'Backspace' event for removing selected element from whiteboard
     * 'Escape' event for deselect active objects
     * */
    var keyDownHandler = useCallback(function (e) {
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
                canvas.getActiveObject().set("fontFamily", font);
                canvas.requestRenderAll();
            }
        })
            .catch(function (e) {
            console.log(e);
        });
    }, [canvas]);
    /**
     * Add keyboard keydown event listener. It listen keyDownHandler function
     * Invokes fontFamilyLoader to set default and selected font family
     * */
    useEffect(function () {
        document.addEventListener('keydown', keyDownHandler, false);
        fontFamilyLoader(fontFamily);
    }, [fontFamily, keyDownHandler, fontFamilyLoader]);
    /**
     * Deselect the actual selected object
     */
    var discardActiveObject = function () {
        canvas.discardActiveObject().renderAll();
    };
    /**
     * Handles PainterEvents
     * */
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('path:created', function (e) {
            var _a;
            e.path.id = PainterEvents.createId(canvasId); // fabric.Object.__uid++;
            var target = {
                stroke: e.path.stroke,
                strokeWidth: e.path.strokeWidth,
                path: e.path.path,
            };
            (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('added', PainterEvents.pathCreated(target, e.path.id, canvasId));
        });
        (_b = canvas) === null || _b === void 0 ? void 0 : _b.on('object:added', function (e) {
            var _a;
            if (!e.target.id) {
                return;
            }
            if (isLocalObject(e.target.id, canvasId)) {
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
                // Serialize the event for synchronization
                (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('added', payload);
            }
        });
        (_c = canvas) === null || _c === void 0 ? void 0 : _c.on('object:moved', function (e) {
            var _a;
            var type = e.target.get('type');
            if (type === 'activeSelection') {
                e.target._objects.forEach(function (activeObject) {
                    var _a;
                    if (isLocalObject(activeObject.id, canvasId)) {
                        var target = {
                            top: e.target.top + activeObject.top + e.target.height / 2,
                            left: e.target.left + activeObject.left + e.target.width / 2,
                            angle: activeObject.angle,
                        };
                        var payload = {
                            type: type,
                            target: target,
                            id: activeObject.id,
                        };
                        (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('moved', payload);
                    }
                });
                return;
            }
            if (!e.target.id) {
                return;
            }
            if (isLocalObject(e.target.id, canvasId)) {
                var target = {
                    top: e.target.top,
                    left: e.target.left,
                    angle: e.target.angle,
                };
                var payload = {
                    type: type,
                    target: target,
                    id: e.target.id,
                };
                (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('moved', payload);
            }
        });
        (_d = canvas) === null || _d === void 0 ? void 0 : _d.on('object:rotated', function (e) {
            var _a;
            if (!e.target.id) {
                return;
            }
            var id = e.target.id;
            var type = e.target.get('type');
            var target = {
                angle: e.target.angle,
                top: e.target.top,
                left: e.target.left,
            };
            var payload = {
                type: type,
                target: target,
                id: id,
            };
            (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('rotated', payload);
        });
        (_e = canvas) === null || _e === void 0 ? void 0 : _e.on('object:scaled', function (e) {
            var _a;
            if (!e.target.id) {
                return;
            }
            if (isLocalObject(e.target.id, canvasId)) {
                var type = e.target.get('type');
                var target = {
                    top: e.target.top,
                    left: e.target.left,
                    angle: e.target.angle,
                    scaleX: e.target.scaleX,
                    scaleY: e.target.scaleY,
                    flipX: e.target.flipX,
                    flipY: e.target.flipY,
                };
                var payload = {
                    type: type,
                    target: target,
                    id: e.target.id,
                };
                // Serialize the event for synchronization
                (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('scaled', payload);
            }
        });
        (_f = canvas) === null || _f === void 0 ? void 0 : _f.on('object:skewed', function (e) {
            var _a;
            if (!e.target.id) {
                return;
            }
            if (isLocalObject(e.target.id, canvasId)) {
                var type = e.target.get('type');
                var target = {
                    top: e.target.top,
                    left: e.target.left,
                    angle: e.target.angle,
                    scaleX: e.target.scaleX,
                    scaleY: e.target.scaleY,
                    skewX: e.target.skewX,
                    skewY: e.target.skewY,
                };
                var payload = {
                    type: type,
                    target: target,
                    id: e.target.id,
                };
                // Serialize the event for synchronization
                (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('skewed', payload);
            }
        });
        (_g = canvas) === null || _g === void 0 ? void 0 : _g.on('object:modified', function (e) {
            var _a;
            if (!e.target.id) {
                return;
            }
            if (isLocalObject(e.target.id, canvasId)) {
                var type = e.target.get('type');
                // If text has been modified
                if (type === 'textbox') {
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
                    // Serialize the event for synchronization
                    (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('modified', payload);
                }
            }
        });
        (_h = canvas) === null || _h === void 0 ? void 0 : _h.on('object:removed', function (e) {
            var _a;
            if (!e.target.id) {
                return;
            }
            if (isLocalObject(e.target.id, canvasId)) {
                var payload = {
                    id: e.target.id,
                };
                // Serialize the event for synchronization
                (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('removed', payload);
            }
        });
        (_j = remotePainter) === null || _j === void 0 ? void 0 : _j.on('added', function (id, objectType, target) {
            // TODO: We'll want to filter events based on the user ID. This can
            // be done like this. Example of extracting user id from object ID:
            // let { user } = new ShapeID(id);
            // Help!
            // if (eventSerializer?.didSerializeEvent(id)) return;
            var _a, _b;
            // TODO: We'll have to replace this with the user based filtering. Because
            // we want to allow bi-directional events (Teacher <-> Student) as opposed
            // to (Teacher --> Student).
            // Events come from another user
            // Pass as props to user context
            // Ids of shapes + userId  uuid()
            if (!id) {
                return;
            }
            // No queremos agregar nuestros propios eventos
            if (isLocalObject(id, canvasId))
                return;
            if (objectType === 'textbox') {
                var text_2 = new fabric.Textbox(target.text, {
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
                text_2.id = id;
                (_a = canvas) === null || _a === void 0 ? void 0 : _a.add(text_2);
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
            }
        });
        (_k = remotePainter) === null || _k === void 0 ? void 0 : _k.on('moved', function (id, target) {
            // if (eventSerializer?.didSerializeEvent(id)) return;
            var _a, _b;
            if (!id) {
                return;
            }
            // No queremos agregar nuestros propios eventos
            if (isLocalObject(id, canvasId))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    obj.set({
                        angle: target.angle,
                        top: target.top,
                        left: target.left,
                    });
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        });
        (_l = remotePainter) === null || _l === void 0 ? void 0 : _l.on('rotated', function (id, target) {
            var _a, _b;
            //if (eventSerializer?.didSerializeEvent(id)) return;
            if (isLocalObject(id, canvasId))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    obj.set({
                        angle: target.angle,
                        top: target.top,
                        left: target.left,
                    });
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        });
        (_m = remotePainter) === null || _m === void 0 ? void 0 : _m.on('scaled', function (id, target) {
            var _a, _b;
            //if (eventSerializer?.didSerializeEvent(id)) return;
            if (isLocalObject(id, canvasId))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    obj.set({
                        angle: target.angle,
                        top: target.top,
                        left: target.left,
                        scaleX: target.scaleX,
                        scaleY: target.scaleY,
                        flipX: target.flipX,
                        flipY: target.flipY,
                    });
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        });
        (_o = remotePainter) === null || _o === void 0 ? void 0 : _o.on('skewed', function (id, target) {
            var _a, _b;
            //if (eventSerializer?.didSerializeEvent(id)) return;
            if (isLocalObject(id, canvasId))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    obj.set({
                        angle: target.angle,
                        top: target.top,
                        left: target.left,
                        scaleX: target.scaleX,
                        scaleY: target.scaleY,
                        flipX: target.flipX,
                        flipY: target.flipY,
                        skewX: target.skewX,
                        skewY: target.skewY,
                    });
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        });
        (_p = remotePainter) === null || _p === void 0 ? void 0 : _p.on('colorChanged', function (id, objectType, target) {
            var _a, _b;
            //if (eventSerializer?.didSerializeEvent(id)) return;
            if (isLocalObject(id, canvasId))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    if (objectType === 'textbox') {
                        obj.set({
                            fill: target.fill,
                        });
                    }
                    else {
                        obj.set({
                            stroke: target.stroke,
                        });
                    }
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        });
        (_q = remotePainter) === null || _q === void 0 ? void 0 : _q.on('modified', function (id, objectType, target) {
            // if (eventSerializer?.didSerializeEvent(id)) return;
            var _a, _b;
            if (isLocalObject(id, canvasId))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    if (objectType === 'textbox') {
                        obj.set({
                            text: target.text,
                            fontFamily: target.fontFamily,
                            stroke: target.fill,
                            top: target.top,
                            left: target.left,
                            width: target.width,
                        });
                    }
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        });
        (_r = remotePainter) === null || _r === void 0 ? void 0 : _r.on('fontFamilyChanged', function (id, target) {
            // if (eventSerializer?.didSerializeEvent(id)) return;
            var _a, _b;
            if (isLocalObject(id, canvasId))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    obj.set({
                        fontFamily: target.fontFamily,
                    });
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        });
        (_s = remotePainter) === null || _s === void 0 ? void 0 : _s.on('removed', function (id) {
            // if (eventSerializer?.didSerializeEvent(id)) return;
            var _a, _b;
            if (isLocalObject(id, canvasId))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                var _a;
                if (obj.id && obj.id === id) {
                    (_a = canvas) === null || _a === void 0 ? void 0 : _a.remove(obj);
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        });
    }, [text, canvas, eventSerializer, remotePainter, canvasId]);
    /**
     * Send synchronization event for penColor and fontColor changes.
     * */
    useEffect(function () {
        var _a;
        var objects = (_a = canvas) === null || _a === void 0 ? void 0 : _a.getActiveObjects();
        if (objects && objects.length) {
            objects.forEach(function (obj) {
                var _a;
                if (isLocalObject(obj.id, canvasId)) {
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
                    (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('colorChanged', payload);
                }
            });
        }
    }, [canvas, eventSerializer, canvasId, penColor, fontColor]);
    /**
     * Send synchronization event for fontFamily changes.
     * */
    useEffect(function () {
        var _a;
        var objects = (_a = canvas) === null || _a === void 0 ? void 0 : _a.getActiveObjects();
        if (objects && objects.length) {
            objects.forEach(function (obj) {
                var _a;
                if (isLocalObject(obj.id, canvasId)) {
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
    }, [canvas, eventSerializer, canvasId, fontFamily]);
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
            eraseObject();
            if (canvas.getActiveObjects().length === 1) {
                canvas.discardActiveObject().renderAll();
            }
        }
        else if (canvas) {
            setCanvasSelection(true);
        }
        return function () {
            var _a, _b, _c;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('mouse:down');
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.off('mouse:up');
            (_c = canvas) === null || _c === void 0 ? void 0 : _c.off('mouse:over');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eraseType, canvas]);
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
        canvas.on('mouse:move', function (e) {
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
            if (e.pointer) {
                if (coordsStart.x > e.pointer.x) {
                    anchor = __assign(__assign({}, anchor), { originX: 'right' });
                }
                if (coordsStart.y > e.pointer.y) {
                    anchor = __assign(__assign({}, anchor), { originY: 'bottom' });
                }
            }
            shape.set(anchor);
            canvas.renderAll();
        });
    }, [canvas]);
    /**
     * Clears all mouse event listeners from canvas.
     */
    var clearMouseEvents = useCallback(function () {
        canvas.off('mouse:move');
        canvas.off('mouse:up');
    }, [canvas]);
    var clearOnMouseEvent = useCallback(function () {
        canvas.off('mouse:down');
    }, [canvas]);
    /**
     * Mouse up event listener for canvas.
     */
    var mouseUp = useCallback(function (shape, coordsStart, specific) {
        canvas.on('mouse:up', function (e) {
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
    }, [canvas]);
    /**
     * Mouse down event listener for canvas.
     * @param shape Shape being added on canvas.
     * @param isCircle Indicates if shape is a circle.
     */
    var mouseDown = useCallback(function (specific, color) {
        canvas.on('mouse:down', function (e) {
            if (e.target) {
                return;
            }
            if (!e.pointer) {
                return;
            }
            var shape = shapeSelector(specific);
            shape.set({
                top: e.pointer.y,
                left: e.pointer.x,
                fill: color || shapeColor,
            });
            clearOnMouseEvent();
            mouseMove(shape, e.pointer, specific);
            mouseUp(shape, e.pointer, specific);
            canvas.add(shape);
        });
    }, [canvas, clearOnMouseEvent, mouseMove, mouseUp, shapeColor, shapeSelector]);
    /**
     * Add specific shape to whiteboard
     * */
    var addShape = function (specific) {
        // Required to prevent multiple shapes add at once
        // if user clicked more than one shape during selection.
        if (!shapeIsActive) {
            return;
        }
        clearOnMouseEvent();
        clearMouseEvents();
        mouseDown(specific || shape, shapeColor);
    };
    var changeStrokeColor = function (color) {
        updatePenColor(color);
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set('stroke', color);
            canvas.renderAll();
        }
    };
    /**
     * Add specific color to selected shape
     * */
    var fillColor = function (color) {
        updateShapeColor(color);
        clearOnMouseEvent();
        clearMouseEvents();
        mouseDown(shape, color);
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set('fill', color);
            canvas.renderAll();
        }
    };
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
     * Add specific color to selected text
     * @param {string} color - color to set
     */
    var textColor = function (color) {
        updateFontColor(color);
        var activeObject = canvas.getActiveObject();
        if (activeObject.text) {
            activeObject.set('fill', color);
            // @ts-ignore
            canvas.renderAll();
        }
    };
    /**
     * Clears all whiteboard elements
     * */
    var clearWhiteboard = function () {
        canvas.clear();
        canvas.backgroundColor = 'white';
        canvas.renderAll();
        closeModal();
    };
    /**
     * Opens ClearWhiteboardModal
     */
    var openClearWhiteboardModal = function () {
        openModal();
    };
    /**
     * Creates the listeners to erase objects from the whiteboard
     */
    var eraseObject = function () {
        var eraser = false;
        var activeObjects = null;
        // Deactivate selection
        setCanvasSelection(false);
        // When mouse down eraser is able to remove objects
        canvas.on('mouse:down', function (e) {
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
        canvas.on('mouse:over', function (e) {
            if (!eraser) {
                return false;
            }
            canvas.remove(e.target);
            canvas.renderAll();
        });
        // When mouse up eraser is unable to remove objects
        canvas.on('mouse:up', function () {
            if (!eraser) {
                return false;
            }
            eraser = false;
        });
    };
    /**
     * Set Canvas Whiteboard selection ability
     * @param {boolean} selection - value to set in canvas and objects selection
     */
    var setCanvasSelection = function (selection) {
        var _a;
        canvas.selection = selection;
        canvas.forEachObject(function (object) {
            object.selectable = selection;
        });
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.renderAll();
    };
    /**
     * List of available colors in toolbar
     * */
    var colorsList = [
        'black',
        'red',
        'yellow',
        'green',
        'blue',
        'purple',
        'brown',
    ];
    var value = {
        fontFamily: fontFamily,
        fontColor: fontColor,
        updateFontFamily: updateFontFamily,
        colorsList: colorsList,
        fillColor: fillColor,
        textColor: textColor,
        shape: shape,
        shapeColor: shapeColor,
        updateShape: updateShape,
        addShape: addShape,
        text: text,
        updateText: updateText,
        discardActiveObject: discardActiveObject,
        openClearWhiteboardModal: openClearWhiteboardModal,
        clearWhiteboard: clearWhiteboard,
        pointerEvents: pointerEvents,
        eraseObject: eraseObject,
        eraseType: eraseType,
        updateEraseType: updateEraseType,
        textIsActive: textIsActive,
        updateTextIsActive: updateTextIsActive,
        shapeIsActive: shapeIsActive,
        updateShapeIsActive: updateShapeIsActive,
        brushIsActive: brushIsActive,
        updateBrushIsActive: updateBrushIsActive,
        updateFontColor: updateFontColor,
        // Just for control selectors' value they can be modified in the future
        pointer: pointer,
        updatePointer: updatePointer,
        penLine: penLine,
        updatePenLine: updatePenLine,
        penColor: penColor,
        updatePenColor: updatePenColor,
        thickness: thickness,
        updateThickness: updateThickness,
        floodFill: floodFill,
        updateFloodFill: updateFloodFill,
        stamp: stamp,
        updateStamp: updateStamp,
        setPointerEvents: setPointerEvents,
        changeStrokeColor: changeStrokeColor,
    };
    return (React.createElement(WhiteboardContext.Provider, { value: value },
        React.createElement(ClearWhiteboardModal, { clearWhiteboard: clearWhiteboard }),
        React.createElement("div", { className: "whiteboard" },
            toolbar,
            React.createElement("div", { style: {
                    border: '1px solid black',
                    width: canvasWidth + 'px',
                    height: canvasHeight + 'px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    backgroundColor: 'white',
                } },
                children,
                React.createElement("div", { className: "canvas-wrapper", style: {
                        width: canvasWidth + 'px',
                        height: canvasHeight + 'px',
                        position: 'absolute',
                        pointerEvents: pointerEvents ? 'auto' : 'none',
                    }, onClick: function () {
                        addShape();
                    } },
                    React.createElement("canvas", { id: canvasId }))))));
};
//# sourceMappingURL=WhiteboardContext.js.map