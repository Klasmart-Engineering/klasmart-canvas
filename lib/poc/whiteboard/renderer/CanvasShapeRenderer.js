import { Point2D } from '../types/Point2D';
var CanvasShapeRenderer = /** @class */ (function () {
    function CanvasShapeRenderer(canvas) {
        this.canvas = canvas;
        var context = canvas.getContext('2d');
        if (!context)
            throw new Error("Couldn't get 2D context.");
        this.context = context;
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
    }
    CanvasShapeRenderer.prototype.clear = function () {
        var width = this.canvas.width;
        var height = this.canvas.height;
        this.context.fillStyle = 'rgba(0, 0, 0,0 )';
        this.context.clearRect(0, 0, width, height);
    };
    CanvasShapeRenderer.prototype.drawLine = function (line) {
        var _this = this;
        this.applyBrushParameters(line.brushParameters);
        var transformed_points = line.points.map(function (p) { return _this.transformPoint(p); });
        this.context.beginPath();
        for (var pi = 1; pi < transformed_points.length; ++pi) {
            var p1 = transformed_points[pi - 1];
            var p2 = transformed_points[pi];
            this.context.moveTo(p1.x, p1.y);
            this.context.lineTo(p2.x, p2.y);
        }
        this.context.stroke();
    };
    CanvasShapeRenderer.prototype.transformPoint = function (p) {
        var x = p.x * this.canvas.width;
        var y = p.y * this.canvas.height;
        return new Point2D(x, y);
    };
    CanvasShapeRenderer.prototype.applyBrushParameters = function (brush) {
        if (brush.style) {
            this.context.strokeStyle = brush.style;
        }
        if (brush.width) {
            this.context.lineWidth = brush.width;
        }
    };
    return CanvasShapeRenderer;
}());
export { CanvasShapeRenderer };
//# sourceMappingURL=CanvasShapeRenderer.js.map