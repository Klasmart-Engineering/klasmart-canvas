import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
var useSynchronizedSkewed = function (canvas, shouldSerializeEvent, shouldHandleRemoteEvent) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle remote events. */
    useEffect(function () {
        var _a;
        var skewed = function (id, target) {
            var _a, _b;
            if (!shouldHandleRemoteEvent(id))
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
        (_a = eventController) === null || _a === void 0 ? void 0 : _a.on('skewed', skewed);
        return function () {
            var _a;
            (_a = eventController) === null || _a === void 0 ? void 0 : _a.removeListener('skewed', skewed);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent]);
    /** Register and handle local events. */
    useEffect(function () {
        var _a;
        var objectSkewed = function (e) {
            var _a;
            if (!e.target.id) {
                return;
            }
            if (!shouldSerializeEvent(e.target.id))
                return;
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
        };
        (_a = canvas) === null || _a === void 0 ? void 0 : _a.on('object:skewed', objectSkewed);
        return function () {
            var _a;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.off('object:skewed', objectSkewed);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent]);
};
export default useSynchronizedSkewed;
//# sourceMappingURL=useSynchronizedSkewed.js.map