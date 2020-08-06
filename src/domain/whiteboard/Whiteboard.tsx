import React, { CSSProperties } from 'react';
import '../../assets/style/whiteboard.css';
import { WhiteboardProvider } from './WhiteboardContext';
import Toolbar from '../../components/toolbar/Toolbar';

function Whiteboard() {
  const canvasStyle: CSSProperties = {
    border: '2px blue solid',
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
  };

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
