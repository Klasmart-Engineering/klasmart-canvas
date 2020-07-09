import React, { useContext, useState } from 'react';
//import './whiteboard.css';
import { WhiteboardProvider, WhiteboardContext } from './WhiteboardContext';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player';

const Actions = () => {
  const { addShape, clearWhiteboard } = useContext(WhiteboardContext);
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={addShape}>
        Add Shape
      </Button>
      <Button variant="outlined" color="primary" onClick={clearWhiteboard}>
        Clear Whiteboard
      </Button>
    </div>
  );
};

function Whiteboard() {
  const [auto, setAuto] = useState(true);
  const bx = () => {
    return auto ? 'Control Video' : 'Control Whiteboard'
  }

  return (
    <div>
      {/*<button>Hello button</button>*/}
      {/*<canvas id="canvas" style={{ border: '1px solid' }} />*/}

      <div
        style={{
          border: '1px solid red',
          width: '640px',
          height: '360px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: 'green',
        }}
      >
        {/*<button*/}
        {/*  onClick={() => {*/}
        {/*    alert('Fabric Button click 3 worked');*/}
        {/*  }}*/}
        {/*>*/}
        {/*  test 3*/}
        {/*</button>*/}

        <ReactPlayer
          url="https://www.youtube.com/watch?v=XhpGp9d9jSA"
          controls
        />

        {/*<canvas*/}
        {/*  id="canvas"*/}
        {/*  style={{*/}
        {/*    // border: '1px solid',*/}
        {/*    // position: 'absolute',*/}
        {/*    // width: '600px',*/}
        {/*    // height: '350px',*/}
        {/*    border: '1px solid blue',*/}
        {/*    // width: '400px',*/}
        {/*    // height: '250px',*/}
        {/*    // display: 'flex',*/}
        {/*    // alignItems: 'center',*/}
        {/*    // justifyContent: 'center',*/}
        {/*    position: 'absolute',*/}
        {/*    backgroundColor: 'blue',*/}
        {/*    // pointerEvents: 'none',*/}
        {/*  }}*/}
        {/*/>*/}

        <div
          style={{
            border: '1px solid blue',
            width: '640px',
            height: '360px',
            // display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center',
            position: 'absolute',
            // backgroundColor: 'blue',
            pointerEvents: auto ? 'auto' : 'none',
          }}
        >
          <canvas
            id="canvas"
            style={{
              // border: '1px solid',
              // position: 'absolute',
              // width: '600px',
              // height: '350px',
              border: '1px solid blue',
              // width: '400px',
              // height: '250px',
              // display: 'flex',
              // alignItems: 'center',
              // justifyContent: 'center',
              // position: 'absolute',
              // backgroundColor: 'blue',
              //pointerEvents: 'auto',
            }}
          />
        </div>
      </div>
      <div className="toolbar-container">
        <WhiteboardProvider>
          <Actions />
        </WhiteboardProvider>
      </div>
      <Button variant="outlined" color="primary" onClick={() => setAuto(!auto)}>
        {bx()}
      </Button>
    </div>
  );
}

export default Whiteboard;
