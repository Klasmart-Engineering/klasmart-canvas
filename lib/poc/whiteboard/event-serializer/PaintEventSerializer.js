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
import { Point2D } from '../types/Point2D';
import { EventEmitter } from 'events';
var PaintEventSerializer = /** @class */ (function (_super) {
    __extends(PaintEventSerializer, _super);
    function PaintEventSerializer(multiplier) {
        var _this = _super.call(this) || this;
        _this.serializedEventIDs = [];
        _this.multiplier = multiplier;
        return _this;
    }
    PaintEventSerializer.prototype.shapeBegin = function (id, brushParameters) {
        var data = {
            brush: brushParameters,
        };
        var event = {
            type: 'shapeBegin',
            id: id,
            param: JSON.stringify(data),
        };
        this.serializedEventIDs.push(id);
        this.emit('event', event);
    };
    PaintEventSerializer.prototype.shapeEnd = function (id) {
        var event = {
            type: 'shapeEnd',
            id: id,
        };
        this.serializedEventIDs.push(id);
        this.emit('event', event);
    };
    PaintEventSerializer.prototype.painterClear = function (id) {
        var event = {
            type: 'painterClear',
            id: id,
        };
        this.serializedEventIDs.push(id);
        this.emit('event', event);
    };
    PaintEventSerializer.prototype.painterLine = function (id, p1, p2) {
        p1 = Point2D.multiplyToInteger(p1, this.multiplier);
        p2 = Point2D.multiplyToInteger(p2, this.multiplier);
        var lineData = { points: [p1, p2] };
        var event = {
            type: 'painterLine',
            param: JSON.stringify(lineData),
            id: id,
        };
        this.serializedEventIDs.push(id);
        this.emit('event', event);
    };
    PaintEventSerializer.prototype.didSerializeEvent = function (id) {
        return this.serializedEventIDs.findIndex(function (id2) { return id2 === id; }) !== -1;
    };
    return PaintEventSerializer;
}(EventEmitter));
export { PaintEventSerializer };
//# sourceMappingURL=PaintEventSerializer.js.map