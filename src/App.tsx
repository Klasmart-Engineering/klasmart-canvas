import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import TextField from '@material-ui/core/TextField';
import './canvas.css';
import Toolbar from './components/toolbar-component/Toolbar';

let canvas: {
  add: (arg0: any) => void;
  remove: (arg0: any) => void;
  getActiveObject: () => any;
  getObjects: () => any;
  backgroundColor: 'red';
  requestRenderAll(): void;
  discardActiveObject(): void;
};
const canvasWidth = 600;
const canvasHeight = 350;

function App() {
  const [shape, updateShape] = useState('rectangle');
  const [text, updateText] = useState('');
  const ref = useRef('');
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    // @ts-ignore
    canvas = new fabric.Canvas('canvas', {
      backgroundColor: 'white',
      width: '600',
      height: '350',
    });
  }, []);

  const keyDownHandler = useCallback((e: { key: any }) => {
    if (e.key === 'Backspace') {
      removeSelectedElement();
      return;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler, false);
  }, [keyDownHandler]);

  useEffect(() => {
    if (text.length) {
      // @ts-ignore
      canvas.discardActiveObject().renderAll();
    }
  }, [text]);

  const writeText = (e: any) => {
    if (e.key === 'Enter') {
      ref.current = text;

      const textF = new fabric.Text(ref.current, {
        left: 0,
        top: 0,
      });

      console.log({ text });

      if (ref.current.length) {
        // @ts-ignore
        canvas.setActiveObject(textF);
        // @ts-ignore
        canvas.centerObject(textF);
        canvas.add(textF);
        updateText('');
      }
    }
  };

  function removeSelectedElement() {
    canvas.remove(canvas.getActiveObject());
    console.log(canvas.getObjects());
  }

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

  const rectangle = () => {
    const rectangleWidth = 150;
    const rectangleHeight = 150;

    return new fabric.Rect({
      originX: 'left',
      fill: 'blue',
      width: rectangleWidth,
      height: rectangleHeight,
      //angle: 45,
      left: canvasWidth / 2 - rectangleWidth / 2,
      top: canvasHeight / 2 - rectangleHeight / 2,
    });
  };

  const triangle = () => {
    const triangleWidth = 100;
    const triangleHeight = 160;
    return new fabric.Triangle({
      width: triangleWidth,
      height: triangleHeight,
      fill: 'black',
      left: canvasWidth / 2 - triangleWidth / 2,
      top: canvasHeight / 2 - triangleHeight / 2,
    });
  };

  const circle = () => {
    const circleRadius = 50;
    return new fabric.Circle({
      radius: circleRadius,
      fill: 'green',
      left: canvasWidth / 2 - circleRadius,
      top: canvasHeight / 2 - circleRadius,
    });
  };

  const addShape = () => {
    console.log('shape selected', shape, canvas);

    switch (shape) {
      case 'rectangle':
        return canvas.add(rectangle());
      case 'triangle':
        return canvas.add(triangle());
      case 'circle':
        return canvas.add(circle());
    }
  };

  const removeShape = (): void => {
    canvas.remove(canvas.getActiveObject());
    console.log(canvas.getObjects());
  };

  const fillColor = (color: string) => {
    console.log(color)
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set('fill', color);

      // @ts-ignore
      canvas.renderAll();
    }
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

  const MyButton = (props: any) => {
    const buttonText = `${props.color[0].toUpperCase()}${props.color.slice(1)}`;
    return (
      <button onClick={() => props.fillColor(props.color)}>{buttonText}</button>
    );
  };

  const ColorButtonsList = (props: { colors: any; fillColor: any }) => {
    const colors = props.colors;
    return colors.map((color: React.ReactNode) => (
      <MyButton color={color} fillColor={props.fillColor} />
    ));
  };

  /**
   * Set the value of the flag that show/hide the input
   * @param {boolean} value - Value to set in the flag
   */
  function changeShowInput(value: boolean) {
    setShowInput(value);
  }

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
        {/*<div className="toolbar-container">*/}
        {/*  <Toolbar onTextClick={changeShowInput} />*/}
        {/*</div>*/}
        <div className="input-container">
          {showInput ? (
            <TextField
              id="outlined-basic"
              className="input-text"
              label="Insert Text"
              variant="outlined"
              value={text}
              onChange={(e) => updateText(e.target.value)}
              onKeyDown={(e) => writeText(e)}
            />
          ) : null}
        </div>
      </div>
      <div>{text}</div>
      <input
        value={text}
        onChange={(e) => updateText(e.target.value)}
        onKeyDown={(e) => writeText(e)}
      />
      <ColorButtonsList colors={colorsList} fillColor={fillColor} />
    </div>
  );
}

export default App;
