import React, { useCallback } from 'react';
import { useToolbarContext } from './toolbar-context-provider';
export default function ToolbarExample(_a) {
    var children = _a.children;
    var _b = useToolbarContext(), _c = _b.state, tools = _c.tools, colors = _c.colors, _d = _b.actions, selectTool = _d.selectTool, selectColor = _d.selectColor, clear = _d.clear, undo = _d.undo, redo = _d.redo;
    var selectObjectEraser = useCallback(function () {
        var eraserOptions = tools.eraser.options;
        if (eraserOptions) {
            selectTool("eraser", eraserOptions[0]);
        }
    }, [selectTool, tools.eraser.options]);
    var selectColorByName = useCallback(function (colorName) {
        var color = colors.get(colorName);
        if (!color)
            return;
        selectColor(color);
    }, [colors, selectColor]);
    return (React.createElement("div", { id: "toolbar-example" },
        React.createElement("button", { onClick: function () { return selectTool("line"); } }, "Pen"),
        React.createElement("button", { onClick: function () { return selectTool("text"); } }, "Text"),
        React.createElement("button", { onClick: function () { return selectTool("shape"); } }, "Shape"),
        React.createElement("button", { onClick: function () { return selectTool("fill"); } }, "Fill"),
        React.createElement("button", { onClick: function () { return selectObjectEraser(); } }, "Eraser (Object)"),
        React.createElement("button", { onClick: function () { return selectTool("move"); } }, "Move"),
        React.createElement("button", { onClick: function () { return selectTool("pointer"); } }, "Pointer"),
        React.createElement("button", { onClick: function () { return selectTool("select"); } }, "Select"),
        React.createElement("button", { onClick: function () { return selectColorByName("red_color"); } }, "Color: Red"),
        React.createElement("button", { onClick: function () { return selectColorByName("green_color"); } }, "Color: Green"),
        React.createElement("button", { onClick: function () { return selectColorByName("blue_color"); } }, "Color: Blue"),
        React.createElement("button", { onClick: function () { return undo(); } }, "Undo"),
        React.createElement("button", { onClick: function () { return redo(); } }, "Redo"),
        React.createElement("button", { onClick: function () { return clear(); } }, "Clear"),
        children));
}
//# sourceMappingURL=toolbar-example.js.map