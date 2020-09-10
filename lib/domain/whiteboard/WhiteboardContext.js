import React, { createContext, useCallback, useState, useReducer } from 'react';
import { useText } from './hooks/useText';
import { useFontFamily } from './hooks/useFontFamily';
import { useShapeColor } from './hooks/useShapeColor';
import { useShape } from './hooks/useShape';
import { useWhiteboardClearModal } from './hooks/useWhiteboardClearModal';
import { usePointerEvents } from './hooks/usePointerEvents';
import { useFontColor } from './hooks/useFontColor';
import { useTextIsActive } from './hooks/useTextIsActive';
import { useShapeIsActive } from './hooks/useShapeIsActive';
import { useBrushIsActive } from './hooks/useBrushIsActive';
import { useEraseType } from './hooks/useEraseType';
import { useShapesAreSelectable } from './hooks/useShapesAreSelectable';
import { useShapesAreEvented } from './hooks/useShapesAreEvented';
import { DEFAULT_VALUES } from '../../config/toolbar-default-values';
import { useLineWidth } from './hooks/useLineWidth';
import { useFloodFill } from './hooks/useFloodFill';
import { useFloodFillIsActive } from './hooks/useFloodFillIsActive';
import { useLaserIsActive } from './hooks/useLaserIsActive';
import { useToolbarPermissions } from './hooks/useToolbarPermissions';
import { useClearIsActive } from './hooks/useClearIsActive';
export var WhiteboardContext = createContext({});
export var WhiteboardProvider = function (_a) {
    var children = _a.children, permissions = _a.permissions;
    var _b = useText(), text = _b.text, updateText = _b.updateText;
    var _c = useFontColor(), fontColor = _c.fontColor, updateFontColor = _c.updateFontColor;
    var _d = useFontFamily(), fontFamily = _d.fontFamily, updateFontFamily = _d.updateFontFamily;
    var _e = useShapeColor(), shapeColor = _e.shapeColor, updateShapeColor = _e.updateShapeColor;
    var _f = useShape(), shape = _f.shape, updateShape = _f.updateShape;
    var _g = useEraseType(), eraseType = _g.eraseType, updateEraseType = _g.updateEraseType;
    var _h = useLineWidth(), lineWidth = _h.lineWidth, updateLineWidth = _h.updateLineWidth;
    var _j = useFloodFill(), floodFill = _j.floodFill, updateFloodFill = _j.updateFloodFill;
    var _k = usePointerEvents(), pointerEvents = _k.pointerEvents, setPointerEvents = _k.setPointerEvents;
    var _l = useWhiteboardClearModal(), ClearWhiteboardModal = _l.ClearWhiteboardModal, openModal = _l.openModal, closeModal = _l.closeModal;
    var _m = useTextIsActive(), textIsActive = _m.textIsActive, updateTextIsActive = _m.updateTextIsActive;
    var _o = useShapeIsActive(), shapeIsActive = _o.shapeIsActive, updateShapeIsActive = _o.updateShapeIsActive;
    var _p = useBrushIsActive(), brushIsActive = _p.brushIsActive, updateBrushIsActive = _p.updateBrushIsActive;
    var _q = useClearIsActive(), clearIsActive = _q.clearIsActive, updateClearIsActive = _q.updateClearIsActive;
    var _r = useShapesAreSelectable(), shapesAreSelectable = _r.shapesAreSelectable, updateShapesAreSelectable = _r.updateShapesAreSelectable;
    var _s = useShapesAreEvented(), shapesAreEvented = _s.shapesAreEvented, updateShapesAreEvented = _s.updateShapesAreEvented;
    var _t = useFloodFillIsActive(), floodFillIsActive = _t.floodFillIsActive, updateFloodFillIsActive = _t.updateFloodFillIsActive;
    var _u = useLaserIsActive(), laserIsActive = _u.laserIsActive, updateLaserIsActive = _u.updateLaserIsActive;
    var _v = useToolbarPermissions(), toolbarIsEnabled = _v.toolbarIsEnabled, setToolbarIsEnabled = _v.setToolbarIsEnabled;
    // Provisional (just for change value in Toolbar selectors) they can be modified in the future
    var _w = useState(DEFAULT_VALUES.POINTER), pointer = _w[0], updatePointer = _w[1];
    var _x = useState(DEFAULT_VALUES.PEN_LINE), penLine = _x[0], updatePenLine = _x[1];
    var _y = useState(DEFAULT_VALUES.PEN_COLOR), penColor = _y[0], updatePenColor = _y[1];
    var _z = useState(DEFAULT_VALUES.STAMP), stamp = _z[0], updateStamp = _z[1];
    // NOTE: Actions provided by canvas instance somewhere in the DOM.
    // The canvas instance will be responsible for registering the actions
    // fulfilling the ICanvasActions interface. Now there can only be one
    // instance registered, but in the future we could add support for
    // multiple instances using the instanceId to choose which one to
    // apply action to.
    var _0 = useReducer(function (state, action) {
        if (action.op === "add") {
            state.set(action.id, action.value);
        }
        else if (action.op === "remove") {
            state.delete(action.id);
        }
        return state;
    }, new Map()), canvasActions = _0[0], updateCanvasActions = _0[1];
    var _1 = useState(true), eventedObjects = _1[0], updateEventedObjects = _1[1];
    // Hard coded until functionality to provide permissions to students is implemented.
    var allowPointer = false;
    // Hard coded until roles fully integrated.
    var universalPermits = function (id) {
        return id === 'teacher';
    };
    /**
     * Opens ClearWhiteboardModal
     */
    var openClearWhiteboardModal = function () {
        openModal();
    };
    var fillColorAction = useCallback(function (color) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.forEach(function (ca) { return ca.fillColor(color); });
    }, [canvasActions]);
    var changeStrokeColorAction = useCallback(function (color) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.forEach(function (ca) { return ca.changeStrokeColor(color); });
    }, [canvasActions]);
    var textColorAction = useCallback(function (color) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.forEach(function (ca) { return ca.textColor(color); });
    }, [canvasActions]);
    var clear = useCallback(function (filterUsers) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.forEach(function (ca) { return ca.clear(filterUsers); });
    }, [canvasActions]);
    var clearSelf = useCallback(function () {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.forEach(function (ca) { return ca.clearSelf(); });
    }, [canvasActions]);
    var discardActiveObjectAction = useCallback(function () {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.forEach(function (ca) { return ca.discardActiveObject(); });
    }, [canvasActions]);
    var addShapeAction = useCallback(function (specific) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.forEach(function (ca) { return ca.addShape(specific); });
    }, [canvasActions]);
    var eraseObjectAction = useCallback(function () {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.forEach(function (ca) { return ca.eraseObject(); });
    }, [canvasActions]);
    var setCanvasSelectionAction = useCallback(function (selection) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.forEach(function (ca) { return ca.setCanvasSelection(selection); });
    }, [canvasActions]);
    var undoAction = useCallback(function () {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.forEach(function (ca) { return ca.undo(); });
    }, [canvasActions]);
    var redoAction = useCallback(function () {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.forEach(function (ca) { return ca.redo(); });
    }, [canvasActions]);
    var value = {
        fontFamily: fontFamily,
        fontColor: fontColor,
        updateFontFamily: updateFontFamily,
        shape: shape,
        shapeColor: shapeColor,
        updateShape: updateShape,
        text: text,
        updateText: updateText,
        openClearWhiteboardModal: openClearWhiteboardModal,
        pointerEvents: pointerEvents,
        eraseType: eraseType,
        updateEraseType: updateEraseType,
        textIsActive: textIsActive,
        updateTextIsActive: updateTextIsActive,
        shapeIsActive: shapeIsActive,
        updateShapeIsActive: updateShapeIsActive,
        brushIsActive: brushIsActive,
        updateBrushIsActive: updateBrushIsActive,
        clearIsActive: clearIsActive,
        updateClearIsActive: updateClearIsActive,
        updateFontColor: updateFontColor,
        lineWidth: lineWidth,
        updateLineWidth: updateLineWidth,
        floodFill: floodFill,
        updateFloodFill: updateFloodFill,
        floodFillIsActive: floodFillIsActive,
        updateFloodFillIsActive: updateFloodFillIsActive,
        eventedObjects: eventedObjects,
        updateEventedObjects: updateEventedObjects,
        // Just for control selectors' value they can be modified in the future
        pointer: pointer,
        updatePointer: updatePointer,
        penLine: penLine,
        updatePenLine: updatePenLine,
        penColor: penColor,
        updatePenColor: updatePenColor,
        stamp: stamp,
        updateStamp: updateStamp,
        setPointerEvents: setPointerEvents,
        updateShapesAreSelectable: updateShapesAreSelectable,
        updateShapesAreEvented: updateShapesAreEvented,
        closeModal: closeModal,
        updateShapeColor: updateShapeColor,
        shapesAreSelectable: shapesAreSelectable,
        shapesAreEvented: shapesAreEvented,
        canvasActions: canvasActions,
        updateCanvasActions: updateCanvasActions,
        laserIsActive: laserIsActive,
        updateLaserIsActive: updateLaserIsActive,
        permissions: permissions,
        // NOTE: Actions that will get invoked based on registered handler.
        fillColor: fillColorAction,
        textColor: textColorAction,
        addShape: addShapeAction,
        discardActiveObject: discardActiveObjectAction,
        clear: clear,
        clearSelf: clearSelf,
        eraseObject: eraseObjectAction,
        changeStrokeColor: changeStrokeColorAction,
        setCanvasSelection: setCanvasSelectionAction,
        undo: undoAction,
        redo: redoAction,
        allowPointer: allowPointer,
        universalPermits: universalPermits,
        toolbarIsEnabled: toolbarIsEnabled,
        setToolbarIsEnabled: setToolbarIsEnabled,
    };
    return (React.createElement(WhiteboardContext.Provider, { value: value },
        React.createElement(ClearWhiteboardModal, { clearWhiteboard: function () { clearSelf(); closeModal(); } }),
        children));
};
//# sourceMappingURL=WhiteboardContext.js.map