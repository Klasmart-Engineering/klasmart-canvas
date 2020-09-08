var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { EventEmitter } from 'events';
var PaintEventSerializer = /** @class */ (function (_super) {
    __extends(PaintEventSerializer, _super);
    function PaintEventSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Push a new event to be serialized for synchronization.
     */
    PaintEventSerializer.prototype.push = function (type, generatedBy, object) {
        // TODO: Optmization of which data get serialized, for example:
        // we wouldn't need to send anything other than id and position
        // for move events, or the updated color if object color was
        // modified.
        // TODO: In the case of line shapes, we will want the users to see
        // the line appear directly, not just when it's finished. In this
        // case we want to just send the object ID and the additional points
        // being added. In the PoC I solved this by having begin/end events
        // which just set up the properties of the line (color/thickness).
        // We may want to think of similar optimizations later as well.
        // Example of this was the 'shapeBegin' event, where brushParameters
        // set up the style for the line.
        //
        // shapeBegin(id: string, brushParameters: BrushParameters): void {
        // const data: OperationData = {
        //  brush: brushParameters,
        // };
        //
        // const event: PainterEvent = {
        //   type: 'shapeBegin',
        //   id: id,
        //   param: JSON.stringify(data),
        // };
        //
        // console.log(`Serializing event for object: ${object.id}`);
        if (!object)
            throw new Error("Can't serialize event without object.");
        if (!object.id)
            throw new Error("Can't serialize event for object without ID.");
        var uniqueObjectId = object.id;
        var serialized = {
            id: uniqueObjectId,
            generatedBy: generatedBy,
            type: type,
            objectType: object.type,
            param: JSON.stringify(object.target),
        };
        this.emit('event', serialized);
    };
    return PaintEventSerializer;
}(EventEmitter));
export { PaintEventSerializer };
//# sourceMappingURL=PaintEventSerializer.js.map