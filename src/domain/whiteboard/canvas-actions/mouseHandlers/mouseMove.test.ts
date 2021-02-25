import { renderHook, act } from '@testing-library/react-hooks';
import { mouseMoveAction } from './mouseMove';
import { createCanvas } from 'canvas';

const canvas =  {
  ...createCanvas(200, 200),
  appendChild: () => (createCanvas(200, 200))
};

const shapeSelector = (prop: any) => ({});

test('should set mouseMoveAction as a function', () => {
  const { result } = renderHook(() => (
    // @ts-ignore
    mouseMoveAction(canvas as unknown as fabric.Canvas, 'test1', false, 'rectangle', 'pen', shapeSelector, shapeSelector)
  ));
  expect(typeof result.current).toBe('function');
});
