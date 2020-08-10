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
import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
var useSynchronizedModified = function (canvas, shouldSerializeEvent, shouldHandleRemoteEvent) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle remote event. */
    useEffect(function () {
        var _a;
        var modified = function (id, objectType, target) {
            var _a, _b;
            if (!shouldHandleRemoteEvent(id))
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
        (_a = eventController) === null || _a === void 0 ? void 0 : _a.on('modified', modified);
        return function () {
            var _a;
            (_a = eventController) === null || _a === void 0 ? void 0 : _a.removeListener('modified', modified);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent]);
    /** Register and handle local events. */
    useEffect(function () {
        var _a;
        var objectModified = function (e) {
            var _a;
            if (!shouldSerializeEvent(e.target.id))
                return;
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
        };
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('object:modified', objectModified);
        return function () {
            var _a;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('object:modified', objectModified);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent]);
};
export default useSynchronizedModified;
//# sourceMappingURL=useSynchronizedModified.js.map