import React from 'react';
import '../../assets/style/whiteboard.css';
import { WhiteboardProvider } from './WhiteboardContext';
import Toolbar from '../../components/toolbar/Toolbar';
import { WhiteboardCanvas } from './WhiteboardCanvas';
import '../../assets/style/whiteboard.css';

function Whiteboard() {
  return (
    <div>
      <WhiteboardProvider>
        <div className="whiteboard">
          <Toolbar />
          <div
            style={{
              border: '1px solid black',
              width: '740px',
              height: '460px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: 'white',
            }}
          >
            <WhiteboardCanvas
              instanceId="canvas1"
              userId="teacher"
              pointerEvents={true}
              display={true}
              height={460}
            >
              <button>Teacher</button>
            </WhiteboardCanvas>
          </div>
        </div>
      </WhiteboardProvider>
      <WhiteboardProvider>
        <div className="whiteboard">
          <Toolbar />
          <div
            style={{
              border: '1px solid black',
              width: '740px',
              height: '460px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: 'white',
            }}
          >
            <WhiteboardCanvas
              instanceId="canvas2"
              userId="student"
              pointerEvents={true}
              display={true}
              height={460}
            >
              <button>Student</button>
            </WhiteboardCanvas>
          </div>
        </div>
      </WhiteboardProvider>
    </div>
  );
}

export default Whiteboard;
