import React, { useState, useRef, useEffect } from 'react';
import '../../../assets/style/toolbar-selector.css';
import IToolbarSelector from '../../../interfaces/toolbar/toolbar-selector/toolbar-selector';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ColorPalette from '../color-palette/ColorPalette';
import ToolbarButton from '../toolbar-button/ToolbarButton';
import IToolbarSelectorOption from '../../../interfaces/toolbar/toolbar-selector/toolbar-selector-option';

/**
 * Render a ToolbarSelector
 * @param {IToolbarSelector} props - Props that the component need:
 * - id - id that the selector has in the Toolbar Section
 * - options - options to be displayed in the selector
 * - selected - flag that indicates if this selector is selected
 * - selectedValue - selected value setted by parent
 * - colorPalette (optional) - Contains the icon and onChangeColor method
 *   for the color palette (if required)
 * - onAction - event that is emitted to parent when action is triggered
 * - onClick - event that is emitted to parent when selector is clicked
 * - onChange - event that is emitted to parent when selector's value is changed
 */
function ToolbarSelector(props: IToolbarSelector) {
  const {
    id,
    options,
    active,
    selectedValue,
    colorPalette,
    onAction,
    onClick,
    onChange,
  } = props;

  const [selectedOption, setSelectedOption] = useState(
    findOptionDefinedbyParent()
  );
  const [showOptions, setShowOptions] = useState(false);
  const buttonRef = useRef(null);

  /**
   * When selectedValue changes the value is found in all the available options
   * to be setted like selected option
   */
  useEffect(() => {
    const newValue = options.find((option) => option.value === selectedValue);

    if (newValue) {
      setSelectedOption(newValue);
    }
  }, [selectedValue, options]);

  /**
   * Finds the option that has the selectedValue defined by parent
   */
  function findOptionDefinedbyParent(): IToolbarSelectorOption {
    return (
      options.find((option) => option.value === selectedValue) || options[0]
    );
  }

  /**
   * Is executed when the selector is clicked and sends an event to its parent
   */
  function handleClick() {
    onClick(id);
    onAction(id, selectedOption.value);

    if (showOptions) {
      setShowOptions(false);
    }
  }

  /**
   * Is executed when the arrow is clicked
   */
  function handleArrowClick() {
    onClick(id);

    if (!showOptions) {
      document.addEventListener('click', handleOutsideClick, false);
    } else {
      document.removeEventListener('click', handleOutsideClick, false);
    }

    setShowOptions(!showOptions);
  }

  /**
   * Is executed when the selector changes its option
   * @param {IToolbarSelectorOption} value - new value to set in selector
   */
  function handleSelect(option: IToolbarSelectorOption) {
    setShowOptions(false);
    onChange(id, option.value);
    onAction(id, option.value);
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
    if (colorPalette) {
      colorPalette.onChangeColor(id, color);
    }

    setShowOptions(false);
  }

  return (
    <div className="selector-container">
      <button
        title={selectedOption.title}
        ref={buttonRef}
        className={[
          'toolbar-selector',
          active ? 'selected' : '',
          !active ? 'unselected' : '',
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
      {showOptions && active ? (
        <div className="options-container">
          <div
            className={[
              'options',
              colorPalette ? 'with-palette' : 'no-palette',
            ].join(' ')}
          >
            {options
              .filter((option) => {
                return option.value !== selectedOption.value;
              })
              .map((option) => {
                return (
                  <ToolbarButton
                    key={option.iconName}
                    id={option.id}
                    title={option.title}
                    iconSrc={option.iconSrc}
                    iconName={option.iconName}
                    active={false}
                    onClick={() => handleSelect(option)}
                  />
                );
              })}
          </div>
          {colorPalette ? (
            <ColorPalette
              Icon={colorPalette.icon}
              handleColorChange={handleChangeColor}
              selectedColor={colorPalette.selectedColor}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default ToolbarSelector;
