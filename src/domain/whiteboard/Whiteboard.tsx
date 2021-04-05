import React, { CSSProperties, useEffect, useRef, useState } from 'react';
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
  const [ user, setUser ] = useState<any>();

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
    window.addEventListener('message', (data: any) => {
      setUser(data.data.value);
    });

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', keydownHandler);
      window.removeEventListener('message', keydownHandler);
    };
  }, [user]);

  return (
    <>
      {user?.id &&
        <WhiteboardProvider
          clearWhiteboardPermissions={teacher}
          // allToolbarIsEnabled={true}
          allToolbarIsEnabled={user?.id === 'teacher'}
          activeCanvas={activeCanvas}
          // userId={'teacher'}
          userId={user?.id}
        >
          <Provider store={store}>
            {/* <AuthMenu userId={'teacher'} /> */}
            <AuthMenu userId={user?.id} />
            <div
              className="whiteboard"
              onClick={() => {
                activeCanvas.current = 'canvas1';
              }}
            >
              <Toolbar />
              <WhiteboardContainer
                width={whiteboardWidth}
                height={whiteboardHeight}
              >
                <WhiteboardCanvas
                  // instanceId="canvas1"
                  // userId="teacher"
                  instanceId={user?.canvasId}
                  userId={user?.id}
                  initialStyle={canvasStyle}
                  pointerEvents={true}
                  clearWhiteboardPermissions={teacher}
                  pixelWidth={whiteboardWidth}
                  pixelHeight={whiteboardHeight}
                >
                  <button>Teacher</button>
                </WhiteboardCanvas>
              </WhiteboardContainer>
            </div>
          </Provider>
        </WhiteboardProvider>}
    </>
  );
}

export default Whiteboard;
