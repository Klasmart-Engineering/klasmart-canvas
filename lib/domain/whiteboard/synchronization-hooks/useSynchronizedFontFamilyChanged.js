import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
var useSynchronizedFontFamilyChanged = function (canvas, shouldHandleRemoteEvent) {
    var eventController = useSharedEventSerializer().state.eventController;
    useEffect(function () {
        var fontFamilyChanged = function (id, generatedBy, target) {
            if (!shouldHandleRemoteEvent(id, generatedBy))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    obj.set({
                        generatedBy: generatedBy,
                        fontFamily: target.fontFamily,
                    });
                }
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('fontFamilyChanged', fontFamilyChanged);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('fontFamilyChanged', fontFamilyChanged);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent]);
};
export default useSynchronizedFontFamilyChanged;
//# sourceMappingURL=useSynchronizedFontFamilyChanged.js.map