import { SET_OTHER } from '../reducers/undo-redo';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { useEffect } from 'react';
var useSynchronizedLineWidthChanged = function (canvas, userId, shouldHandleRemoteEvent, undoRedoDispatch) {
    var eventController = useSharedEventSerializer().state.eventController;
    useEffect(function () {
        var widthChanged = function (id, generatedBy, objectType, target) {
            var validTypes = [
                'rect',
                'ellipse',
                'triangle',
                'polygon',
                'path',
            ];
            if (!shouldHandleRemoteEvent(id, generatedBy))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    if (validTypes.includes(objectType)) {
                        obj.set({
                            generatedBy: generatedBy,
                            strokeWidth: target.strokeWidth,
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
        eventController === null || eventController === void 0 ? void 0 : eventController.on('lineWidthChanged', widthChanged);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('lineWidthChanged', widthChanged);
        };
    }, [
        canvas,
        eventController,
        shouldHandleRemoteEvent,
        undoRedoDispatch,
        userId,
    ]);
};
export default useSynchronizedLineWidthChanged;
//# sourceMappingURL=useSynchronizedLineWidthChanged.js.map