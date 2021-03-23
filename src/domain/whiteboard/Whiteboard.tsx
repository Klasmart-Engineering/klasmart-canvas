import React, {
  CSSProperties,
  FunctionComponent,
  useEffect,
  useRef,
} from 'react';
import '../../assets/style/whiteboard.css';
import { WhiteboardProvider } from './WhiteboardContext';
import Toolbar from '../../components/toolbar/Toolbar';
import WhiteboardCanvas from './WhiteboardCanvas';
import { ICanvasKeyboardEvent } from '../../interfaces/canvas-events/canvas-keyboard-event';
import { WhiteboardContainer } from '../../components/whiteboard/WhiteboardContainer';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import AuthMenu from '../../components/AuthMenu';
import Canvas3d from './three/Canvas3d';
import Canvas3dSync from './three/Canvas3dSync';

const users = store.getState().usersState;

/**
 * @field updateCanvasAreCreated: When all the canvases were loaded,
 * this function is called to update the flag
 * that is waiting for all the canvases
 */
export type Props = {
  updateCanvasAreCreated: (status: boolean) => void;
};

const Whiteboard: FunctionComponent<Props> = ({ updateCanvasAreCreated }) => {
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
      {users.map(user => (
        <WhiteboardProvider
        key={user.id}
        clearWhiteboardPermissions={user.permissions}
        allToolbarIsEnabled={user.role === 'teacher'}
        activeCanvas={activeCanvas}
        userId={user.id}
      >
        <Provider store={store}>
          <AuthMenu userId={user.id} />
          <div
            className="whiteboard"
            onClick={() => {
              activeCanvas.current = `canvas${user.id}`;
            }}
          >
            <Toolbar userId="student" />
            <WhiteboardContainer
              width={whiteboardWidth}
              height={whiteboardHeight}
            >
              <WhiteboardCanvas
                instanceId={`canvas${user.id}`}
                userId={user.id}
                initialStyle={canvasStyle}
                pointerEvents={true}
                clearWhiteboardPermissions={user.permissions}
                pixelWidth={whiteboardWidth}
                pixelHeight={whiteboardHeight}
              >
                <button>{user.role}</button>
              </WhiteboardCanvas>
              <Canvas3d 
                isOwn={true}
                canvasId={user.id+"-root"}
                userId={user.id}
                ownerId={user.id}
                width={whiteboardWidth}
                height={whiteboardHeight}
              />
              <Canvas3dSync 
              userId={user.id}
              width={whiteboardWidth}
              height={whiteboardHeight}
              />
            </WhiteboardContainer>
          </div>
        </Provider>
      </WhiteboardProvider>
      ))}
    </>
  );
};

export default Whiteboard;
