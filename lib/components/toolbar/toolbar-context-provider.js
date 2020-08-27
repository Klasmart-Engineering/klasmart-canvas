var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { createContext, useCallback, useContext, useState, } from 'react';
import { colorPaletteOptions, toolsSection } from './toolbar-sections';
import { selectorOptionsWithId, selectorStyleOptionsWithId, } from './toolbar-utils';
import { WhiteboardContext } from '../../domain/whiteboard/WhiteboardContext';
import { ELEMENTS } from '../../config/toolbar-element-names';
var toolsLookup = {
    select: { id: 'pointers', options: selectorOptionsWithId('pointers') },
    pointer: { id: 'laser_pointer', options: selectorOptionsWithId('laser_pointer') },
    move: { id: 'move_objects', options: selectorOptionsWithId('move_objects') },
    eraser: { id: 'erase_type', options: selectorOptionsWithId('erase_type') },
    line: { id: 'line_type', options: selectorOptionsWithId('line_type') },
    fill: { id: 'flood_fill', options: selectorOptionsWithId('flood_fill') },
    text: { id: 'add_text', options: selectorOptionsWithId('add_text') },
    shape: { id: 'add_shape', options: selectorOptionsWithId('add_shape') },
    stamp: { id: 'add_stamp', options: selectorOptionsWithId('add_stamp') },
};
var colors = colorPaletteOptions.reduce(function (map, color) {
    return map.set(color.id, color);
}, new Map());
var thickness = selectorStyleOptionsWithId('line_width')
    .map(function (opt) {
    return { id: opt.id, style: opt.style, value: opt.value };
})
    .reduce(function (map, style) {
    return map.set(style.id, style);
}, new Map());
export var Context = createContext(undefined);
export default function ToolbarContextProvider(_a) {
    var children = _a.children;
    var _b = useState(toolsSection), tools = _b[0], setTools = _b[1];
    var _c = useState(undefined), selectedTool = _c[0], setSelectedTool = _c[1];
    var _d = useState(undefined), selectedColor = _d[0], setSelectedColor = _d[1];
    var _e = useState(undefined), selectedOption = _e[0], setSelectedOption = _e[1];
    var _f = useContext(WhiteboardContext), updateEraseType = _f.updateEraseType, discardActiveObject = _f.discardActiveObject, textIsActive = _f.textIsActive, updateTextIsActive = _f.updateTextIsActive, updateShapeIsActive = _f.updateShapeIsActive, updateBrushIsActive = _f.updateBrushIsActive, updateFloodFillIsActive = _f.updateFloodFillIsActive, updateLaserIsActive = _f.updateLaserIsActive, setPointerEvents = _f.setPointerEvents, updateEventedObjects = _f.updateEventedObjects, updateShapesAreSelectable = _f.updateShapesAreSelectable, updateShapesAreEvented = _f.updateShapesAreEvented, updatePointer = _f.updatePointer, updatePenLine = _f.updatePenLine, updateLineWidth = _f.updateLineWidth, updateFloodFill = _f.updateFloodFill, updateFontFamily = _f.updateFontFamily, updateShape = _f.updateShape, updateStamp = _f.updateStamp, changeStrokeColor = _f.changeStrokeColor, textColor = _f.textColor, fillColor = _f.fillColor, undo = _f.undo, redo = _f.redo, clearWhiteboard = _f.clearWhiteboard, clearWhiteboardOther = _f.clearWhiteboardAllowClearOthers, clearWhiteboardAll = _f.clearWhiteboardClearAll;
    var selectToolOption = useCallback(function (toolId, option) {
        switch (toolId) {
            case ELEMENTS.POINTERS_TOOL:
                updatePointer(option.value);
                break;
            case ELEMENTS.LINE_TYPE_TOOL:
                updatePenLine(option.value);
                break;
            case ELEMENTS.LINE_WIDTH_TOOL:
                updateLineWidth(Number(option.value));
                break;
            case ELEMENTS.FLOOD_FILL_TOOL:
                updateFloodFill(option.value);
                break;
            case ELEMENTS.ADD_TEXT_TOOL:
                updateFontFamily(option.value);
                break;
            case ELEMENTS.ADD_SHAPE_TOOL:
                updateShape(option.value);
                break;
            case ELEMENTS.ADD_STAMP_TOOL:
                updateStamp(option.value);
                break;
            case ELEMENTS.ERASE_TYPE_TOOL:
                updateEraseType(option.value);
                break;
        }
    }, [updateEraseType, updateFloodFill, updateFontFamily, updateLineWidth, updatePenLine, updatePointer, updateShape, updateStamp]);
    var selectToolAction = useCallback(function (toolType, option) {
        var tool = toolsLookup[toolType];
        updateEraseType(null);
        if ((tool.id !== ELEMENTS.ERASE_TYPE_TOOL &&
            tool.id !== ELEMENTS.ADD_TEXT_TOOL &&
            tool.id !== ELEMENTS.LINE_TYPE_TOOL &&
            tool.id !== ELEMENTS.LINE_WIDTH_TOOL) ||
            (textIsActive && tool.id !== ELEMENTS.ADD_TEXT_TOOL)) {
            discardActiveObject();
        }
        updateTextIsActive(tool.id === ELEMENTS.ADD_TEXT_TOOL);
        updateShapeIsActive(tool.id === ELEMENTS.ADD_SHAPE_TOOL);
        updateBrushIsActive(tool.id === ELEMENTS.LINE_TYPE_TOOL);
        updateFloodFillIsActive(tool.id === ELEMENTS.FLOOD_FILL_TOOL);
        updateLaserIsActive(tool.id === ELEMENTS.LASER_TOOL);
        setPointerEvents(tool.id !== ELEMENTS.POINTERS_TOOL);
        updateEventedObjects(tool.id === ELEMENTS.POINTERS_TOOL || tool.id === ELEMENTS.MOVE_OBJECTS_TOOL);
        if (tool.id === ELEMENTS.POINTERS_TOOL ||
            tool.id === ELEMENTS.MOVE_OBJECTS_TOOL) {
            updateShapesAreSelectable(true);
        }
        else {
            updateShapesAreSelectable(false);
        }
        updateShapesAreEvented(tool.id === ELEMENTS.FLOOD_FILL_TOOL || tool.id === ELEMENTS.ERASE_TYPE_TOOL);
        setTools({ active: tool.id, elements: __spreadArrays(tools.elements) });
        setSelectedTool(toolType);
        setSelectedOption(option);
        if (option) {
            selectToolOption(tool.id, option);
        }
    }, [discardActiveObject, selectToolOption, setPointerEvents, textIsActive, tools.elements, updateBrushIsActive, updateEraseType, updateEventedObjects, updateFloodFillIsActive, updateLaserIsActive, updateShapeIsActive, updateShapesAreEvented, updateShapesAreSelectable, updateTextIsActive]);
    var selectColorByValueAction = useCallback(function (color) {
        // TODO: There might be bugs in this action, I'm not sure in which
        // condition the 'updateFloodFill/fillColor/changeStrokeColor/textColor' 
        // should be called. I think from the user's perspective they should
        // select one color and that color is used based on which tool is 
        // selected.
        updateFloodFill(color);
        // NOTE: Added this conditional because without it selected
        // lines would get filled (not just stroked) whenever the color was selected.
        if (selectedTool === "shape") {
            fillColor(color);
        }
        else {
            changeStrokeColor(color);
            textColor(color);
        }
        setSelectedColor(color);
    }, [changeStrokeColor, fillColor, selectedTool, textColor, updateFloodFill]);
    var selectColorByNameAction = useCallback(function (colorName) {
        var color = colors.get(colorName);
        if (!color)
            return;
        selectColorByValueAction(String(color.value));
    }, [selectColorByValueAction]);
    var clearAction = useCallback(function (filter) {
        if (filter) {
            clearWhiteboardOther(filter);
        }
        else {
            clearWhiteboard();
        }
    }, [clearWhiteboard, clearWhiteboardOther]);
    var clearAllAction = useCallback(function () {
        clearWhiteboardAll();
    }, [clearWhiteboardAll]);
    var undoAction = useCallback(function () {
        undo();
    }, [undo]);
    var redoAction = useCallback(function () {
        redo();
    }, [redo]);
    var actions = {
        selectTool: selectToolAction,
        selectColorByName: selectColorByNameAction,
        selectColorByValue: selectColorByValueAction,
        clear: clearAction,
        clearAll: clearAllAction,
        undo: undoAction,
        redo: redoAction,
    };
    var status = {
        selectedTool: selectedTool,
        selectedToolOption: selectedOption,
        selectedColor: selectedColor,
    };
    return (React.createElement(Context.Provider, { value: { state: { tools: toolsLookup, colors: colors, thickness: thickness }, status: status, actions: actions } }, children));
}
export function useToolbarContext() {
    return useContext(Context);
}
//# sourceMappingURL=toolbar-context-provider.js.map