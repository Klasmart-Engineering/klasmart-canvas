import React, { useState, useRef } from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import SpecialButton from '../special-button/SpecialButton';
import '../toolbar-selector/toolbar-selector.css';
import ISpecialSelector from '../../../interfaces/toolbar/toolbar-special-elements/toolbar-special-selector';

/**
 * Render an SpecialSelector that uses a stylizable Icon (Font like)
 * @param {ISpecialSelector} props - Props needed to render the component:
 * - id - id that the element has
 * - Icon - Icon to set in the options
 * - selected - flag to set if the element is selected or not
 * - styleOptions - Icon styles in the different options
 * - onClick - Function to execute when the element is clicked
 * - onChange - Function to execute when the value changes
 */
function SpecialSelector(props: ISpecialSelector) {
  const { id, Icon, selected, styleOptions, onClick, onChange } = props;

  const [selectedOption, setSelectedOption] = useState(styleOptions[0]);
  const [showOptions, setShowOptions] = useState(false);
  const buttonRef = useRef(null);

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
  function handleSelect(value: any) {
    setSelectedOption(value);
    onChange(id, value.id);
    setShowOptions(false);
  }

  /**
   * Is executed when you click the arrow
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
   * Is executed when you click on the window to check if you are clicking on toolbar elements or not
   * @param {MouseEvent} e - Mouse click event
   */
  function handleOutsideClick(e: MouseEvent) {
    if (
      !((buttonRef.current as unknown) as HTMLElement).contains(
        e.target as Node
      )
    ) {
      if (!showOptions) {
        setShowOptions(false);
      }
    }
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
        <Icon style={selectedOption.style} onClick={handleClick} />
        <ArrowRightIcon onClick={handleArrowClick} />
      </button>
      {showOptions && selected ? (
        <div className="options-container">
          <div className="options special-options no-palette">
            {styleOptions
              .filter((option) => {
                return option.id !== selectedOption.id;
              })
              .map((option) => {
                return (
                  <SpecialButton
                    key={option.id}
                    id={option.id}
                    title={option.title}
                    Icon={Icon}
                    style={option.style}
                    selected={false}
                    onClick={() => handleSelect(option)}
                  />
                );
              })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SpecialSelector;
