import React from 'react';
import 'jest-canvas-mock';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

afterEach(cleanup);

describe('Text Tool', () => {
  it(`should add a text`, async () => {
    beforeEach(() => {
      localStorage.removeItem('objects');
    });

    const promise = Promise.resolve();
    const { container } = render(<App />);

    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const shapeButton = container.querySelector(
      `[data-testid='toolbar-button-rectangle_shape']`
    );
    fireEvent.click(shapeButton);
    fireEvent.mouseDown(upperCanvas, { clientX: 300, clientY: 300 });
    fireEvent.mouseMove(upperCanvas, { clientX: 200, clientY: 200 });
    fireEvent.mouseUp(upperCanvas);

    const buttonDiv = container.querySelector(
      `[data-testid='toolbar-button-arial_font']`
    );
    fireEvent.click(buttonDiv);
    fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 60 });
    fireEvent.mouseUp(upperCanvas, { clientX: 62, clientY: 62 });
    fireEvent.keyDown(upperCanvas, { key: 'a', keyCode: 65 });
    fireEvent.keyDown(upperCanvas, { key: 'escape', keyCode: 27 });

    fireEvent.click(getObjBtn);
    const objs = JSON.parse(localStorage.getItem('objects') as string);
    // console.log(objs)
    expect(objs[objs.length - 1].type).toBe('i-text');

    await act(() => promise);
  });

  it(`should set text font`, async () => {
    const promise = Promise.resolve();
    const { container } = render(<App />);

    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;
    const arrowDiv = container.querySelector(
      `[data-testid='toolbar-button-arrow-arial_font']`
    );
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const shapeButton = container.querySelector(
      `[data-testid='toolbar-button-rectangle_shape']`
    );
    fireEvent.click(shapeButton);
    fireEvent.mouseDown(upperCanvas, { clientX: 300, clientY: 300 });

    fireEvent.click(arrowDiv);
    const buttonDiv = container.querySelector(
      `[data-testid='toolbar-button-crayon_font']`
    );
    fireEvent.click(buttonDiv);
    fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 60 });
    fireEvent.mouseUp(upperCanvas, { clientX: 62, clientY: 62 });
    fireEvent.keyDown(upperCanvas, { key: 'a', keyCode: 65 });
    fireEvent.keyDown(upperCanvas, { key: 'escape', keyCode: 27 });

    fireEvent.click(getObjBtn);
    const objs = JSON.parse(localStorage.getItem('objects') as string);
    // console.log(objs)
    expect(objs[objs.length - 1].fontFamily).toBe('Crayon');

    await act(() => promise);
  });

  it(`should set text color`, async () => {
    const promise = Promise.resolve();
    const { container } = render(<App />);

    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;
    const arrowDiv = container.querySelector(
      `[data-testid='toolbar-button-arrow-arial_font']`
    );
    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    const shapeButton = container.querySelector(
      `[data-testid='toolbar-button-rectangle_shape']`
    );
    fireEvent.click(shapeButton);
    fireEvent.mouseDown(upperCanvas, { clientX: 300, clientY: 300 });

    fireEvent.click(arrowDiv);
    const buttonDiv = container.querySelector(
      `[data-testid='special-button-red_color']`
    );
    fireEvent.click(buttonDiv);
    fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 60 });
    fireEvent.mouseUp(upperCanvas, { clientX: 62, clientY: 62 });
    fireEvent.keyDown(upperCanvas, { key: 'a', keyCode: 65 });
    fireEvent.keyDown(upperCanvas, { key: 'escape', keyCode: 27 });

    fireEvent.click(getObjBtn);
    const objs = JSON.parse(localStorage.getItem('objects') as string);
    // console.log(objs)
    expect(objs[objs.length - 1].fill).toBe('#f8433f');

    await act(() => promise);
  });
});
