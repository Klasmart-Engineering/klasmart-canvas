var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from "react";
import { CirclePicker } from "react-color";
import { Slider, Button } from "@material-ui/core";
import { useWhiteboard } from "../context-provider/WhiteboardContextProvider";
export default function Toolbar() {
    var _a = useWhiteboard(), state = _a.state, _b = _a.actions, clear = _b.clear, setBrush = _b.setBrush, display = _b.display;
    var _c = useState(false), selectColor = _c[0], setSelectColor = _c[1];
    var handleSetColor = function (color) {
        var newBrush = __assign({}, state.brushParameters);
        setSelectColor(false);
        newBrush.style = color.hex;
        setBrush(newBrush);
    };
    var handleSetLineWidth = function (value) {
        if (typeof value !== "number") {
            return;
        }
        var newBrush = __assign({}, state.brushParameters);
        newBrush.width = value;
        setBrush(newBrush);
    };
    var handleDisplayColor = function () {
        setSelectColor(!selectColor);
    };
    var paintingControls = (React.createElement(React.Fragment, null,
        state.permissions.allowCreateShapes ?
            React.createElement(React.Fragment, null,
                selectColor ?
                    React.createElement("div", { style: { zIndex: 5, width: "840px", backgroundColor: "rgba(80, 80, 80, 0.4)", padding: "5px", position: "absolute" } },
                        React.createElement(CirclePicker, { width: "100%", colors: ["#000", "#ff0000", "#00ff00", "#0062f1", "#ffff00", "rgb(200, 147, 68)", "#ffffff"], circleSize: 100, color: state.brushParameters.style, onChangeComplete: function (c) { return handleSetColor(c); } })) : React.createElement(React.Fragment, null),
                React.createElement(Slider, { min: 1.0, max: 6.0, value: state.brushParameters.width, onChange: function (_e, value) { return handleSetLineWidth(value); } }),
                React.createElement("br", null),
                React.createElement(Button, { color: "primary", onClick: handleDisplayColor }, "Color")) : React.createElement(React.Fragment, null),
        state.permissions.allowDeleteShapes.others ?
            React.createElement(Button, { color: "primary", onClick: clear }, "Clear") : React.createElement(React.Fragment, null)));
    var displayed = (React.createElement(React.Fragment, null,
        paintingControls,
        state.permissions.allowShowHide ?
            React.createElement(Button, { color: "primary", onClick: function () { return display(false); } }, "Hide Whiteboard")
            : React.createElement(React.Fragment, null)));
    var hidden = (React.createElement(React.Fragment, null, state.permissions.allowShowHide ?
        React.createElement(Button, { color: "primary", onClick: function () { return display(true); } }, "Show Whiteboard")
        : React.createElement(React.Fragment, null)));
    return (React.createElement("div", null, state.display ? displayed : hidden));
}
//# sourceMappingURL=Toolbar.js.map