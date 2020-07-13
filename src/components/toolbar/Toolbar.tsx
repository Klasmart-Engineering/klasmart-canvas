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
import { WhiteboardContext } from '../../domain/whiteboard/WhiteboardContext';
import IBasicToolbarSelector from '../../interfaces/toolbar/toolbar-selector/basic-toolbar-selector';
import IBasicToolbarButton from '../../interfaces/toolbar/toolbar-button/basic-toolbar-button';
import IColorPalette from '../../interfaces/toolbar/toolbar-selector/color-palette';
import IBasicSpecialSelector from '../../interfaces/toolbar/toolbar-special-elements/basic-special-selector';

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
    removeSelectedElement,
    text,
    fontFamily,
    updateText,
    updateFontFamily,
    writeText,
    openClearWhiteboardModal,
  } = useContext(WhiteboardContext);

  /**
   * Is executed when a ToolbarButton is clicked in Tools section
   * and set the new selected button for that section
   * @param {number} index - index that the clicked button has in the array
   */
  function handleToolsElementClick(index: number) {
    updateShowInput(index === 6);

    setTools({
      selected: index,
      elements: [...tools.elements],
    });
  }

  /**
   * Is executed when a ToolbarButton is clicked in Actions section
   * and set the new selected button for that section
   * @param {number} index - index that the clicked button has in the array
   */
  function handleActionsElementClick(index: number) {
    switch (index) {
      case 3: {
        openClearWhiteboardModal();
      }
    }
  }

  /**
   * Is executed when a change value happens in a Tools ToolbarSelector
   * @param {number} index - index of the selector in ToolbarSection
   * @param {string} value - new selected value
   */
  function handleToolSelectorChange(index: number, value: string) {
    switch (index) {
      case 6: {
        updateFontFamily(value);
        break;
      }
      case 7: {
        updateShape(value.toLowerCase());
        break;
      }
    }
  }

  /**
   * Is executed when the action of the element is triggered
   * @param {number} index - index that the element has in the ToolbarSection
   * @param {string} specific (optional) - specific value/option to use
   */
  function handleToolsElementAction(index: number, specific?: string) {
    switch (true) {
      case index === 2 && specific === 'erase object':
        removeSelectedElement();
        break;

      case index === 7:
        addShape(specific);
        break;
    }
  }

  /**
   * Is executed when a color was picked in elements with color palette
   * @param {number} index - index that the element has in ToolbarSection
   * @param {string} color - new color to set in the element
   */
  function changeColor(index: number, color: string) {
    switch (index) {
      case 6:
        textColor(color);
        break;
      case 7:
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

  return (
    <div className="toolbar-container">
      <div className="toolbar">
        <ToolbarSection>
          {tools.elements.map((tool, index) =>
            determineIfIsToolbarButton(tool)
              ? createToolbarButton(
                  index,
                  tool.title,
                  tool.iconSrc,
                  tool.iconName,
                  tools.selected === index,
                  handleToolsElementClick
                )
              : determineIfIsToolbarSelector(tool)
              ? createToolbarSelector(
                  index,
                  tool.options,
                  tools.selected === index,
                  handleToolsElementClick,
                  handleToolSelectorChange,
                  handleToolsElementAction,
                  index === 6 ? fontFamily : null,
                  setColorPalette(tool.colorPaletteIcon)
                )
              : determineIfIsSpecialSelector(tool)
              ? createSpecialSelector(
                  index,
                  tool.icon,
                  tools.selected === index,
                  tool.styleOptions,
                  handleToolsElementClick,
                  handleToolSelectorChange
                )
              : null
          )}
        </ToolbarSection>

        <ToolbarSection>
          {actions.elements.map((action, index) =>
            determineIfIsToolbarButton(action)
              ? createToolbarButton(
                  index,
                  action.title,
                  action.iconSrc,
                  action.iconName,
                  actions.selected === index,
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
 * @param {number} index - index of the button in the section array
 * @param {string} iconSrc - src for the icon of the button
 * @param {string} iconName - alt for the icon of the button
 * @param {boolean} selected - flag to set this button like selected
 * @param {(index: number) => void} onClick - function to execute when button is clicked
 */
function createToolbarButton(
  index: number,
  title: string,
  iconSrc: string,
  iconName: string,
  selected: boolean,
  onClick: (index: number) => void
): JSX.Element {
  return (
    <ToolbarButton
      title={title}
      key={index}
      index={index}
      iconSrc={iconSrc}
      iconName={iconName}
      selected={selected}
      onClick={onClick}
    />
  );
}

/**
 * Creates a ToolbarSelector
 * @param {number} index - index of the selector in the section array
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
  index: number,
  options: IToolbarSelectorOption[],
  selected: boolean,
  onClick: (index: number) => void,
  onChange: (index: number, value: string) => void,
  onAction: (index: number) => void,
  definedOptionName?: string,
  colorPalette?: IColorPalette
): JSX.Element {
  return (
    <ToolbarSelector
      key={index}
      index={index}
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
 * @param {number} index - index of the selector in the section array
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
  index: number,
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>,
  selected: boolean,
  styleOptions: IStyleOptions[],
  onClick: (index: number) => void,
  onChange: (index: number, value: string) => void
): JSX.Element {
  return (
    <SpecialSelector
      key={index}
      index={index}
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
