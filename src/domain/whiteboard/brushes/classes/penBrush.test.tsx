// @ts-nocheck
import { createCanvas } from 'canvas';
import { PenBrush } from './penBrush';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';
import { referencePoints } from './referencePoints';

const mockCanvas = {
  ...window,
  canvas: createCanvas(200, 200),
  fillRect: function () {},
  clearRect: function () {},
  getImageData: function (x, y, w, h) {
    return {
      data: new Array(w * h * 4),
    };
  },
  putImageData: function () {},
  createImageData: function () {
    return [];
  },
  setTransform: function () {},
  drawImage: function () {},
  save: function () {},
  fillText: function () {},
  restore: function () {},
  beginPath: function () {},
  moveTo: function () {},
  lineTo: function () {},
  closePath: function () {},
  stroke: function () {},
  translate: function () {},
  scale: function () {},
  rotate: function () {},
  arc: function () {},
  fill: function () {},
  measureText: function () {
    return { width: 0 };
  },
  transform: function () {},
  rect: function () {},
  clip: function () {},
};

describe('Pen Brush sould be created', () => {
  it('Should have the correct properties and values', () => {
    window.HTMLCanvasElement.prototype.getContext = () => jest.fn();
    const canvasTest = {
      ...window,
      click: jest.fn(),
      setAttribute: jest.fn(),
      imageSmoothing: true,
      style: {},
      getContext: (type: string) => mockCanvas,
      appendChild: (arg1: any) => ({}),
      getWidth: () => 200,
      getHeight: () => 200,
      getObjects: () => [],
      renderAll: jest.fn(),
      getElement: () => ({
        parentNode: {
          insertBefore: jest.fn(),
        },
      }),
    };

    jest.spyOn(document, 'createElement').mockImplementation(() => canvasTest);

    const userId = 'teacher';
    const color = '#fb823f';
    const width = 8;
    const id = `${userId}:${uuidv4()}`;

    const penBrush = new PenBrush(canvasTest as fabric.Canvas, userId);

    const points = referencePoints.map((point) => {
      return {
        x: point.x,
        y: point.y,
        width: penBrush.getRandomInt(width / 2, width),
      };
    });

    const penPath = penBrush.createPenPath(id, points, width, color);

    expect(penPath.basePath?.type).toBe('pen');
    expect(penPath.basePath?.stroke).toBe(color);
    expect(penPath.basePath?.strokeWidth).toBe(width);
    expect(penPath.basePath?.points.length).toBe(referencePoints.length);
    expect(penPath._objects.length).toBe(referencePoints.length - 1);

    penPath.basePath?.points.forEach((point, index) => {
      expect(point.x).toBe(referencePoints[index].x);
      expect(point.y).toBe(referencePoints[index].y);
      expect(point.width).toBeGreaterThanOrEqual(width / 2);
      expect(point.width).toBeLessThanOrEqual(width);
    });

    penPath._objects.forEach((line) => {
      expect(line.stroke).toBe(color);
      expect(line.strokeWidth).toBeGreaterThanOrEqual(width / 2);
      expect(line.strokeWidth).toBeLessThanOrEqual(width);
    });
  });
});
