import { fabric } from 'fabric';
// filled shape default values
var filledShape = {
    stroke: 'none',
    strokeWidth: 0,
};
// empty shape default values
var emptyShape = {
    strokeWidth: 2,
    fill: 'transparent',
};
/**
 * Creates Rectangle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export var rectangle = function (width, height, color, filled, thickness) {
    var shape = new fabric.Rect({
        width: width,
        height: height,
        selectable: false,
        evented: false,
        stroke: filled ? filledShape.stroke : color,
        strokeWidth: thickness,
        fill: filled ? color : emptyShape.fill,
        strokeUniform: true,
        padding: 15,
    });
    return fabric.util.object.extend(shape, {
        shapeType: 'shape',
        mimicBackground: true,
    });
};
/**
 * Creates Triangle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export var triangle = function (width, height, color, filled, thickness) {
    var shape = new fabric.Triangle({
        width: width,
        height: height,
        stroke: filled ? filledShape.stroke : color,
        strokeWidth: thickness,
        fill: filled ? color : emptyShape.fill,
        selectable: false,
        evented: false,
        padding: 15,
        strokeUniform: true,
    });
    return fabric.util.object.extend(shape, {
        shapeType: 'shape',
        mimicBackground: true,
    });
};
/**
 * Creates Circle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export var circle = function (width, height, color, filled, thickness) {
    var shape = new fabric.Ellipse({
        rx: width,
        ry: height,
        stroke: filled ? filledShape.stroke : color,
        strokeWidth: thickness,
        fill: filled ? color : emptyShape.fill,
        selectable: false,
        evented: false,
        strokeUniform: true,
        padding: 15,
    });
    return fabric.util.object.extend(shape, {
        shapeType: 'shape',
        mimicBackground: true,
    });
};
/**
 * Creates pentagon shape.
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export var pentagon = function (color, filled, thickness) {
    var shape = new fabric.Polygon([
        { x: 200, y: 0 },
        { x: 250, y: 42 },
        { x: 230, y: 100 },
        { x: 170, y: 100 },
        { x: 150, y: 42 },
    ]);
    shape = fabric.util.object.extend(shape, {
        shapeType: 'shape',
        mimicBackground: true,
    });
    return shape.set({
        scaleX: 0.02,
        scaleY: 0.02,
        stroke: filled ? filledShape.stroke : color,
        strokeWidth: thickness,
        fill: filled ? color : emptyShape.fill,
        selectable: false,
        evented: false,
        strokeUniform: true,
        padding: 15,
    });
};
/**
 * Creates pentagon shape.
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export var hexagon = function (color, filled, thickness) {
    var shape = new fabric.Polygon([
        { x: 125, y: 0 },
        { x: 275, y: 0 },
        { x: 350, y: 175 },
        { x: 275, y: 350 },
        { x: 125, y: 350 },
        { x: 50, y: 175 },
    ]);
    shape = fabric.util.object.extend(shape, {
        shapeType: 'shape',
        scaleX: 0.02,
        scaleY: 0.02,
        stroke: filled ? filledShape.stroke : color,
        strokeWidth: thickness,
        fill: filled ? color : emptyShape.fill,
        selectable: false,
        evented: false,
        strokeUniform: true,
        padding: 15,
    });
    return shape;
};
/**
 * Method to create a shape.
 * @param path Shape to be created path
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape.
 * @param filled Flag to set a shape filled or not
 */
export var generic = function (path, width, height, color, filled, thickness) {
    var shape = new fabric.Path(path);
    var scaleX = 1 / (Number(shape.width) / width);
    var scaleY = 1 / (Number(shape.height) / height);
    fabric.util.object.extend(shape, {
        shapeType: 'shape',
        mimicBackground: true,
    });
    return shape.set({
        scaleX: scaleX,
        scaleY: scaleY,
        stroke: filled ? filledShape.stroke : color,
        strokeWidth: thickness,
        fill: filled ? color : emptyShape.fill,
        selectable: false,
        evented: false,
        strokeUniform: true,
        padding: 15,
    });
};
/**
 * Creates a star shape.
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export var star = function (width, height, color, filled, thickness) {
    var path = "\n    M 202.000 222.000     L 225.511 234.361     L 221.021 208.180     L 240.042 189.639     L 213.756 185.820     L 202.000 162.000     L 190.244 185.820     L 163.958 189.639     L 182.979 208.180     L 178.489 234.361     L 202.000 222.000     z\n  ";
    return generic(path, width, height, color, filled, thickness);
};
/**
 * Creates an arrow shape.
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export var arrow = function (width, height, color, filled, thickness) {
    var path = "\n    M421.976,196.712L236.111,10.848C228.884,3.615,220.219,0,210.131,0c-9.9,0-18.464,3.615-25.697,10.848L163.023,32.26\n    c-7.234,6.853-10.85,15.418-10.85,25.697c0,10.277,3.616,18.842,10.85,25.697l83.653,83.937H45.677\n    c-9.895,0-17.937,3.568-24.123,10.707s-9.279,15.752-9.279,25.837v36.546c0,10.088,3.094,18.698,9.279,25.837\n    s14.228,10.704,24.123,10.704h200.995L163.02,360.88c-7.234,7.228-10.85,15.89-10.85,25.981c0,10.089,3.616,18.75,10.85,25.978\n    l21.411,21.412c7.426,7.043,15.99,10.564,25.697,10.564c9.899,0,18.562-3.521,25.981-10.564l185.864-185.864\n    c7.043-7.043,10.567-15.701,10.567-25.981C432.54,211.939,429.016,203.37,421.976,196.712z\n  ";
    return generic(path, width, height, color, filled, thickness);
};
/**
 * Creates a chat bubble shape
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
export var chat = function (width, height, color, filled, thickness) {
    var path = "\n    M29,1.5c-16.016,0-29,11.641-29,26c0,5.292,1.768,10.211,4.796,14.318\n    C4.398,46.563,3.254,53.246,0,56.5c0,0,9.943-1.395,16.677-5.462c0.007,0.003,0.015,0.006,0.022,0.009\n    c2.764-1.801,5.532-3.656,6.105-4.126c0.3-0.421,0.879-0.548,1.33-0.277c0.296,0.178,0.483,0.503,0.489,0.848\n    c0.01,0.622-0.005,0.784-5.585,4.421C22.146,52.933,25.498,53.5,29,53.5c16.016,0,29-11.641,29-26S45.016,1.5,29,1.5z\n  ";
    return generic(path, width, height, color, filled, thickness);
};
/**
 * Creates laser pointer shape, used for pointer tool.
 */
export var laserPointer = function () {
    var path = "\n    M256, 361.5h-67.421875c-1.1875-4.195312-2.855469-8.1875-4.945313-11.914062l47.679688-47.683594c5.859375-5.855469,\n    5.859375-15.351563.003906-21.210938-5.859375-5.855468-15.355468-5.859375-21.214844-.003906l-47.6875,\n    47.683594c-3.722656-2.09375-7.71875-3.761719-11.910156-4.945313v-308.425781c0-8.285156-6.71875-15-15-15-8.285156,\n    0-15, 6.714844-15 15v308.425781c-4.195312, 1.1875-8.191406, 2.851563-11.917968, 4.945313l-47.6875-47.683594c-5.855469-5.859375-15.351563-5.859375-21.210938,\n    0-5.859375, 5.855469-5.859375, 15.351562, 0, 21.210938l47.683594, 47.6875c-2.09375, 3.726562-3.761719, 7.71875-4.945313, 11.914062h-67.425781c-8.285156,\n    0-15 6.714844-15, 15s6.714844, 15, 15, 15h67.425781c1.183594, 4.195312, 2.851563, 8.1875, 4.945313, 11.914062l-47.683594, 47.6875c-5.859375, 5.855469-5.859375,\n    15.355469, 0, 21.210938, 2.929688, 2.929688, 6.765625, 4.394531, 10.605469, 4.394531, 3.839843, 0, 7.679687-1.464843, 10.605469-4.394531l47.6875-47.683594c3.726562,\n    2.09375, 7.722656, 3.761719, 11.917968, 4.945313v67.425781c0, 8.285156, 6.714844, 15, 15, 15, 8.28125, 0, 15-6.714844, 15-15v-67.425781c4.191406-1.1875,\n    8.1875-2.851563, 11.910156-4.945313l47.6875, 47.683594c2.929688, 2.929688, 6.765626, 4.394531, 10.605469, 4.394531, 3.839844, 0, 7.679688-1.464843, 10.605469-4.394531,\n    5.859375-5.855469, 5.859375-15.351562, 0-21.210938l-47.683594-47.683593c2.09375-3.726563, 3.761719-7.722657, 4.949219-11.917969h67.421875c8.285156, 0, 15-6.714844,\n    15-15s-6.714844-15-15-15zm0, 0\n  ";
    var shape = new fabric.Path(path);
    fabric.util.object.extend(shape, {
        shapeType: 'shape',
        mimicBackground: true,
    });
    return shape.set({
        scaleX: 0.1,
        scaleY: 0.1,
        flipY: true,
        angle: -50,
    });
};
export var brush = function () {
    var shape = new fabric.PatternBrush();
    return shape;
};
//# sourceMappingURL=shapes.js.map