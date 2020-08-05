var Point2D = /** @class */ (function () {
    function Point2D(x, y) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    }
    Point2D.multiplyToInteger = function (p, multiplier) {
        var x = Math.round(p.x * multiplier);
        var y = Math.round(p.y * multiplier);
        return new Point2D(x, y);
    };
    Point2D.normalize = function (p, t) {
        var x = p.x / t;
        var y = p.y / t;
        return new Point2D(x, y);
    };
    Point2D.create = function (x, y) {
        return new Point2D(x, y);
    };
    return Point2D;
}());
export { Point2D };
//# sourceMappingURL=Point2D.js.map