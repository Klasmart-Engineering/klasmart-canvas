import React, { useState } from 'react';
import ToolbarSection from './toolbar-section/ToolbarSection';
import './toolbar.css';
import ToolbarText from './toolbar-text/ToolbarText';
import ToolbarButton from './toolbar-button/ToolbarButton';
import ToolbarSelector from './toolbar-selector/ToolbarSelector';
import IToolbarSelectorOption from '../../interfaces/toolbar/toolbar-selector/toolbar-selector-option';
import {
  colorPaletteSection,
  toolsSection,
  actionsSection,
} from './toolbar-section/toolbar-sections';

interface ToolbarProps {
  colorList: string[];
  fillColor: (color: string) => void;
  updateShape: (shape: string) => void;
  addAShape: () => void;
  removeSelectedElement: () => void;
  text: string;
  updateText: (value: string) => void; // onChange
  writeText: (e: KeyboardEvent) => void; // onKeyDown
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
  writeText,
}: ToolbarProps) {
  const [showActions, updateShowActions] = useState(false);
  const [showInput, updateShowInput] = useState(true);
  const [colorPalette, setColorPalette] = useState(colorPaletteSection);
  const [tools, setTools] = useState(toolsSection);
  const [actions, setActions] = useState(actionsSection);

  /**
   * Is executed when a ToolbarButton is clicked in Tools section
   * and set the new selected button for that section
   * @param {number} index - index that the clicked button has in the array
   */
  function handleToolsElementClick(index: number) {
    updateShowActions(!!index);
    updateShowInput(!index ? true : false);

    setTools({
      selected: index,
      elements: [...tools.elements],
    });
  }

  /**
   * Is executed when a ToolbarButton is clicked in Color Palette section
   * and set the new selected button for that section
   * @param {number} index - index that the clicked button has in the array
   */
  function handleColorPaletteElementClick(index: number) {
    setColorPalette({
      selected: index,
      elements: [...colorPalette.elements],
    });

    fillColor(colorList[index]);
  }

  /**
   * Is executed when a ToolbarButton is clicked in Actions section
   * and set the new selected button for that section
   * @param {number} index - index that the clicked button has in the array
   */
  function handleActionsElementClick(index: number) {
    setActions({
      selected: index,
      elements: [...actions.elements],
    });

    index ? removeSelectedElement() : addAShape();
  }

  /**
   * Is executed when a change value happens in a Shape ToolbarSelector
   * @param {string} shape - new selected shape
   */
  function handleShapeChange(shape: string) {
    updateShape(shape.toLowerCase());
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
                  handleShapeChange
                )
              : null
          )}
        </ToolbarSection>

        <ToolbarSection>
          {colorPalette.elements.map((color, index) =>
            color.iconSrc && color.iconName
              ? createToolbarButton(
                  index,
                  color.iconSrc,
                  color.iconName,
                  colorPalette.selected === index,
                  handleColorPaletteElementClick
                )
              : null
          )}
        </ToolbarSection>

        {showActions ? (
          <ToolbarSection>
            {actions.elements.map((action, index) =>
              action.iconSrc && action.iconName
                ? createToolbarButton(
                    index,
                    action.iconSrc,
                    action.iconName,
                    actions.selected === index,
                    handleActionsElementClick
                  )
                : null
            )}
          </ToolbarSection>
        ) : null}
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
 * @param index - index of the button in the section array
 * @param iconSrc - src for the icon of the button
 * @param iconName - alt for the icon of the button
 * @param selected - flag to set this button like selected
 * @param onChildClick - function to execute when button is clicked
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
 * @param index - index of the selector in the section array
 * @param options - options that the selector will have
 * @param selected - flag to set this selector like selected
 * @param onChildClick - function to execute when selector is clicked
 * @param onChildChange - function to execute when selector value changes
 */
function createToolbarSelector(
  index: number,
  options: IToolbarSelectorOption[],
  selected: boolean,
  onChildClick: (index: number) => void,
  onChildChange: (value: string) => void
): JSX.Element {
  return (
    <ToolbarSelector
      key={index}
      index={index}
      options={options}
      selected={selected}
      onChildClick={onChildClick}
      onChildChange={onChildChange}
    />
  );
}

export default Toolbar;
