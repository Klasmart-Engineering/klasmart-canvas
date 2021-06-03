import React from 'react';
import 'jest-canvas-mock';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

afterEach(cleanup);
beforeEach(() => {
    localStorage.removeItem('objects');
});

describe('Text Tool', () => {

  it(`should flood fill a shape`, async () => {
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
    const floodFillButton = container.querySelector(
        `[data-testid='special-selector-flood_fill']`
    );
    const selectButton = container.querySelector(
        `[data-testid='toolbar-button-move_objects']`
      );
    const floodFillArrow = container.querySelector(
        `[data-testid='special-selector-flood_fill']`
    );    
    
    
    //special-selector-arrow-black_color

    fireEvent.click(shapeButton);
    fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 200 });
    fireEvent.mouseMove(upperCanvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(upperCanvas, { clientX: 100, clientY: 100 });

    fireEvent.click(getObjBtn);
    const objs = JSON.parse(localStorage.getItem('objects') as string);
    console.log(objs)

    // fireEvent.click(selectButton);
    // fireEvent.mouseDown(upperCanvas, { clientX: 80, clientY: 150 });
    fireEvent.click(floodFillArrow);
    const floodFillBlue = container.querySelector(
        `[data-testid='special-button-blue_color']`
    );
    console.log(floodFillBlue)
    // fireEvent.click(floodFillBlue);
    // fireEvent.mouseDown(upperCanvas, { clientX: 80, clientY: 150 });
    // fireEvent.mouseUp(upperCanvas, { clientX: 80, clientY: 150 });

    fireEvent.click(getObjBtn);
    const objs2 = JSON.parse(localStorage.getItem('objects') as string);
    console.log(objs2)
    // expect(objs[objs.length - 1].type).toBe('i-text');

    await act(() => promise);
  });

});
