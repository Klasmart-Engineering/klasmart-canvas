import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { SET_OTHER } from '../reducers/undo-redo';
import { fabric } from 'fabric';
var useSynchronizedReconstruct = function (canvas, shouldHandleRemoteEvent, userId, undoRedoDispatch) {
    var eventController = useSharedEventSerializer().state.eventController;
    useEffect(function () {
        var reconstruct = function (id, generatedBy, target) {
            if (!shouldHandleRemoteEvent(id, generatedBy))
                return;
            var parsed = JSON.parse(target.param);
            if (parsed.background && canvas) {
                canvas === null || canvas === void 0 ? void 0 : canvas.setBackgroundColor(parsed.background, function () { });
                canvas.renderAll();
                return;
            }
            var objects = JSON.parse(target.param).objects;
            var reset = function (object) {
                var old = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) { return o.id === object.id; })[0];
                object.set({ selectable: false, evented: false });
                canvas === null || canvas === void 0 ? void 0 : canvas.remove(old);
                canvas === null || canvas === void 0 ? void 0 : canvas.add(object);
            };
            objects === null || objects === void 0 ? void 0 : objects.forEach(function (object) {
                if (object && object.type === 'path') {
                    var group = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) { return o._objects; })[0];
                    if (group && group.id) {
                        canvas === null || canvas === void 0 ? void 0 : canvas.remove(group);
                    }
                    fabric.Path.fromObject(object, function (path) {
                        reset(path);
                    });
                    canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                }
                else if (object && object.type === 'polygon') {
                    // Ignore is required, typing is wrong in definition file.
                    //@ts-ignore
                    fabric.Polygon.fromObject(object, function (o) {
                        reset(o);
                    });
                }
                else if (object && object.type === 'textbox') {
                    fabric.Textbox.fromObject(object, function (text) {
                        reset(text);
                    });
                }
                else if (object && object.type === 'rect') {
                    // Ignore is required, typing is wrong in definition file.
                    //@ts-ignore
                    fabric.Rect.fromObject(object, function (o) {
                        reset(o);
                    });
                }
                else if (object && object.type === 'ellipse') {
                    // Ignore is required, typing is wrong in definition file.
                    //@ts-ignore
                    fabric.Ellipse.fromObject(object, function (o) {
                        reset(o);
                    });
                }
                else if (object && object.type === 'triangle') {
                    // Ignore is required, typing is wrong in definition file.
                    //@ts-ignore
                    fabric.Triangle.fromObject(object, function (o) {
                        reset(o);
                    });
                }
                else if (object) {
                    fabric.Group.fromObject(object, function (group) {
                        var old = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) { return o.id === object.id; })[0];
                        if (group._objects) {
                            group._objects.forEach(function (o) {
                                var oldO = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (oldObject) { return oldObject.id === o.id; })[0];
                                canvas === null || canvas === void 0 ? void 0 : canvas.remove(oldO);
                            });
                        }
                        group.set({ selectable: false, evented: false });
                        canvas === null || canvas === void 0 ? void 0 : canvas.remove(old);
                        canvas === null || canvas === void 0 ? void 0 : canvas.add(group);
                    });
                }
                undoRedoDispatch({
                    type: SET_OTHER,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                });
            });
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('reconstruct', reconstruct);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('reconstruct', reconstruct);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent, undoRedoDispatch, userId]);
};
export default useSynchronizedReconstruct;
//# sourceMappingURL=useSynchronizedReconstruct.js.map