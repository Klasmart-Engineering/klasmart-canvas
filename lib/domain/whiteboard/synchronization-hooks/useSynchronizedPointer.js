import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { laserPointer } from '../shapes/shapes';
/**
 * Handles laser pointer events.
 * @param canvas Canvas
 * @param showPointer Indicates if pointer should be shown.
 * @param universalPermits Indicates if user has universal permits, such as a teacher.
 * @param shouldHandleRemoteEvent Method that checks if an event should be handled.
 * @param userId User ID.
 * @param laserColor Color of laser.
 * @param laserIsActive Indicates if laser tool is sselected.
 * @param allowPointer Indicates if user has permission to use laser pointer.
 */
var useSynchronizedPointer = function (canvas, showPointer, universalPermits, shouldHandleRemoteEvent, userId, laserColor, laserIsActive, allowPointer) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Emits local event. */
    useEffect(function () {
        /**
         * Handles moving event for laser pointer. Emits event to other users.
         * @param e Canvas event.
         */
        var move = function (e) {
            var id = userId + ":laser";
            var laser = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) { return o.id === id; })[0];
            if (e.e.which && canvas) {
                canvas.defaultCursor = 'none';
                if (!laser) {
                    laser = laserPointer();
                    laser.set({
                        id: id,
                        fill: laserColor,
                    });
                    canvas === null || canvas === void 0 ? void 0 : canvas.add(laser);
                    canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                }
                var top_1 = e.pointer.y + 3;
                var left = e.pointer.x - 18;
                laser.set({ top: top_1, left: left });
                canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                var payload = {
                    type: 'pointer',
                    target: { top: top_1, left: left, fill: laserColor },
                    id: id,
                };
                eventSerializer.push('moving', payload);
            }
            else if (!e.e.which && laser && canvas) {
                canvas.defaultCursor = 'default';
                canvas === null || canvas === void 0 ? void 0 : canvas.remove(laser);
                canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                eventSerializer.push('removed', { id: id });
            }
        };
        if (laserIsActive && (universalPermits(userId) || allowPointer)) {
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
            canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:move', move);
        }
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:move', move);
        };
    }, [
        laserIsActive,
        canvas,
        allowPointer,
        eventSerializer,
        laserColor,
        universalPermits,
        userId,
    ]);
    /** Register and handle remote moved event. */
    useEffect(function () {
        /**
         * Handles moving event for laser pointer. Receives event.
         * @param id User ID. Used for determining if event should be handled.
         * @param target Properites for laser pointer.
         */
        var moved = function (id, target) {
            if (!shouldHandleRemoteEvent(id)) {
                return;
            }
            var pointer = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) { return o.id === id; })[0];
            var laser = pointer ? pointer : laserPointer();
            if (!pointer) {
                laser.set({
                    selectable: false,
                    evented: false,
                    id: id,
                    fill: target.fill || '#000',
                });
                canvas === null || canvas === void 0 ? void 0 : canvas.add(laser);
                canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
            }
            laser.set({ top: target.top, left: target.left });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('moving', moved);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('moving', moved);
        };
    }, [
        canvas,
        eventController,
        showPointer,
        universalPermits,
        shouldHandleRemoteEvent,
    ]);
};
export default useSynchronizedPointer;
//# sourceMappingURL=useSynchronizedPointer.js.map