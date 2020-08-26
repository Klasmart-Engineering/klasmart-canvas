import React, { createContext, useCallback, useState } from 'react';
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
export var WhiteboardContext = createContext({});
export var WhiteboardProvider = function (_a) {
    var children = _a.children, clearWhiteboardPermissions = _a.clearWhiteboardPermissions;
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
    var _q = useShapesAreSelectable(), shapesAreSelectable = _q.shapesAreSelectable, updateShapesAreSelectable = _q.updateShapesAreSelectable;
    var _r = useShapesAreEvented(), shapesAreEvented = _r.shapesAreEvented, updateShapesAreEvented = _r.updateShapesAreEvented;
    var _s = useFloodFillIsActive(), floodFillIsActive = _s.floodFillIsActive, updateFloodFillIsActive = _s.updateFloodFillIsActive;
    var _t = useLaserIsActive(), laserIsActive = _t.laserIsActive, updateLaserIsActive = _t.updateLaserIsActive;
    // Provisional (just for change value in Toolbar selectors) they can be modified in the future
    var _u = useState(DEFAULT_VALUES.POINTER), pointer = _u[0], updatePointer = _u[1];
    var _v = useState(DEFAULT_VALUES.PEN_LINE), penLine = _v[0], updatePenLine = _v[1];
    var _w = useState(DEFAULT_VALUES.PEN_COLOR), penColor = _w[0], updatePenColor = _w[1];
    var _x = useState(DEFAULT_VALUES.STAMP), stamp = _x[0], updateStamp = _x[1];
    // NOTE: Actions provided by canvas instance somewhere in the DOM.
    // The canvas instance will be responsible for registering the actions
    // fulfilling the ICanvasActions interface. Now there can only be one
    // instance registered, but in the future we could add support for
    // multiple instances using the instanceId to choose which one to
    // apply action to.
    var _y = useState(), canvasActions = _y[0], updateCanvasActions = _y[1];
    var isLocalObject = function (id, canvasId) {
        var object = id.split(':');
        if (!object.length) {
            throw new Error('Invalid ID');
        }
        return object[0] === canvasId;
    };
    var _z = useState(true), eventedObjects = _z[0], updateEventedObjects = _z[1];
    // Hard coded until functionality to provide permissions to students is implemented.
    var allowPointer = false;
    // Hard coded until roles fully integrated.
    var universalPermits = function (id) {
        return id === 'teacher';
    };
    // Temporary code to get undo / redo working while there are two boards
    // on the view.
    /* const tempKeyDown = (e: any) => {
      if (e.which === 90 && e.ctrlKey && !e.shiftKey) {
        dispatch({ type: UNDO, canvasId });
        return;
      }
  
      if (e.which === 89 && e.ctrlKey) {
        dispatch({ type: REDO, canvasId });
        return;
      }
    }; */
    /**
     * Opens ClearWhiteboardModal
     */
    var openClearWhiteboardModal = function () {
        openModal();
    };
    var fillColorAction = useCallback(function (color) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.fillColor(color);
    }, [canvasActions]);
    var changeStrokeColorAction = useCallback(function (color) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.changeStrokeColor(color);
    }, [canvasActions]);
    var textColorAction = useCallback(function (color) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.textColor(color);
    }, [canvasActions]);
    var clearWhiteboardActionClearMyself = useCallback(function () {
        if (clearWhiteboardPermissions.allowClearMyself) {
            canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.clearWhiteboardClearMySelf();
        }
    }, [canvasActions, clearWhiteboardPermissions]);
    var clearWhiteboardAllowClearOthersAction = useCallback(function (userId) {
        if (clearWhiteboardPermissions.allowClearOthers) {
            canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.clearWhiteboardAllowClearOthers(userId);
        }
    }, [canvasActions, clearWhiteboardPermissions]);
    var clearWhiteboardActionClearAll = useCallback(function () {
        if (clearWhiteboardPermissions.allowClearAll) {
            canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.clearWhiteboardClearAll();
        }
    }, [canvasActions, clearWhiteboardPermissions]);
    var discardActiveObjectAction = useCallback(function () {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.discardActiveObject();
    }, [canvasActions]);
    var addShapeAction = useCallback(function (specific) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.addShape(specific);
    }, [canvasActions]);
    var eraseObjectAction = useCallback(function () {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.eraseObject();
    }, [canvasActions]);
    var setCanvasSelectionAction = useCallback(function (selection) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.setCanvasSelection(selection);
    }, [canvasActions]);
    var undoAction = useCallback(function () {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.undo();
    }, [canvasActions]);
    var redoAction = useCallback(function () {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.redo();
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
        updateCanvasActions: updateCanvasActions,
        laserIsActive: laserIsActive,
        updateLaserIsActive: updateLaserIsActive,
        isLocalObject: isLocalObject,
        // NOTE: Actions that will get invoked based on registered handler.
        fillColor: fillColorAction,
        textColor: textColorAction,
        addShape: addShapeAction,
        discardActiveObject: discardActiveObjectAction,
        clearWhiteboard: clearWhiteboardActionClearMyself,
        clearWhiteboardAllowClearOthers: clearWhiteboardAllowClearOthersAction,
        clearWhiteboardClearAll: clearWhiteboardActionClearAll,
        eraseObject: eraseObjectAction,
        changeStrokeColor: changeStrokeColorAction,
        setCanvasSelection: setCanvasSelectionAction,
        undo: undoAction,
        redo: redoAction,
        allowPointer: allowPointer,
        universalPermits: universalPermits,
    };
    return (React.createElement(WhiteboardContext.Provider, { value: value },
        React.createElement(ClearWhiteboardModal, { clearWhiteboard: clearWhiteboardActionClearMyself }),
        children));
};
//# sourceMappingURL=WhiteboardContext.js.map