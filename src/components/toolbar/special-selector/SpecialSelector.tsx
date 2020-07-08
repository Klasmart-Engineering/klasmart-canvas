import React, { useState, useRef } from 'react';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import SpecialButton from '../special-button/SpecialButton';
import '../toolbar-selector/toolbar-selector.css';

interface ISpecialSelector {
  index: number;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  styleOptions: any[];
  selected: boolean;
  onChildClick: (index: number) => void;
  onChildChange: (index: number, value: string) => void;
}

/**
 * Render an SpecialSelector that uses a stylizable Icon (Font like)
 * @param {ISpecialSelector} props - Props needed to render the component:
 * - index - index that the element has in the section
 * - Icon - Icon to set in the options
 * - selected - flag to set if the element is selected or not
 * - styleOptions - Icon styles in the different options
 * - onChildClick - Function to execute when the element is clicked
 * - onChildChange - Function to execute when the value changes
 */
function SpecialSelector({
  index,
  Icon,
  selected,
  styleOptions,
  onChildClick,
  onChildChange,
}: ISpecialSelector) {
  const [selectedOption, setSelectedOption] = useState(styleOptions[0]);
  const [showOptions, setShowOptions] = useState(false);
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
   * Is executed when the selector changes its value
   * @param {string} value - new value to set in selector
   */
  function handleSelect(value: any) {
    setSelectedOption(value);
    onChildChange(index, value.iconName);
    setShowOptions(false);
  }

  /**
   * Is executed when you click the arrow
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
      <div
        ref={buttonRef}
        className={[
          'toolbar-selector',
          selected ? 'selected' : '',
          !selected ? 'unselected' : '',
        ].join(' ')}
      >
        <div className="icon-container" onClick={handleClick}>
          <Icon style={selectedOption.style} />
        </div>
        <ArrowRightIcon onClick={handleArrowClick} />
      </div>
      {showOptions && selected ? (
        <div className="options">
          {styleOptions
            .filter((option) => {
              return option.index !== selectedOption.index;
            })
            .map((option) => {
              return (
                <SpecialButton
                  key={option.index}
                  index={option.index}
                  Icon={Icon}
                  style={option.style}
                  selected={false}
                  onChildClick={(e) => handleSelect(option)}
                />
              );
            })}
        </div>
      ) : null}
    </div>
  );
}

export default SpecialSelector;
