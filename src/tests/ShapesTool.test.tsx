import React from 'react'
import 'jest-canvas-mock';
import {render, cleanup, fireEvent} from "@testing-library/react"
import { act } from 'react-dom/test-utils';
import App from '../App'

afterEach(cleanup)

describe("Shape Tool", ()=> {

    const shapes = [
        {
          id: 'circle',
          fabricName: 'ellipse'
        },
        {
          id: 'rectangle',
          fabricName: 'rect'
        },
        {
          id: 'triangle',
          fabricName: 'triangle'
        },
        {
          id: 'pentagon',
          fabricName: 'polygon'
        },
        {
          id: 'hexagon',
          fabricName: 'polygon'
        },
        {
          id: 'arrow',
          fabricName: 'path'
        },
        {
          id: 'star',
          fabricName: 'path'
        },
        {
          id: 'chat_bubble',
          fabricName: 'path'
        },
      ]

      for(let shape of shapes){
        it(`should add a ${shape.id}`, async () => {
            const promise = Promise.resolve()
            const {container} = render( <App />)
            const arrowDiv = container.querySelector(`[data-testid='toolbar-button-arrow-rectangle_shape']`)
            const upperCanvas = container.getElementsByClassName("upper-canvas")[0] as HTMLCanvasElement
    
            fireEvent.click(arrowDiv)
            const buttonDiv = container.querySelector(`[data-testid='toolbar-button-${shape.id}_shape']`)
            fireEvent.click(buttonDiv)
            fireEvent.mouseDown(upperCanvas, { clientX: 300, clientY: 300 });
            fireEvent.mouseMove(upperCanvas, { clientX: 200, clientY: 200 })
            fireEvent.mouseUp(upperCanvas)
    
            let addedEvent = null
            const stored = window.localStorage.getItem('canvas:simulated:events');
            if (stored !== null) {
                const persistentEvents = JSON.parse(stored); 
                console.log(persistentEvents)
                if(persistentEvents.length > 0)
                    addedEvent = persistentEvents[persistentEvents.length-1]
            }
    
            expect(addedEvent).not.toBeNull()
            expect(addedEvent.type).toBe('added')
            expect(addedEvent.objectType).toBe(shape.fabricName)
            await act(() => promise)
        })
      }

      it(`should resize a shape`, async () => {
        const promise = Promise.resolve()

        const originalPosition = 50
        const secondPosition = 200
        const thirdPosition = 600
        const idealOriginalWidth = secondPosition - originalPosition
        const idealResizedWidth = thirdPosition - originalPosition

        const {container} = render( <App />)
        const arrowDiv = container.querySelector(`[data-testid='toolbar-button-arrow-rectangle_shape']`)
        const upperCanvas = container.getElementsByClassName("upper-canvas")[0] as HTMLCanvasElement

        const getObjBtn = document.getElementById(
            'get-objects-button'
          ) as HTMLButtonElement;

        fireEvent.click(arrowDiv)
        const buttonDiv = container.querySelector(`[data-testid='toolbar-button-rectangle_shape']`)
        fireEvent.click(buttonDiv)
        fireEvent.mouseDown(upperCanvas, { clientX: originalPosition, clientY: originalPosition });
        fireEvent.mouseMove(upperCanvas, { clientX: secondPosition, clientY: secondPosition })

        fireEvent.click(getObjBtn);
        const obj = JSON.parse(localStorage.getItem('objects') as string)[0];
        expect(obj.width).toBe(idealOriginalWidth) 
        
        fireEvent.mouseMove(upperCanvas, { clientX: thirdPosition, clientY: thirdPosition })
        
        fireEvent.click(getObjBtn);
        const newObj = JSON.parse(localStorage.getItem('objects') as string)[0];
        expect(newObj.width).toBe(idealResizedWidth)
        await act(() => promise)
    })

    // it(`should select a group of shapes`, () => {

    //     localStorage.removeItem('objects')
    //     const {container} = render( <App />)
    //     const arrowDiv = container.querySelector(`[data-testid='toolbar-button-arrow-rectangle_shape']`)
    //     const upperCanvas = container.getElementsByClassName("upper-canvas")[0] as HTMLCanvasElement

    //     const getObjBtn = document.getElementById(
    //         'get-objects-button'
    //       ) as HTMLButtonElement;

    //     fireEvent.click(arrowDiv)
    //     const buttonDiv = container.querySelector(`[data-testid='toolbar-button-rectangle_shape']`)
    //     fireEvent.click(buttonDiv)
        
    //     fireEvent.mouseDown(upperCanvas, { clientX: 50, clientY: 50 });
    //     fireEvent.mouseMove(upperCanvas, { clientX: 100, clientY: 100 })
    //     fireEvent.mouseUp(upperCanvas, { clientX: 100, clientY: 100 })
        
    //     const trashButton = container.querySelector(`[data-testid='toolbar-button-object_erase']`)
    //     fireEvent.click(trashButton)
    //     fireEvent.click(upperCanvas)
    //     fireEvent.keyPress(upperCanvas, { key: "Delete", code: 46 })
    //     // 

    //     // fireEvent.mouseDown(upperCanvas, { clientX: 150, clientY: 150 });
    //     // fireEvent.mouseMove(upperCanvas, { clientX: 200, clientY: 200 })
    //     // fireEvent.mouseUp(upperCanvas, { clientX: 200, clientY: 200 })

    //     // fireEvent.mouseDown(upperCanvas, { clientX: 10, clientY: 10 });
    //     // fireEvent.mouseMove(upperCanvas, { clientX: 300, clientY: 300 })
    //     // fireEvent.mouseUp(upperCanvas, { clientX: 300, clientY: 300 })

    //     fireEvent.click(getObjBtn);
    //     const objs = JSON.parse(localStorage.getItem('objects') as string);
    //     console.log(objs)
    //     // expect(obj.width).toBe(idealOriginalWidth) 
        
    //     // fireEvent.mouseMove(upperCanvas, { clientX: thirdPosition, clientY: thirdPosition })
        
    //     // fireEvent.click(getObjBtn);
    //     // const newObj = JSON.parse(localStorage.getItem('objects') as string)[0];
    //     // expect(newObj.width).toBe(idealResizedWidth)
  
    // })
    
    
})