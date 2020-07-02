import React, { useState } from 'react';
import './toolbar-selector.css';
import IToolbarSelector from '../../interfaces/toolbar/toolbar-selector';

/**
 * Render a ToolbarSelector
 * @param {IToolbarSelector} props - Props that the component need:
 * - index - index that the selector has in the Toolbar Section
 * - option - options to be displayed in the selector
 * - selected - flag that indicates if this selector is selected
 * - onChildClick - event that is emitted to parent when selector is clicked
 */
function ToolbarSelector({
  index,
  options,
  selected,
  onChildClick,
}: IToolbarSelector) {
  const [selectedOption, setSelectedOption] = useState(0);

  /**
   * Is executed when the button is clicked and sends an events to its parent
   */
  function handleClick() {
    onChildClick(index);
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
      onChange={(e) => setSelectedOption(+e.target.value)}
      onBlur={(e) => setSelectedOption(+e.target.value)}
    >
      {options.map((option) => {
        return (
          <option className="option" key={option.index} value={option.index}>
            {option.iconName}
          </option>
        );
      })}
    </select>
  );
}

export default ToolbarSelector;
