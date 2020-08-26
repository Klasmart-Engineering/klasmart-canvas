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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { EventEmitter } from 'events';
/**
 * This class is responsible for receiving remote events and translating that into
 * commands we can use to update the canvas. It needs to understand any optimizations
 * the PaintEventSerializer might do and decode those into usable data again. In the
 * PoC code the only optimization used was multiplying/dividing the coordinates to
 * reduce number of bytes in the data stream.
 */
var EventPainterController = /** @class */ (function (_super) {
    __extends(EventPainterController, _super);
    function EventPainterController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.events = [];
        return _this;
    }
    EventPainterController.prototype.replayEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, event_1;
            return __generator(this, function (_b) {
                for (_i = 0, _a = this.events; _i < _a.length; _i++) {
                    event_1 = _a[_i];
                    this.parseAndEmitEvent(event_1);
                }
                return [2 /*return*/];
            });
        });
    };
    EventPainterController.prototype.handlePainterEvent = function (events) {
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var event_2 = events_1[_i];
            this.events.push(event_2);
            this.parseAndEmitEvent(event_2);
            // TODO: We can clear the list of events if we receive a
            // 'clear all' event. We know there wont be any events to
            // replay to get to current state of whiteboard right after
            // a clear (whiteboard will be empty). This assumption might
            // change once we implement Undo/Redo functions though.
            // In the Poc it used to look like this:
            // if (event.type === 'painterClear') {
            //   this.events.splice(0, this.events.length - 1);
            // }
        }
    };
    EventPainterController.prototype.parseAndEmitEvent = function (event) {
        // NOTE: Empty object if param is undefined.
        var eventParam = event.param ? event.param : '{}';
        // NOTE: In our case (based on the PaintEventSerializer implementation) the param
        // will be a JSON stringified fabric.js target object. We may want to introduce
        // some more type safety for this once we start doing data optimizations in the
        // serializer. Param data will not be modified by the server.
        var target = JSON.parse(eventParam);
        // this.emit(event.type, event.objectType, target);
        // NOTE: Right now it might seem unnecessary to have all these events
        // sharing all the same parameters. But in the future if we apply
        // som optimization the parameters might be different between add
        // delete, moved. etc.
        switch (event.type) {
            case 'added':
                this.added(event.id, event.objectType, target);
                break;
            case 'moved':
                this.moved(event.id, event.objectType, target);
                break;
            case 'rotated':
                this.rotated(event.id, event.objectType, target);
                break;
            case 'scaled':
                this.scaled(event.id, event.objectType, target);
                break;
            case 'skewed':
                this.skewed(event.id, target);
                break;
            case 'colorChanged':
                this.colorChanged(event.id, event.objectType, target);
                break;
            case 'modified':
                this.modified(event.id, event.objectType, target);
                break;
            case 'fontFamilyChanged':
                this.fontFamilyChanged(event.id, target);
                break;
            case 'removed':
                this.removed(event.id, target);
                break;
            case 'reconstruct':
                this.reconstruct(event.id, event);
                break;
            case 'moving':
                this.moving(event.id, target);
                break;
            case 'fontColorChanged':
                this.fontColorChanged(event.id, event.objectType, target);
                break;
        }
    };
    EventPainterController.prototype.added = function (id, objectType, target) {
        this.emit('added', id, objectType, target);
    };
    EventPainterController.prototype.moved = function (id, objectType, target) {
        this.emit('moved', id, objectType, target);
    };
    EventPainterController.prototype.rotated = function (id, objectType, target) {
        this.emit('rotated', id, objectType, target);
    };
    EventPainterController.prototype.scaled = function (id, objectType, target) {
        this.emit('scaled', id, objectType, target);
    };
    EventPainterController.prototype.skewed = function (id, target) {
        this.emit('skewed', id, target);
    };
    EventPainterController.prototype.colorChanged = function (id, objectType, target) {
        this.emit('colorChanged', id, objectType, target);
    };
    EventPainterController.prototype.modified = function (id, objectType, target) {
        this.emit('modified', id, objectType, target);
    };
    EventPainterController.prototype.fontFamilyChanged = function (id, target) {
        this.emit('fontFamilyChanged', id, target);
    };
    EventPainterController.prototype.reconstruct = function (id, target) {
        this.emit('reconstruct', id, target);
    };
    EventPainterController.prototype.removed = function (id, target) {
        this.emit('removed', id, target);
    };
    EventPainterController.prototype.moving = function (id, target) {
        this.emit('moving', id, target);
    };
    EventPainterController.prototype.fontColorChanged = function (id, objectType, target) {
        this.emit('fontColorChanged', id, objectType, target);
    };
    return EventPainterController;
}(EventEmitter));
export { EventPainterController };
//# sourceMappingURL=EventPainterController.js.map