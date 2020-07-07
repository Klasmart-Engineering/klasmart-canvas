import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import TextField from '@material-ui/core/TextField';
import './canvas.css';
import Toolbar from './components/toolbar/Toolbar';
import ReactPlayer from 'react-player';

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
const canvasHeight = 300;

function App() {
  const [shape, updateShape] = useState('rectangle');
  const [shapeColor, updateShapeColor] = useState('black');
  const [text, updateText] = useState('');
  const ref = useRef('');
  const [showInput, setShowInput] = useState(true);
  const [showH5PCanvas, setShowH5PCanvas] = useState(false);

  // canvas 2
  useEffect(() => {
    var c = document.getElementById('canvas2') as HTMLCanvasElement;
    if (c) {
      var ctx = c.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.rect(80, 40, 140, 70);
        ctx.stroke();
      }
    }
  }, []);

  // canvas 3
  useEffect(() => {
    var c = document.getElementById('canvas3') as HTMLCanvasElement;
    if (c) {
      var ctx = c.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(70, 40, 140, 70);
      }
    }
  }, []);

  // fabric 2
  useEffect(() => {
    var canvas = new fabric.Canvas('fabric2', { width: 250, height: 220 });
    var rect = new fabric.Rect({
      top: 50,
      left: 60,
      width: 130,
      height: 120,
      stroke: '#aaa',
      strokeWidth: 2,
      fill: 'rgba(0,0,0,0)',
    });
    canvas.add(rect);
  });

  // fabric 3
  useEffect(() => {
    var canvas = new fabric.Canvas('fabric3', { width: 250, height: 220 });
    var rect = new fabric.Rect({
      top: 50,
      left: 60,
      width: 130,
      height: 120,
      fill: 'blue',
    });
    canvas.add(rect);
  });

  // fabric 4
  useEffect(() => {
    var canvas = new fabric.Canvas('fabric4', { width: 640, height: 360 });
    var c1 = new fabric.Circle({
      radius: 30,
      fill: '#f55',
      top: 100,
      left: 100,
    });
    var c2 = new fabric.Circle({
      radius: 40,
      fill: '#55f',
      top: 60,
      left: 200,
    });
    var c3 = new fabric.Circle({
      radius: 50,
      fill: '#5f5',
      top: 300,
      left: 300,
    });
    canvas.add(c1);
    canvas.add(c2);
    canvas.add(c3);
  });

  // fabric 5
  useEffect(() => {
    var canvas = new fabric.Canvas('fabric5', { width: 640, height: 360 });
    var c1 = new fabric.Circle({
      radius: 20,
      fill: '#f55',
      top: 180,
      left: 25,
    });
    var c2 = new fabric.Circle({
      radius: 40,
      fill: '#55f',
      top: 150,
      left: 170,
    });
    var c3 = new fabric.Circle({
      radius: 30,
      fill: '#5f5',
      top: 240,
      left: 80,
    });
    canvas.add(c1);
    canvas.add(c2);
    canvas.add(c3);
  });

  /*
  useEffect(() => {
    // @ts-ignore
    canvas = new fabric.Canvas('canvas', {
      backgroundColor: 'white',
      width: '600',
      height: '300',
    });
  }, []);
*/

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

  const rectangle = () => {
    const rectangleWidth = 150;
    const rectangleHeight = 150;

    return new fabric.Rect({
      originX: 'left',
      fill: shapeColor,
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
      fill: shapeColor,
      left: canvasWidth / 2 - triangleWidth / 2,
      top: canvasHeight / 2 - triangleHeight / 2,
    });
  };

  const circle = () => {
    const circleRadius = 50;
    return new fabric.Circle({
      radius: circleRadius,
      fill: shapeColor,
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
    console.log(color);
    updateShapeColor(color);

    console.log({ shapeColor });
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

  /**
   * Set the value of the flag that show/hide the input
   * @param {boolean} value - Value to set in the flag
   */
  function changeShowInput(value: boolean) {
    setShowInput(value);
  }

  return (
    <div className="App">
      {/*
      <div className="container">
        <canvas id="canvas" style={{ border: '1px solid' }} />
        <div className="toolbar-container">
          <Toolbar
            onTextClick={changeShowInput}
            colorList={colorsList}
            fillColor={fillColor}
            updateShape={updateShape}
            addAShape={addShape}
            removeAShape={removeShape}
          />
        </div>
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
          */}
      <br />
      <h3>Canvas Test</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div>
          <h3>no canvas, just button</h3>
          <div
            style={{
              border: '1px solid #aaa',
              width: '250px',
              height: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '50px',
            }}
          >
            <button
              onClick={() => {
                alert('Button click worked');
              }}
            >
              test 1
            </button>
          </div>
        </div>
        <div>
          <h3>canvas 2</h3>
          <div
            style={{
              border: '1px solid #aaa',
              width: '250px',
              height: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '50px',
              position: 'relative',
            }}
          >
            <button
              onClick={() => {
                alert('Button click 2 worked');
              }}
            >
              test 2
            </button>
            <canvas
              id="canvas2"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '250px',
                height: '220px',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
        <div>
          <h3>canvas 3</h3>
          <div
            style={{
              border: '1px solid #aaa',
              width: '250px',
              height: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '50px',
              position: 'relative',
            }}
          >
            <button
              onClick={() => {
                alert('Button click 3 worked');
              }}
            >
              test 3
            </button>
            <canvas
              id="canvas3"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '250px',
                height: '220px',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <h3>Fabric Test</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '300px',
        }}
      >
        <div>
          <h3>no fabric, just button</h3>
          <div
            style={{
              border: '1px solid #aaa',
              width: '250px',
              height: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '50px',
            }}
          >
            <button
              onClick={() => {
                alert('Fabric Button click worked');
              }}
            >
              test 1
            </button>
          </div>
        </div>
        <div>
          <h3>fabric 2</h3>
          <div
            style={{
              border: '1px solid #aaa',
              width: '250px',
              height: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '50px',
              position: 'relative',
            }}
          >
            <button
              onClick={() => {
                alert('Fabric Button click 2 worked');
              }}
            >
              test 2
            </button>
            <canvas
              id="fabric2"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '250px',
                height: '220px',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
        <div>
          <h3>fabric 3</h3>
          <div
            style={{
              border: '1px solid #aaa',
              width: '250px',
              height: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '50px',
              position: 'relative',
            }}
          >
            <button
              onClick={() => {
                alert('Fabric Button click 3 worked');
              }}
            >
              test 3
            </button>
            <canvas
              id="fabric3"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '250px',
                height: '220px',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <br />

      <h3>Fabric Video Test</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '300px',
        }}
      >
        <div>
          <h3>video test</h3>
          <div
            style={{
              border: '1px solid #aaa',
              width: '640px',
              height: '360px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '50px',
              position: 'relative',
            }}
          >
            <ReactPlayer
              url="https://www.youtube.com/watch?v=XhpGp9d9jSA"
              controls
            />
            <canvas
              id="fabric4"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '640px',
                height: '360px',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <h3>Fabric H5P Test</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div>
          <h3>h5p test</h3>
          <div
            style={{
              border: '1px solid #aaa',
              width: '640px',
              height: '275px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '50px',
            }}
          >
            <iframe
              src="https://h5p.org/h5p/embed/1396"
              width="640"
              height="275"
            ></iframe>

            <canvas
              id="fabric5"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '640px',
                height: '275px',
                pointerEvents: 'none',
                display: showH5PCanvas ? 'block' : 'none',
              }}
            />
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setShowH5PCanvas(!showH5PCanvas);
        }}
        style={{ marginTop: '20px', marginBottom: '300px', cursor: 'pointer' }}
      >
        Toggle Fabric Canvas
      </div>

      <script src="https://h5p.org/sites/all/modules/h5p/library/js/h5p-resizer.js"></script>
    </div>
  );
}

export default App;
