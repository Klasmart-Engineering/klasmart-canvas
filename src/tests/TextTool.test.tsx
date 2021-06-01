import React from 'react';
import 'jest-canvas-mock';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

afterEach(cleanup);

describe('Text Tool', () => {
  
    it(`should add a text`, async () => {
        const promise = Promise.resolve();
        const { container } = render(<App />);
        
        const canvas = container.querySelector(
            `[data-testid='canvas']`
          );
        const upperCanvas = container.getElementsByClassName(
          'upper-canvas'
        )[0] as HTMLCanvasElement;
        const getObjBtn = document.getElementById(
            'get-objects-button'
          ) as HTMLButtonElement;
  
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
  
        console.log(objs)

        await act(() => promise);
      });

});
