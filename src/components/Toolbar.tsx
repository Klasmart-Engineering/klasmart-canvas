import React from 'react';
import ToolbarSection from './ToolbarSection';
import ToolbarButtonInitialPropsModel from '../models/toolbar-button-initial-props.model';
import './toolbar.css';
import textIcon from '../assets/icons/letter-a.svg';
import blackCircle from '../assets/icons/black-circle.svg';
import redCircle from '../assets/icons/red-circle.svg';
import yellowCircle from '../assets/icons/yellow-circle.svg';
import greenCircle from '../assets/icons/green-circle.svg';
import blueCircle from '../assets/icons/blue-circle.svg';
import pinkCircle from '../assets/icons/pink-circle.svg';
import brownCircle from '../assets/icons/brown-circle.svg';

/**
 * Render the toolbar that will be used in the whiteboard
 */
function Toolbar() {
  const colorPalette = [
    createButtonProps(blackCircle, 'Black Color Icon'),
    createButtonProps(redCircle, 'Red Color Icon'),
    createButtonProps(yellowCircle, 'Yellow Color Icon'),
    createButtonProps(greenCircle, 'Green Color Icon'),
    createButtonProps(blueCircle, 'Blue Color Icon'),
    createButtonProps(pinkCircle, 'Pink Color Icon'),
    createButtonProps(brownCircle, 'Brown Color Icon'),
  ];

  const tools = [createButtonProps(textIcon, 'Text Icon')];

  return (
    <div className="toolbar">
      <ToolbarSection buttons={tools} />
      <ToolbarSection buttons={colorPalette} />
    </div>
  );
}

/**
 * Create an object with the required properties for a new ToolbarButton
 * @param {string} iconSrc - src value that the icon button will have
 * @param {string} iconName - alt value that the icon button will have
 */
function createButtonProps(
  iconSrc: string,
  iconName: string
): ToolbarButtonInitialPropsModel {
  return {
    iconSrc: iconSrc,
    iconName: iconName,
  };
}

export default Toolbar;
