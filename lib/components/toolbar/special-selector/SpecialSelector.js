import React, { useState, useRef, useEffect } from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import SpecialButton from '../special-button/SpecialButton';
import '../../../assets/style/toolbar-selector.css';
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
        onChange(id, option.value.toString());
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
        var _a;
        if (!((_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
            if (!showOptions) {
                setShowOptions(false);
            }
        }
    }
    var selectorContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
    };
    var toolbarSelectorStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '32px',
        border: 'none',
        paddingRight: 0,
        backgroundColor: active ? '#d9d9d9' : '#fff',
        borderRadius: '4px',
        outline: 0,
    };
    var arrowStyle = {
        width: '20px',
        height: '20px',
    };
    var optionsContainerStyle = {
        position: 'absolute',
        margin: '0 0 8px 56px',
        padding: '2px',
        border: 'none',
        backgroundColor: '#fff',
        borderRadius: '4px',
        zIndex: 2,
    };
    var optionsStyle = {
        display: 'grid',
        rowGap: '2px',
        padding: '2px 2px 4px 0',
        gridAutoColumns: 'repeat(6, auto)',
    };
    var iconContainerStyle = {
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
    };
    return (React.createElement("div", { className: "selector-container", style: selectorContainerStyle },
        React.createElement("button", { title: selectedOption.title, ref: buttonRef, style: toolbarSelectorStyle, className: [
                'toolbar-selector',
                active ? 'selected' : '',
                !active ? 'unselected' : '',
            ].join(' '), onClick: handleClick },
            React.createElement("div", { style: iconContainerStyle },
                React.createElement(Icon, { style: selectedOption.style })),
            React.createElement(ArrowRightIcon, { onClick: handleArrowClick, style: arrowStyle })),
        showOptions && active ? (React.createElement("div", { className: "options-container", style: optionsContainerStyle },
            React.createElement("div", { className: "options special-options no-palette", style: optionsStyle }, styleOptions
                .filter(function (option) {
                return option.value !== selectedOption.value;
            })
                .map(function (option) {
                return (React.createElement(SpecialButton, { key: option.id, id: option.id, title: option.title, Icon: Icon, style: option.style, selected: false, onClick: function () { return handleSelect(option); } }));
            })))) : null));
}
export default SpecialSelector;
//# sourceMappingURL=SpecialSelector.js.map