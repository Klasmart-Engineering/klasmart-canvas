import { v4 as uuidv4 } from 'uuid';
var PainterEvents = /** @class */ (function () {
    function PainterEvents() {
    }
    PainterEvents.createId = function (canvasId) {
        return canvasId + ":" + uuidv4();
    };
    PainterEvents.isLocalObject = function (id, canvasId) {
        var object = id.split(':');
        if (!object.length) {
            throw new Error('Invalid ID');
        }
        return object[0] === canvasId;
    };
    PainterEvents.pathCreated = function (target, id, canvasId) {
        if (this.isLocalObject(id, canvasId)) {
            return {
                type: 'path',
                target: target,
                id: id,
            };
        }
    };
    PainterEvents.objectAdded = function (target, id, canvasId) {
        if (this.isLocalObject(id, canvasId)) {
            return {
                type: 'path',
                target: target,
                id: id,
            };
        }
    };
    return PainterEvents;
}());
export { PainterEvents };
//# sourceMappingURL=PainterEvents.js.map