import React from 'react';
import 'jest-canvas-mock';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

afterEach(cleanup);

describe('Text Tool', () => {

  beforeEach(() => {
    localStorage.removeItem('objects');
  });

  it(`should add a text`, async () => {
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
    
    expect(objs[objs.length - 1].type).toBe('i-text');

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
    
    expect(objs[objs.length - 1].fill).toBe('#f8433f');

    await act(() => promise);
  });

  it(`should set text font`, async () => {
    
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
    
    
    
    await wait(() => {
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
      expect(objs[objs.length - 1].fontFamily).toBe('Crayon');
    })

  });

  it(`should resize a text`, async () => {
    
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

    const selectorBtn = container.querySelector(
      `[data-testid='toolbar-button-move_objects']`
    );
    const shapeButton = container.querySelector(
      `[data-testid='toolbar-button-rectangle_shape']`
    );
    fireEvent.click(shapeButton);
    fireEvent.mouseDown(upperCanvas, { clientX: 300, clientY: 300 });

    fireEvent.click(arrowDiv);
    
    
    
    await wait(() => {
      const buttonDiv = container.querySelector(
        `[data-testid='toolbar-button-crayon_font']`
      );
      fireEvent.click(buttonDiv);
      fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 60 });
      fireEvent.mouseUp(upperCanvas, { clientX: 62, clientY: 62 });
      fireEvent.keyDown(upperCanvas, { key: 'a', keyCode: 65 });
      fireEvent.keyDown(upperCanvas, { key: 'escape', keyCode: 27 });

      const selectButton = container.querySelector(
        `[data-testid='toolbar-button-move_objects']`
      );

      fireEvent.click(selectButton);

      fireEvent.mouseDown(upperCanvas, { clientX: 10, clientY: 450 });
      fireEvent.mouseMove(upperCanvas, { clientX: 300, clientY: 200 })
      fireEvent.mouseUp(upperCanvas, { clientX: 300, clientY: 200 })

      fireEvent.click(getObjBtn);
      const objs = JSON.parse(localStorage.getItem('activeObjects') as string);
      
      fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 60 });
      fireEvent.mouseMove(upperCanvas, { clientX: 350, clientY: 100 })
      fireEvent.mouseUp(upperCanvas, { clientX: 350, clientY: 100 })
      fireEvent.click(getObjBtn);
      const objs2 = JSON.parse(localStorage.getItem('activeObjects') as string);

      expect(objs[objs.length - 1].width).not.toBe(objs2[objs2.length - 1].width);
    })

  });
});
