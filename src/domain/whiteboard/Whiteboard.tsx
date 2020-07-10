import React, { useContext } from 'react';
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
      <div className="toolbar-container">
        <WhiteboardProvider
          canvasId={'canvas'}
          canvasWidth={'640'}
          canvasHeight={'360'}
          toolbar={<Toolbar />}
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=XhpGp9d9jSA"
            controls
          />
        </WhiteboardProvider>

        <WhiteboardProvider
          canvasId={'canvas2'}
          canvasWidth={'640'}
          canvasHeight={'275'}
          toolbar={<Toolbar />}
        >
          <iframe
            src="https://h5p.org/h5p/embed/1396"
            width="640"
            height="275"
          ></iframe>
        </WhiteboardProvider>
      </div>
    </div>
  );
}

export default Whiteboard;
