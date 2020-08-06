import React, { CSSProperties } from 'react';
import '../../assets/style/whiteboard.css';
import { WhiteboardProvider } from './WhiteboardContext';
import Toolbar from '../../components/toolbar/Toolbar';
import { WhiteboardCanvas } from './WhiteboardCanvas';

function Whiteboard() {
  const canvasStyle: CSSProperties = {
    border: '2px blue solid',
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
  };

  return (
    <>
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
              style={canvasStyle}
              pointerEvents={true}
              width={740}
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
              style={canvasStyle}
              pointerEvents={true}
              width={740}
              height={460}
            >
              <button>Student</button>
            </WhiteboardCanvas>
          </div>
        </div>
      </WhiteboardProvider>
    </>
  );
}

export default Whiteboard;
