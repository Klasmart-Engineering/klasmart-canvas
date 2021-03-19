import React, { CSSProperties, useEffect, useRef } from 'react';
import '../../assets/style/whiteboard.css';
import { WhiteboardProvider } from './WhiteboardContext';
import Toolbar from '../../components/toolbar/Toolbar';
import WhiteboardCanvas from './WhiteboardCanvas';
import { ICanvasKeyboardEvent } from '../../interfaces/canvas-events/canvas-keyboard-event';
import { WhiteboardContainer } from '../../components/whiteboard/WhiteboardContainer';

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import AuthMenu from '../../components/AuthMenu';
import Canvas3d from './three/Canvas3d';

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

  const activeCanvas = useRef<null | string>(null);

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
        allToolbarIsEnabled={true}
        activeCanvas={activeCanvas}
        userId={'teacher'}
      >
        <Provider store={store}>
          <AuthMenu userId={'teacher'} />
          <div
            className="whiteboard"
            onClick={() => {
              activeCanvas.current = 'canvas1';
            }}
          >
            <Toolbar userId="teacher" />
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
              <Canvas3d 
                userId="teacher"
                width={whiteboardWidth}
                height={whiteboardHeight}
              />
            </WhiteboardContainer>
          </div>
        </Provider>
      </WhiteboardProvider>
      <WhiteboardProvider
        clearWhiteboardPermissions={student}
        allToolbarIsEnabled={false}
        activeCanvas={activeCanvas}
        userId={'student'}
      >
        <Provider store={store}>
          <div
            className="whiteboard"
            onClick={() => {
              activeCanvas.current = 'canvas2';
            }}
          >
            <Toolbar userId="student" />
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
              <Canvas3d 
                userId="student"
                width={whiteboardWidth}
                height={whiteboardHeight}
              />
            </WhiteboardContainer>
          </div>
        </Provider>
      </WhiteboardProvider>
      <WhiteboardProvider
        clearWhiteboardPermissions={student}
        allToolbarIsEnabled={false}
        activeCanvas={activeCanvas}
        userId={'student2'}
      >
        <Provider store={store}>
          <div
            className="whiteboard"
            onClick={() => {
              activeCanvas.current = 'canvas3';
            }}
          >
            <Toolbar userId="student2" />
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
              <Canvas3d 
                userId="student2"
                width={whiteboardWidth}
                height={whiteboardHeight}
              />
            </WhiteboardContainer>
          </div>
        </Provider>
      </WhiteboardProvider>
    </>
  );
}

export default Whiteboard;
