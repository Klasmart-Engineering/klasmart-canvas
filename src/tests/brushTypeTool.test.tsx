import React from 'react';
import 'jest-canvas-mock';
import {
  render,
  cleanup,
  fireEvent,
  wait,
  getByTestId,
  getByTitle,
  getByAltText,
  getAllByText,
  getAllByAltText,
  getAllByTitle,
} from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

describe('Brush Type Tool', () => {
  beforeEach(() => {
    localStorage.removeItem('objects');
    localStorage.removeItem('canvas:simulated:events');
  });

  it(`should add an object to the canvas with the brush type previously selected`, async () => {
    const { container } = render(<App />);

    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    let arrowBtn = container.querySelector(
      `[data-testid='toolbar-button-arrow-pencil_line']`
    );
    fireEvent.click(arrowBtn);

    let brushType = getAllByTitle(container, `Pen Line`)[0];
    fireEvent.click(brushType);

    fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 200 });
    fireEvent.mouseMove(upperCanvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(upperCanvas, { clientX: 100, clientY: 100 });

    fireEvent.click(getObjBtn);
    const objs = JSON.parse(localStorage.getItem('objects') as string);

    expect(objs[objs.length - 1].basePath.type).toBe('pen');
    arrowBtn = container.querySelector(
      `[data-testid='toolbar-button-arrow-pen_line']`
    );
    fireEvent.click(arrowBtn);

    brushType = getAllByTitle(container, `Pen Line`)[0];
    fireEvent.click(brushType);

    fireEvent.mouseDown(upperCanvas, { clientX: 200, clientY: 200 });
    fireEvent.mouseMove(upperCanvas, { clientX: 300, clientY: 100 });
    fireEvent.mouseUp(upperCanvas, { clientX: 300, clientY: 100 });
  });

  it(`should add change the brush type a 2d shape`, async () => {
    
    const { container } = render(<App />);

    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const shapeBtn = getAllByTitle(container, 'Rectangle Shape')[0]
    fireEvent.click(shapeBtn);

    fireEvent.mouseDown(upperCanvas, { clientX: 50, clientY: 200 });
    fireEvent.mouseMove(upperCanvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(upperCanvas, { clientX: 100, clientY: 100 });

    fireEvent.click(getObjBtn);

    const selectorBtn = getAllByTitle(container, 'Move Objects')[0]
    fireEvent.click(selectorBtn)

    fireEvent.mouseDown(upperCanvas, {clientX: 75, clientY: 150})
    fireEvent.mouseUp(upperCanvas, {clientX: 75, clientY: 150})

    let arrowBtn = container.querySelector(
      `[data-testid='toolbar-button-arrow-pencil_line']`
    );
    fireEvent.click(arrowBtn);

    let brushType = getAllByTitle(container, `Marker Line`)[0];
    fireEvent.click(brushType);

    fireEvent.click(selectorBtn)

    fireEvent.mouseDown(upperCanvas, {clientX: 75, clientY: 150})
    fireEvent.mouseUp(upperCanvas, {clientX: 75, clientY: 150})

    fireEvent.click(getObjBtn);
    const objs2 = JSON.parse(localStorage.getItem('objects') as string);
    expect(objs2[objs2.length - 1].basePath.type).toBe('marker');
    
  });
});
