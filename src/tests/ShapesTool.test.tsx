import React from 'react';
import 'jest-canvas-mock';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

afterEach(cleanup);

describe('Shape Tool', () => {
  const shapes = [
    {
      id: 'circle',
      fabricName: 'ellipse',
    },
    {
      id: 'rectangle',
      fabricName: 'rect',
    },
    {
      id: 'triangle',
      fabricName: 'triangle',
    },
    {
      id: 'pentagon',
      fabricName: 'polygon',
    },
    {
      id: 'hexagon',
      fabricName: 'polygon',
    },
    {
      id: 'arrow',
      fabricName: 'path',
    },
    {
      id: 'star',
      fabricName: 'path',
    },
    {
      id: 'chat_bubble',
      fabricName: 'path',
    },
  ];

  for (let shape of shapes) {
    it(`should add a ${shape.id}`, async () => {
      const promise = Promise.resolve();
      const { container } = render(<App />);
      const arrowDiv = container.querySelector(
        `[data-testid='toolbar-button-arrow-rectangle_shape']`
      );
      const upperCanvas = container.getElementsByClassName(
        'upper-canvas'
      )[0] as HTMLCanvasElement;

      fireEvent.click(arrowDiv);
      const buttonDiv = container.querySelector(
        `[data-testid='toolbar-button-${shape.id}_shape']`
      );
      fireEvent.click(buttonDiv);
      fireEvent.mouseDown(upperCanvas, { clientX: 300, clientY: 300 });
      fireEvent.mouseMove(upperCanvas, { clientX: 200, clientY: 200 });
      fireEvent.mouseUp(upperCanvas);

      let addedEvent = null;
      const stored = window.localStorage.getItem('canvas:simulated:events');
      if (stored !== null) {
        const persistentEvents = JSON.parse(stored);
        console.log(persistentEvents);
        if (persistentEvents.length > 0)
          addedEvent = persistentEvents[persistentEvents.length - 1];
      }

      expect(addedEvent).not.toBeNull();
      expect(addedEvent.type).toBe('added');
      expect(addedEvent.objectType).toBe(shape.fabricName);
      await act(() => promise);
    });
  }

  it(`should resize a shape`, async () => {
    const promise = Promise.resolve();

    const originalPosition = 50;
    const secondPosition = 200;
    const thirdPosition = 600;
    const idealOriginalWidth = secondPosition - originalPosition;
    const idealResizedWidth = thirdPosition - originalPosition;

    const { container } = render(<App />);
    const arrowDiv = container.querySelector(
      `[data-testid='toolbar-button-arrow-rectangle_shape']`
    );
    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;

    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    fireEvent.click(arrowDiv);
    const buttonDiv = container.querySelector(
      `[data-testid='toolbar-button-rectangle_shape']`
    );
    fireEvent.click(buttonDiv);
    fireEvent.mouseDown(upperCanvas, {
      clientX: originalPosition,
      clientY: originalPosition,
    });
    fireEvent.mouseMove(upperCanvas, {
      clientX: secondPosition,
      clientY: secondPosition,
    });

    fireEvent.click(getObjBtn);
    const obj = JSON.parse(localStorage.getItem('objects') as string)[0];
    expect(obj.width).toBe(idealOriginalWidth);

    fireEvent.mouseMove(upperCanvas, {
      clientX: thirdPosition,
      clientY: thirdPosition,
    });

    fireEvent.click(getObjBtn);
    const newObj = JSON.parse(localStorage.getItem('objects') as string)[0];
    expect(newObj.width).toBe(idealResizedWidth);
    await act(() => promise);
  });

  it(`should validate that a shape can be removed from the canvas`, async () => {
    const promise = Promise.resolve();
    localStorage.removeItem('objects');
    const { container } = render(<App />);
    const arrowDiv = container.querySelector(
      `[data-testid='toolbar-button-arrow-rectangle_shape']`
    );
    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;

    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    fireEvent.click(arrowDiv);
    const buttonDiv = container.querySelector(
      `[data-testid='toolbar-button-rectangle_shape']`
    );
    fireEvent.click(buttonDiv);

    fireEvent.mouseDown(upperCanvas, { clientX: 50, clientY: 50 });
    fireEvent.mouseMove(upperCanvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(upperCanvas, { clientX: 100, clientY: 100 });

    const selectButton = container.querySelector(
        `[data-testid='toolbar-button-move_objects']`
      );

    fireEvent.click(selectButton);
    fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 60 });
    fireEvent.keyDown(upperCanvas, { key: 'Backspace', keyCode: 8 });

    fireEvent.click(getObjBtn);
    const objs = JSON.parse(localStorage.getItem('objects') as string);
    
    expect(objs).toBeNull()
    await act(() => promise);
  });

  it(`should group shapes in a group and resize it as a group`, async () => {
    const promise = Promise.resolve();
    localStorage.removeItem('objects');
    const { container } = render(<App />);
    const arrowDiv = container.querySelector(
      `[data-testid='toolbar-button-arrow-rectangle_shape']`
    );
    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;

    const getObjBtn = document.getElementById(
      'get-objects-button'
    ) as HTMLButtonElement;

    fireEvent.click(arrowDiv);
    const buttonDiv = container.querySelector(
      `[data-testid='toolbar-button-rectangle_shape']`
    );
    fireEvent.click(buttonDiv);

    fireEvent.mouseDown(upperCanvas, { clientX: 50, clientY: 400 });
    fireEvent.mouseMove(upperCanvas, { clientX: 100, clientY: 350 });
    fireEvent.mouseUp(upperCanvas, { clientX: 100, clientY: 350 });

    fireEvent.mouseDown(upperCanvas, { clientX: 150, clientY: 300 });
    fireEvent.mouseMove(upperCanvas, { clientX: 200, clientY: 250 })
    fireEvent.mouseUp(upperCanvas, { clientX: 200, clientY: 250 })

    const selectButton = container.querySelector(
        `[data-testid='toolbar-button-move_objects']`
      );

    fireEvent.click(selectButton);

    fireEvent.mouseDown(upperCanvas, { clientX: 10, clientY: 450 });
    fireEvent.mouseMove(upperCanvas, { clientX: 300, clientY: 200 })
    fireEvent.mouseUp(upperCanvas, { clientX: 300, clientY: 200 })

    fireEvent.click(getObjBtn);
    const objs = JSON.parse(localStorage.getItem('activeObjects') as string);
    expect(objs.length).toBe(2)
    
    fireEvent.mouseDown(upperCanvas, { clientX: 200, clientY: 250 });
    fireEvent.mouseMove(upperCanvas, { clientX: 350, clientY: 100 })
    fireEvent.mouseUp(upperCanvas, { clientX: 350, clientY: 100 })
    fireEvent.click(getObjBtn);
    const objs2 = JSON.parse(localStorage.getItem('activeObjects') as string);
    expect(objs[0].left).not.toBe(objs2[0].left)
    expect(objs2[0].scaleX).not.toBe(1)
    expect(objs2[0].scaleY).not.toBe(1)
    await act(() => promise);
  });
});
