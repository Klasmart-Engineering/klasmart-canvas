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
        var object = id.split(':');
        if (!object.length) {
            throw new Error('Invalid ID');
        }
        return object[0] === canvasId;
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