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
import { IUser } from '../../interfaces/user/user'
import { UPDATE_USERS } from './redux/actions';

const users: IUser[] = store.getState().usersState as IUser[];

export type Props = {
  user?: IUser,
  users?: IUser[]
};

const defaultProps: Props = {
  user: users[0],
  users: users
}

/**
 * 
 * @param props User and users from the canvas app parent or the default state
 */
const Whiteboard: FunctionComponent<Props> = ( props: Props) => {

  const user = props.user!
  const users = props.users
  store.dispatch({
    type: UPDATE_USERS,
    payload: users,
  });

  const whiteboardWidth = window.innerWidth * 0.75
  const whiteboardHeight = whiteboardWidth * 0.5

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
            <Toolbar />
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
            </WhiteboardContainer>
          </div>
        </Provider>
      </WhiteboardProvider>
      
    </>
  );
};

Whiteboard.defaultProps = defaultProps

export default Whiteboard;
