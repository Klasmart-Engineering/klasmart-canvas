import { BrushParameters } from '../types/BrushParameters';
import { ShapeID } from './ShapeID';
var Line = /** @class */ (function () {
    function Line(id, order) {
        this.brushParameters = BrushParameters.default();
        this.points = [];
        this.id = id;
        this.order = order;
    }
    return Line;
}());
export { Line };
var ShapesRepository = /** @class */ (function () {
    function ShapesRepository() {
        this.shapes = new Map();
        this.shapeOrder = 0;
    }
    ShapesRepository.prototype.getOrderedShapes = function () {
        var allShapes = Array.from(this.shapes.values());
        return allShapes.sort(function (a, b) {
            return a.order - b.order;
        });
    };
    ShapesRepository.prototype.createShape = function (id, brushParameters) {
        var shapeId = new ShapeID(id);
        var line = new Line(shapeId, this.shapeOrder++);
        line.brushParameters = brushParameters;
        this.shapes.set(id, line);
    };
    ShapesRepository.prototype.appendLine = function (id, points) {
        var _a;
        if (!this.shapes.has(id))
            return;
        var line = this.shapes.get(id);
        (_a = line.points).push.apply(_a, points);
    };
    ShapesRepository.prototype.clearAll = function () {
        this.shapes.clear();
    };
    ShapesRepository.prototype.clear = function (id) {
        var _this = this;
        var userId = new ShapeID(id);
        // NOTE: Remove all shapes belonging to user.
        Array.from(this.shapes.values())
            .filter(function (shape) { return shape.id.user === userId.user; })
            .forEach(function (s) {
            _this.shapes.delete(s.id.full);
        });
    };
    return ShapesRepository;
}());
export { ShapesRepository };
//# sourceMappingURL=ShapesRepository.js.map