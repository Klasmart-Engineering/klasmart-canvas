import { renderHook } from '@testing-library/react-hooks';
import { mouseUpAction } from './mouseUp';
import { createCanvas } from 'canvas';

const canvas =  {
  ...createCanvas(200, 200),
  appendChild: () => (createCanvas(200, 200))
};

const shapeSelector = (prop: any) => ({});

test('should set mouseUpAction as a function', () => {
  const { result } = renderHook(() => (
    // @ts-ignore
    mouseUpAction(canvas as unknown as fabric.Canvas, 'test1', false, 'rectangle', 'pen', shapeSelector, shapeSelector)
  ));
  expect(typeof result.current).toBe('function');
});
