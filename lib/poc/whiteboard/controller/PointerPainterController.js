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
import { BrushParameters } from '../types/BrushParameters';
import { EventEmitter } from 'events';
var PointerPainterController = /** @class */ (function (_super) {
    __extends(PointerPainterController, _super);
    function PointerPainterController(userId, mapToTarget) {
        var _this = _super.call(this) || this;
        _this.brushParameters = new BrushParameters();
        _this.shapeId = undefined;
        _this.shapeSequence = 0;
        _this.mapToTarget = mapToTarget;
        _this.currentActivePointers = new Map();
        _this.userId = userId;
        return _this;
    }
    PointerPainterController.prototype.replayEvents = function () {
        console.warn('not implemented');
        return Promise.resolve();
    };
    PointerPainterController.prototype.setBrush = function (brush) {
        this.brushParameters = brush;
    };
    PointerPainterController.prototype.clear = function () {
        this.emit('painterClear', this.generateOperationId());
    };
    PointerPainterController.prototype.handlePointerDown = function (event) {
        if (event.button !== 0)
            return;
        var newState = this.pointerEventState(event);
        this.currentActivePointers.set(newState.id, newState);
        if (this.shapeId === undefined) {
            this.shapeId = this.generateOperationId();
            this.emit('shapeBegin', this.shapeId, this.brushParameters);
        }
    };
    PointerPainterController.prototype.handlePointerMove = function (event) {
        var newState = this.pointerEventState(event);
        var oldState = this.currentActivePointers.get(newState.id);
        if (oldState === undefined)
            return;
        // TODO: State interpolation?
        this.currentActivePointers.set(newState.id, newState);
        var lineFrom = oldState.point;
        var lineTo = newState.point;
        if (this.shapeId !== undefined) {
            this.emit('painterLine', this.shapeId, lineFrom, lineTo);
        }
    };
    PointerPainterController.prototype.handlePointerUp = function (event) {
        var newState = this.pointerEventState(event);
        var oldState = this.currentActivePointers.get(newState.id);
        var deleted = this.currentActivePointers.delete(newState.id);
        if (oldState !== undefined) {
            var lineFrom = oldState.point;
            var lineTo = newState.point;
            if (this.shapeId !== undefined) {
                this.emit('painterLine', this.shapeId, lineFrom, lineTo);
            }
        }
        if (deleted && this.shapeId !== undefined) {
            this.emit('shapeEnd', this.shapeId);
            this.shapeId = undefined;
        }
    };
    PointerPainterController.prototype.handlePointerCancel = function (event) {
        var pointerState = this.currentActivePointers.get(event.pointerId);
        if (pointerState !== undefined) {
            this.currentActivePointers.delete(event.pointerId);
            if (this.shapeId !== undefined) {
                this.emit('shapeEnd', this.shapeId);
                this.shapeId = undefined;
            }
        }
    };
    PointerPainterController.prototype.handlePointerLeave = function (event) {
        var pointerState = this.currentActivePointers.get(event.pointerId);
        if (pointerState !== undefined) {
            this.currentActivePointers.delete(event.pointerId);
            if (this.shapeId !== undefined) {
                this.emit('shapeEnd', this.shapeId);
                this.shapeId = undefined;
            }
        }
    };
    PointerPainterController.prototype.pointerEventState = function (event) {
        var x = event.clientX;
        var y = event.clientY;
        // NOTE: Map coordinates to the event target.
        if (this.mapToTarget && event.target instanceof HTMLElement) {
            var elem = event.target;
            var clientRects = elem.getClientRects();
            if (clientRects.length > 0) {
                var rect = clientRects[0];
                x = (x - rect.left) / rect.width;
                y = (y - rect.top) / rect.height;
            }
        }
        return {
            id: event.pointerId,
            point: Point2D.create(x, y),
        };
    };
    PointerPainterController.prototype.generateOperationId = function () {
        return this.userId + ":" + this.shapeSequence++;
    };
    return PointerPainterController;
}(EventEmitter));
export { PointerPainterController };
//# sourceMappingURL=PointerPainterController.js.map