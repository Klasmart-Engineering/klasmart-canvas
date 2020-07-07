import React, { useRef, useEffect, useState } from 'react';
import './canvas.css';
import Toolbar from './components/toolbar/Toolbar';

function App() {
  const ref: any = useRef(null);
  const [shape, updateShape] = useState('circle');
  const [text, updateText] = useState('');
  const [font, updateFont] = useState('Arial');

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

  const addShape = () => {
    console.log('add shape');
  };

  const removeShape = () => {
    console.log('remove shape');
  };

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    ctx.font = '30px Arial';
    ctx.fillText('Hello World', 220, 175);
  });

  function writeText(e: KeyboardEvent) {
    console.log(e.key);
  }

  return (
    <div className="container">
      <Toolbar
        colorList={colorsList}
        fillColor={fillColor}
        updateShape={updateShape}
        addAShape={addShape}
        removeSelectedElement={removeShape}
        text={text}
        updateText={updateText}
        updateFont={updateFont}
        writeText={writeText}
      />
      <canvas ref={ref} width="600px" height="350px" />
    </div>
  );
}

export default App;
