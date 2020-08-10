import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
var useSynchronizedFontFamilyChanged = function (canvas, shouldHandleRemoteEvent) {
    var eventController = useSharedEventSerializer().state.eventController;
    useEffect(function () {
        var _a;
        var fontFamilyChanged = function (id, target) {
            var _a, _b;
            if (!shouldHandleRemoteEvent(id))
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
        (_a = eventController) === null || _a === void 0 ? void 0 : _a.on('fontFamilyChanged', fontFamilyChanged);
        return function () {
            var _a;
            (_a = eventController) === null || _a === void 0 ? void 0 : _a.removeListener('fontFamilyChanged', fontFamilyChanged);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent]);
};
export default useSynchronizedFontFamilyChanged;
//# sourceMappingURL=useSynchronizedFontFamilyChanged.js.map