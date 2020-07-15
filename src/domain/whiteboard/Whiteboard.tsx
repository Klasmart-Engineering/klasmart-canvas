import React from 'react';
import { WhiteboardProvider } from './WhiteboardContext';
import ReactPlayer from 'react-player';
import Toolbar from '../../components/toolbar/Toolbar';
import './whiteboard.css';

function Whiteboard() {
  return (
    <div>
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
  );
}

export default Whiteboard;
