import { useEffect } from 'react';
import { SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
var useSynchronizedColorChanged = function (canvas, userId, shouldHandleRemoteEvent, undoRedoDispatch) {
    var eventController = useSharedEventSerializer().state.eventController;
    useEffect(function () {
        var _a;
        var colorChanged = function (id, objectType, target) {
            var _a, _b, _c;
            if (!shouldHandleRemoteEvent(id))
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
            undoRedoDispatch({
                type: SET_OTHER,
                payload: (_b = canvas) === null || _b === void 0 ? void 0 : _b.getObjects(),
                canvasId: userId,
            });
            (_c = canvas) === null || _c === void 0 ? void 0 : _c.renderAll();
        };
        (_a = eventController) === null || _a === void 0 ? void 0 : _a.on('colorChanged', colorChanged);
        return function () {
            var _a;
            (_a = eventController) === null || _a === void 0 ? void 0 : _a.removeListener('colorChanged', colorChanged);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent, undoRedoDispatch, userId]);
};
export default useSynchronizedColorChanged;
//# sourceMappingURL=useSynchronizedColorChanged.js.map