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
import { v4 as uuidv4 } from 'uuid';
import React, { useCallback, useContext, useEffect, useState, } from 'react';
import { useSharedEventSerializer } from './SharedEventSerializerProvider';
import { WhiteboardContext } from './WhiteboardContext';
// @ts-ignore
import FontFaceObserver from 'fontfaceobserver';
import { PainterEvents } from './event-serializer/PainterEvents';
import { useCanvasActions } from './canvas-actions/useCanvasActions';
export var WhiteboardCanvas = function (_a) {
    var children = _a.children, instanceId = _a.instanceId, userId = _a.userId, style = _a.style, pointerEvents = _a.pointerEvents, width = _a.width, height = _a.height, filterUsers = _a.filterUsers;
    var _b = useState(), canvas = _b[0], setCanvas = _b[1];
    // Event serialization for synchronizing whiteboard state.
    var _c = useSharedEventSerializer().state, eventSerializer = _c.eventSerializer, eventController = _c.eventController;
    var _d = useContext(WhiteboardContext), brushIsActive = _d.brushIsActive, textIsActive = _d.textIsActive, shapeIsActive = _d.shapeIsActive, fontFamily = _d.fontFamily, updateFontFamily = _d.updateFontFamily, fontColor = _d.fontColor, updateFontColor = _d.updateFontColor, penColor = _d.penColor, isLocalObject = _d.isLocalObject, eraseType = _d.eraseType, shape = _d.shape, shapeColor = _d.shapeColor, updateCanvasActions = _d.updateCanvasActions;
    var _e = useCanvasActions(canvas), actions = _e.actions, mouseDown = _e.mouseDown;
    /**
     * Creates Canvas/Whiteboard instance
     */
    useEffect(function () {
        // @ts-ignore
        var canvasInstance = new fabric.Canvas(instanceId, {
            backgroundColor: undefined,
            isDrawingMode: false,
        });
        setCanvas(canvasInstance);
    }, [instanceId]);
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
                canvas.getActiveObject().set('fontFamily', font);
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
     * Handles events emitted from the event controller (remote).
     */
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var added = function (id, objectType, target) {
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
            if (isLocalObject(id, userId))
                return;
            console.log("remote path created: " + id);
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
            }
        };
        var moved = function (id, objectType, target) {
            var _a, _b;
            if (!id) {
                return;
            }
            if (isLocalObject(id, userId))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    if (objectType === 'activeSelection') {
                        obj.set({
                            angle: target.angle,
                            top: target.top,
                            left: target.left,
                            originX: 'center',
                            originY: 'center',
                        });
                    }
                    else {
                        obj.set({
                            angle: target.angle,
                            top: target.top,
                            left: target.left,
                            originX: 'left',
                            originY: 'top',
                        });
                    }
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        };
        var rotated = function (id, objectType, target) {
            var _a, _b;
            if (isLocalObject(id, userId))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    if (objectType === 'activeSelection') {
                        obj.set({
                            angle: target.angle,
                            top: target.top,
                            left: target.left,
                            originX: 'center',
                            originY: 'center',
                        });
                    }
                    else {
                        obj.set({
                            angle: target.angle,
                            top: target.top,
                            left: target.left,
                            originX: 'left',
                            originY: 'top',
                        });
                    }
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        };
        var scaled = function (id, target) {
            var _a, _b;
            //if (eventSerializer?.didSerializeEvent(id)) return;
            if (isLocalObject(id, userId))
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
        };
        var skewed = function (id, target) {
            var _a, _b;
            //if (eventSerializer?.didSerializeEvent(id)) return;
            if (isLocalObject(id, userId))
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
        };
        var colorChanged = function (id, objectType, target) {
            var _a, _b;
            //if (eventSerializer?.didSerializeEvent(id)) return;
            if (isLocalObject(id, userId))
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
        };
        var modified = function (id, objectType, target) {
            // if (eventSerializer?.didSerializeEvent(id)) return;
            var _a, _b;
            if (isLocalObject(id, userId))
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
        };
        var fontFamilyChanged = function (id, target) {
            // if (eventSerializer?.didSerializeEvent(id)) return;
            var _a, _b;
            if (isLocalObject(id, userId))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    obj.set({
                        fontFamily: target.fontFamily,
                    });
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        };
        var removed = function (id) {
            // if (eventSerializer?.didSerializeEvent(id)) return;
            var _a, _b;
            if (isLocalObject(id, userId))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                var _a;
                if (obj.id && obj.id === id) {
                    (_a = canvas) === null || _a === void 0 ? void 0 : _a.remove(obj);
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        };
        // TODO: Use the filterUsers property to ignore events coming from
        // users not in that array (if the array is defined).
        (_a = eventController) === null || _a === void 0 ? void 0 : _a.on('added', added);
        (_b = eventController) === null || _b === void 0 ? void 0 : _b.on('moved', moved);
        (_c = eventController) === null || _c === void 0 ? void 0 : _c.on('rotated', rotated);
        (_d = eventController) === null || _d === void 0 ? void 0 : _d.on('scaled', scaled);
        (_e = eventController) === null || _e === void 0 ? void 0 : _e.on('skewed', skewed);
        (_f = eventController) === null || _f === void 0 ? void 0 : _f.on('colorChanged', colorChanged);
        (_g = eventController) === null || _g === void 0 ? void 0 : _g.on('modified', modified);
        (_h = eventController) === null || _h === void 0 ? void 0 : _h.on('fontFamilyChanged', fontFamilyChanged);
        (_j = eventController) === null || _j === void 0 ? void 0 : _j.on('removed', removed);
        return function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            (_a = eventController) === null || _a === void 0 ? void 0 : _a.removeListener('added', added);
            (_b = eventController) === null || _b === void 0 ? void 0 : _b.removeListener('moved', moved);
            (_c = eventController) === null || _c === void 0 ? void 0 : _c.removeListener('rotated', rotated);
            (_d = eventController) === null || _d === void 0 ? void 0 : _d.removeListener('scaled', scaled);
            (_e = eventController) === null || _e === void 0 ? void 0 : _e.removeListener('skewed', skewed);
            (_f = eventController) === null || _f === void 0 ? void 0 : _f.removeListener('colorChanged', colorChanged);
            (_g = eventController) === null || _g === void 0 ? void 0 : _g.removeListener('modified', modified);
            (_h = eventController) === null || _h === void 0 ? void 0 : _h.removeListener('fontFamilyChanged', fontFamilyChanged);
            (_j = eventController) === null || _j === void 0 ? void 0 : _j.removeListener('removed', removed);
        };
    }, [canvas, eventController, isLocalObject, userId]);
    /**
     * Handles events emitted from the canvas.
     * */
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var pathCreated = function (e) {
            var _a;
            e.path.id = PainterEvents.createId(userId); // fabric.Object.__uid++;
            console.log("local path created: " + e.path.id);
            var target = {
                stroke: e.path.stroke,
                strokeWidth: e.path.strokeWidth,
                path: e.path.path,
            };
            (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('added', PainterEvents.pathCreated(target, e.path.id, userId));
        };
        var objectAdded = function (e) {
            var _a;
            if (!e.target.id) {
                return;
            }
            if (isLocalObject(e.target.id, userId)) {
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
                (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('added', payload);
            }
        };
        var objectMoved = function (e) {
            var _a;
            var type = e.target.get('type');
            if (type === 'activeSelection') {
                e.target._objects.forEach(function (activeObject) {
                    var _a;
                    if (isLocalObject(activeObject.id, userId)) {
                        var matrix = activeObject.calcTransformMatrix();
                        var options = fabric.util.qrDecompose(matrix);
                        var target = {
                            top: options.translateY,
                            left: options.translateX,
                            angle: options.angle,
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
            if (isLocalObject(e.target.id, userId)) {
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
        };
        var objectRotated = function (e) {
            var _a;
            var type = e.target.get('type');
            if (type === 'activeSelection') {
                //object is your desired object inside the group.
                e.target._objects.forEach(function (activeObject) {
                    var _a;
                    if (isLocalObject(activeObject.id, userId)) {
                        var matrix = activeObject.calcTransformMatrix();
                        var options = fabric.util.qrDecompose(matrix);
                        var target_1 = {
                            top: options.translateY,
                            left: options.translateX,
                            angle: options.angle,
                        };
                        var payload_1 = {
                            type: type,
                            target: target_1,
                            id: activeObject.id,
                        };
                        (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('rotated', payload_1);
                    }
                });
                return;
            }
            if (!e.target.id) {
                return;
            }
            var id = e.target.id;
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
        };
        var objectScaled = function (e) {
            var _a;
            if (!e.target.id) {
                return;
            }
            if (isLocalObject(e.target.id, userId)) {
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
                (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('scaled', payload);
            }
        };
        var objectSkewed = function (e) {
            var _a;
            if (!e.target.id) {
                return;
            }
            if (isLocalObject(e.target.id, userId)) {
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
                (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('skewed', payload);
            }
        };
        var objectModified = function (e) {
            var _a;
            if (!e.target.id) {
                return;
            }
            if (isLocalObject(e.target.id, userId)) {
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
                    (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('modified', payload);
                }
            }
        };
        var objectRemoved = function (e) {
            var _a;
            if (!e.target.id) {
                return;
            }
            if (isLocalObject(e.target.id, userId)) {
                var payload = {
                    id: e.target.id,
                };
                (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('removed', payload);
            }
        };
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('path:created', pathCreated);
        (_b = canvas) === null || _b === void 0 ? void 0 : _b.on('object:added', objectAdded);
        (_c = canvas) === null || _c === void 0 ? void 0 : _c.on('object:moved', objectMoved);
        (_d = canvas) === null || _d === void 0 ? void 0 : _d.on('object:rotated', objectRotated);
        (_e = canvas) === null || _e === void 0 ? void 0 : _e.on('object:scaled', objectScaled);
        (_f = canvas) === null || _f === void 0 ? void 0 : _f.on('object:skewed', objectSkewed);
        (_g = canvas) === null || _g === void 0 ? void 0 : _g.on('object:modified', objectModified);
        (_h = canvas) === null || _h === void 0 ? void 0 : _h.on('object:removed', objectRemoved);
        return function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('path:created', pathCreated);
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.off('object:added', objectAdded);
            (_c = canvas) === null || _c === void 0 ? void 0 : _c.off('object:moved', objectMoved);
            (_d = canvas) === null || _d === void 0 ? void 0 : _d.off('object:rotated', objectRotated);
            (_e = canvas) === null || _e === void 0 ? void 0 : _e.off('object:scaled', objectScaled);
            (_f = canvas) === null || _f === void 0 ? void 0 : _f.off('object:skewed', objectSkewed);
            (_g = canvas) === null || _g === void 0 ? void 0 : _g.off('object:modified', objectModified);
            (_h = canvas) === null || _h === void 0 ? void 0 : _h.off('object:removed', objectRemoved);
        };
    }, [isLocalObject, canvas, eventSerializer, eventController, userId]);
    /**
     * Send synchronization event for penColor and fontColor changes.
     * */
    useEffect(function () {
        var _a;
        var objects = (_a = canvas) === null || _a === void 0 ? void 0 : _a.getActiveObjects();
        if (objects && objects.length) {
            objects.forEach(function (obj) {
                var _a;
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
                    (_a = eventSerializer) === null || _a === void 0 ? void 0 : _a.push('colorChanged', payload);
                }
            });
        }
    }, [isLocalObject, canvas, eventSerializer, userId, penColor, fontColor]);
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
    return (React.createElement("canvas", { width: width, height: height, id: instanceId, style: style, onClick: function () {
            actions.addShape();
        } }, children));
};
//# sourceMappingURL=WhiteboardCanvas.js.map