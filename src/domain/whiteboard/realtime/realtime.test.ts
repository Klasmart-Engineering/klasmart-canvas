// @ts-nocheck
import { createCanvas } from 'canvas';
import { Realtime } from './realtime';

const props = {
  width: 200,
  height: 200,
  canvas: {
    ...createCanvas(200, 200),
    appendChild: () => (createCanvas(200, 200))
  },
  eventSerializer: { push: (arg1: any, arg2: any) => { } },
  dispatch: (arg1: any) => { }
};


const mockCanvas = {
  ...window,
  canvas: createCanvas(200, 200),
  fillRect: function () { },
  clearRect: function () { },
  getImageData: function (x, y, w, h) {
    return {
      data: new Array(w * h * 4)
    };
  },
  putImageData: function () { },
  createImageData: function () { return [] },
  setTransform: function () { },
  drawImage: function () { },
  save: function () { },
  fillText: function () { },
  restore: function () { },
  beginPath: function () { },
  moveTo: function () { },
  lineTo: function () { },
  closePath: function () { },
  stroke: function () { },
  translate: function () { },
  scale: function () { },
  rotate: function () { },
  arc: function () { },
  fill: function () { },
  measureText: function () {
    return { width: 0 };
  },
  transform: function () { },
  rect: function () { },
  clip: function () { },
}

describe('Realtime class should initiate', () => {
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

    const rt = new Realtime(
      600,
      400,
      'teacher'
    );

    rt.init(canvasTest as fabric.Canvas, 'rectangle', '#000000', 2);

    expect(rt).toBeDefined();
    expect(rt.isInitiated()).toBeTruthy();
  });
});
