import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import './canvas.css';

let canvas: {
  add: (arg0: any) => void;
  remove: (arg0: any) => void;
  getActiveObject: () => any;
  getObjects: () => any;
  backgroundColor: 'red';
  requestRenderAll(): void;
  discardActiveObject(): void;
};

function App() {
  const [shape, updateShape] = useState('rectangle');
  const [text, updateText] = useState('');
  const ref = useRef('');
  useEffect(() => {
    console.log('mmm');
    // @ts-ignore
    canvas = new fabric.Canvas('canvas', {
      backgroundColor: 'white',
      width: '600',
      height: '350',
    });
  }, []);

  useEffect(() => {}, [text]);

  const writeText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ref.current = text;

      const textF = new fabric.Text(ref.current, {
        left: 100,
        top: 100,
      });

      console.log({ text });

      if (ref.current.length) {
        // @ts-ignore
        canvas.setActiveObject(textF);
        canvas.add(textF);
        updateText('');
      }
    }
  };

  // useEffect(() => {
  //   // @ts-ignore
  //   canvas.on('mouse:down', function (options) {
  //     console.log(options.e.clientX, options.e.clientY);
  //     console.log(options.e.x, options.e.y);
  //     console.log(options);
  //     if (ref.current.length === 0) {
  //       console.log('text', text, text.length);
  //
  //       ref.current = text;
  //
  //       const textF = new fabric.Text(ref.current, {
  //         left: options.absolutePointer.x,
  //         top: options.absolutePointer.y,
  //       });
  //
  //       // @ts-ignore
  //       canvas.setActiveObject(textF);
  //       canvas.add(textF);
  //
  //       return;
  //     }
  //
  //     // Listen to keyboard strokes
  //   });
  // }, [text]);

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
      <div>{text}</div>
      <input
        value={text}
        onChange={(e) => updateText(e.target.value)}
        onKeyDown={(e) => writeText(e)}
      />
    </div>
  );
}

export default App;
