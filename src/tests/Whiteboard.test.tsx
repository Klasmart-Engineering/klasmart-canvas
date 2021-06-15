import React from 'react'
import 'jest-canvas-mock';
import {render, cleanup, fireEvent} from "@testing-library/react"
import App from '../App'

afterEach(cleanup)

describe("Whiteboard", ()=> {
    
    it("Toolbar is created", () => {
        const {container} = render( <App />)    
        const toolbarDiv = container.querySelector("[data-testid='toolbar']")
        expect(toolbarDiv).not.toBeNull()
    })
    it("Canvas is created", () => {
        const {container} = render( <App />)
        const canvasDiv = container.querySelector("[data-testid='canvas']")
        expect(canvasDiv).not.toBeNull()
    })
    it("Basic shape is added", () => {
      
        const {container} = render( <App />)
        const buttonDiv = container.querySelector("[data-testid='toolbar-button-rectangle_shape']")
        const upperCanvas = container.getElementsByClassName("upper-canvas")[0] as HTMLCanvasElement

        fireEvent.click(buttonDiv)
        fireEvent.mouseDown(upperCanvas, { clientX: 300, clientY: 300 });
        fireEvent.mouseMove(upperCanvas, { clientX: 200, clientY: 200 })
        fireEvent.mouseUp(upperCanvas)

        let addedEvent = null
        const stored = window.localStorage.getItem('canvas:simulated:events');
        if (stored !== null) {
            const persistentEvents = JSON.parse(stored); 
            if(persistentEvents.length === 1)
                addedEvent = persistentEvents[0]
        }

        expect(addedEvent).not.toBeNull()
        expect(addedEvent.type).toBe('added')
        expect(addedEvent.objectType).toBe('rect')
    })


})