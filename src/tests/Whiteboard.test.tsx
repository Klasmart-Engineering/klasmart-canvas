import React from 'react'
import 'jest-canvas-mock';
import {render, cleanup, fireEvent} from "@testing-library/react"
import App from '../App'

afterEach(cleanup)

describe("Whiteboard", ()=> {
    
    test("Toolbar is created", () => {
        const {container} = render( <App />)    
        const toolbarDiv = container.querySelector("[data-testid='toolbar']")
        expect(toolbarDiv).not.toBeNull()
    })
    test("Canvas is created", () => {
        const {container} = render( <App />)
        const canvasDiv = container.querySelector("[data-testid='canvas']")
        expect(canvasDiv).not.toBeNull()
    })
    test("Toolbar button is created", () => {
        const {container} = render( <App />)
        const buttonDiv = container.querySelector("[data-testid='toolbar-button-rectangle_shape']")
        const canvasDiv = container.querySelector("[data-testid='canvas']")
        fireEvent.click(canvasDiv)
        console.log(canvasDiv)
        expect(buttonDiv).not.toBeNull()
    })


})