import React, { useState } from 'react';
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

interface ToolbarProps {
  colorList: string[];
  fillColor: (color: string) => void;
  updateShape: (shape: string) => void;
  addAShape: () => void;
  removeSelectedElement: () => void;
  text: string;
  updateText: (value: string) => void;
  updateFont: (value: string) => void;
  writeText: (e: KeyboardEvent) => void;
}

/**
 * Render the toolbar that will be used in the whiteboard
 * @param {ToolbarProps} props: Properties needed to render the component:
 * - onTextClick - event that is sended to its parent
 *   when text button is clicked
 * - colorList - list of colors availables
 * - fillColor - function to set the color to use
 * - updateShape - function to set the shape to use
 * - addAShape - function to add a shape in the whiteboard
 * - removeSelectedElement - function to remove a shape in the whiteboard
 * - text - value to set in TextField
 * - updateText - function to execute when TextField is onChange
 * - writeText - function to execute when TextField is onKeyDown
 */
function Toolbar({
  colorList,
  fillColor,
  updateShape,
  addAShape,
  removeSelectedElement,
  text,
  updateText,
  updateFont,
  writeText,
}: ToolbarProps) {
  const [showInput, updateShowInput] = useState(false);
  const [tools, setTools] = useState(toolsSection);
  const [actions] = useState(actionsSection);

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
    index ? removeSelectedElement() : addAShape();
  }

  /**
   * Is executed when a change value happens in a Shape ToolbarSelector
   * @param {number} index - index of the selector in ToolbarSection
   * @param {string} value - new selected value
   */
  function handleSelectorChange(index: number, value: string) {
    switch (index) {
      case 6: {
        updateFont(value);
        break;
      }

      case 7: {
        updateShape(value.toLowerCase());
        break;
      }
    }
  }

  function changeColor(color: string) {
    fillColor(color);
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
                  tool.iconColorPalette,
                  changeColor
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
 * @param {OverridableComponent<SvgIconTypeMap<{}, 'svg'>>}
 * iconColorPalette - Icon to use in the color palette
 */
function createToolbarSelector(
  index: number,
  options: IToolbarSelectorOption[],
  selected: boolean,
  onChildClick: (index: number) => void,
  onChildChange: (index: number, value: string) => void,
  iconColorPalette?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>,
  onColorChange?: (color: string) => void
): JSX.Element {
  return (
    <ToolbarSelector
      key={index}
      index={index}
      options={options}
      selected={selected}
      iconColorPalette={iconColorPalette}
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
