import { useEffect } from 'react';
import { SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
var useSynchronizedFontColorChanged = function (canvas, userId, shouldHandleRemoteEvent, undoRedoDispatch) {
    var eventController = useSharedEventSerializer().state.eventController;
    useEffect(function () {
        var colorChanged = function (id, objectType, target) {
            if (id && !shouldHandleRemoteEvent(id))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    if (objectType === 'textbox') {
                        obj.set({
                            fill: target.fill,
                        });
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
        eventController === null || eventController === void 0 ? void 0 : eventController.on('fontColorChanged', colorChanged);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('fontColorChanged', colorChanged);
        };
    }, [
        canvas,
        eventController,
        shouldHandleRemoteEvent,
        undoRedoDispatch,
        userId,
    ]);
};
export default useSynchronizedFontColorChanged;
//# sourceMappingURL=useSynchronizedFontColorChanged.js.map