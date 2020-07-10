import React, { useContext, useState } from 'react';
//import './whiteboard.css';
import { WhiteboardProvider, WhiteboardContext } from './WhiteboardContext';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player';

const Toolbar = () => {
  const { addShape, clearWhiteboard, auto, setAuto } = useContext(
    WhiteboardContext
  );
  const bx = () => {
    return auto ? 'Control Video' : 'Control Whiteboard';
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={addShape}>
        Add Shape
      </Button>
      <Button variant="outlined" color="primary" onClick={clearWhiteboard}>
        Clear Whiteboard
      </Button>
      <Button variant="outlined" color="primary" onClick={() => setAuto(!auto)}>
        {bx()}
      </Button>
    </div>
  );
};

function Whiteboard() {
  return (
    <div>
      {/*<div*/}
      {/*  style={{*/}
      {/*    border: '1px solid red',*/}
      {/*    width: '640px',*/}
      {/*    height: '360px',*/}
      {/*    display: 'flex',*/}
      {/*    alignItems: 'center',*/}
      {/*    justifyContent: 'center',*/}
      {/*    position: 'relative',*/}
      {/*    backgroundColor: 'green',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <ReactPlayer*/}
      {/*    url="https://www.youtube.com/watch?v=XhpGp9d9jSA"*/}
      {/*    controls*/}
      {/*  />*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      border: '1px solid blue',*/}
      {/*      width: '640px',*/}
      {/*      height: '360px',*/}
      {/*      // display: 'flex',*/}
      {/*      // alignItems: 'center',*/}
      {/*      // justifyContent: 'center',*/}
      {/*      position: 'absolute',*/}
      {/*      // backgroundColor: 'blue',*/}
      {/*      pointerEvents: auto ? 'auto' : 'none',*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <canvas*/}
      {/*      id="canvas"*/}
      {/*      style={{*/}
      {/*        // border: '1px solid',*/}
      {/*        // position: 'absolute',*/}
      {/*        // width: '600px',*/}
      {/*        // height: '350px',*/}
      {/*        border: '1px solid blue',*/}
      {/*        // width: '400px',*/}
      {/*        // height: '250px',*/}
      {/*        // display: 'flex',*/}
      {/*        // alignItems: 'center',*/}
      {/*        // justifyContent: 'center',*/}
      {/*        // position: 'absolute',*/}
      {/*        // backgroundColor: 'blue',*/}
      {/*        //pointerEvents: 'auto',*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="toolbar-container">
        <WhiteboardProvider canvasId={'canvas'} toolbar={<Toolbar />}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=XhpGp9d9jSA"
            controls
          />
          {/*<Actions />*/}
        </WhiteboardProvider>
        {/*<Button*/}
        {/*  variant="outlined"*/}
        {/*  color="primary"*/}
        {/*  onClick={() => setAuto(!auto)}*/}
        {/*>*/}
        {/*  {bx()}*/}
        {/*</Button>*/}

        <WhiteboardProvider canvasId={'canvas2'} toolbar={<Toolbar />}>
          <iframe
            src="https://h5p.org/h5p/embed/1396"
            width="640"
            height="275"
          ></iframe>
          {/*<Actions />*/}
        </WhiteboardProvider>
      </div>
    </div>
  );
}

export default Whiteboard;
