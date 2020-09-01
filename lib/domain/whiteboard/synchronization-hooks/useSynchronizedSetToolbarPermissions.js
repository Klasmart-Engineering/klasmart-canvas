import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
var useSynchronizedSetToolbarPermissions = function (canvas, userId, shouldHandleRemoteEvent, setToolbarIsEnabled) {
    var eventController = useSharedEventSerializer().state.eventController;
    useEffect(function () {
        var setToolbarPermissions = function (id, target) {
            //if (!shouldHandleRemoteEvent(id)) return;
            if (userId === id)
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.discardActiveObject();
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
            setToolbarIsEnabled(target);
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('setToolbarPermissions', setToolbarPermissions);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('setToolbarPermissions', setToolbarPermissions);
        };
    }, [
        canvas,
        eventController,
        setToolbarIsEnabled,
        shouldHandleRemoteEvent,
        userId,
    ]);
};
export default useSynchronizedSetToolbarPermissions;
//# sourceMappingURL=useSynchronizedSetToolbarPermissions.js.map