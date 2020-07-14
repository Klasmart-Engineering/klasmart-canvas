import React from 'react';
import '../toolbar.css';
import TextField from '@material-ui/core/TextField';

interface IToolbarText {
  showInput: boolean;
  text: string;
  updateText: (value: string) => void;
  writeText?: (e: any) => void;
}

/**
 * Render an InputText below of the toolbar
 * @param {IToolbarText} props - Props that the component need to be rendered:
 * - showInput - flag tho show/hide the input
 * - text - value that the input field will have
 * - updateText - function to execute when the field value changes
 * - writeText (provisionaly optional) -
 *   function to execute when the user keydown a key
 */
function ToolbarText(props: IToolbarText) {
  const { showInput, text, updateText, writeText } = props;
  return (
    <div className="input-container">
      {showInput ? (
        <TextField
          id="outlined-basic"
          className="input-text"
          label="Insert Text"
          variant="outlined"
          value={text}
          onChange={(e) => updateText(e.target.value)}
          // is necesary the function managed by Whiteboard
          // onKeyDown={(e) => writeText(e)}
        />
      ) : null}
    </div>
  );
}

export default ToolbarText;
