import React from 'react';
import 'jest-canvas-mock';
import {
  render,
  cleanup,
  fireEvent,
  wait,
  getByTestId,
  getByTitle,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

afterEach(cleanup);

describe('Text Tool', () => {
  beforeEach(() => {
    // jest.setTimeout(10000);
    localStorage.removeItem('objects');
    localStorage.getItem('canvas:simulated:events')
  });

  it(`should select a secondary color and change the color of the shape`, async () => {

    const { container } = render(<App />);

    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const shapeButton = getByTestId(container, 'toolbar-button-rectangle_shape');
    const floodFillArrow = getByTestId(container, 'special-selector-arrow-black_color');

    fireEvent.click(shapeButton);
    fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 200 });
    fireEvent.mouseMove(upperCanvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(upperCanvas, { clientX: 100, clientY: 100 });
    fireEvent.click(getObjBtn);
    fireEvent.click(floodFillArrow);

    await wait(() => {

      const floodFillBlue = getByTitle(container, 'Blue')//getByTestId(container, 'special-button-blue_color')
      fireEvent.click(floodFillBlue);
      fireEvent.mouseDown(upperCanvas, { clientX: 80, clientY: 150 });
      fireEvent.mouseUp(upperCanvas, { clientX: 80, clientY: 150 });
      fireEvent.click(getObjBtn);
      const objs2 = JSON.parse(localStorage.getItem('objects') as string);
      expect(objs2[0].fill).toBe('#347dfa');
    })

  });

  it(`should flood fill a shape`, async () => {
    const { container } = render(<App />);

    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const shapeButton = getByTestId(container, 'toolbar-button-rectangle_shape');
    const defaultFillButton = getByTestId(container, 'special-selector-flood_fill');

    fireEvent.click(shapeButton);
    fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 200 });
    fireEvent.mouseMove(upperCanvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(upperCanvas, { clientX: 100, clientY: 100 });

    fireEvent.click(getObjBtn);
    const objs = JSON.parse(localStorage.getItem('objects') as string);
    expect(objs[0].fill).toBe('transparent');
    fireEvent.click(defaultFillButton);

    await wait(() => {
      fireEvent.mouseDown(upperCanvas, { clientX: 80, clientY: 150 });
      fireEvent.mouseUp(upperCanvas, { clientX: 80, clientY: 150 });
      fireEvent.click(getObjBtn);
      const objs2 = JSON.parse(localStorage.getItem('objects') as string);
      expect(objs2[0].fill).toBe('#000000');
    })

  });

  it(`should flood fill the background`, async() => {
    const { container } = render(<App />);
    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const defaultFillButton = getByTitle(container, 'Black');

    fireEvent.click(defaultFillButton);
    fireEvent.mouseDown(upperCanvas, { clientX: 50, clientY: 50 });
    fireEvent.mouseUp(upperCanvas, { clientX: 50, clientY: 50 });
    await wait(() => {
      let addedEvent = null;
      const stored = window.localStorage.getItem('canvas:simulated:events');
      if (stored !== null) {
        const persistentEvents = JSON.parse(stored);
        if (persistentEvents.length > 0)
          addedEvent = persistentEvents[persistentEvents.length - 1];
      }
      expect(addedEvent.type).toBe('colorChanged')
      expect(addedEvent.objectType).toBe('background')
    });
  });

  it(`should flood fill a free hand writing`, async () => {
    const { container } = render(<App />);

    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const pencilButton = getByTitle(container, 'Pencil Line');
    const defaultFillButton = getByTestId(container, 'special-selector-flood_fill');

    fireEvent.click(pencilButton);
    fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 200 });
    fireEvent.mouseMove(upperCanvas, { clientX: 70, clientY: 100 });
    fireEvent.mouseMove(upperCanvas, { clientX: 200, clientY: 200 });
    fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 200 });
    fireEvent.mouseUp(upperCanvas, { clientX: 60, clientY: 200 });

    fireEvent.click(getObjBtn);
    const objs = JSON.parse(localStorage.getItem('objects') as string);
    expect(objs[0].fill).toBeNull();
    fireEvent.click(defaultFillButton);

    await wait(() => {
      fireEvent.mouseDown(upperCanvas, { clientX: 80, clientY: 150 });
      fireEvent.mouseUp(upperCanvas, { clientX: 80, clientY: 150 });
      fireEvent.click(getObjBtn);
      const objs2 = JSON.parse(localStorage.getItem('objects') as string);
      expect(objs2[0].fill).toBe('#000000');
    })

  });
});
