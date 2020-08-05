import React, { useState, useRef, useEffect } from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import SpecialButton from '../special-button/SpecialButton';
import '../toolbar-selector/toolbar-selector.css';
/**
 * Render an SpecialSelector that uses a stylizable Icon (Font like)
 * @param {ISpecialSelector} props - Props needed to render the component:
 * - id - id that the element has
 * - Icon - Icon to set in the options
 * - active - flag to set if the element is selected or not
 * - selectedValue - Selected value setted by parent
 * - styleOptions - Icon styles in the different options
 * - onClick - Function to execute when the element is clicked
 * - onChange - Function to execute when the value changes
 */
function SpecialSelector(props) {
    var id = props.id, Icon = props.Icon, active = props.active, selectedValue = props.selectedValue, styleOptions = props.styleOptions, onClick = props.onClick, onChange = props.onChange;
    var _a = useState(findOptionDefinedByParent()), selectedOption = _a[0], setSelectedOption = _a[1];
    var _b = useState(false), showOptions = _b[0], setShowOptions = _b[1];
    var buttonRef = useRef(null);
    /**
     * When selectedValue changes the value is found in all the available options
     * to be setted like selected option
     */
    useEffect(function () {
        var newValue = styleOptions.find(function (option) { return option.value === selectedValue; });
        if (newValue) {
            setSelectedOption(newValue);
        }
    }, [selectedValue, styleOptions]);
    /**
     * Finds the option that has the selectedValue defined by parent
     */
    function findOptionDefinedByParent() {
        return (styleOptions.find(function (option) { return option.value === selectedValue; }) ||
            styleOptions[0]);
    }
    /**
     * Is executed when the selector is clicked and sends an event to its parent
     */
    function handleClick() {
        onClick(id);
        if (showOptions) {
            setShowOptions(false);
        }
    }
    /**
     * Is executed when the selector changes its value
     * @param {string} value - new value to set in selector
     */
    function handleSelect(option) {
        onChange(id, option.value);
        setShowOptions(false);
    }
    /**
     * Is executed when you click the arrow
     */
    function handleArrowClick() {
        onClick(id);
        if (!showOptions) {
            document.addEventListener('click', handleOutsideClick, false);
        }
        else {
            document.removeEventListener('click', handleOutsideClick, false);
        }
        setShowOptions(!showOptions);
    }
    /**
     * Is executed when you click on the window to check if you are clicking on toolbar elements or not
     * @param {MouseEvent} e - Mouse click event
     */
    function handleOutsideClick(e) {
        if (!buttonRef.current.contains(e.target)) {
            if (!showOptions) {
                setShowOptions(false);
            }
        }
    }
    return (React.createElement("div", { className: "selector-container" },
        React.createElement("button", { title: selectedOption.title, ref: buttonRef, className: [
                'toolbar-selector',
                active ? 'selected' : '',
                !active ? 'unselected' : '',
            ].join(' ') },
            React.createElement(Icon, { style: selectedOption.style, onClick: handleClick }),
            React.createElement(ArrowRightIcon, { onClick: handleArrowClick })),
        showOptions && active ? (React.createElement("div", { className: "options-container" },
            React.createElement("div", { className: "options special-options no-palette" }, styleOptions
                .filter(function (option) {
                return option.value !== selectedOption.value;
            })
                .map(function (option) {
                return (React.createElement(SpecialButton, { key: option.id, id: option.id, title: option.title, Icon: Icon, style: option.style, selected: false, onClick: function () { return handleSelect(option); } }));
            })))) : null));
}
export default SpecialSelector;
//# sourceMappingURL=SpecialSelector.js.map