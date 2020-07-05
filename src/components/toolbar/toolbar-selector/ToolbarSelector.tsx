import React, { useState } from 'react';
import './toolbar-selector.css';
import IToolbarSelector from '../../../interfaces/toolbar/toolbar-selector/toolbar-selector';

/**
 * Render a ToolbarSelector
 * @param {IToolbarSelector} props - Props that the component need:
 * - index - index that the selector has in the Toolbar Section
 * - option - options to be displayed in the selector
 * - selected - flag that indicates if this selector is selected
 * - onChildClick - event that is emitted to parent when selector is clicked
 * - onChildChange - event that is emitted to parent when selector's value
 *   is changed
 */
function ToolbarSelector({
  index,
  options,
  selected,
  onChildClick,
  onChildChange,
}: IToolbarSelector) {
  const [selectedOption, setSelectedOption] = useState(options[0].iconName);

  /**
   * Is executed when the selector is clicked and sends an event to its parent
   */
  function handleClick() {
    onChildClick(index);
  }

  /**
   * Is executed when the selector changes its value
   * @param {string} value - new value to set in selector
   */
  function handleChange(value: string) {
    setSelectedOption(value);
    onChildChange(value);
  }

  return (
    <select
      className={[
        'toolbar-selector',
        selected ? 'selected' : '',
        !selected ? 'unselected' : '',
      ].join(' ')}
      value={selectedOption}
      onClick={handleClick}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={(e) => handleChange(e.target.value)}
    >
      {options.map((option) => {
        return (
          <option
            className="option"
            key={option.iconName}
            value={option.iconName}
          >
            {option.iconName}
          </option>
        );
      })}
    </select>
  );
}

export default ToolbarSelector;
