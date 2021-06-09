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
} from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

describe('Brush Type Tool', () => {
  beforeEach(() => {
    localStorage.removeItem('objects');
    localStorage.removeItem('canvas:simulated:events');
  });
  
  it(`should add an object to the canvas with the brush type previously selected`, async () => {
    
    const brushTypes = [
        'Pencil', 
        'Pen', 
        'Felt',
        'Crayon',
        'Chalk',
        'Paintbrush',
        'Marker',
        'Dashed Pen'
    ]
    const { container } = render(<App />);

    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;

    const brushType = getByAltText(container brushTypes[0])

    fireEvent.click(shapeButton);
    fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 200 });
    fireEvent.mouseMove(upperCanvas, { clientX: 60, clientY: 200 });
    fireEvent.mouseMove(upperCanvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(upperCanvas, { clientX: 100, clientY: 100 });

    fireEvent.click(eraserArrow);

    await wait(() => {
      const partialEraserBtn = getByTitle(container, 'Partial Erase');
      fireEvent.click(partialEraserBtn);

      const rawCanvas = container.getElementsByClassName(
        'raw-canvas'
      )[1] as HTMLCanvasElement;

      fireEvent.mouseDown(rawCanvas, { clientX: 80, clientY: 210 });
      fireEvent.mouseMove(rawCanvas, { clientX: 80, clientY: 90 });
      fireEvent.mouseUp(rawCanvas, { clientX: 80, clientY: 90 });

      const stored = window.localStorage.getItem('canvas:simulated:events');
      const persistentEvents = JSON.parse(stored as string);
      expect(persistentEvents[0].type).toBe('added');
      expect(persistentEvents[1].type).toBe('removed');
      expect(persistentEvents[2].type).toBe('added');
      expect(persistentEvents[2].objectType).toBe('image');
      expect(JSON.parse(persistentEvents[2].param).isPartialErased).toBe(true);
    });
  });

  
});
