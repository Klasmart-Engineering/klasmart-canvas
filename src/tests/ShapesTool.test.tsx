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
    
    
})