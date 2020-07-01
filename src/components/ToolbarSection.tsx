import React, { useState } from 'react';
import ToolbarButton from './ToolbarButton';
import ToolbarButtonInitialPropsModel from '../models/toolbar-button-initial-props.model';

interface ToolbarSectionProps {
  buttons: ToolbarButtonInitialPropsModel[];
}

/**
 * Render each section of the toolbar
 * (tools section, colors section, size section)
 * @param {ToolbarSectionProps} - Props that the component need to be rendered:
 * - buttons - Array that contains the props that each button
 *   inside of this section needs
 */
function ToolbarSection({ buttons }: ToolbarSectionProps) {
  const [selected, setSelected] = useState(0);

  /**
   * Is executed when a ToolbarButton is clicked and set the new selected button
   * @param {number} index - index that the clicked button has in the array
   */
  function handleChildClick(index: number) {
    setSelected(index);
  }

  return (
    <div className="toolbar-section">
      {buttons.map((button, index) => {
        return (
          <ToolbarButton
            key={index}
            index={index}
            iconSrc={button.iconSrc}
            iconName={button.iconName}
            selected={index === selected}
            onChildClick={handleChildClick}
          />
        );
      })}
    </div>
  );
}

export default ToolbarSection;
