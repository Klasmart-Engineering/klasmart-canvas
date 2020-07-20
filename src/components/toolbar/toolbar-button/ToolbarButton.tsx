import React from 'react';
import IToolbarButton from '../../../interfaces/toolbar/toolbar-button/toolbar-button';
import './toolbar-button.css';

/**
 * Render each button that will be included in the toolbar
 * @param {ToolbarButtonModel} props - Props that the button
 * need to be rendered:
 * - id - id to identify the button
 * - title - title for the button to show in on hover
 * - iconSrc - src for the icon button
 * - iconName - alt for the icon button
 * - selected - flag to set the current selected button
 * - onClick - event to send to parent when the button is clicked
 */
function ToolbarButton(props: IToolbarButton) {
  const { id, title, iconSrc, iconName, active, onClick } = props;

  return (
    <button
      key={id}
      title={title}
      className={[
        'toolbar-button original',
        active ? 'selected-button' : '',
        !active ? 'unselected-button' : '',
      ].join(' ')}
      onClick={() => onClick(id)}
    >
      <img src={iconSrc} alt={iconName} width="24px" height="24px" />
    </button>
  );
}

export default ToolbarButton;
