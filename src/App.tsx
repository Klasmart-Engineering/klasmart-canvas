import React, { useRef, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './canvas.css';
import Toolbar from './components/toolbar-component/Toolbar';

function App() {
  const ref: any = useRef(null);
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    ctx.font = '30px Arial';
    ctx.fillText('Hello World', 220, 175);
  });

  /**
   * Set the value of the flag that show/hide the input
   * @param {boolean} value - Value to set in the flag
   */
  function changeShowInput(value: boolean) {
    setShowInput(value);
  }

  return (
    <div className="container">
      <canvas ref={ref} width="600px" height="350px" />
      <div className="toolbar-container">
        <Toolbar onTextClick={changeShowInput} />
      </div>
      <div className="input-container">
        {showInput ? (
          <TextField
            id="outlined-basic"
            className="input-text"
            label="Insert Text"
            variant="outlined"
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
