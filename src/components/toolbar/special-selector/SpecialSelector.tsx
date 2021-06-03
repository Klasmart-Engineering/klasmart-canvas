import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import SpecialButton from '../special-button/SpecialButton';
import '../../../assets/style/toolbar-selector.css';
import ISpecialSelector from '../../../interfaces/toolbar/toolbar-special-elements/toolbar-special-selector';
import IStyleOption from '../../../interfaces/toolbar/toolbar-special-elements/style-option';

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
function SpecialSelector(props: ISpecialSelector) {
  const {
    id,
    Icon,
    active,
    selectedValue,
    styleOptions,
    onClick,
    onChange,
    enabled
  } = props;

  const [selectedOption, setSelectedOption] = useState(
    findOptionDefinedByParent()
  );
  const [showOptions, setShowOptions] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /**
   * When selectedValue changes the value is found in all the available options
   * to be setted like selected option
   */
  useEffect(() => {
    const newValue = styleOptions.find(
      (option) => option.value === selectedValue
    );

    if (newValue) {
      setSelectedOption(newValue);
    }
  }, [selectedValue, styleOptions]);

  /**
   * Finds the option that has the selectedValue defined by parent
   */
  function findOptionDefinedByParent(): IStyleOption {
    return (
      styleOptions.find((option) => option.value === selectedValue) ||
      styleOptions[0]
    );
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
  function handleSelect(option: IStyleOption) {
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
    if (!buttonRef.current?.contains(e.target as Node)) {
      if (!showOptions) {
        setShowOptions(false);
      }
    }
  }

  const selectorContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
  };

  const toolbarSelectorStyle: CSSProperties = {
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

  const arrowStyle: CSSProperties = {
    width: '20px',
    height: '20px',
  };

  const optionsContainerStyle: CSSProperties = {
    position: 'absolute',
    margin: '0 0 8px 56px',
    padding: '2px',
    border: 'none',
    backgroundColor: '#fff',
    borderRadius: '4px',
    zIndex: 2,
  };

  const optionsStyle: CSSProperties = {
    display: 'grid',
    rowGap: '2px',
    padding: '2px 2px 4px 0',
    gridAutoColumns: 'repeat(6, auto)',
  };

  const iconContainerStyle: CSSProperties = {
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  };

  return (
    <div className="selector-container" style={selectorContainerStyle}>
      <button
        title={selectedOption.title}
        data-testid={'special-selector-'+id}
        ref={buttonRef}
        style={toolbarSelectorStyle}
        className={[
          'toolbar-selector',
          active ? 'selected' : '',
          !active ? 'unselected' : '',
        ].join(' ')}
        onClick={handleClick}
        disabled={enabled === false}
      >
        <div style={iconContainerStyle}>
          <Icon style={selectedOption.style} />
        </div>
        <ArrowRightIcon onClick={handleArrowClick} style={arrowStyle} data-testid={'special-selector-arrow-'+selectedOption.id} />
      </button>
      {showOptions && active ? (
        <div className="options-container" style={optionsContainerStyle}>
          <div
            className="options special-options no-palette"
            style={optionsStyle}
          >
            {styleOptions
              .filter((option) => {
                return option.value !== selectedOption.value;
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
