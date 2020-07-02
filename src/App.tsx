import React, { useRef, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './canvas.css';
import Toolbar from './components/toolbar/Toolbar';

function App() {
  const ref: any = useRef(null);
  const [showInput, setShowInput] = useState(true);
  const [shape, updateShape] = useState('rectangle');

  const fillColor = (color: string) => {
    console.log({ color });
  };

  const colorsList = [
    'black',
    'red',
    'yellow',
    'green',
    'blue',
    'purple',
    'brown',
  ];

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
        <Toolbar
          onTextClick={changeShowInput}
          colorList={colorsList}
          fillColor={fillColor}
          updateShape={updateShape}
        />
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
