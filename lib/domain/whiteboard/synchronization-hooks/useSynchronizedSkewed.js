import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
var useSynchronizedSkewed = function (canvas, shouldSerializeEvent, shouldHandleRemoteEvent) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle remote events. */
    useEffect(function () {
        var skewed = function (id, target) {
            if (!shouldHandleRemoteEvent(id))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
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
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('skewed', skewed);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('skewed', skewed);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent]);
    /** Register and handle local events. */
    useEffect(function () {
        var objectSkewed = function (e) {
            var _a;
            if (!((_a = e.target) === null || _a === void 0 ? void 0 : _a.id)) {
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
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('skewed', payload);
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:skewed', objectSkewed);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:skewed', objectSkewed);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent]);
};
export default useSynchronizedSkewed;
//# sourceMappingURL=useSynchronizedSkewed.js.map