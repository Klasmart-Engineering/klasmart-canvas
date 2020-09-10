import { v4 as uuidv4 } from 'uuid';
var PainterEvents = /** @class */ (function () {
    function PainterEvents() {
    }
    PainterEvents.createId = function (canvasId) {
        return canvasId + ":" + uuidv4();
    };
    PainterEvents.isCreatedWithId = function (id, canvasId) {
        if (canvasId === undefined)
            return false;
        var canvasIdParts = id.split(':');
        if (canvasIdParts.length < 1)
            throw new Error('Invalid canvas ID');
        var parts = id.split(':');
        if (parts.length < 2) {
            throw new Error('Invalid ID');
        }
        return parts[0] === canvasIdParts[0];
    };
    PainterEvents.getEventGroup = function (id) {
        var parts = id.split(':');
        if (parts.length >= 3) {
            return parts[1];
        }
        else {
            return undefined;
        }
    };
    PainterEvents.isCreatedWithGroup = function (id, group) {
        var parts = id.split(':');
        if (parts.length < 3)
            return false;
        return parts[1] === group;
    };
    PainterEvents.pathCreated = function (target, id, canvasId) {
        if (this.isCreatedWithId(id, canvasId)) {
            return {
                type: 'path',
                target: target,
                id: id,
            };
        }
    };
    PainterEvents.objectAdded = function (target, id, canvasId) {
        if (this.isCreatedWithId(id, canvasId)) {
            return {
                type: 'path',
                target: target,
                id: id,
            };
        }
    };
    PainterEvents.generateAndSetIdForTarget = function (userId, generatedBy, target) {
        var id = PainterEvents.createId(userId);
        target.set({ id: id, generatedBy: generatedBy });
    };
    return PainterEvents;
}());
export { PainterEvents };
//# sourceMappingURL=PainterEvents.js.map