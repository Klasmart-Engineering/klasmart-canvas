// @ts-nocheckd
import React, { CSSProperties } from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fireEvent, render } from '@testing-library/react';
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
import 'canvas';
import { createCanvas } from 'canvas';
import { ChalkBrush } from '../domain/whiteboard/brushes/classes/chalkBrush';
import { mockedChalkImageData } from './mocked-chalk-image-data';
import { ICanvasBrush } from '../interfaces/brushes/canvas-brush';
import { IBasePath } from '../interfaces/brushes/base-path';

Enzyme.configure({ adapter: new Adapter() });

let context = {
  brushIsActive: true,
  allToolbarIsEnabled: true,
  partialEraseIsActive: false,
} as IWhiteboardContext;

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
  { clientX: 300, clientY: 300 },
  { clientX: 305, clientY: 305 },
  { clientX: 310, clientY: 310 },
  { clientX: 315, clientY: 315 },
  { clientX: 320, clientY: 320 },
  { clientX: 325, clientY: 325 },
  { clientX: 330, clientY: 330 },
  { clientX: 331, clientY: 331 },
];

const mockCanvas = {
  ...window,
  canvas: createCanvas(whiteboardWidth, whiteboardHeight),
  fillRect: function () {},
  clearRect: function (x: any, y: any, w: number, h: number) {},
  getImageData: function (x: any, y: any, w: number, h: number) {
    return {
      data: new Array(w * h * 4),
    };
  },
  putImageData: function () {},
  createImageData: function () {
    return [];
  },
  setTransform: function () {},
  drawImage: function () {},
  save: function () {},
  fillText: function () {},
  restore: function () {},
  beginPath: function () {},
  moveTo: function () {},
  lineTo: function () {},
  closePath: function () {},
  stroke: function () {},
  translate: function () {},
  scale: function () {},
  rotate: function () {},
  arc: function () {},
  fill: function () {},
  measureText: function () {
    return { width: 0 };
  },
  transform: function () {},
  rect: function () {},
  clip: function () {},
  quadraticCurveTo: function (
    cpx: number,
    cpy: number,
    x: number,
    y: number
  ) {},
};

const fabricCanvas = new fabric.Canvas('canvas1');
const canvasTest = ({
  ...window,
  click: jest.fn(),
  setAttribute: jest.fn(),
  imageSmoothing: true,
  style: {},
  getContext: (type: string) => mockCanvas,
  appendChild: (arg1: any) => ({}),
  getWidth: () => whiteboardWidth,
  getHeight: () => whiteboardHeight,
  getObjects: () => fabricCanvas.getObjects(),
  renderAll: jest.fn(),
  getElement: () => ({
    parentNode: {
      insertBefore: jest.fn(),
    },
  }),
  toDataURL: () => '',
  add: (object: fabric.Object) => fabricCanvas.add(object),
} as unknown) as fabric.Canvas;

const userId = 'teacher';

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
    // Updating context variables
    context.penColor = '#000000';
    context.lineWidth = 8;
    context.brushType = 'pencil';

    // Rendering Whiteboard with the new values in context variables
    const render = renderWhiteboard(context);
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;
    const upperCanvas = render.baseElement
      ?.getElementsByClassName('upper-canvas')
      .item(0) as HTMLCanvasElement;

    /**
     * Simulating mouseDown, mouseMove and mouseUp actions
     * with the predefined points
     */
    points.forEach((point, index) => {
      if (!index) {
        fireEvent.mouseDown(upperCanvas, point);
      } else {
        fireEvent.mouseMove(upperCanvas, point);

        if (index === points.length - 1) {
          fireEvent.mouseUp(upperCanvas, point);
        }
      }
    });

    // Click over get objects hidden button
    fireEvent.click(getObjBtn);

    // Getting current objects
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

    expect(top).toBeCloseTo(points[0].clientY - context.lineWidth / 2, 1);
    expect(left).toBeCloseTo(points[0].clientX - context.lineWidth / 2, 1);

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
    // Updating context variables
    context.penColor = '#f8433f';
    context.lineWidth = 2;
    context.brushType = 'dashed';

    const render = renderWhiteboard(context);
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const upperCanvas = render.baseElement
      ?.getElementsByClassName('upper-canvas')
      .item(0) as HTMLCanvasElement;

    points.forEach((point, index) => {
      if (!index) {
        fireEvent.mouseDown(upperCanvas, point);
      } else {
        fireEvent.mouseMove(upperCanvas, point);

        if (index === points.length - 1) {
          fireEvent.mouseUp(upperCanvas, point);
        }
      }
    });

    fireEvent.click(getObjBtn);

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

    expect(top).toBeCloseTo(points[0].clientY - context.lineWidth / 2, 1);
    expect(left).toBeCloseTo(points[0].clientX - context.lineWidth / 2, 1);

    expect(width).toBeCloseTo(objectWidth, 1);
    expect(height).toBeCloseTo(objectHeight, 1);

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
    context.penColor = '#5fe119';
    context.lineWidth = 4;
    context.brushType = 'pen';

    const render = renderWhiteboard(context);
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const upperCanvas = render.baseElement
      ?.getElementsByClassName('upper-canvas')
      .item(0) as HTMLCanvasElement;

    points.forEach((point, index) => {
      if (!index) {
        fireEvent.mouseDown(upperCanvas, point);
      } else {
        fireEvent.mouseMove(upperCanvas, point);

        if (index === points.length - 1) {
          fireEvent.mouseUp(upperCanvas, point);
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

    expect(top).toBeGreaterThan(points[0].clientY - context.lineWidth);
    expect(top).toBeLessThan(points[0].clientY);

    expect(left).toBeGreaterThan(points[0].clientX - context.lineWidth);
    expect(left).toBeLessThan(points[0].clientX);

    expect(width).toBeGreaterThan(objectWidth);
    expect(width).toBeLessThanOrEqual(objectWidth + context.lineWidth + 0.1);

    expect(height).toBeGreaterThan(objectHeight);
    expect(height).toBeLessThanOrEqual(objectHeight + context.lineWidth + 0.1);

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
    context.penColor = '#347dfa';
    context.lineWidth = 16;
    context.brushType = 'marker';

    const render = renderWhiteboard(context);
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const upperCanvas = render.baseElement
      ?.getElementsByClassName('upper-canvas')
      .item(0) as HTMLCanvasElement;

    points.forEach((point, index) => {
      if (!index) {
        fireEvent.mouseDown(upperCanvas, point);
      } else {
        fireEvent.mouseMove(upperCanvas, point);

        if (index === points.length - 1) {
          fireEvent.mouseUp(upperCanvas, point);
        }
      }
    });

    fireEvent.click(getObjBtn);

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

    expect(top).toBeGreaterThan(points[0].clientY - context.lineWidth);
    expect(top).toBeLessThan(points[0].clientY);

    expect(left).toBeGreaterThan(points[0].clientX - context.lineWidth);
    expect(left).toBeLessThan(points[0].clientX);

    expect(width).toBeGreaterThan(objectWidth);
    expect(width).toBeLessThanOrEqual(objectWidth + context.lineWidth + 0.1);

    expect(height).toBeGreaterThan(objectHeight);
    expect(height).toBeLessThanOrEqual(objectHeight + context.lineWidth + 0.1);

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
    context.penColor = '#44f9f9';
    context.lineWidth = 16;
    context.brushType = 'felt';

    const render = renderWhiteboard(context);
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const upperCanvas = render.baseElement
      ?.getElementsByClassName('upper-canvas')
      .item(0) as HTMLCanvasElement;

    points.forEach((point, index) => {
      if (!index) {
        fireEvent.mouseDown(upperCanvas, point);
      } else {
        fireEvent.mouseMove(upperCanvas, point);

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

    expect(top).toBeGreaterThan(points[0].clientY - context.lineWidth);
    expect(top).toBeLessThan(points[0].clientY);

    expect(left).toBeGreaterThan(points[0].clientX - context.lineWidth);
    expect(left).toBeLessThan(points[0].clientX);

    expect(width).toBeGreaterThan(objectWidth);
    expect(width).toBeLessThanOrEqual(objectWidth + context.lineWidth * 1.25);

    expect(height).toBeGreaterThan(objectHeight);
    expect(height).toBeLessThanOrEqual(objectHeight + context.lineWidth * 1.25);

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
    context.penColor = '#f289fe';
    context.lineWidth = 12;
    context.brushType = 'paintbrush';

    const render = renderWhiteboard(context);
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const upperCanvas = render.baseElement
      ?.getElementsByClassName('upper-canvas')
      .item(0) as HTMLCanvasElement;

    points.forEach((point, index) => {
      if (!index) {
        fireEvent.mouseDown(upperCanvas, point);
      } else {
        fireEvent.mouseMove(upperCanvas, point);

        if (index === points.length - 1) {
          fireEvent.mouseUp(upperCanvas, point);
        }
      }
    });

    fireEvent.click(getObjBtn);

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

    expect(top).toBeGreaterThan(points[0].clientY - context.lineWidth);
    expect(top).toBeLessThan(points[0].clientY);

    expect(left).toBeGreaterThan(points[0].clientX - context.lineWidth);
    expect(left).toBeLessThan(points[0].clientX);

    expect(width).toBeGreaterThan(objectWidth);
    expect(width).toBeLessThanOrEqual(objectWidth + context.lineWidth);

    expect(height).toBeGreaterThan(objectHeight);
    expect(height).toBeLessThanOrEqual(objectHeight + context.lineWidth);

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
    context.penColor = '#fb823f';
    context.lineWidth = 8;
    context.brushType = 'chalk';

    window.HTMLCanvasElement.prototype.getContext = () => jest.fn();
    jest.spyOn(document, 'createElement').mockImplementation(() => canvasTest);

    const brush = new ChalkBrush(canvasTest, userId, context.brushType);

    brush.color = context.penColor;
    brush.width = context.lineWidth;

    for (let i = 0; i < points.length; i += 1) {
      if (!i) {
        brush.onMouseDown({ x: points[i].clientX, y: points[i].clientY });
      } else if (i < points.length - 1) {
        brush.onMouseMove({ x: points[i].clientX, y: points[i].clientY });
      } else {
        await brush.onMouseUp();
      }
    }

    const path = canvasTest.getObjects()[0] as ICanvasBrush;
    const currentBasePath = path.basePath as IBasePath;
    const { objectWidth, objectHeight } = getCustomDimensionsFromPoints(points);

    path.set({
      basePath: {
        ...currentBasePath,
        imageData: mockedChalkImageData,
      },
      width: objectWidth,
      height: objectHeight,
    });

    const { width, height, top, left, basePath } = path;

    fabricCanvas.remove(path);

    expect(top).toBeGreaterThan(points[0].clientY - Number(context.lineWidth));
    expect(top).toBeLessThan(points[0].clientY);

    expect(left).toBeGreaterThan(points[0].clientX - Number(context.lineWidth));
    expect(left).toBeLessThan(points[0].clientX);

    expect(width).toBe(objectWidth);
    expect(height).toBe(objectHeight);

    expect(basePath).toHaveProperty('type');
    expect(basePath?.type).toBe(context.brushType);

    expect(basePath).toHaveProperty('points');
    expect(basePath?.points.length).toBe(points.length);

    basePath?.points.forEach((point: ICoordinate, index: number) => {
      if (index && index !== 1) {
        expect(point.x).toBe(points[index - 1].clientX);
        expect(point.y).toBe(points[index - 1].clientY);
      } else if (index !== 1) {
        expect(point.x).toBe(points[index].clientX);
        expect(point.y).toBe(points[index].clientY);
      }
    });

    expect(basePath).toHaveProperty('stroke');
    expect(basePath?.stroke).toBe(context.penColor);

    expect(basePath).toHaveProperty('strokeWidth');
    expect(basePath?.strokeWidth).toBe(context.lineWidth);
  });

  it('Should draw a crayon line', async () => {
    context.penColor = '#8880fc';
    context.lineWidth = 8;
    context.brushType = 'crayon';

    const fabricCanvas = new fabric.Canvas('canvas');
    jest.spyOn(document, 'createElement').mockImplementation(() => canvasTest);

    const brush = new ChalkBrush(canvasTest, userId, context.brushType);

    brush.color = context.penColor;
    brush.width = context.lineWidth;

    for (let i = 0; i < points.length; i += 1) {
      if (!i) {
        brush.onMouseDown({ x: points[i].clientX, y: points[i].clientY });
      } else if (i < points.length - 1) {
        brush.onMouseMove({ x: points[i].clientX, y: points[i].clientY });
      } else {
        await brush.onMouseUp();
      }
    }

    const path = canvasTest.getObjects()[0] as ICanvasBrush;
    const currentBasePath = path.basePath as IBasePath;
    const { objectWidth, objectHeight } = getCustomDimensionsFromPoints(points);

    (path as ICanvasBrush).set({
      basePath: {
        ...currentBasePath,
        imageData: mockedChalkImageData,
      },
      width: objectWidth,
      height: objectHeight,
    });

    fabricCanvas.renderAll();

    const { width, height, top, left, basePath } = path;

    expect(top).toBeGreaterThan(points[0].clientY - Number(context.lineWidth));
    expect(top).toBeLessThan(points[0].clientY);

    expect(left).toBeGreaterThan(points[0].clientX - Number(context.lineWidth));
    expect(left).toBeLessThan(points[0].clientX);

    expect(width).toBe(objectWidth);
    expect(height).toBe(objectHeight);

    expect(basePath).toHaveProperty('type');
    expect(basePath?.type).toBe(context.brushType);

    expect(basePath).toHaveProperty('points');
    expect(basePath?.points.length).toBe(points.length);

    basePath?.points.forEach((point: ICoordinate, index: number) => {
      if (index && index !== 1) {
        expect(point.x).toBe(points[index - 1].clientX);
        expect(point.y).toBe(points[index - 1].clientY);
      } else if (index !== 1) {
        expect(point.x).toBe(points[index].clientX);
        expect(point.y).toBe(points[index].clientY);
      }
    });

    expect(basePath).toHaveProperty('stroke');
    expect(basePath?.stroke).toBe(context.penColor);

    expect(basePath).toHaveProperty('strokeWidth');
    expect(basePath?.strokeWidth).toBe(context.lineWidth);
  });
});
