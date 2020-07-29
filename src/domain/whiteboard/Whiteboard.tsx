import React from 'react';
import ReactPlayer from 'react-player';
import './whiteboard.css';
import { WhiteboardProvider } from './WhiteboardContext';
import Toolbar from '../../components/toolbar/Toolbar';

function Whiteboard() {
  return (
    <WhiteboardProvider
      canvasId={'canvas'}
      canvasWidth={'640'}
      canvasHeight={'360'}
      toolbar={<Toolbar />}
    >
      <ReactPlayer url="https://www.youtube.com/watch?v=XhpGp9d9jSA" controls />
    </WhiteboardProvider>
  );
}

export default Whiteboard;
