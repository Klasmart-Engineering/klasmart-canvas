import React, { useCallback, useEffect, useRef, useState } from 'react';
import './whiteboard.css';
import { WhiteboardProvider } from './WhiteboardContext';

function Whiteboard() {
  return (
    <div className="container">
      <canvas id="canvas" style={{ border: '1px solid' }} />
      <div className="toolbar-container">
        <WhiteboardProvider>{/*<Toolbar />*/}</WhiteboardProvider>
      </div>
    </div>
  );
}

export default Whiteboard;
