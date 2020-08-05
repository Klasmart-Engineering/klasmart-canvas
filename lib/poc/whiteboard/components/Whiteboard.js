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
import React from "react";
import { useWhiteboard } from "../context-provider/WhiteboardContextProvider";
import { ShapeDrivenCanvas } from "./ShapeDrivenCanvas";
export function Whiteboard(_a) {
    var children = _a.children, containerWidth = _a.containerWidth, containerHeight = _a.containerHeight, height = _a.height, filterUsers = _a.filterUsers;
    var state = useWhiteboard().state;
    var canvasStyle = {
        border: "2px blue solid",
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%",
        zIndex: 998,
    };
    var pointerEvents = state.permissions.allowCreateShapes ? undefined : "none";
    return (React.createElement("div", { style: { position: "relative", width: containerWidth || "100%", height: containerHeight } },
        React.createElement(ShapeDrivenCanvas, { enablePointer: state.permissions.allowCreateShapes, width: "1024", height: "1024", style: __assign(__assign({}, canvasStyle), { height: height, pointerEvents: pointerEvents, display: state.display ? "inline-block" : "none" }), filterUsers: filterUsers }),
        children));
}
//# sourceMappingURL=Whiteboard.js.map