import React, { createContext, useCallback, useState } from 'react';
// @ts-ignore
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
import { DEFAULT_VALUES } from '../../config/toolbar-default-values';
// @ts-ignore
export var WhiteboardContext = createContext();
export var WhiteboardProvider = function (_a) {
    var children = _a.children;
    var _b = useText(), text = _b.text, updateText = _b.updateText;
    var _c = useFontColor(), fontColor = _c.fontColor, updateFontColor = _c.updateFontColor;
    var _d = useFontFamily(), fontFamily = _d.fontFamily, updateFontFamily = _d.updateFontFamily;
    var _e = useShapeColor(), shapeColor = _e.shapeColor, updateShapeColor = _e.updateShapeColor;
    var _f = useShape(), shape = _f.shape, updateShape = _f.updateShape;
    var _g = useEraseType(), eraseType = _g.eraseType, updateEraseType = _g.updateEraseType;
    var _h = usePointerEvents(false), pointerEvents = _h.pointerEvents, setPointerEvents = _h.setPointerEvents;
    var _j = useWhiteboardClearModal(), ClearWhiteboardModal = _j.ClearWhiteboardModal, openModal = _j.openModal, closeModal = _j.closeModal;
    var _k = useTextIsActive(), textIsActive = _k.textIsActive, updateTextIsActive = _k.updateTextIsActive;
    var _l = useShapeIsActive(), shapeIsActive = _l.shapeIsActive, updateShapeIsActive = _l.updateShapeIsActive;
    var _m = useBrushIsActive(), brushIsActive = _m.brushIsActive, updateBrushIsActive = _m.updateBrushIsActive;
    // Provisional (just for change value in Toolbar selectors) they can be modified in the future
    var _o = useState(DEFAULT_VALUES.POINTER), pointer = _o[0], updatePointer = _o[1];
    var _p = useState(DEFAULT_VALUES.PEN_LINE), penLine = _p[0], updatePenLine = _p[1];
    var _q = useState(DEFAULT_VALUES.PEN_COLOR), penColor = _q[0], updatePenColor = _q[1];
    var _r = useState(DEFAULT_VALUES.THICKNESS), thickness = _r[0], updateThickness = _r[1];
    var _s = useState(DEFAULT_VALUES.FLOOD_FILL), floodFill = _s[0], updateFloodFill = _s[1];
    var _t = useState(DEFAULT_VALUES.STAMP), stamp = _t[0], updateStamp = _t[1];
    // NOTE: Actions provided by canvas instance somewhere in the DOM.
    // The canvas instance will be responsible for registering the actions
    // fulfilling the ICanvasActions interface. Now there can only be one
    // instance registered, but in the future we could add support for
    // multiple instances using the instanceId to choose which one to
    // apply action to.
    var _u = useState(), canvasActions = _u[0], updateCanvasActions = _u[1];
    var isLocalObject = function (id, canvasId) {
        var object = id.split(':');
        if (!object.length) {
            throw new Error('Invalid ID');
        }
        return object[0] === canvasId;
    };
    /**
     * Opens ClearWhiteboardModal
     */
    var openClearWhiteboardModal = function () {
        openModal();
    };
    var fillColorAction = useCallback(function (color) {
        var _a;
        (_a = canvasActions) === null || _a === void 0 ? void 0 : _a.fillColor(color);
    }, [canvasActions]);
    var changeStrokeColorAction = useCallback(function (color) {
        var _a;
        (_a = canvasActions) === null || _a === void 0 ? void 0 : _a.changeStrokeColor(color);
    }, [canvasActions]);
    var textColorAction = useCallback(function (color) {
        var _a;
        (_a = canvasActions) === null || _a === void 0 ? void 0 : _a.textColor(color);
    }, [canvasActions]);
    var clearWhiteboardAction = useCallback(function () {
        var _a;
        (_a = canvasActions) === null || _a === void 0 ? void 0 : _a.clearWhiteboard();
    }, [canvasActions]);
    var discardActiveObjectAction = useCallback(function () {
        var _a;
        (_a = canvasActions) === null || _a === void 0 ? void 0 : _a.discardActiveObject();
    }, [canvasActions]);
    var addShapeAction = useCallback(function (specific) {
        var _a;
        (_a = canvasActions) === null || _a === void 0 ? void 0 : _a.addShape(specific);
    }, [canvasActions]);
    var eraseObjectAction = useCallback(function () {
        var _a;
        (_a = canvasActions) === null || _a === void 0 ? void 0 : _a.eraseObject();
    }, [canvasActions]);
    var setCanvasSelectionAction = useCallback(function (selection) {
        var _a;
        (_a = canvasActions) === null || _a === void 0 ? void 0 : _a.setCanvasSelection(selection);
    }, [canvasActions]);
    /**
     * List of available colors in toolbar
     * */
    var colorsList = [
        'black',
        'red',
        'yellow',
        'green',
        'blue',
        'purple',
        'brown',
    ];
    var value = {
        fontFamily: fontFamily,
        fontColor: fontColor,
        updateFontFamily: updateFontFamily,
        colorsList: colorsList,
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
        updateFontColor: updateFontColor,
        // Just for control selectors' value they can be modified in the future
        pointer: pointer,
        updatePointer: updatePointer,
        penLine: penLine,
        updatePenLine: updatePenLine,
        penColor: penColor,
        updatePenColor: updatePenColor,
        thickness: thickness,
        updateThickness: updateThickness,
        floodFill: floodFill,
        updateFloodFill: updateFloodFill,
        stamp: stamp,
        updateStamp: updateStamp,
        setPointerEvents: setPointerEvents,
        isLocalObject: isLocalObject,
        updateShapeColor: updateShapeColor,
        closeModal: closeModal,
        updateCanvasActions: updateCanvasActions,
        // NOTE: Actions that will get invoked based on registered handler.
        fillColor: fillColorAction,
        textColor: textColorAction,
        addShape: addShapeAction,
        discardActiveObject: discardActiveObjectAction,
        clearWhiteboard: clearWhiteboardAction,
        eraseObject: eraseObjectAction,
        changeStrokeColor: changeStrokeColorAction,
        setCanvasSelection: setCanvasSelectionAction,
    };
    return (React.createElement(WhiteboardContext.Provider, { value: value },
        React.createElement(ClearWhiteboardModal, { clearWhiteboard: clearWhiteboardAction }),
        children));
};
//# sourceMappingURL=WhiteboardContext.js.map