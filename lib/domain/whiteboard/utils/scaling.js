/**
 * Gets length from one point to another.
 * @param x1 Coordinate starts.
 * @param x2 Coordinate ends.
 */
export var getLength = function (x1, x2) { return Math.abs(x1 - x2); };
/**
 *
 * @param shape Fabric shape. Either rectangle or triangle.
 * @param start Start coordinates.
 * @param end End coordinates.
 */
export var setSize = function (shape, start, end) {
    var width = getLength(end.x, start.x);
    var height = getLength(end.y, start.y);
    shape.set({ width: width, height: height });
    return { width: width, height: height };
};
/**
 * Sets circle size and returns dimensions.
 * @param shape Fabric ellipse
 * @param start Start coordinates.
 * @param end End coordinates.
 */
export var setCircleSize = function (shape, start, end) {
    var rx = getLength(end.x, start.x) / 2;
    var ry = getLength(end.y, start.y) / 2;
    shape.set({ rx: rx, ry: ry });
    return { width: rx * 2, height: ry * 2 };
};
/**
 * Sets custom shape size and returns dimensions.
 * @param shape Custom shape.
 * @param start Start coordinates.
 * @param end End coordinates.
 */
export var setPathSize = function (shape, start, end) {
    var width = getLength(end.x, start.x) / 2;
    var height = getLength(end.y, start.y) / 2;
    var scaleX = 2 / (Number(shape.width) / width);
    var scaleY = 2 / (Number(shape.height) / height);
    shape.set({ scaleX: scaleX, scaleY: scaleY });
    return { width: width, height: height };
};
//# sourceMappingURL=scaling.js.map