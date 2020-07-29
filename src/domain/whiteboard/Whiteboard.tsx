import React from 'react';
import './whiteboard.css';
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
        master={true}
      >
        <button>Teacher</button>
      </WhiteboardProvider>
      <WhiteboardProvider
        canvasId={'student'}
        canvasWidth={'740'}
        canvasHeight={'460'}
        toolbar={<Toolbar />}
        master={false}
      >
        <button>Student</button>
      </WhiteboardProvider>
    </div>
  );
}

export default Whiteboard;
