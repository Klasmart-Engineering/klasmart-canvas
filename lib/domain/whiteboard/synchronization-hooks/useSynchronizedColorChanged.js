import { useEffect } from 'react';
import { SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
var useSynchronizedColorChanged = function (canvas, userId, shouldHandleRemoteEvent, undoRedoDispatch) {
    var eventController = useSharedEventSerializer().state.eventController;
    useEffect(function () {
        var colorChanged = function (id, objectType, target) {
            var _a;
            if (id && !shouldHandleRemoteEvent(id))
                return;
            if (objectType === 'background' && canvas) {
                canvas.backgroundColor = (_a = target.fill) === null || _a === void 0 ? void 0 : _a.toString();
            }
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                var _a, _b;
                if (obj.id && obj.id === id && objectType !== 'textbox') {
                    if (objectType === 'shape') {
                        obj.set({
                            fill: target.fill,
                        });
                    }
                    else {
                        obj.set({
                            stroke: target.stroke,
                            strokeWidth: target.strokeWidth,
                        });
                    }
                }
                if (objectType === 'shape') {
                    var index = (_b = (_a = target.objectsOrdering) === null || _a === void 0 ? void 0 : _a.find(function (find) { return obj.id === find.id; })) === null || _b === void 0 ? void 0 : _b.index;
                    if (index !== undefined) {
                        obj.moveTo(index);
                    }
                }
            });
            undoRedoDispatch({
                type: SET_OTHER,
                payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                canvasId: userId,
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('colorChanged', colorChanged);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('colorChanged', colorChanged);
        };
    }, [
        canvas,
        eventController,
        shouldHandleRemoteEvent,
        undoRedoDispatch,
        userId,
    ]);
};
export default useSynchronizedColorChanged;
//# sourceMappingURL=useSynchronizedColorChanged.js.map