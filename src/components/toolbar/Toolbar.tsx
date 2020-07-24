import React, { useState, useContext } from 'react';
import ToolbarSection from './toolbar-section/ToolbarSection';
import './toolbar.css';
import ToolbarButton from './toolbar-button/ToolbarButton';
import ToolbarSelector from './toolbar-selector/ToolbarSelector';
import IToolbarSelectorOption from '../../interfaces/toolbar/toolbar-selector/toolbar-selector-option';
import { toolsSection, actionsSection } from './toolbar-sections';
import SpecialSelector from './special-selector/SpecialSelector';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import IStyleOptions from '../../interfaces/toolbar/toolbar-special-elements/style-option';
import IBasicToolbarSelector from '../../interfaces/toolbar/toolbar-selector/basic-toolbar-selector';
import IBasicToolbarButton from '../../interfaces/toolbar/toolbar-button/basic-toolbar-button';
import IColorPalette from '../../interfaces/toolbar/toolbar-selector/color-palette';
import IBasicSpecialSelector from '../../interfaces/toolbar/toolbar-special-elements/basic-special-selector';
import { WhiteboardContext } from '../../domain/whiteboard/WhiteboardContext';
import { ELEMENTS } from '../../config/toolbar-element-names';

// Toolbar Element Available Types
type ToolbarElementTypes =
  | IBasicToolbarButton
  | IBasicToolbarSelector
  | IBasicSpecialSelector;

/**
 * Render the toolbar that will be used in the whiteboard
 */
function Toolbar() {
  const [tools, setTools] = useState(toolsSection);
  const [actions] = useState(actionsSection);

  const {
    fillColor,
    textColor,
    updateShape,
    fontFamily,
    fontColor,
    updateFontFamily,
    openClearWhiteboardModal,
    setPointerEvents,
    updateTextIsActive,
    updateShapeIsActive,
    updateBrushIsActive,
    shape,
    shapeColor,
    eraseType,
    updateEraseType,
    discardActiveObject,
    lineWidth,
    updateLineWidth,
    // Just for control selectors' value may be changed in the future
    pointer,
    updatePointer,
    penLine,
    updatePenLine,
    penColor,
    updatePenColor,
    floodFill,
    updateFloodFill,
    stamp,
    updateStamp,
  }: any = useContext(WhiteboardContext);

  /**
   * Is executed when a ToolbarButton is clicked in Tools section
   * and set the new selected button for that section
   * @param {number} index - index that the clicked button has in the array
   */
  function handleToolsElementClick(tool: string) {
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

    /*
      It is setted to false when you select Pointer Tool,
      otherwise will be setted in true
    */
    setPointerEvents(tool !== ELEMENTS.POINTERS_TOOL);

    /*
      If you click on another button different than
      the mentioned below the selected object will be deselected;
      the cases mentioned below will be handled in WhiteboardContext
    */
    if (
      tool !== ELEMENTS.ERASE_TYPE_TOOL &&
      tool !== ELEMENTS.ADD_TEXT_TOOL &&
      tool !== ELEMENTS.ADD_SHAPE_TOOL &&
      tool !== ELEMENTS.LINE_TYPE_TOOL &&
      tool !== ELEMENTS.THICKNESS_SIZE_TOOL
    ) {
      discardActiveObject();
    }

    // set the clicked tool like active style in Toolbar
    setTools({
      active: tool,
      elements: [...tools.elements],
    });
  }

  /**
   * Is executed when a ToolbarButton is clicked in Actions section
   * and set the new selected button for that section
   * @param {number} index - index that the clicked button has in the array
   */
  function handleActionsElementClick(tool: string) {
    discardActiveObject();

    switch (tool) {
      case ELEMENTS.CLEAR_WHITEBOARD_ACTION: {
        openClearWhiteboardModal();
      }
    }
  }

  /**
   * Is executed when a change value happens in a Tools ToolbarSelector
   * @param {string} tool - index of the selector in ToolbarSection
   * @param {string} value - new selected value
   */
  function handleToolSelectorChange(tool: string, option: string) {
    switch (tool) {
      case ELEMENTS.POINTERS_TOOL:
        updatePointer(option);
        break;

      case ELEMENTS.LINE_TYPE_TOOL:
        updatePenLine(option);
        break;

      case ELEMENTS.THICKNESS_SIZE_TOOL:
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
  function handleToolsElementAction(tool: string, specific?: string) {
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
  function changeColor(tool: string, color: string) {
    switch (tool) {
      case ELEMENTS.LINE_TYPE_TOOL:
        updatePenColor(color);
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
  function setColorPalette(
    tool: IBasicToolbarSelector
  ): IColorPalette | undefined {
    let selected = '';

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
  function setSelectedOptionSelector(tool: string): string {
    switch (tool) {
      case ELEMENTS.POINTERS_TOOL:
        return pointer;

      case ELEMENTS.ERASE_TYPE_TOOL:
        return eraseType;

      case ELEMENTS.LINE_TYPE_TOOL:
        return penLine;

      case ELEMENTS.THICKNESS_SIZE_TOOL:
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

  return (
    <div className="toolbar-container">
      <div className="toolbar">
        <ToolbarSection>
          {tools.elements.map((tool) =>
            determineIfIsToolbarButton(tool)
              ? createToolbarButton(
                  tool.id,
                  tool.title,
                  tool.iconSrc,
                  tool.iconName,
                  tools.active === tool.id,
                  handleToolsElementClick
                )
              : determineIfIsToolbarSelector(tool)
              ? createToolbarSelector(
                  tool.id,
                  tool.options,
                  tools.active === tool.id,
                  handleToolsElementClick,
                  handleToolSelectorChange,
                  handleToolsElementAction,
                  setSelectedOptionSelector(tool.id),
                  setColorPalette(tool)
                )
              : determineIfIsSpecialSelector(tool)
              ? createSpecialSelector(
                  tool.id,
                  tool.icon,
                  tools.active === tool.id,
                  setSelectedOptionSelector(tool.id),
                  tool.styleOptions,
                  handleToolsElementClick,
                  handleToolSelectorChange
                )
              : null
          )}
        </ToolbarSection>

        <ToolbarSection>
          {actions.elements.map((action) =>
            determineIfIsToolbarButton(action)
              ? createToolbarButton(
                  action.id,
                  action.title,
                  action.iconSrc,
                  action.iconName,
                  actions.active === action.id,
                  handleActionsElementClick
                )
              : null
          )}
        </ToolbarSection>
      </div>
    </div>
  );
}

/**
 * Creates a ToolbarButton
 * @param {string} id - id of the button
 * @param {string} iconSrc - src for the icon of the button
 * @param {string} iconName - alt for the icon of the button
 * @param {boolean} active - flag to set this button like active
 * @param {(index: number) => void} onClick - function to execute when button is clicked
 */
function createToolbarButton(
  id: string,
  title: string,
  iconSrc: string,
  iconName: string,
  active: boolean,
  onClick: (tool: string) => void
): JSX.Element {
  return (
    <ToolbarButton
      key={id}
      id={id}
      title={title}
      iconSrc={iconSrc}
      iconName={iconName}
      active={active}
      onClick={onClick}
    />
  );
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
function createToolbarSelector(
  id: string,
  options: IToolbarSelectorOption[],
  active: boolean,
  onClick: (tool: string) => void,
  onChange: (tool: string, value: string) => void,
  onAction: (tool: string) => void,
  selectedValue: string,
  colorPalette?: IColorPalette
): JSX.Element {
  return (
    <ToolbarSelector
      key={id}
      id={id}
      options={options}
      active={active}
      selectedValue={selectedValue}
      colorPalette={colorPalette}
      onAction={onAction}
      onClick={onClick}
      onChange={onChange}
    />
  );
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
function createSpecialSelector(
  id: string,
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>,
  active: boolean,
  selectedValue: string,
  styleOptions: IStyleOptions[],
  onClick: (tool: string) => void,
  onChange: (tool: string, value: string) => void
): JSX.Element {
  return (
    <SpecialSelector
      key={id}
      id={id}
      Icon={Icon}
      active={active}
      selectedValue={selectedValue}
      styleOptions={styleOptions}
      onClick={onClick}
      onChange={onChange}
    />
  );
}

/**
 * Validate if the given object has ToolbarButton Props
 * @param {ToolbarElementTypes} toBeDetermined - Object to validate
 */
function determineIfIsToolbarButton(
  toBeDetermined: ToolbarElementTypes
): toBeDetermined is IBasicToolbarButton {
  return !!(toBeDetermined as IBasicToolbarButton).iconSrc;
}

/**
 * Validate if the given object has ToolbarSelector Props
 * @param {ToolbarElementTypes} toBeDetermined - Object to validate
 */
function determineIfIsToolbarSelector(
  toBeDetermined: ToolbarElementTypes
): toBeDetermined is IBasicToolbarSelector {
  return !!(toBeDetermined as IBasicToolbarSelector).options;
}

/**
 * Validate if the given object has SpecialToolbarSelector Props
 * @param {ToolbarElementTypes} toBeDetermined - Object to validate
 */
function determineIfIsSpecialSelector(
  toBeDetermined: ToolbarElementTypes
): toBeDetermined is IBasicSpecialSelector {
  return !!(toBeDetermined as IBasicSpecialSelector).icon;
}

export default Toolbar;
