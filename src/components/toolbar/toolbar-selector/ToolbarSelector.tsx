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
 * - id - id that the selector has in the Toolbar Section
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
  const {
    id,
    options,
    selected,
    definedOptionName,
    colorPalette,
    onAction,
    onClick,
    onChange,
  } = props;

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [showOptions, setShowOptions] = useState(false);
  const [color, setColor] = useState(colorPalette?.selectedColor || '');
  const buttonRef = useRef(null);

  React.useEffect(() => {
    const newValue = options.find(
      (option) => option.iconName === definedOptionName
    );

    if (newValue) {
      setSelectedOption(newValue);
    }
  }, [definedOptionName, options]);

  /**
   * Is executed when the selector is clicked and sends an event to its parent
   */
  function handleClick() {
    onClick(id);
    onAction(id, selectedOption.iconName.toLowerCase());

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
   * Is executed when the selector changes its value
   * @param {IToolbarSelectorOption} value - new value to set in selector
   */
  function handleSelect(value: IToolbarSelectorOption) {
    setSelectedOption(value);
    setShowOptions(false);
    onChange(id, value.iconName);
    onAction(id, value.iconName.toLowerCase());
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
          selected ? 'selected' : '',
          !selected ? 'unselected' : '',
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
      {showOptions && selected ? (
        <div className="options">
          {options
            .filter((option) => {
              return option.iconName !== selectedOption.iconName;
            })
            .map((option) => {
              return (
                <ToolbarButton
                  key={option.iconName}
                  id={option.id}
                  title={option.title}
                  iconSrc={option.iconSrc}
                  iconName={option.iconName}
                  selected={false}
                  onClick={(e) => handleSelect(option)}
                />
              );
            })}
          {colorPalette ? (
            <ColorPalette
              Icon={colorPalette.icon}
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
