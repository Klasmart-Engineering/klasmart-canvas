import React, { CSSProperties } from 'react';
import '../../assets/style/whiteboard.css';
import { WhiteboardProvider } from './WhiteboardContext';
import Toolbar from '../../components/toolbar/Toolbar';
import { WhiteboardCanvas } from './WhiteboardCanvas';
import ToolbarContextProvider from '../../components/toolbar/toolbar-context-provider';
import ToolbarExample from '../../components/toolbar/toolbar-example';

const teacher = {
  allowClearAll: true,
  allowClearOthers: true,
  allowClearMyself: true,
};

const student = {
  allowClearAll: false,
  allowClearOthers: false,
  allowClearMyself: true,
};

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
      <WhiteboardProvider
        clearWhiteboardPermissions={teacher}
        userId={'teacher'}
      >
        <div className="whiteboard">
          <ToolbarContextProvider>
            <ToolbarExample />
          </ToolbarContextProvider>
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
              initialStyle={canvasStyle}
              pointerEvents={true}
              width={740}
              height={460}
              cssWidth={'740px'}
              cssHeight={'460px'}
            >
              <button>Teacher</button>
            </WhiteboardCanvas>
          </div>
        </div>
      </WhiteboardProvider>
      <WhiteboardProvider
        clearWhiteboardPermissions={student}
        userId={'student'}
      >
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
              initialStyle={canvasStyle}
              pointerEvents={true}
              width={740}
              height={460}
              cssWidth={'740px'}
              cssHeight={'460px'}
            >
              <button>Student</button>
            </WhiteboardCanvas>
          </div>
        </div>
      </WhiteboardProvider>
      <WhiteboardProvider
        clearWhiteboardPermissions={student}
        userId={'student2'}
      >
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
              instanceId="canvas3"
              userId="student2"
              initialStyle={canvasStyle}
              pointerEvents={true}
              width={740}
              height={460}
              cssWidth={'740px'}
              cssHeight={'460px'}
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
