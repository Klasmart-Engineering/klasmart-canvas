import React, { useState, useRef } from 'react';
import './toolbar-selector.css';
import IToolbarSelector from '../../../interfaces/toolbar/toolbar-selector/toolbar-selector';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ColorPalette from '../color-palette/ColorPalette';
import ToolbarButton from '../toolbar-button/ToolbarButton';

/**
 * Render a ToolbarSelector
 * @param {IToolbarSelector} props - Props that the component need:
 * - index - index that the selector has in the Toolbar Section
 * - options - options to be displayed in the selector
 * - selected - flag that indicates if this selector is selected
 * - iconColorPalette (optional) - Icon to set in the color palette
 * - onChildClick - event that is emitted to parent when selector is clicked
 * - onChildChange - event that is emitted to parent when selector's value
 *   is changed
 */
function ToolbarSelector({
  index,
  options,
  selected,
  iconColorPalette,
  onChildClick,
  onChildChange,
  onColorChange,
}: IToolbarSelector) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [showOptions, setShowOptions] = useState(false);
  const [color, setColor] = useState('');
  const buttonRef = useRef(null);

  /**
   * Is executed when the selector is clicked and sends an event to its parent
   */
  function handleClick() {
    onChildClick(index);

    if (showOptions) {
      setShowOptions(false);
    }
  }

  /**
   * Is executed when the arrow is clicked
   */
  function handleArrowClick() {
    onChildClick(index);

    if (!showOptions) {
      document.addEventListener('click', handleOutsideClick, false);
    } else {
      document.removeEventListener('click', handleOutsideClick, false);
    }

    setShowOptions(!showOptions);
  }

  /**
   * Is executed when the selector changes its value
   * @param {string} value - new value to set in selector
   */
  function handleSelect(value: any) {
    setSelectedOption(value);
    onChildChange(index, value.iconName);
    setShowOptions(false);
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
   * Is executed when the color is changed
   * @param {string} color - new color to set
   */
  function handleChangeColor(color: string) {
    if (onColorChange) {
      onColorChange(color);
    }

    setColor(color);
    setShowOptions(false);
  }

  return (
    <div className="selector-container">
      <div
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
        <ArrowRightIcon onClick={handleArrowClick} />
      </div>
      {showOptions && selected ? (
        <div className="options">
          {options
            .filter((option) => {
              return option.index !== selectedOption.index;
            })
            .map((option) => {
              return (
                <ToolbarButton
                  key={option.index}
                  index={option.index}
                  iconSrc={option.iconSrc}
                  iconName={option.iconName}
                  selected={false}
                  onChildClick={(e) => handleSelect(option)}
                />
              );
            })}
          {iconColorPalette ? (
            <ColorPalette
              Icon={iconColorPalette}
              handleColorChange={handleChangeColor}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default ToolbarSelector;
