import React, { useState, useRef } from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import SpecialButton from '../special-button/SpecialButton';
import '../toolbar-selector/toolbar-selector.css';
import ISpecialSelector from '../../../interfaces/toolbar/toolbar-special-elements/toolbar-special-selector';

/**
 * Render an SpecialSelector that uses a stylizable Icon (Font like)
 * @param {ISpecialSelector} props - Props needed to render the component:
 * - index - index that the element has in the section
 * - Icon - Icon to set in the options
 * - selected - flag to set if the element is selected or not
 * - styleOptions - Icon styles in the different options
 * - onClick - Function to execute when the element is clicked
 * - onChange - Function to execute when the value changes
 */
function SpecialSelector(props: ISpecialSelector) {
  const [selectedOption, setSelectedOption] = useState(props.styleOptions[0]);
  const [showOptions, setShowOptions] = useState(false);
  const buttonRef = useRef(null);

  /**
   * Is executed when the selector is clicked and sends an event to its parent
   */
  function handleClick() {
    props.onClick(props.index);

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
    props.onChange(props.index, value.iconName);
    setShowOptions(false);
  }

  /**
   * Is executed when you click the arrow
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
          props.selected ? 'selected' : '',
          !props.selected ? 'unselected' : '',
        ].join(' ')}
      >
        <props.Icon style={selectedOption.style} onClick={handleClick} />
        <ArrowRightIcon onClick={handleArrowClick} />
      </button>
      {showOptions && props.selected ? (
        <div className="options special-options">
          {props.styleOptions
            .filter((option) => {
              return option.iconName !== selectedOption.iconName;
            })
            .map((option, index) => {
              return (
                <SpecialButton
                  key={index}
                  index={index}
                  title={option.title}
                  Icon={props.Icon}
                  style={option.style}
                  selected={false}
                  onClick={(e) => handleSelect(option)}
                />
              );
            })}
        </div>
      ) : null}
    </div>
  );
}

export default SpecialSelector;
