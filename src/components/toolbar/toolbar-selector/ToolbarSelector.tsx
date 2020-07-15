import React, { useState, useRef } from 'react';
import './toolbar-selector.css';
import IToolbarSelector from '../../../interfaces/toolbar/toolbar-selector/toolbar-selector';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ColorPalette from '../color-palette/ColorPalette';
import ToolbarButton from '../toolbar-button/ToolbarButton';
import IToolbarSelectorOption from '../../../interfaces/toolbar/toolbar-selector/toolbar-selector-option';

/**
 * Render a ToolbarSelector
 * @param {IToolbarSelector} props - Props that the component need:
 * - index - index that the selector has in the Toolbar Section
 * - options - options to be displayed in the selector
 * - selected - flag that indicates if this selector is selected
 * - definedOptionName (optional) - selected option defined by parent
 * - colorPalette (optional) - Contains the icon and onChangeColor method
 *   for the color palette (if required)
 * - onAction - event that is emitted to parent when action is triggered
 * - onClick - event that is emitted to parent when selector is clicked
 * - onChange - event that is emitted to parent when selector's value is changed
 */
function ToolbarSelector(props: IToolbarSelector) {
  const [selectedOption, setSelectedOption] = useState(props.options[0]);
  const [showOptions, setShowOptions] = useState(false);
  const [color, setColor] = useState(props.colorPalette?.selectedColor || '');
  const buttonRef = useRef(null);

  React.useEffect(() => {
    const newValue = props.options.find(
      (option) => option.iconName === props.definedOptionName
    );

    if (newValue) {
      setSelectedOption(newValue);
    }
  }, [props.definedOptionName, props.options]);

  /**
   * Is executed when the selector is clicked and sends an event to its parent
   */
  function handleClick() {
    props.onClick(props.index);
    props.onAction(props.index, selectedOption.iconName.toLowerCase());

    if (showOptions) {
      setShowOptions(false);
    }
  }

  /**
   * Is executed when the arrow is clicked
   */
  function handleArrowClick() {
    props.onClick(props.index);

    if (!showOptions) {
      document.addEventListener('click', handleOutsideClick, false);
    } else {
      document.removeEventListener('click', handleOutsideClick, false);
    }

    setShowOptions(!showOptions);
  }

  /**
   * Is executed when the selector changes its value
   * @param {IToolbarSelectorOption} value - new value to set in selector
   */
  function handleSelect(value: IToolbarSelectorOption) {
    setSelectedOption(value);
    setShowOptions(false);
    props.onChange(props.index, value.iconName);
    props.onAction(props.index, value.iconName.toLowerCase());
  }

  /**
   * Is executed when you click on the window to check if you are clicking on toolbar elements or not
   * @param {MouseEvent} e - Mouse click event
   */
  function handleOutsideClick(e: Event) {
    if (
      !((buttonRef.current as unknown) as HTMLElement).contains(
        e.target as Node
      ) &&
      !showOptions
    ) {
      setShowOptions(false);
    }
  }

  /**
   * Is executed when the color is changed (if color palette exists)
   * @param {string} color - new color to set
   */
  function handleChangeColor(color: string) {
    if (props.colorPalette) {
      props.colorPalette.onChangeColor(props.index, color);
    }

    setColor(color);
    setShowOptions(false);
  }

  return (
    <div className="selector-container">
      <button
        title={selectedOption.title}
        ref={buttonRef}
        className={[
          'toolbar-selector',
          props.selected ? 'selected' : '',
          !props.selected ? 'unselected' : '',
        ].join(' ')}
      >
        <img
          className="icon"
          src={selectedOption.iconSrc}
          alt={selectedOption.iconName}
          onClick={handleClick}
        />
        <ArrowRightIcon className="arrow" onClick={handleArrowClick} />
      </button>
      {showOptions && props.selected ? (
        <div className="options">
          {props.options
            .filter((option) => {
              return option.iconName !== selectedOption.iconName;
            })
            .map((option, index) => {
              return (
                <ToolbarButton
                  key={option.iconName}
                  index={index}
                  title={option.title}
                  iconSrc={option.iconSrc}
                  iconName={option.iconName}
                  selected={false}
                  onClick={(e) => handleSelect(option)}
                />
              );
            })}
          {props.colorPalette ? (
            <ColorPalette
              Icon={props.colorPalette.icon}
              handleColorChange={handleChangeColor}
              selectedColor={color}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default ToolbarSelector;
