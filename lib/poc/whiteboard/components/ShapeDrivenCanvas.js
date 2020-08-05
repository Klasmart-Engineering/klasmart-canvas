import React, { useRef, useEffect, useState, useCallback } from "react";
import { useWhiteboard } from "../context-provider/WhiteboardContextProvider";
import { CanvasShapeRenderer } from "../renderer/CanvasShapeRenderer";
export function ShapeDrivenCanvas(_a) {
    var children = _a.children, style = _a.style, width = _a.width, height = _a.height, enablePointer = _a.enablePointer, filterUsers = _a.filterUsers;
    var ref = useRef(null);
    var _b = useWhiteboard().state, pointerPainter = _b.pointerPainter, shapesRepository = _b.shapesRepository;
    var _c = useState(undefined), renderer = _c[0], setRenderer = _c[1];
    useEffect(function () {
        if (!ref.current || !enablePointer || !pointerPainter) {
            return;
        }
        var handlePointerDown = function (event) {
            pointerPainter.handlePointerDown(event);
        };
        var handlePointerUp = function (event) {
            pointerPainter.handlePointerUp(event);
        };
        var handlePointerCancel = function (event) {
            pointerPainter.handlePointerCancel(event);
        };
        var handlePointerMove = function (event) {
            pointerPainter.handlePointerMove(event);
        };
        var handlePointerLeave = function (event) {
            pointerPainter.handlePointerLeave(event);
        };
        var canvas = ref.current;
        canvas.addEventListener("pointerdown", handlePointerDown, false);
        canvas.addEventListener("pointerup", handlePointerUp, false);
        canvas.addEventListener("pointercancel", handlePointerCancel, false);
        canvas.addEventListener("pointermove", handlePointerMove, false);
        canvas.addEventListener("pointerleave", handlePointerLeave, false);
        return function () {
            canvas.removeEventListener("pointerdown", handlePointerDown);
            canvas.removeEventListener("pointerup", handlePointerUp);
            canvas.removeEventListener("pointercancel", handlePointerCancel);
            canvas.removeEventListener("pointermove", handlePointerMove);
            canvas.removeEventListener("pointerleave", handlePointerLeave);
        };
    }, [pointerPainter, enablePointer]);
    var redraw = useCallback(function (shapes) {
        if (renderer === undefined)
            return;
        renderer.clear();
        shapes.forEach(function (shape) {
            renderer.drawLine(shape);
        });
    }, [renderer]);
    useEffect(function () {
        if (shapesRepository === undefined)
            return;
        if (renderer === undefined)
            return;
        var drawShapes = function () {
            var shapes = shapesRepository.getOrderedShapes();
            if (filterUsers !== undefined) {
                shapes = shapes.filter(function (shape) { return filterUsers.includes(shape.id.user); });
            }
            redraw(shapes);
        };
        var interval = setInterval(drawShapes, 20);
        return function () {
            clearInterval(interval);
        };
    }, [shapesRepository, redraw, filterUsers, renderer]);
    useEffect(function () {
        if (ref.current === null)
            return;
        setRenderer(new CanvasShapeRenderer(ref.current));
    }, [setRenderer]);
    return React.createElement("canvas", { width: width, height: height, ref: ref, style: style }, children);
}
//# sourceMappingURL=ShapeDrivenCanvas.js.map