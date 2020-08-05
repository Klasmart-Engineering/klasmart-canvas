var BrushParameters = /** @class */ (function () {
    function BrushParameters() {
    }
    BrushParameters.default = function () {
        return {
            width: 1,
            style: 'rgb(0, 0, 0)',
        };
    };
    BrushParameters.withParams = function (brush) {
        return { width: brush.width, style: brush.style };
    };
    BrushParameters.withStyle = function (style) {
        return { style: style };
    };
    BrushParameters.withWidth = function (width) {
        return { width: width };
    };
    return BrushParameters;
}());
export { BrushParameters };
//# sourceMappingURL=BrushParameters.js.map