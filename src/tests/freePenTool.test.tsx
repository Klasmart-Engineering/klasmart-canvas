import React, { CSSProperties } from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fireEvent, render, wait } from '@testing-library/react';
import {
  WhiteboardContext,
  WhiteboardProvider,
} from '../domain/whiteboard/WhiteboardContext';
import WhiteboardCanvas from '../domain/whiteboard/WhiteboardCanvas';
import { Provider } from 'react-redux';
import { WhiteboardContainer } from '../components/whiteboard/WhiteboardContainer';
import store from '../domain/whiteboard/redux/store';
import { IWhiteboardContext } from '../interfaces/whiteboard-context/whiteboard-context';
import { IPenPoint } from '../interfaces/brushes/pen-point';
import { ICoordinate } from '../interfaces/brushes/coordinate';
import { fabric } from 'fabric';
import 'jest-canvas-mock';

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

const points = [
  { clientX: 400, clientY: 400 },
  { clientX: 405, clientY: 405 },
  { clientX: 410, clientY: 410 },
  { clientX: 415, clientY: 415 },
  { clientX: 420, clientY: 420 },
  { clientX: 425, clientY: 425 },
  { clientX: 430, clientY: 430 },
  { clientX: 431, clientY: 431 },
];

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
        <div className="whiteboard">
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

function getPencilDimensionsFromPoints(
  points: { clientX: number; clientY: number }[]
) {
  const objectWidth = points[points.length - 2].clientX - points[0].clientX;
  const objectHeight = points[points.length - 2].clientY - points[0].clientY;

  return { objectWidth, objectHeight };
}

function getCustomDimensionsFromPoints(
  points: { clientX: number; clientY: number }[]
) {
  const objectWidth = points[points.length - 1].clientX - points[0].clientX;
  const objectHeight = points[points.length - 1].clientY - points[0].clientY;

  return { objectWidth, objectHeight };
}

describe('Free Pen Tool should work properly', () => {
  it('Should draw a pencil line', async () => {
    const context = {
      brushIsActive: true,
      penColor: '#000000',
      lineWidth: 8,
      brushType: 'pencil',
      allToolbarIsEnabled: true,
      partialEraseIsActive: false,
    } as IWhiteboardContext;

    const render = renderWhiteboard(context);

    const getObjBtn = document.getElementById('get-objects-button');

    const upperCanvas = render.baseElement
      ?.getElementsByClassName('upper-canvas')
      .item(0);

    points.forEach((point, index) => {
      if (!index) {
        fireEvent.mouseDown((upperCanvas as unknown) as Element, point);
      } else {
        fireEvent.mouseMove((upperCanvas as unknown) as Element, point);

        if (index === points.length - 1) {
          fireEvent.mouseUp((upperCanvas as unknown) as Element, point);
        }
      }
    });

    fireEvent.click(getObjBtn as HTMLElement);

    const objs = JSON.parse(localStorage.getItem('objects') as string);
    const { objectWidth, objectHeight } = getPencilDimensionsFromPoints(points);

    const {
      type,
      left,
      top,
      width,
      height,
      stroke,
      strokeWidth,
      scaleX,
      scaleY,
      visible,
      path,
      basePath,
    } = objs[0];

    localStorage.removeItem('objects');

    expect(type).toBe('path');

    expect(top).toBeGreaterThan(points[0].clientY - 10);
    expect(top).toBeLessThan(points[0].clientY);

    expect(left).toBeGreaterThan(points[0].clientX - 10);
    expect(left).toBeLessThan(points[0].clientX);

    expect(width).toBeCloseTo(objectWidth, 1);
    expect(height).toBeCloseTo(objectHeight, 1);

    expect(stroke).toBe(context.penColor);
    expect(strokeWidth).toBe(context.lineWidth);

    expect(scaleX).toBe(1);
    expect(scaleY).toBe(1);

    expect(visible).toBe(true);

    expect(path.length).toBe(points.length);

    expect(basePath).toHaveProperty('type');
    expect(basePath.type).toBe(context.brushType);

    expect(basePath).toHaveProperty('points');
    expect(basePath.points.length).toBe(points.length + 1);

    expect(basePath.points[0].x).toBeCloseTo(points[0].clientX, 1);

    basePath.points.forEach((point: IPenPoint, index: number) => {
      if (index) {
        expect(point.x).toBeCloseTo(points[index - 1]?.clientX, -1);
      }
    });

    expect(basePath).toHaveProperty('stroke');
    expect(basePath.stroke).toBe(context.penColor);

    expect(basePath).toHaveProperty('strokeWidth');
    expect(basePath.strokeWidth).toBe(context.lineWidth);
  });

  it('Should draw a dashed line', async () => {
    const context = {
      brushIsActive: true,
      penColor: '#f8433f',
      lineWidth: 2,
      brushType: 'dashed',
      allToolbarIsEnabled: true,
      partialEraseIsActive: false,
    } as IWhiteboardContext;

    const render = renderWhiteboard(context);

    const getObjBtn = document.getElementById('get-objects-button');

    const upperCanvas = render.baseElement
      ?.getElementsByClassName('upper-canvas')
      .item(0);

    points.forEach((point, index) => {
      if (!index) {
        fireEvent.mouseDown((upperCanvas as unknown) as Element, point);
      } else {
        fireEvent.mouseMove((upperCanvas as unknown) as Element, point);

        if (index === points.length - 1) {
          fireEvent.mouseUp((upperCanvas as unknown) as Element, point);
        }
      }
    });

    fireEvent.click(getObjBtn as HTMLElement);

    const objs = JSON.parse(localStorage.getItem('objects') as string);
    const { objectWidth, objectHeight } = getCustomDimensionsFromPoints(points);

    const {
      type,
      left,
      top,
      width,
      height,
      stroke,
      strokeWidth,
      scaleX,
      scaleY,
      visible,
      path,
      basePath,
      strokeDashArray,
    } = objs[0];

    localStorage.removeItem('objects');

    expect(type).toBe('path');

    expect(top).toBeGreaterThan(points[0].clientY - 5);
    expect(top).toBeLessThan(points[0].clientY);

    expect(left).toBeGreaterThan(points[0].clientX - 5);
    expect(left).toBeLessThan(points[0].clientX);

    expect(width).toBe(objectWidth);
    expect(height).toBe(objectHeight);

    expect(stroke).toBe(context.penColor);
    expect(strokeWidth).toBe(context.lineWidth);
    expect(strokeDashArray).toStrictEqual([strokeWidth * 2, strokeWidth * 2]);

    expect(scaleX).toBe(1);
    expect(scaleY).toBe(1);

    expect(visible).toBe(true);

    expect(path.length).toBe(points.length + 1);

    expect(basePath).toHaveProperty('type');
    expect(basePath.type).toBe(context.brushType);

    expect(basePath).toHaveProperty('points');
    expect(basePath.points.length).toBe(points.length);

    basePath.points.forEach((point: ICoordinate, index: number) => {
      expect(point.x).toBe(points[index]?.clientX);
      expect(point.y).toBe(points[index]?.clientY);
    });

    expect(basePath).toHaveProperty('stroke');
    expect(basePath.stroke).toBe(context.penColor);

    expect(basePath).toHaveProperty('strokeWidth');
    expect(basePath.strokeWidth).toBe(context.lineWidth);
  });

  it('Should draw a pen line', async () => {
    const context = {
      brushIsActive: true,
      penColor: '#5fe119',
      lineWidth: 4,
      brushType: 'pen',
      allToolbarIsEnabled: true,
      partialEraseIsActive: false,
    } as IWhiteboardContext;

    const render = renderWhiteboard(context);

    const getObjBtn = document.getElementById('get-objects-button');

    const upperCanvas = render.baseElement
      ?.getElementsByClassName('upper-canvas')
      .item(0);

    points.forEach((point, index) => {
      if (!index) {
        fireEvent.mouseDown((upperCanvas as unknown) as Element, point);
      } else {
        fireEvent.mouseMove((upperCanvas as unknown) as Element, point);

        if (index === points.length - 1) {
          fireEvent.mouseUp((upperCanvas as unknown) as Element, point);
        }
      }
    });

    fireEvent.click(getObjBtn as HTMLElement);

    const objs = JSON.parse(localStorage.getItem('objects') as string);
    const { objectWidth, objectHeight } = getCustomDimensionsFromPoints(points);

    const {
      type,
      left,
      top,
      width,
      height,
      scaleX,
      scaleY,
      visible,
      basePath,
      objects,
    } = objs[0];

    localStorage.removeItem('objects');

    expect(type).toBe('group');

    expect(top).toBeGreaterThan(points[0].clientY - 5);
    expect(top).toBeLessThan(points[0].clientY);

    expect(left).toBeGreaterThan(points[0].clientX - 5);
    expect(left).toBeLessThan(points[0].clientX);

    expect(width).toBeGreaterThan(objectWidth);
    expect(width).toBeLessThan(objectWidth + 6);

    expect(height).toBeGreaterThan(objectHeight);
    expect(height).toBeLessThan(objectHeight + 6);

    expect(objects.length).toBe(points.length);

    objects.forEach((object: fabric.Path) => {
      expect(object.type).toBe('path');
      expect(object.stroke).toBe(context.penColor);
      expect(object.strokeWidth).toBeGreaterThanOrEqual(context.lineWidth / 2);
      expect(object.strokeWidth).toBeLessThanOrEqual(context.lineWidth);
    });

    expect(scaleX).toBe(1);
    expect(scaleY).toBe(1);

    expect(visible).toBe(true);

    expect(basePath).toHaveProperty('type');
    expect(basePath.type).toBe(context.brushType);

    expect(basePath).toHaveProperty('points');
    expect(basePath.points.length).toBe(points.length + 1);

    basePath.points.forEach((point: IPenPoint, index: number) => {
      if (index) {
        expect(point.x).toBe(points[index - 1].clientX);
        expect(point.y).toBe(points[index - 1].clientY);
      } else {
        expect(point.x).toBe(points[index].clientX);
        expect(point.y).toBe(points[index].clientY);
      }

      expect(point.width).toBeGreaterThanOrEqual(context.lineWidth / 2);
      expect(point.width).toBeLessThanOrEqual(context.lineWidth);
    });

    expect(basePath).toHaveProperty('stroke');
    expect(basePath.stroke).toBe(context.penColor);

    expect(basePath).toHaveProperty('strokeWidth');
    expect(basePath.strokeWidth).toBe(context.lineWidth);
  });

  it('Should draw a marker line', async () => {
    const context = {
      brushIsActive: true,
      penColor: '#347dfa',
      lineWidth: 6,
      brushType: 'marker',
      allToolbarIsEnabled: true,
      partialEraseIsActive: false,
    } as IWhiteboardContext;

    const render = renderWhiteboard(context);

    const getObjBtn = document.getElementById('get-objects-button');

    const upperCanvas = render.baseElement
      ?.getElementsByClassName('upper-canvas')
      .item(0);

    points.forEach((point, index) => {
      if (!index) {
        fireEvent.mouseDown((upperCanvas as unknown) as Element, point);
      } else {
        fireEvent.mouseMove((upperCanvas as unknown) as Element, point);

        if (index === points.length - 1) {
          fireEvent.mouseUp((upperCanvas as unknown) as Element, point);
        }
      }
    });

    fireEvent.click(getObjBtn as HTMLElement);

    const objs = JSON.parse(localStorage.getItem('objects') as string);
    const { objectWidth, objectHeight } = getCustomDimensionsFromPoints(points);

    const {
      type,
      left,
      top,
      width,
      height,
      scaleX,
      scaleY,
      visible,
      basePath,
      objects,
    } = objs[0];

    localStorage.removeItem('objects');

    expect(type).toBe('group');

    expect(top).toBeGreaterThan(points[0].clientY - 5);
    expect(top).toBeLessThan(points[0].clientY);

    expect(left).toBeGreaterThan(points[0].clientX - 5);
    expect(left).toBeLessThan(points[0].clientX);

    expect(width).toBeGreaterThan(objectWidth);
    expect(width).toBeLessThan(objectWidth + 6);

    expect(height).toBeGreaterThan(objectHeight);
    expect(height).toBeLessThan(objectHeight + 6);

    expect(objects.length).toBe(5);

    objects.forEach((object: fabric.Path, index: number) => {
      expect(object.type).toBe('path');
      expect(object.stroke).toBe(context.penColor);
      expect(object.strokeWidth).toBe(context.lineWidth / 5);
      expect(object.opacity).toBeCloseTo(1 - index * 0.2);
    });

    expect(scaleX).toBe(1);
    expect(scaleY).toBe(1);

    expect(visible).toBe(true);

    expect(basePath).toHaveProperty('type');
    expect(basePath.type).toBe(context.brushType);

    expect(basePath).toHaveProperty('points');
    expect(basePath.points.length).toBe(points.length + 1);

    basePath.points.forEach((point: IPenPoint, index: number) => {
      if (index) {
        expect(point.x).toBe(points[index - 1].clientX);
        expect(point.y).toBe(points[index - 1].clientY);
      } else {
        expect(point.x).toBe(points[index].clientX);
        expect(point.y).toBe(points[index].clientY);
      }
    });

    expect(basePath).toHaveProperty('stroke');
    expect(basePath.stroke).toBe(context.penColor);

    expect(basePath).toHaveProperty('strokeWidth');
    expect(basePath.strokeWidth).toBe(context.lineWidth);
  });

  it('Should draw a felt line', async () => {
    const context = {
      brushIsActive: true,
      penColor: '#44f9f9',
      lineWidth: 8,
      brushType: 'felt',
      allToolbarIsEnabled: true,
      partialEraseIsActive: false,
    } as IWhiteboardContext;

    const render = renderWhiteboard(context);

    const getObjBtn = document.getElementById('get-objects-button');

    const upperCanvas = render.baseElement
      ?.getElementsByClassName('upper-canvas')
      .item(0);

    points.forEach((point, index) => {
      if (!index) {
        fireEvent.mouseDown((upperCanvas as unknown) as Element, point);
      } else {
        fireEvent.mouseMove((upperCanvas as unknown) as Element, point);

        if (index === points.length - 1) {
          fireEvent.mouseUp((upperCanvas as unknown) as Element, point);
        }
      }
    });

    fireEvent.click(getObjBtn as HTMLElement);

    const objs = JSON.parse(localStorage.getItem('objects') as string);
    const { objectWidth, objectHeight } = getCustomDimensionsFromPoints(points);

    const {
      type,
      left,
      top,
      width,
      height,
      scaleX,
      scaleY,
      visible,
      basePath,
      objects,
    } = objs[0];

    localStorage.removeItem('objects');

    expect(type).toBe('group');

    expect(top).toBeGreaterThan(points[0].clientY - 5);
    expect(top).toBeLessThan(points[0].clientY);

    expect(left).toBeGreaterThan(points[0].clientX - 5);
    expect(left).toBeLessThan(points[0].clientX);

    expect(width).toBeGreaterThan(objectWidth);
    expect(width).toBeLessThan(objectWidth + 11);

    expect(height).toBeGreaterThan(objectHeight);
    expect(height).toBeLessThan(objectHeight + 11);

    expect(objects.length).toBe(2);

    objects.forEach((object: fabric.Path, index: number) => {
      expect(object.type).toBe('path');
      expect(object.stroke).toBe(context.penColor);
      expect(object.strokeWidth).toBe(context.lineWidth);
      expect(object.opacity).toBeCloseTo(0.6 + index * 0.2);
    });

    expect(scaleX).toBe(1);
    expect(scaleY).toBe(1);

    expect(visible).toBe(true);

    expect(basePath).toHaveProperty('type');
    expect(basePath.type).toBe(context.brushType);

    expect(basePath).toHaveProperty('points');
    expect(basePath.points.length).toBe(points.length + 1);

    basePath.points.forEach((point: IPenPoint, index: number) => {
      if (index) {
        expect(point.x).toBe(points[index - 1].clientX);
        expect(point.y).toBe(points[index - 1].clientY);
      } else {
        expect(point.x).toBe(points[index].clientX);
        expect(point.y).toBe(points[index].clientY);
      }
    });

    expect(basePath).toHaveProperty('stroke');
    expect(basePath.stroke).toBe(context.penColor);

    expect(basePath).toHaveProperty('strokeWidth');
    expect(basePath.strokeWidth).toBe(context.lineWidth);
  });

  it('Should draw a paintbrush line', async () => {
    const context = {
      brushIsActive: true,
      penColor: '#f289fe',
      lineWidth: 12,
      brushType: 'paintbrush',
      allToolbarIsEnabled: true,
      partialEraseIsActive: false,
    } as IWhiteboardContext;

    const render = renderWhiteboard(context);

    const getObjBtn = document.getElementById('get-objects-button');

    const upperCanvas = render.baseElement
      ?.getElementsByClassName('upper-canvas')
      .item(0);

    points.forEach((point, index) => {
      if (!index) {
        fireEvent.mouseDown((upperCanvas as unknown) as Element, point);
      } else {
        fireEvent.mouseMove((upperCanvas as unknown) as Element, point);

        if (index === points.length - 1) {
          fireEvent.mouseUp((upperCanvas as unknown) as Element, point);
        }
      }
    });

    fireEvent.click(getObjBtn as HTMLElement);

    const objs = JSON.parse(localStorage.getItem('objects') as string);
    const { objectWidth, objectHeight } = getCustomDimensionsFromPoints(points);

    const {
      type,
      left,
      top,
      width,
      height,
      scaleX,
      scaleY,
      visible,
      basePath,
      objects,
    } = objs[0];

    localStorage.removeItem('objects');

    expect(type).toBe('group');

    expect(top).toBeGreaterThan(points[0].clientY - 10);
    expect(top).toBeLessThan(points[0].clientY);

    expect(left).toBeGreaterThan(points[0].clientX - 10);
    expect(left).toBeLessThan(points[0].clientX);

    expect(width).toBeGreaterThan(objectWidth);
    expect(width).toBeLessThan(objectWidth + 13);

    expect(height).toBeGreaterThan(objectHeight);
    expect(height).toBeLessThan(objectHeight + 13);

    expect(objects.length).toBe(basePath.bristles.length);

    objects.forEach((object: fabric.Path, index: number) => {
      expect(object.type).toBe('path');
      expect(object.stroke).toBe(basePath.bristles[index].color);
      expect(object.strokeWidth).toBeCloseTo(
        basePath.bristles[index].thickness
      );
    });

    expect(scaleX).toBe(1);
    expect(scaleY).toBe(1);

    expect(visible).toBe(true);

    expect(basePath).toHaveProperty('type');
    expect(basePath.type).toBe(context.brushType);

    expect(basePath).toHaveProperty('points');
    expect(basePath.points.length).toBe(points.length);

    basePath.points.forEach((point: IPenPoint, index: number) => {
      if (index) {
        expect(point.x).toBe(points[index].clientX);
        expect(point.y).toBe(points[index].clientY);
      } else {
        expect(point.x).toBe(points[index].clientX);
        expect(point.y).toBe(points[index].clientY);
      }
    });

    expect(basePath).toHaveProperty('stroke');
    expect(basePath.stroke).toBe(context.penColor);

    expect(basePath).toHaveProperty('strokeWidth');
    expect(basePath.strokeWidth).toBe(context.lineWidth);
  });

  it('Should draw a chalk line', async () => {
    const context = {
      brushIsActive: true,
      penColor: '#fb823f',
      lineWidth: 8,
      brushType: 'chalk',
      allToolbarIsEnabled: true,
      partialEraseIsActive: false,
    } as IWhiteboardContext;

    const render = renderWhiteboard(context);

    const { getByText } = render;

    // const canvas = document.getElementById('canvas1');

    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const upperCanvas = render.baseElement
      ?.getElementsByClassName('upper-canvas')
      .item(0);

    localStorage.removeItem('objects');

    console.log((upperCanvas as HTMLCanvasElement)?.toDataURL());

    points.forEach(async (point, index) => {
      if (!index) {
        fireEvent.mouseDown((upperCanvas as unknown) as Element, point);

        fireEvent.mouseMove((upperCanvas as unknown) as Element, point);
      } else {
        fireEvent.mouseMove((upperCanvas as unknown) as Element, point);

        if (index === points.length - 1) {
          fireEvent.mouseUp((upperCanvas as unknown) as Element, point);
        }
      }
    });

    await wait(() => {
      expect(getObjBtn.disabled).toBeFalsy();
    });
    // await waitFor(() =>
    //   expect(
    //     (getByText('Picale bro') as HTMLButtonElement).disabled
    //   ).toBeFalsy()
    // );

    // expect(ChalkBrush.prototype.createChalkPath).toHaveReturnedTimes(1);

    fireEvent.click(getObjBtn as HTMLElement);

    // const objs = JSON.parse(localStorage.getItem('objects') as string);
    // const { objectWidth, objectHeight } = getCustomDimensionsFromPoints(points);

    // const {
    //   type,
    //   left,
    //   top,
    //   width,
    //   height,
    //   scaleX,
    //   scaleY,
    //   visible,
    //   basePath,
    //   objects,
    // } = objs[0];

    // console.log(objs[0]);
    // localStorage.removeItem('objects');

    // expect(type).toBe('group');

    // expect(top).toBeGreaterThan(points[0].clientY - 10);
    // expect(top).toBeLessThan(points[0].clientY);

    // expect(left).toBeGreaterThan(points[0].clientX - 10);
    // expect(left).toBeLessThan(points[0].clientX);

    // expect(width).toBeGreaterThan(objectWidth);
    // expect(width).toBeLessThan(objectWidth + 13);

    // expect(height).toBeGreaterThan(objectHeight);
    // expect(height).toBeLessThan(objectHeight + 13);

    // expect(objects.length).toBe(basePath.bristles.length);

    // objects.forEach((object: fabric.Path, index: number) => {
    //   expect(object.type).toBe('path');
    //   expect(object.stroke).toBe(basePath.bristles[index].color);
    //   expect(object.strokeWidth).toBeCloseTo(
    //     basePath.bristles[index].thickness
    //   );
    // });

    // expect(scaleX).toBe(1);
    // expect(scaleY).toBe(1);

    // expect(visible).toBe(true);

    // expect(basePath).toHaveProperty('type');
    // expect(basePath.type).toBe(context.brushType);

    // expect(basePath).toHaveProperty('points');
    // expect(basePath.points.length).toBe(points.length);

    // basePath.points.forEach((point: IPenPoint, index: number) => {
    //   if (index) {
    //     expect(point.x).toBe(points[index].clientX);
    //     expect(point.y).toBe(points[index].clientY);
    //   } else {
    //     expect(point.x).toBe(points[index].clientX);
    //     expect(point.y).toBe(points[index].clientY);
    //   }
    // });

    // expect(basePath).toHaveProperty('stroke');
    // expect(basePath.stroke).toBe(context.penColor);

    // expect(basePath).toHaveProperty('strokeWidth');
    // expect(basePath.strokeWidth).toBe(context.lineWidth);
    // console.log('sobres pues');
  });

  it('Should draw a crayon line', async () => {
    const context = {
      brushIsActive: true,
      penColor: '#fb823f',
      lineWidth: 8,
      brushType: 'chalk',
      allToolbarIsEnabled: true,
      partialEraseIsActive: false,
    } as IWhiteboardContext;

    const render = renderWhiteboard(context);

    const { getByText } = render;

    // const canvas = document.getElementById('canvas1');

    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const upperCanvas = render.baseElement
      ?.getElementsByClassName('upper-canvas')
      .item(0);

    localStorage.removeItem('objects');

    console.log((upperCanvas as HTMLCanvasElement)?.toDataURL());

    points.forEach(async (point, index) => {
      if (!index) {
        fireEvent.mouseDown((upperCanvas as unknown) as Element, point);

        fireEvent.mouseMove((upperCanvas as unknown) as Element, point);
      } else {
        fireEvent.mouseMove((upperCanvas as unknown) as Element, point);

        if (index === points.length - 1) {
          fireEvent.mouseUp((upperCanvas as unknown) as Element, point);
        }
      }
    });

    await wait(() => {
      expect(getObjBtn.disabled).toBeFalsy();
    });
    // await waitFor(() =>
    //   expect(
    //     (getByText('Picale bro') as HTMLButtonElement).disabled
    //   ).toBeFalsy()
    // );

    // expect(ChalkBrush.prototype.createChalkPath).toHaveReturnedTimes(1);

    fireEvent.click(getObjBtn as HTMLElement);

    // const objs = JSON.parse(localStorage.getItem('objects') as string);
    // const { objectWidth, objectHeight } = getCustomDimensionsFromPoints(points);

    // const {
    //   type,
    //   left,
    //   top,
    //   width,
    //   height,
    //   scaleX,
    //   scaleY,
    //   visible,
    //   basePath,
    //   objects,
    // } = objs[0];

    // console.log(objs[0]);
    // localStorage.removeItem('objects');

    // expect(type).toBe('group');

    // expect(top).toBeGreaterThan(points[0].clientY - 10);
    // expect(top).toBeLessThan(points[0].clientY);

    // expect(left).toBeGreaterThan(points[0].clientX - 10);
    // expect(left).toBeLessThan(points[0].clientX);

    // expect(width).toBeGreaterThan(objectWidth);
    // expect(width).toBeLessThan(objectWidth + 13);

    // expect(height).toBeGreaterThan(objectHeight);
    // expect(height).toBeLessThan(objectHeight + 13);

    // expect(objects.length).toBe(basePath.bristles.length);

    // objects.forEach((object: fabric.Path, index: number) => {
    //   expect(object.type).toBe('path');
    //   expect(object.stroke).toBe(basePath.bristles[index].color);
    //   expect(object.strokeWidth).toBeCloseTo(
    //     basePath.bristles[index].thickness
    //   );
    // });

    // expect(scaleX).toBe(1);
    // expect(scaleY).toBe(1);

    // expect(visible).toBe(true);

    // expect(basePath).toHaveProperty('type');
    // expect(basePath.type).toBe(context.brushType);

    // expect(basePath).toHaveProperty('points');
    // expect(basePath.points.length).toBe(points.length);

    // basePath.points.forEach((point: IPenPoint, index: number) => {
    //   if (index) {
    //     expect(point.x).toBe(points[index].clientX);
    //     expect(point.y).toBe(points[index].clientY);
    //   } else {
    //     expect(point.x).toBe(points[index].clientX);
    //     expect(point.y).toBe(points[index].clientY);
    //   }
    // });

    // expect(basePath).toHaveProperty('stroke');
    // expect(basePath.stroke).toBe(context.penColor);

    // expect(basePath).toHaveProperty('strokeWidth');
    // expect(basePath.strokeWidth).toBe(context.lineWidth);
    // console.log('sobres pues');
  });
});
