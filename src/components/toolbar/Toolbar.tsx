import React, { useState } from 'react';
import ToolbarSection from './ToolbarSection';
import './toolbar.css';
import textIcon from '../../assets/icons/letter-a.svg';
import blackCircle from '../../assets/icons/black-circle.svg';
import redCircle from '../../assets/icons/red-circle.svg';
import yellowCircle from '../../assets/icons/yellow-circle.svg';
import greenCircle from '../../assets/icons/green-circle.svg';
import blueCircle from '../../assets/icons/blue-circle.svg';
import pinkCircle from '../../assets/icons/pink-circle.svg';
import brownCircle from '../../assets/icons/brown-circle.svg';
import addShape from '../../assets/icons/add-shape.svg';
import removeShape from '../../assets/icons/remove-shape.svg';
import IToolbarSelectorOption from '../../interfaces/toolbar/toolbar-selector-option';
import IBasicToolbarElement from '../../interfaces/toolbar/basic-toolbar-element';
import ToolbarElement from './ToolbarElement';

interface ToolbarProps {
  onTextClick: (value: boolean) => void;
  colorList: string[];
  fillColor: (color: string) => void;
  updateShape: (shape: string) => void;
}

/**
 * Render the toolbar that will be used in the whiteboard
 * @param {ToolbarProps} props: Properties needed to render the component:
 * - onTextClick - event that is sended to its parent
 *   when text button is clicked
 * - colorList - list of colors availables
 * - fillColor - function to set the color to use
 * - updateShape - function to set the shape to use
 */
function Toolbar({
  onTextClick,
  colorList,
  fillColor,
  updateShape,
}: ToolbarProps) {
  const [showActions, setShowActions] = useState(false);

  const [colorPalette, setColorPalette] = useState({
    selected: 0,
    elements: [
      createElementProps(blackCircle, 'Black Color Icon', 'button', []),
      createElementProps(redCircle, 'Red Color Icon', 'button', []),
      createElementProps(yellowCircle, 'Yellow Color Icon', 'button', []),
      createElementProps(greenCircle, 'Green Color Icon', 'button', []),
      createElementProps(blueCircle, 'Blue Color Icon', 'button', []),
      createElementProps(pinkCircle, 'Pink Color Icon', 'button', []),
      createElementProps(brownCircle, 'Brown Color Icon', 'button', []),
    ],
  });

  const [tools, setTools] = useState({
    selected: 0,
    elements: [
      createElementProps(textIcon, 'Text Icon', 'button', []),
      createElementProps(textIcon, 'Selector', 'selector', [
        {
          index: 0,
          iconSrc: redCircle,
          iconName: 'Rectangle',
        },
        {
          index: 1,
          iconSrc: yellowCircle,
          iconName: 'Triangle',
        },
        {
          index: 2,
          iconSrc: redCircle,
          iconName: 'Circle',
        },
      ]),
    ],
  });

  const [actions, setActions] = useState({
    selected: 0,
    elements: [
      createElementProps(addShape, 'Add Shape Button', 'button', []),
      createElementProps(removeShape, 'Remove Shape Button', 'button', []),
    ],
  });

  /**
   * Is executed when a ToolbarButton is clicked in Tools section
   * and set the new selected button for that section
   * @param {number} index - index that the clicked button has in the array
   */
  function handleToolsElementClick(index: number) {
    setShowActions(!!index);
    onTextClick(!index ? true : false);

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
  }

  function handleChange(shape: string) {
    updateShape(shape.toLowerCase());
  }

  return (
    <div className="toolbar">
      <ToolbarSection>
        {tools.elements.map((tool, index) => {
          return (
            <ToolbarElement
              key={index}
              type={tool.type}
              iconSrc={tool.iconSrc}
              iconName={tool.iconName}
              index={index}
              selected={tools.selected === index}
              options={tool.options}
              onChildClick={handleToolsElementClick}
              onChildChange={handleChange}
            />
          );
        })}
      </ToolbarSection>

      <ToolbarSection>
        {colorPalette.elements.map((color, index) => {
          return (
            <ToolbarElement
              key={index}
              type={color.type}
              iconSrc={color.iconSrc}
              iconName={color.iconName}
              index={index}
              selected={colorPalette.selected === index}
              options={color.options}
              onChildClick={handleColorPaletteElementClick}
              onChildChange={handleChange}
            />
          );
        })}
      </ToolbarSection>

      {showActions ? (
        <ToolbarSection>
          {actions.elements.map((action, index) => {
            return (
              <ToolbarElement
                key={index}
                type={action.type}
                iconSrc={action.iconSrc}
                iconName={action.iconName}
                index={index}
                selected={actions.selected === index}
                options={action.options}
                onChildClick={handleActionsElementClick}
                onChildChange={updateShape}
              />
            );
          })}
        </ToolbarSection>
      ) : null}
    </div>
  );
}

/**
 * Create an object with the required properties for a new ToolbarButton
 * @param {string} iconSrc - src value that the icon button will have
 * @param {string} iconName - alt value that the icon button will have
 */
function createElementProps(
  iconSrc: string,
  iconName: string,
  type: 'button' | 'selector',
  options: IToolbarSelectorOption[]
): IBasicToolbarElement {
  return {
    iconSrc: iconSrc,
    iconName: iconName,
    type: type,
    options: options,
  };
}

export default Toolbar;
