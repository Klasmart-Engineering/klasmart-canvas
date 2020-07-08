import React from 'react';
import './whiteboard.css';
import { WhiteboardProvider } from './WhiteboardContext';
import Toolbar from '../../components/toolbar/Toolbar';

function Whiteboard() {
  return (
    <div className="container">
      <div className="toolbar-container">
        <WhiteboardProvider>
          <Toolbar />
        </WhiteboardProvider>
      </div>
      <canvas id="canvas" style={{ border: '1px solid' }} />
    </div>
  );
}

export default Whiteboard;
