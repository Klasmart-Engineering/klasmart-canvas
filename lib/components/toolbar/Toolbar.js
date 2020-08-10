var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState, useContext } from 'react';
import ToolbarSection from './toolbar-section/ToolbarSection';
import '../../assets/style/toolbar.css';
import ToolbarButton from './toolbar-button/ToolbarButton';
import ToolbarSelector from './toolbar-selector/ToolbarSelector';
import { toolsSection, actionsSection } from './toolbar-sections';
import SpecialSelector from './special-selector/SpecialSelector';
import { WhiteboardContext } from '../../domain/whiteboard/WhiteboardContext';
import { ELEMENTS } from '../../config/toolbar-element-names';
import { UNDO, REDO } from '../../domain/whiteboard/reducers/undo-redo';
/**
 * Render the toolbar that will be used in the whiteboard
 */
function Toolbar() {
    var _a = useState(toolsSection), tools = _a[0], setTools = _a[1];
    var actions = useState(actionsSection)[0];
    var _b = useContext(WhiteboardContext), fillColor = _b.fillColor, textColor = _b.textColor, updateShape = _b.updateShape, fontFamily = _b.fontFamily, fontColor = _b.fontColor, updateFontFamily = _b.updateFontFamily, openClearWhiteboardModal = _b.openClearWhiteboardModal, setPointerEvents = _b.setPointerEvents, updateTextIsActive = _b.updateTextIsActive, updateShapeIsActive = _b.updateShapeIsActive, updateBrushIsActive = _b.updateBrushIsActive, shape = _b.shape, shapeColor = _b.shapeColor, eraseType = _b.eraseType, updateEraseType = _b.updateEraseType, discardActiveObject = _b.discardActiveObject, lineWidth = _b.lineWidth, updateLineWidth = _b.updateLineWidth, floodFill = _b.floodFill, updateFloodFill = _b.updateFloodFill, updateFloodFillIsActive = _b.updateFloodFillIsActive, updateEventedObjects = _b.updateEventedObjects, 
    // Just for control selectors' value may be changed in the future
    pointer = _b.pointer, updatePointer = _b.updatePointer, penLine = _b.penLine, updatePenLine = _b.updatePenLine, penColor = _b.penColor, changeStrokeColor = _b.changeStrokeColor, stamp = _b.stamp, updateStamp = _b.updateStamp, dispatch = _b.dispatch, updateShapesAreSelectable = _b.updateShapesAreSelectable, canvasId = _b.canvasId;
    /**
     * Is executed when a ToolbarButton is clicked in Tools section
     * and set the new selected button for that section
     * @param {number} index - index that the clicked button has in the array
     */
    function handleToolsElementClick(tool) {
        // Set Erase Type in initial value
        updateEraseType(null);
        /*
          It is setted to true when you select Add Text Tool,
          otherwise will be setted in false
        */
        updateTextIsActive(tool === ELEMENTS.ADD_TEXT_TOOL);
        /*
          It is setted to true when you select Add Shape Tool,
          otherwise will be setted in false
        */
        updateShapeIsActive(tool === ELEMENTS.ADD_SHAPE_TOOL);
        /**
         * Indicates if brush / pencil / pen tool is active.
         */
        updateBrushIsActive(tool === ELEMENTS.LINE_TYPE_TOOL);
        /**
         * Indicates if flood-fill/paint bucket is active.
         */
        updateFloodFillIsActive(tool === ELEMENTS.FLOOD_FILL_TOOL);
        /*
          It is setted to false when you select Pointer Tool,
          otherwise will be setted in true
        */
        setPointerEvents(tool !== ELEMENTS.POINTERS_TOOL);
        updateEventedObjects(tool === ELEMENTS.POINTERS_TOOL || tool === ELEMENTS.MOVE_OBJECTS_TOOL);
        /*
          If you click on another button different than
          the mentioned below the selected object will be deselected;
          the cases mentioned below will be handled in WhiteboardContext
        */
        if (tool !== ELEMENTS.ERASE_TYPE_TOOL &&
            tool !== ELEMENTS.ADD_TEXT_TOOL &&
            tool !== ELEMENTS.ADD_SHAPE_TOOL &&
            tool !== ELEMENTS.LINE_TYPE_TOOL &&
            tool !== ELEMENTS.LINE_WIDTH_TOOL) {
            discardActiveObject();
        }
        if (tool === ELEMENTS.POINTERS_TOOL ||
            tool === ELEMENTS.MOVE_OBJECTS_TOOL) {
            updateShapesAreSelectable(true);
        }
        else {
            updateShapesAreSelectable(false);
        }
        // set the clicked tool like active style in Toolbar
        setTools({
            active: tool,
            elements: __spreadArrays(tools.elements),
        });
    }
    /**
     * Is executed when a ToolbarButton is clicked in Actions section
     * and set the new selected button for that section
     * @param {number} index - index that the clicked button has in the array
     */
    function handleActionsElementClick(tool) {
        discardActiveObject();
        switch (tool) {
            case ELEMENTS.CLEAR_WHITEBOARD_ACTION:
                openClearWhiteboardModal();
                break;
            case ELEMENTS.UNDO_ACTION:
                dispatch({ type: UNDO, canvasId: canvasId });
                break;
            case ELEMENTS.REDO_ACTION:
                dispatch({ type: REDO, canvasId: canvasId });
        }
    }
    /**
     * Is executed when a change value happens in a Tools ToolbarSelector
     * @param {string} tool - index of the selector in ToolbarSection
     * @param {string} value - new selected value
     */
    function handleToolSelectorChange(tool, option) {
        switch (tool) {
            case ELEMENTS.POINTERS_TOOL:
                updatePointer(option);
                break;
            case ELEMENTS.LINE_TYPE_TOOL:
                updatePenLine(option);
                break;
            case ELEMENTS.LINE_WIDTH_TOOL:
                updateLineWidth(option);
                break;
            case ELEMENTS.FLOOD_FILL_TOOL:
                updateFloodFill(option);
                break;
            case ELEMENTS.ADD_TEXT_TOOL:
                updateFontFamily(option);
                break;
            case ELEMENTS.ADD_SHAPE_TOOL:
                updateShape(option);
                break;
            case ELEMENTS.ADD_STAMP_TOOL:
                updateStamp(option);
                break;
        }
    }
    /**
     * Is executed when the action of the element is triggered
     * @param {number} index - index that the element has in the ToolbarSection
     * @param {string} specific (optional) - specific value/option to use
     */
    function handleToolsElementAction(tool, specific) {
        updateEraseType(null);
        switch (tool) {
            case ELEMENTS.ERASE_TYPE_TOOL:
                updateEraseType(specific);
                break;
            case ELEMENTS.ADD_TEXT_TOOL:
                updateFontFamily(specific);
                break;
        }
    }
    /**
     * Is executed when a color was picked in elements with color palette
     * @param {number} index - index that the element has in ToolbarSection
     * @param {string} color - new color to set in the element
     */
    function changeColor(tool, color) {
        switch (tool) {
            case ELEMENTS.LINE_TYPE_TOOL:
                changeStrokeColor(color);
                break;
            case ELEMENTS.ADD_TEXT_TOOL:
                textColor(color);
                break;
            case ELEMENTS.ADD_SHAPE_TOOL:
                fillColor(color);
                break;
        }
    }
    /**
     * Set the props to create a new ColorPalette with the given icon
     * @param {OverridableComponent<SvgIconTypeMap<{}, 'svg'>>}
     * colorPaletteIcon - Icon to set in the color palette
     */
    function setColorPalette(tool) {
        var selected = '';
        if (!tool.colorPaletteIcon) {
            return undefined;
        }
        switch (tool.id) {
            case ELEMENTS.LINE_TYPE_TOOL:
                selected = penColor;
                break;
            case ELEMENTS.ADD_TEXT_TOOL:
                selected = fontColor;
                break;
            case ELEMENTS.ADD_SHAPE_TOOL:
                selected = shapeColor;
                break;
            default:
                selected = '';
                break;
        }
        return {
            icon: tool.colorPaletteIcon,
            selectedColor: selected,
            onChangeColor: changeColor,
        };
    }
    /**
     * Set the parent's definedOptionName in the given tool
     * @param {string} tool - Tool to set the definedOption
     */
    function setSelectedOptionSelector(tool) {
        switch (tool) {
            case ELEMENTS.POINTERS_TOOL:
                return pointer;
            case ELEMENTS.ERASE_TYPE_TOOL:
                return eraseType;
            case ELEMENTS.LINE_TYPE_TOOL:
                return penLine;
            case ELEMENTS.LINE_WIDTH_TOOL:
                return lineWidth;
            case ELEMENTS.FLOOD_FILL_TOOL:
                return floodFill;
            case ELEMENTS.ADD_TEXT_TOOL:
                return fontFamily;
            case ELEMENTS.ADD_SHAPE_TOOL:
                return shape;
            case ELEMENTS.ADD_STAMP_TOOL:
                return stamp;
            default:
                return '';
        }
    }
    var toolbarContainerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "120px",
    };
    var toolbarStyle = {
        display: "flex",
        flexDirection: "column",
        border: "solid 1px #d0d0d0",
        marginTop: "16px",
        backgroundColor: "#fff",
        borderRadius: "8px",
    };
    return (React.createElement("div", { className: "toolbar-container", style: toolbarContainerStyle },
        React.createElement("div", { className: "toolbar", style: toolbarStyle },
            React.createElement(ToolbarSection, null, tools.elements.map(function (tool) {
                return determineIfIsToolbarButton(tool)
                    ? createToolbarButton(tool.id, tool.title, tool.iconSrc, tool.iconName, tools.active === tool.id, handleToolsElementClick)
                    : determineIfIsToolbarSelector(tool)
                        ? createToolbarSelector(tool.id, tool.options, tools.active === tool.id, handleToolsElementClick, handleToolSelectorChange, handleToolsElementAction, setSelectedOptionSelector(tool.id), setColorPalette(tool))
                        : determineIfIsSpecialSelector(tool)
                            ? createSpecialSelector(tool.id, tool.icon, tools.active === tool.id, setSelectedOptionSelector(tool.id), tool.styleOptions, handleToolsElementClick, handleToolSelectorChange)
                            : null;
            })),
            React.createElement(ToolbarSection, null, actions.elements.map(function (action) {
                return determineIfIsToolbarButton(action)
                    ? createToolbarButton(action.id, action.title, action.iconSrc, action.iconName, actions.active === action.id, handleActionsElementClick)
                    : null;
            })))));
}
/**
 * Creates a ToolbarButton
 * @param {string} id - id of the button
 * @param {string} iconSrc - src for the icon of the button
 * @param {string} iconName - alt for the icon of the button
 * @param {boolean} active - flag to set this button like active
 * @param {(index: number) => void} onClick - function to execute when button is clicked
 */
function createToolbarButton(id, title, iconSrc, iconName, active, onClick) {
    return (React.createElement(ToolbarButton, { key: id, id: id, title: title, iconSrc: iconSrc, iconName: iconName, active: active, onClick: onClick }));
}
/**
 * Creates a ToolbarSelector
 * @param {string} id - id of the selector
 * @param {IToolbarSelectorOption[]} options - options that the selector
 * will have
 * @param {boolean} active - flag to set this selector like active
 * @param {(index: number) => void} onClick - function to execute
 * when selector is clicked
 * @param {(value: string) => void} onChange - function to execute
 * when selector's value changes
 * @param {(index: number) => void} onAction - function to execute when
 * the action of this element is triggered
 * @param {string} definedOptionName - selected option name defined by parent
 * @param {IColorPalette} colorPalette (optional) - Describes
 * the color palette to use
 */
function createToolbarSelector(id, options, active, onClick, onChange, onAction, selectedValue, colorPalette) {
    return (React.createElement(ToolbarSelector, { key: id, id: id, options: options, active: active, selectedValue: selectedValue, colorPalette: colorPalette, onAction: onAction, onClick: onClick, onChange: onChange }));
}
/**
 * Create an SpecialToolbarSelector
 * @param {string} id - id of the selector
 * @param {OverridableComponent<SvgIconTypeMap<{}, 'svg'>>} Icon - Icon
 * that the selector will have
 * @param {boolean} selected - flag to set this selector like selected
 * @param {IStyleOptions[]} styleOptions - Options for the special selector
 * @param {(index: number) => void} onClick - Function to execute when
 * selector is clicked
 * @param {(value: string) => void} onChange - Function to execute when
 * selector's value is changed
 */
function createSpecialSelector(id, Icon, active, selectedValue, styleOptions, onClick, onChange) {
    return (React.createElement(SpecialSelector, { key: id, id: id, Icon: Icon, active: active, selectedValue: selectedValue, styleOptions: styleOptions, onClick: onClick, onChange: onChange }));
}
/**
 * Validate if the given object has ToolbarButton Props
 * @param {ToolbarElementTypes} toBeDetermined - Object to validate
 */
function determineIfIsToolbarButton(toBeDetermined) {
    return !!toBeDetermined.iconSrc;
}
/**
 * Validate if the given object has ToolbarSelector Props
 * @param {ToolbarElementTypes} toBeDetermined - Object to validate
 */
function determineIfIsToolbarSelector(toBeDetermined) {
    return !!toBeDetermined.options;
}
/**
 * Validate if the given object has SpecialToolbarSelector Props
 * @param {ToolbarElementTypes} toBeDetermined - Object to validate
 */
function determineIfIsSpecialSelector(toBeDetermined) {
    return !!toBeDetermined.icon;
}
export default Toolbar;
//# sourceMappingURL=Toolbar.js.map