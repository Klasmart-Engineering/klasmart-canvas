import React from 'react';
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
      <div></div>
    </WhiteboardProvider>
  );
}

export default Whiteboard;
