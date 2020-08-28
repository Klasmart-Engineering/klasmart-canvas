import React from 'react';
import '../../../assets/style/toolbar-button.css';
/**
 * Render a button to use in the SpecialSelector
 * @param {ISpecialButton} props - Props needed to render the component:
 * - id - id that the button has
 * - title - title for the button
 * - Icon - Icon to use in the button
 * - style - style to set in that Icon
 * - selected - flag to set the button as selected or not
 * - onClick - Function to execute when the button is clicked
 */
function SpecialButton(props) {
    var id = props.id, title = props.title, Icon = props.Icon, style = props.style, selected = props.selected, onClick = props.onClick;
    /**
     * Is executed when the button is clicked and sends an events to its parent
     */
    function handleClick() {
        onClick(id);
    }
    var toolbarButtonStyle = {
        border: 'none',
        width: '36px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: selected ? '#d9d9d9' : '#fff',
        borderRadius: '4px',
        outline: 0,
    };
    return (React.createElement("button", { title: title, style: toolbarButtonStyle, className: [
            'toolbar-button',
            selected ? 'selected-button' : '',
            !selected ? 'unselected-button' : '',
        ].join(' '), onClick: handleClick },
        React.createElement(Icon, { style: style })));
}
export default SpecialButton;
//# sourceMappingURL=SpecialButton.js.map