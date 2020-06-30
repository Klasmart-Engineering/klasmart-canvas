import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import './canvas.css';

let canvas: {
  add: (arg0: any) => void;
  remove: (arg0: any) => void;
  getActiveObject: () => any;
  getObjects: () => any;
  backgroundColor: 'red';
};

function App() {
  const [shape, updateShape] = useState('rectangle');
  useEffect(() => {
    // @ts-ignore
    canvas = new fabric.Canvas('canvas', {
      backgroundColor: 'white',
      width: '600',
      height: '350',
    });
  }, []);

  const addShape = () => {
    const rect = new fabric.Rect({
      originX: 'left',
      left: 200,
      fill: 'blue',
      width: 200,
      height: 200,
      angle: 45,
    });

    const triangle = new fabric.Triangle({
      width: 100,
      height: 160,
      fill: 'black',
      left: 50,
      top: 50,
    });

    const circle = new fabric.Circle({
      radius: 20,
      fill: 'green',
      left: 100,
      top: 100,
    });

    console.log('shape selected', shape, canvas);

    switch (shape) {
      case 'rectangle':
        canvas.add(rect);
        return;
      case 'triangle':
        canvas.add(triangle);
        return;
      case 'circle':
        canvas.add(circle);
        return;
    }
  };

  const removeShape = () => {
    canvas.remove(canvas.getActiveObject());
    console.log(canvas.getObjects());
  };

  return (
    <div className="App">
      <select onChange={(e) => updateShape(e.target.value)}>
        <option key="rectangle" value="rectangle">
          Rectangle
        </option>
        <option key="triangle" value="triangle">
          Triangle
        </option>
        <option key="circle" value="circle">
          Circle
        </option>
      </select>
      <button onClick={addShape}>Add shape</button>
      <button onClick={removeShape}>Remove selected shape</button>
      <div className="container">
        <canvas id="canvas" style={{ border: '1px solid' }} />
      </div>
    </div>
  );
}

export default App;
