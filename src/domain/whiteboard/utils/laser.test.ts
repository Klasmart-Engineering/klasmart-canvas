import { Laser } from './laser';

window.HTMLCanvasElement.prototype.getContext = () => null;

let fabric = {
  getElement: () => {
    let canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;

    return canvas;
  },
};

test('new Laser instance should be created.', () => {
  const canvasInstance = fabric as fabric.Canvas;
  const pointer = new Laser(canvasInstance, '#000000');
  expect(typeof pointer).toBe('object');
});
