import React from 'react';
import IToolbarButton from '../../interfaces/toolbar/toolbar-button';
import './toolbar-button.css';

/**
 * Render each button that will be included in the toolbar
 * @param {ToolbarButtonModel} props - Props that the button
 * need to be rendered:
 * - index - index that the button have in the array
 * - iconSrc - src for the icon button
 * - iconName - alt for the icon button
 * - selected - flag to set the current selected button
 * - onChildClick - event to send to parent when the button is clicked
 */
function ToolbarButton({
  index,
  iconSrc,
  iconName,
  selected,
  onChildClick,
}: IToolbarButton) {
  /**
   * Is executed when the button is clicked and sends an events to its parent
   */
  function handleClick() {
    console.log(index);
    onChildClick(index);
  }

  return (
    <button
      className={[
        'toolbar-button',
        selected ? 'selected-button' : '',
        !selected ? 'unselected-button' : '',
      ].join(' ')}
      onClick={handleClick}
    >
      <img src={iconSrc} alt={iconName} width="24px" height="24px" />
    </button>
  );
}

export default ToolbarButton;
