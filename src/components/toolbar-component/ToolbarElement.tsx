import React from 'react';
import IToolbarElement from '../../interfaces/toolbar/toolbar-element';
import ToolbarButton from './ToolbarButton';
import ToolbarSelector from './ToolbarSelector';

/**
 * Render a Toolbar Element (ToolbarButton or ToolbarSelector) according with
 * the prop type received
 * @param {IToolbarElement} props - Props that need to be rendered:
 * - index - index that the element has in the ToolbarSection
 * - iconSrc - src that the icon element will have
 * - iconName - alt that the icon element will have
 * - selected - flag to indicate that this is the selected element
 * - onChildClick - event that recives the parent when an element is clicked
 * - type - element type (button or select)
 * - options - selector options (just for selector, in button is an empty array)
 */
function ToolbarElement({
  index,
  iconSrc,
  iconName,
  selected,
  onChildClick,
  type,
  options,
}: IToolbarElement) {
  switch (type) {
    case 'button': {
      return (
        <ToolbarButton
          index={index}
          iconSrc={iconSrc}
          iconName={iconName}
          selected={selected}
          onChildClick={onChildClick}
        />
      );
    }

    case 'selector': {
      return (
        <ToolbarSelector
          index={index}
          options={options}
          selected={selected}
          onChildClick={onChildClick}
        />
      );
    }
  }
}

export default ToolbarElement;
