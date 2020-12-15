// @ts-nocheck
import { createCanvas } from 'canvas';
import { PaintBrush } from './paintBrush';
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

describe('Paint Brush sould be created', () => {
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

    const paintBrush = new PaintBrush(canvasTest as fabric.Canvas, userId);
    const bristles = paintBrush.makeBrush(color, width);
    const paintPath = paintBrush.modifyPaintBrushPath(
      id,
      referencePoints,
      width,
      color,
      bristles
    );

    expect(paintPath.basePath?.type).toBe('paintbrush');
    expect(paintPath.basePath?.stroke).toBe(color);
    expect(paintPath.basePath?.strokeWidth).toBe(width);
    expect(paintPath.basePath?.points.length).toBe(referencePoints.length);
    expect(paintPath.basePath?.bristles.length).toBe(bristles.length);

    expect(paintPath._objects.length).toBe(bristles.length);

    paintPath.basePath?.points.forEach((point, index) => {
      expect(point.x).toBe(referencePoints[index].x);
      expect(point.y).toBe(referencePoints[index].y);
    });

    paintPath.basePath?.bristles.forEach((bristle, index) => {
      expect(bristle.distance).toBe(bristles[index].distance);
      expect(bristle.color).toBe(bristles[index].color);
      expect(bristle.thickness).toBe(bristles[index].thickness);
    });

    paintPath._objects.forEach((line, index) => {
      expect(line.stroke).toBe(bristles[index].color);
      expect(line.strokeWidth).toBe(bristles[index].thickness);
    });
  });
});
