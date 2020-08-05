import React from 'react';
import '../../assets/style/whiteboard.css';
import { WhiteboardProvider } from './WhiteboardContext';
import Toolbar from '../../components/toolbar/Toolbar';

function Whiteboard() {
  return (
    <div>
      <WhiteboardProvider
        canvasId={'canvas'}
        canvasWidth={'740'}
        canvasHeight={'460'}
        toolbar={<Toolbar />}
      >
        <button>Teacher</button>
      </WhiteboardProvider>
      <WhiteboardProvider
        canvasId={'student'}
        canvasWidth={'740'}
        canvasHeight={'460'}
        toolbar={<Toolbar />}
      >
        <button>Student</button>
      </WhiteboardProvider>
    </div>
  );
}

export default Whiteboard;
