// @ts-nocheck
import { createCanvas } from 'canvas';
import { ChalkBrush } from './chalkBrush';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';
import { referencePoints } from './referencePoints';
import 'jest-canvas-mock';
import 'canvas';

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
  quadraticCurveTo: function (
    cpx: number,
    cpy: number,
    x: number,
    y: number
  ) {},
};

describe('Chalk Brush sould be created', () => {
  it('Should have the correct properties and values', async () => {
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
      toDataURL: () => '',
    };

    jest.spyOn(document, 'createElement').mockImplementation(() => canvasTest);

    const userId = 'teacher';
    const color = '#fb823f';
    const width = 8;
    const id = `${userId}:${uuidv4()}`;

    const chalkBrush = new ChalkBrush(
      canvasTest as fabric.Canvas,
      userId,
      'chalk'
    );

    const clearRects = chalkBrush.createChalkEffect(referencePoints, width);
    const chalkPath = await chalkBrush.createChalkPath(
      id,
      referencePoints,
      width,
      color,
      clearRects
    );

    expect(chalkPath.basePath?.type).toBe('chalk');
    expect(chalkPath.basePath?.stroke).toBe(color);
    expect(chalkPath.basePath?.strokeWidth).toBe(width);
    expect(chalkPath.basePath?.points.length).toBe(referencePoints.length);
    expect(chalkPath.basePath).toHaveProperty('imageData');
  });
});

describe('Crayon Brush sould be created', () => {
  it('Should have the correct properties and values', async () => {
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
      toDataURL: () => '',
    };

    jest.spyOn(document, 'createElement').mockImplementation(() => canvasTest);

    const userId = 'teacher';
    const color = '#fb823f';
    const width = 8;
    const id = `${userId}:${uuidv4()}`;

    const chalkBrush = new ChalkBrush(
      canvasTest as fabric.Canvas,
      userId,
      'crayon'
    );

    const clearRects = chalkBrush.createChalkEffect(referencePoints, width);
    const chalkPath = await chalkBrush.createChalkPath(
      id,
      referencePoints,
      width,
      color,
      clearRects
    );

    expect(chalkPath.basePath?.type).toBe('crayon');
    expect(chalkPath.basePath?.stroke).toBe(color);
    expect(chalkPath.basePath?.strokeWidth).toBe(width);
    expect(chalkPath.basePath?.points.length).toBe(referencePoints.length);
    expect(chalkPath.basePath).toHaveProperty('imageData');
  });
});
