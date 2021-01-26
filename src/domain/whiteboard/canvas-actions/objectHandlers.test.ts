import { renderHook } from '@testing-library/react-hooks';
import { cancelShapeCreation, allowMovementInShape } from './objectHandlers';
import { createCanvas } from 'canvas';

const canvas =  {
  ...createCanvas(200, 200),
  appendChild: () => (createCanvas(200, 200))
};

test('should set cancelShapeCreation as a function', () => {
  const { result } = renderHook(() => (
    // @ts-ignore
    cancelShapeCreation(canvas as unknown as fabric.Canvas)
  ));
  expect(typeof result.current).toBe('function');
});

test('should set allowMovementInShape as a function', () => {
  const { result } = renderHook(() => (
    // @ts-ignore
    allowMovementInShape
  ));
  expect(typeof result.current).toBe('function');
});
