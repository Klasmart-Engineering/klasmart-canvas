import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
var useSynchronizedSkewed = function (canvas, generatedBy, shouldSerializeEvent, shouldHandleRemoteEvent) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle remote events. */
    useEffect(function () {
        var skewed = function (id, generatedBy, target) {
            if (!shouldHandleRemoteEvent(id, generatedBy))
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
                        generatedBy: generatedBy,
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
            if (!e.target)
                return;
            var canvasObject = e.target;
            if (!canvasObject.id)
                throw new Error('Skewed object without id');
            if (!canvasObject.generatedBy)
                throw new Error('Skewed object without generatedBy');
            if (!shouldSerializeEvent(canvasObject.id, canvasObject.generatedBy))
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
                id: canvasObject.id,
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('skewed', generatedBy, payload);
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:skewed', objectSkewed);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:skewed', objectSkewed);
        };
    }, [canvas, eventSerializer, generatedBy, shouldSerializeEvent]);
};
export default useSynchronizedSkewed;
//# sourceMappingURL=useSynchronizedSkewed.js.map