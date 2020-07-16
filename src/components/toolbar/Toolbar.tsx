import React, { useState, useContext } from 'react';
import ToolbarSection from './toolbar-section/ToolbarSection';
import './toolbar.css';
import ToolbarText from './toolbar-text/ToolbarText';
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

export const ELEMENTS = {
  ADD_IMAGE_ACTION: 'add_image',
  UNDO_ACTION: 'undo',
  REDO_ACTION: 'redo',
  CLEAR_WHITEBOARD_ACTION: 'clear_whiteboard',
  WHITEBOARD_SCREENSHOT_ACTION: 'whiteboard_screenshot',
  SHARE_WHITEBOARD_ACTION: 'share_whiteboard',
  POINTERS_TOOL: 'pointers',
  MOVE_OBJECTS_TOOL: 'move_objects',
  ERASE_TYPE_TOOL: 'erase_type',
  LINE_TYPE_TOOL: 'line_type',
  THICKNESS_SIZE_TOOL: 'thickness_size',
  FLOOD_FILL_TOOL: 'flood_fill',
  ADD_TEXT_TOOL: 'add_text',
  ADD_SHAPE_TOOL: 'add_shape',
  ADD_STAMP_TOOL: 'add_stamp',
};

// Toolbar Element Available Types
type ToolbarElementTypes =
  | IBasicToolbarButton
  | IBasicToolbarSelector
  | IBasicSpecialSelector;

/**
 * Render the toolbar that will be used in the whiteboard
 */
function Toolbar() {
  const [showInput, updateShowInput] = useState(false);
  const [tools, setTools] = useState(toolsSection);
  const [actions] = useState(actionsSection);

  const {
    fillColor,
    textColor,
    updateShape,
    addShape,
    text,
    fontFamily,
    updateText,
    updateFontFamily,
    writeText,
    openClearWhiteboardModal,
    setPointerEvents,
    eraseType,
    updateEraseType,
  } = useContext(WhiteboardContext);

  /**
   * Is executed when a ToolbarButton is clicked in Tools section
   * and set the new selected button for that section
   * @param {number} index - index that the clicked button has in the array
   */
  function handleToolsElementClick(tool: string) {
    updateEraseType('');
    updateShowInput(tool === ELEMENTS.ADD_TEXT_TOOL);
    setPointerEvents(tool !== ELEMENTS.POINTERS_TOOL);

    setTools({
      selected: tool,
      elements: [...tools.elements],
    });
  }

  /**
   * Is executed when a ToolbarButton is clicked in Actions section
   * and set the new selected button for that section
   * @param {number} index - index that the clicked button has in the array
   */
  function handleActionsElementClick(tool: string) {
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
  function handleToolSelectorChange(tool: string, value: string) {
    switch (tool) {
      case ELEMENTS.ADD_TEXT_TOOL:
        updateFontFamily(value);
        break;

      case ELEMENTS.ADD_SHAPE_TOOL:
        updateShape(value.toLowerCase());
        break;

      case ELEMENTS.ERASE_TYPE_TOOL:
        updateEraseType(value);
        break;
    }
  }

  /**
   * Is executed when the action of the element is triggered
   * @param {number} index - index that the element has in the ToolbarSection
   * @param {string} specific (optional) - specific value/option to use
   */
  function handleToolsElementAction(tool: string, specific?: string) {
    updateEraseType('');

    switch (true) {
      case tool === ELEMENTS.ERASE_TYPE_TOOL && specific === 'erase object':
        updateEraseType('Erase Object');
        break;

      case tool === ELEMENTS.ADD_SHAPE_TOOL:
        addShape(specific);
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
    colorPaletteIcon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  ): IColorPalette | undefined {
    if (!colorPaletteIcon) {
      return undefined;
    }

    return {
      icon: colorPaletteIcon,
      selectedColor: '#000',
      onChangeColor: changeColor,
    };
  }

  /**
   * Set the option defined by parent component to the elements that need it
   * @param {string} tool - Tool to set the parent defined option
   */
  function setDefaultOption(tool: string): string {
    switch (tool) {
      case ELEMENTS.ADD_TEXT_TOOL:
        return fontFamily;

      case ELEMENTS.ERASE_TYPE_TOOL:
        return eraseType;

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
                  tools.selected === tool.id,
                  handleToolsElementClick
                )
              : determineIfIsToolbarSelector(tool)
              ? createToolbarSelector(
                  tool.id,
                  tool.options,
                  tools.selected === tool.id,
                  handleToolsElementClick,
                  handleToolSelectorChange,
                  handleToolsElementAction,
                  setDefaultOption(tool.id),
                  setColorPalette(tool.colorPaletteIcon)
                )
              : determineIfIsSpecialSelector(tool)
              ? createSpecialSelector(
                  tool.id,
                  tool.icon,
                  tools.selected === tool.id,
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
                  actions.selected === action.id,
                  handleActionsElementClick
                )
              : null
          )}
        </ToolbarSection>
      </div>

      <ToolbarText
        showInput={showInput}
        text={text}
        updateText={updateText}
        writeText={writeText}
      />
    </div>
  );
}

/**
 * Creates a ToolbarButton
 * @param {string} id - id of the button
 * @param {string} iconSrc - src for the icon of the button
 * @param {string} iconName - alt for the icon of the button
 * @param {boolean} selected - flag to set this button like selected
 * @param {(index: number) => void} onClick - function to execute
 * when button is clicked
 */
function createToolbarButton(
  id: string,
  title: string,
  iconSrc: string,
  iconName: string,
  selected: boolean,
  onClick: (tool: string) => void
): JSX.Element {
  return (
    <ToolbarButton
      key={id}
      id={id}
      title={title}
      iconSrc={iconSrc}
      iconName={iconName}
      selected={selected}
      onClick={onClick}
    />
  );
}

/**
 * Creates a ToolbarSelector
 * @param {string} id - id of the selector
 * @param {IToolbarSelectorOption[]} options - options that the selector
 * will have
 * @param {boolean} selected - flag to set this selector like selected
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
  selected: boolean,
  onClick: (tool: string) => void,
  onChange: (tool: string, value: string) => void,
  onAction: (tool: string) => void,
  definedOptionName?: string,
  colorPalette?: IColorPalette
): JSX.Element {
  return (
    <ToolbarSelector
      key={id}
      id={id}
      options={options}
      selected={selected}
      definedOptionName={definedOptionName}
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
  selected: boolean,
  styleOptions: IStyleOptions[],
  onClick: (tool: string) => void,
  onChange: (tool: string, value: string) => void
): JSX.Element {
  return (
    <SpecialSelector
      key={id}
      id={id}
      Icon={Icon}
      selected={selected}
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
