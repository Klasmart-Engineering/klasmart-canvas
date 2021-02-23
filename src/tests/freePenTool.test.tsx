import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fireEvent, render } from '@testing-library/react';
import 'jest-canvas-mock';
import Whiteboard from '../domain/whiteboard/Whiteboard';
import {
  WhiteboardContext,
  WhiteboardProvider,
} from '../domain/whiteboard/WhiteboardContext';
import WhiteboardCanvas from '../domain/whiteboard/WhiteboardCanvas';
import { Provider } from 'react-redux';
import { WhiteboardContainer } from '../components/whiteboard/WhiteboardContainer';
import store from '../domain/whiteboard/redux/store';
import { IWhiteboardContext } from '../interfaces/whiteboard-context/whiteboard-context';

Enzyme.configure({ adapter: new Adapter() });

const canvasStyle: CSSProperties = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100%',
};

const teacher = {
  allowClearAll: true,
  allowClearOthers: true,
  allowClearMyself: true,
};

const whiteboardWidth = 740;
const whiteboardHeight = 460;
const activeCanvas = null;

/**
 * Renders a Whiteboard Element with the given context
 * @param context - New context variables to set
 */
function renderWhiteboard(context: IWhiteboardContext) {
  const copy = shallow(
    <WhiteboardProvider
      clearWhiteboardPermissions={teacher}
      allToolbarIsEnabled={true}
      activeCanvas={
        (activeCanvas as unknown) as React.MutableRefObject<string | null>
      }
      userId={'teacher'}
    >
      <p>testing</p>
    </WhiteboardProvider>
  );

  let newContext = { ...copy.getElement().props.value, ...context };
  return render(
    <WhiteboardContext.Provider value={newContext}>
      <Provider store={store}>
        <div
          className="whiteboard"
          onClick={() => {
            ((activeCanvas as unknown) as React.MutableRefObject<
              string | null
            >).current = 'canvas1';
          }}
        >
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
          </WhiteboardContainer>
        </div>
      </Provider>
    </WhiteboardContext.Provider>
  );
}

describe('Free Pen Tool should work properly', () => {
  it('Whiteboard is rendered without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Whiteboard />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should draw a simple pencil line', async () => {
    const context = {
      brushIsActive: true,
      penColor: '#000000',
      lineWidth: 8,
      brushType: 'pencil',
      allToolbarIsEnabled: true,
      partialEraseIsActive: false,
    } as IWhiteboardContext;

    const render = renderWhiteboard(context);

    console.log(render);
    // const canvas = document.getElementById('canvas1');
    // fireEvent(canvas as Element, new Event('mousedown'));
  });
});
