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
import { Point2D } from '../types/Point2D';
import { EventEmitter } from 'events';
var EventPainterController = /** @class */ (function (_super) {
    __extends(EventPainterController, _super);
    function EventPainterController(userId, normalize) {
        var _this = _super.call(this) || this;
        _this.events = [];
        _this.normalize = normalize;
        _this.userId = userId;
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
            if (event_2.type === 'painterClear') {
                this.events.splice(0, this.events.length - 1);
            }
        }
    };
    EventPainterController.prototype.parseAndEmitEvent = function (event) {
        // TODO: Currently the param is sent via GraphQL as a string
        // I would like to create proper type information in GraphQL
        // instead, since this doesn't feel very reliable.
        var parsedParam = '{}';
        if (event.param) {
            parsedParam = JSON.parse(event.param);
        }
        switch (event.type) {
            case 'shapeBegin':
                this.beginShape(parsedParam, event.id);
                break;
            case 'shapeEnd':
                this.endShape(event.id);
                break;
            case 'painterClear':
                this.clear(event.id);
                break;
            case 'painterLine':
                this.line(event.id, parsedParam);
                break;
        }
    };
    EventPainterController.prototype.beginShape = function (operationData, id) {
        if (id === undefined) {
            console.error('Trying to begin operation without ID.');
            return;
        }
        if (operationData.brush) {
            this.emit('shapeBegin', id, operationData.brush);
        }
    };
    EventPainterController.prototype.endShape = function (id) {
        if (id === undefined) {
            console.error('Trying to end operation without ID.');
            return;
        }
        this.emit('shapeEnd', id);
    };
    EventPainterController.prototype.clear = function (id) {
        this.emit('painterClear', id);
    };
    EventPainterController.prototype.line = function (id, line) {
        if (!line.points || line.points.length === 0)
            return;
        if (line.points.length === 1) {
            var p = Point2D.normalize(line.points[0], this.normalize);
            this.emit('painterLine', id, p, p);
            return;
        }
        var startAt = Point2D.normalize(line.points[0], this.normalize);
        for (var i = 1; i < line.points.length; ++i) {
            var endAt = Point2D.normalize(line.points[i], this.normalize);
            this.emit('painterLine', id, startAt, endAt);
            startAt = endAt;
        }
    };
    return EventPainterController;
}(EventEmitter));
export { EventPainterController };
//# sourceMappingURL=EventPainterController.js.map