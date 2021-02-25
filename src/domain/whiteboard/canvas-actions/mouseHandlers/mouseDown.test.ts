import { renderHook, act } from '@testing-library/react-hooks';
import { mouseDownAction } from './mouseDown';
import { createCanvas } from 'canvas';

const canvas =  {
  ...createCanvas(200, 200),
  appendChild: () => (createCanvas(200, 200))
};

const shapeSelector = (prop: any) => ({});

test('should set mouseDownAction as a function', () => {
  const { result } = renderHook(() => (
    mouseDownAction(canvas as unknown as fabric.Canvas, 'pen', shapeSelector, 'rectangle', shapeSelector, 3, '#000'))
  );
  expect(typeof result.current).toBe('function');
});
