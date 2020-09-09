/**
 * Check if the given object is a free drawing object
 * @param {fabric.Object} object - object to check
 */
export var isFreeDrawing = function (object) {
    return object.strokeLineCap === 'round';
};
/**
 * Check if the given object is a shape
 * @param {fabric.Object} object - object to check
 */
export var isShape = function (object) {
    return object.fill && !object.text;
};
/**
 * Check if the given object is a text object
 * @param {fabric.Object} object - object to check
 */
export var isText = function (object) {
    return object.text;
};
/**
 * Check if the given object is an empty shape
 * @param {fabric.Object} object - object to check
 */
// eslint-disable-next-line react-hooks/exhaustive-deps
export var isEmptyShape = function (object) {
    return isShape(object) && object.shapeType === 'shape';
};
//# sourceMappingURL=shapes.js.map