import React, { CSSProperties, useEffect } from 'react';
import '../../assets/style/whiteboard.css';
import { WhiteboardProvider } from './WhiteboardContext';
import Toolbar from '../../components/toolbar/Toolbar';
import { WhiteboardCanvas } from './WhiteboardCanvas';
import { ICanvasKeyboardEvent } from '../../interfaces/canvas-events/canvas-keyboard-event';
import { WhiteboardContainer } from '../../components/whiteboard/WhiteboardContainer';

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
  const whiteboardWidth = 740;
  const whiteboardHeight = 460;

  const canvasStyle: CSSProperties = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
  };

  /**
   * Blocks the Firefox previous page action triggered when the Backspace key is pressed
   */
  useEffect(() => {
    const keydownHandler = (event: Event) => {
      if (
        (event as ICanvasKeyboardEvent).key === 'Backspace' &&
        (event.target as HTMLElement).nodeName !== 'TEXTAREA'
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', keydownHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  return (
    <>
      <WhiteboardProvider
        clearWhiteboardPermissions={teacher}
        userId={'teacher'}
        allToolbarIsEnabled={true}
      >
        <div className="whiteboard">
          <Toolbar />
          <WhiteboardContainer
            width={whiteboardWidth}
            height={whiteboardHeight}
          >
            <WhiteboardCanvas
              instanceId="canvas1"
              userId="teacher"
              initialStyle={canvasStyle}
              pointerEvents={true}
              clearWhiteboardPermissions={teacher}
              pixelWidth={whiteboardWidth}
              pixelHeight={whiteboardHeight}
            >
              <button>Teacher</button>
            </WhiteboardCanvas>
            <button>Teacher</button>
          </WhiteboardContainer>
        </div>
      </WhiteboardProvider>
      <WhiteboardProvider
        clearWhiteboardPermissions={student}
        userId={'student'}
        allToolbarIsEnabled={false}
      >
        <div className="whiteboard">
          <Toolbar />
          <WhiteboardContainer
            width={whiteboardWidth}
            height={whiteboardHeight}
          >
            <WhiteboardCanvas
              instanceId="canvas2"
              userId="student"
              initialStyle={canvasStyle}
              pointerEvents={true}
              clearWhiteboardPermissions={student}
              pixelWidth={whiteboardWidth}
              pixelHeight={whiteboardHeight}
            >
              <button>Student</button>
            </WhiteboardCanvas>
            <button>Student</button>
          </WhiteboardContainer>
        </div>
      </WhiteboardProvider>
      <WhiteboardProvider
        clearWhiteboardPermissions={student}
        userId={'student2'}
        allToolbarIsEnabled={false}
      >
        <div className="whiteboard">
          <Toolbar />
          <WhiteboardContainer
            width={whiteboardWidth}
            height={whiteboardHeight}
          >
            <WhiteboardCanvas
              instanceId="canvas3"
              userId="student2"
              initialStyle={canvasStyle}
              pointerEvents={true}
              clearWhiteboardPermissions={student}
              pixelWidth={whiteboardWidth}
              pixelHeight={whiteboardHeight}
            >
              <button>Student</button>
            </WhiteboardCanvas>
            <button>Student</button>
          </WhiteboardContainer>
        </div>
      </WhiteboardProvider>
    </>
  );
}

export default Whiteboard;
