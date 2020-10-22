// @ts-nocheck
import { PartialErase } from './partialErase';
import { createCanvas } from 'canvas';

const props = {
  width: 200,
  height: 200,
  canvas: { 
    ...createCanvas(200,200),
    appendChild: () => (createCanvas(200,200))
  },
  eventSerializer: { push: (arg1: any, arg2: any) => {} },
  dispatch: (arg1: any) => {}
};


const mockCanvas = {
  ...window,
  canvas: createCanvas(200,200),
  fillRect: function() {},
  clearRect: function(){},
  getImageData: function(x, y, w, h) {
      return  {
          data: new Array(w*h*4)
      };
  },
  putImageData: function() {},
  createImageData: function(){ return []},
  setTransform: function(){},
  drawImage: function(){},
  save: function(){},
  fillText: function(){},
  restore: function(){},
  beginPath: function(){},
  moveTo: function(){},
  lineTo: function(){},
  closePath: function(){},
  stroke: function(){},
  translate: function(){},
  scale: function(){},
  rotate: function(){},
  arc: function(){},
  fill: function(){},
  measureText: function(){
      return { width: 0 };
  },
  transform: function(){},
  rect: function(){},
  clip: function(){},
}

describe('Partial erase class should initiate', () => {
  it('Should init', () => {
    window.HTMLCanvasElement.prototype.getContext = () => jest.fn()
    const canvasTest = {
      ...window,
      click: jest.fn(),
      setAttribute: jest.fn(),
      imageSmoothing: true,
      style: {},
      getContext: (type: string) => (mockCanvas),
      appendChild: (arg1: any) => ({}),
      getWidth: () => 200,
      getHeight: () => 200,
      getObjects: () => [],
      renderAll: jest.fn(),
      getElement: () => ({
        parentNode: {
          insertBefore: jest.fn()
        }
      }),
    };

    jest.spyOn(document, 'createElement').mockImplementation(() => canvasTest);

    const eraser = new PartialErase(
      'teacher',
      canvasTest as fabric.Canvas,
      10,
      '',
      true,
      true,
      props.eventSerializer,
      props.dispatch
    );

    expect(eraser).toBeDefined();
  });
});
