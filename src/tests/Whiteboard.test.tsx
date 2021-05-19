import React from 'react'
import 'jest-canvas-mock';
import {render, cleanup, fireEvent} from "@testing-library/react"
import { fabric } from 'fabric';
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
        var canvas = new fabric.Canvas('canvas1');
        fireEvent.click(buttonDiv)
        canvas.on({"mouse:up": function(e) {
            console.log("Mouse up", e.clientX, e.clientY);
            canvas.renderAll();
          }});
        canvas.on({"mouse:down": function(e) {
            console.log("Mouse down", e.clientX, e.clientY);
            canvas.renderAll();
        }});
          
          canvas.on({"mouse:move": function(e) {
            console.log("Mouse move", e.clientX, e.clientY);
            canvas.renderAll();
            
          }});
          
        //   const mouseDownEvt = new MouseEvent("mousedown", {
        //     clientX: 15,
        //     clientY: 15
        //   });
        //   canvas.upperCanvasEl.dispatchEvent(mouseDownEvt);
        
        canvas.trigger('mouse:down', {
            clientX: 15,
            clientY: 15
          });

          canvas.trigger('mouse:move', {
            clientX: 45,
            clientY: 45
          });

          canvas.trigger('mouse:up', {
            clientX: 45,
            clientY: 45
          });
        
        // const mouseMoveEvt = new MouseEvent("mousemove", {
        // clientX: 45,
        // clientY: 45
        // });
        // canvas.upperCanvasEl.dispatchEvent(mouseMoveEvt);


        // const mouseUpEvt = new MouseEvent("mouseup");
        // canvas.upperCanvasEl.dispatchEvent(mouseUpEvt);

        // const res2 = fireEvent.click(canvasDiv)
        // console.log(res2)
        const ctx     = canvasDiv.getContext('2d');
        let drawn   = null;
        const d       = ctx.getImageData(0, 0, 740, 460); //image data 
        const len     = d.data.length;
        for(let i =0; i< len; i++) {
            if(!d.data[i]) {
            drawn = false;
            }else if(d.data[i]) {
            drawn = true;
            console.log('Something drawn on Canvas');
            break;
            }
        }
        if(!drawn) {
            console.log('Nothing drawn on canvas.. AKA, Canvas is Empty');
        }
        console.log(canvas.getObjects())
        expect(buttonDiv).not.toBeNull()
    })


})