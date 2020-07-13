import React from 'react';
import IToolbarButton from '../../../interfaces/toolbar/toolbar-button/toolbar-button';
import './toolbar-button.css';

/**
 * Render each button that will be included in the toolbar
 * @param {ToolbarButtonModel} props - Props that the button
 * need to be rendered:
 * - index - index to identify the button
 * - title - title for the button to show in on hover
 * - iconSrc - src for the icon button
 * - iconName - alt for the icon button
 * - selected - flag to set the current selected button
 * - onClick - event to send to parent when the button is clicked
 */
function ToolbarButton(props: IToolbarButton) {
  return (
    <button
      key={props.index}
      title={props.title}
      className={[
        'toolbar-button',
        props.selected ? 'selected-button' : '',
        !props.selected ? 'unselected-button' : '',
      ].join(' ')}
      onClick={(e) => props.onClick(props.index)}
    >
      <img
        src={props.iconSrc}
        alt={props.iconName}
        width="24px"
        height="24px"
      />
    </button>
  );
}

export default ToolbarButton;
