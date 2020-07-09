import React, { useState, useContext } from 'react';
import ToolbarSection from './toolbar-section/ToolbarSection';
import './toolbar.css';
import ToolbarText from './toolbar-text/ToolbarText';
import ToolbarButton from './toolbar-button/ToolbarButton';
import ToolbarSelector from './toolbar-selector/ToolbarSelector';
import IToolbarSelectorOption from '../../interfaces/toolbar/toolbar-selector/toolbar-selector-option';
import {
  toolsSection,
  actionsSection,
} from './toolbar-section/toolbar-sections';
import SpecialSelector from './special-selector/SpecialSelector';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import IStyleOptions from '../../interfaces/toolbar/toolbar-element/style-options';
import { WhiteboardContext } from '../../domain/whiteboard/WhiteboardContext';

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
  function handleSelectorChange(index: number, value: string) {
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

  return (
    <div className="toolbar-container">
      <div className="toolbar">
        <ToolbarSection>
          {tools.elements.map((tool, index) =>
            tool.iconName && tool.iconSrc
              ? createToolbarButton(
                  index,
                  tool.iconSrc,
                  tool.iconName,
                  tools.selected === index,
                  handleToolsElementClick
                )
              : tool.options
              ? createToolbarSelector(
                  index,
                  tool.options,
                  tools.selected === index,
                  handleToolsElementClick,
                  handleSelectorChange,
                  handleToolsElementAction,
                  tool.iconColorPalette,
                  changeColor,
                  index === 6 ? fontFamily : null
                )
              : tool.icon && tool.styleOptions
              ? createSpecialSelector(
                  index,
                  tool.icon,
                  tools.selected === index,
                  tool.styleOptions,
                  handleToolsElementClick,
                  handleSelectorChange
                )
              : null
          )}
        </ToolbarSection>

        <ToolbarSection>
          {actions.elements.map((action, index) =>
            action.iconSrc && action.iconName
              ? createToolbarButton(
                  index,
                  action.iconSrc,
                  action.iconName,
                  actions.selected === index,
                  action.onClick || handleActionsElementClick
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
 * @param {(index: number) => void} onChildClick - function to execute when button is clicked
 */
function createToolbarButton(
  index: number,
  iconSrc: string,
  iconName: string,
  selected: boolean,
  onChildClick: (index: number) => void
): JSX.Element {
  return (
    <ToolbarButton
      key={index}
      index={index}
      iconSrc={iconSrc}
      iconName={iconName}
      selected={selected}
      onChildClick={onChildClick}
    />
  );
}

/**
 * Creates a ToolbarSelector
 * @param {number} index - index of the selector in the section array
 * @param {IToolbarSelectorOption[]} options - options that the selector
 * will have
 * @param {boolean} selected - flag to set this selector like selected
 * @param {(index: number) => void} onChildClick - function to execute
 * when selector is clicked
 * @param {(value: string) => void} onChildChange - function to execute
 * when selector value changes
 * @param {(index: number) => void} onAction - function to execute when
 * the action of this element is trigered
 * @param {OverridableComponent<SvgIconTypeMap<{}, 'svg'>>}
 * iconColorPalette - Icon to use in the color palette
 * @param {(index: number, color: string) => void} onColorChange - function
 * to execute when a new color is picked in elements with color palette
 */
function createToolbarSelector(
  index: number,
  options: IToolbarSelectorOption[],
  selected: boolean,
  onChildClick: (index: number) => void,
  onChildChange: (index: number, value: string) => void,
  onAction: (index: number) => void,
  iconColorPalette?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>,
  onColorChange?: (index: number, color: string) => void,
  defaultOption?: string
): JSX.Element {
  return (
    <ToolbarSelector
      key={index}
      index={index}
      options={options}
      selected={selected}
      defaultOption={defaultOption}
      iconColorPalette={iconColorPalette}
      onAction={onAction}
      onChildClick={onChildClick}
      onChildChange={onChildChange}
      onColorChange={onColorChange}
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
 * @param {(index: number) => void} onChildClick - Function to execute when
 * selector is clicked
 * @param {(value: string) => void} onChildChange - Function to execute when
 * selector's value is changed
 */
function createSpecialSelector(
  index: number,
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>,
  selected: boolean,
  styleOptions: IStyleOptions[],
  onChildClick: (index: number) => void,
  onChildChange: (index: number, value: string) => void
): JSX.Element {
  return (
    <SpecialSelector
      key={index}
      index={index}
      Icon={Icon}
      selected={selected}
      styleOptions={styleOptions}
      onChildClick={onChildClick}
      onChildChange={onChildChange}
    />
  );
}

export default Toolbar;
