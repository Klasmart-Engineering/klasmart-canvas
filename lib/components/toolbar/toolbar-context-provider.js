import React, { createContext, useCallback, useContext, useState, useMemo, useEffect } from 'react';
import { colorPaletteOptions } from './toolbar-sections';
import { selectorOptionsWithId, selectorStyleOptionsWithId, } from './toolbar-utils';
import { WhiteboardContext } from '../../domain/whiteboard/WhiteboardContext';
import { ELEMENTS } from '../../config/toolbar-element-names';
export var Context = createContext(undefined);
export default function ToolbarContextProvider(_a) {
    var children = _a.children;
    var _b = useState(undefined), selectedTool = _b[0], setSelectedTool = _b[1];
    var _c = useState(undefined), selectedColor = _c[0], setSelectedColor = _c[1];
    var _d = useState(undefined), selectedOption = _d[0], setSelectedOption = _d[1];
    var _e = useContext(WhiteboardContext), updateEraseType = _e.updateEraseType, discardActiveObject = _e.discardActiveObject, textIsActive = _e.textIsActive, updateTextIsActive = _e.updateTextIsActive, updateShapeIsActive = _e.updateShapeIsActive, updateBrushIsActive = _e.updateBrushIsActive, updateFloodFillIsActive = _e.updateFloodFillIsActive, updateLaserIsActive = _e.updateLaserIsActive, setPointerEvents = _e.setPointerEvents, updateEventedObjects = _e.updateEventedObjects, updateShapesAreSelectable = _e.updateShapesAreSelectable, updateShapesAreEvented = _e.updateShapesAreEvented, updatePointer = _e.updatePointer, updatePenLine = _e.updatePenLine, updateLineWidth = _e.updateLineWidth, updateFloodFill = _e.updateFloodFill, updateFontFamily = _e.updateFontFamily, updateShape = _e.updateShape, updateStamp = _e.updateStamp, changeStrokeColor = _e.changeStrokeColor, textColor = _e.textColor, fillColor = _e.fillColor, undo = _e.undo, redo = _e.redo, clear = _e.clear, setClickThrough = _e.setClickThrough;
    var toolsLookup = useMemo(function () {
        return {
            clickthrough: { id: 'clickthrough_pointer', options: selectorOptionsWithId('none') },
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
    }, []);
    var colorsLookup = useMemo(function () {
        return colorPaletteOptions.reduce(function (map, color) {
            return map.set(color.id, color);
        }, new Map());
    }, []);
    var colors = useMemo(function () {
        return Array.from(colorsLookup.values());
    }, [colorsLookup]);
    var thicknessLookup = useMemo(function () {
        return selectorStyleOptionsWithId('line_width')
            .map(function (opt) {
            return { id: opt.id, style: opt.style, value: opt.value };
        })
            .reduce(function (map, style) {
            return map.set(style.id, style);
        }, new Map());
    }, []);
    var thickness = useMemo(function () {
        return Array.from(thicknessLookup.values());
    }, [thicknessLookup]);
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
        setClickThrough(tool.id === ELEMENTS.CLICKTHROUGH_TOOL);
        updateEventedObjects(tool.id === ELEMENTS.POINTERS_TOOL || tool.id === ELEMENTS.MOVE_OBJECTS_TOOL);
        if (tool.id === ELEMENTS.POINTERS_TOOL ||
            tool.id === ELEMENTS.MOVE_OBJECTS_TOOL) {
            updateShapesAreSelectable(true);
        }
        else {
            updateShapesAreSelectable(false);
        }
        updateShapesAreEvented(tool.id === ELEMENTS.FLOOD_FILL_TOOL || tool.id === ELEMENTS.ERASE_TYPE_TOOL);
        setSelectedTool(toolType);
        setSelectedOption(option);
        if (option) {
            selectToolOption(tool.id, option);
        }
    }, [discardActiveObject, selectToolOption, setClickThrough, setPointerEvents, textIsActive, toolsLookup, updateBrushIsActive, updateEraseType, updateEventedObjects, updateFloodFillIsActive, updateLaserIsActive, updateShapeIsActive, updateShapesAreEvented, updateShapesAreSelectable, updateTextIsActive]);
    useEffect(function () {
        setClickThrough(true);
    }, [setClickThrough]);
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
        var color = colorsLookup.get(colorName);
        if (!color)
            return;
        selectColorByValueAction(String(color.value));
    }, [colorsLookup, selectColorByValueAction]);
    var clearAction = useCallback(function (filter) {
        clear(filter);
    }, [clear]);
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