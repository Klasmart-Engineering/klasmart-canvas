import React from 'react';
import '../toolbar-button/toolbar-button.css';
import ISpecialButton from '../../../interfaces/toolbar/special-button';

/**
 * Render a button to use in the SpecialSelector
 * @param {ISpecialButton} props - Props needed to render the component:
 * - index - index that the button has in the array
 * - Icon - Icon to use in the button
 * - style - style to set in that Icon
 * - selected - flag to set the button as selected or not
 * - onChildClick - Function to execute when the button is clicked
 */
function SpecialButton({
  index,
  Icon,
  style,
  selected,
  onChildClick,
}: ISpecialButton) {
  /**
   * Is executed when the button is clicked and sends an events to its parent
   */
  function handleClick() {
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
      <Icon style={style} />
    </button>
  );
}

export default SpecialButton;
