import { renderHook } from '@testing-library/react-hooks';
import { useMouseUp, useMouseDown, useMouseMove } from './mouseActions';
import { createCanvas } from 'canvas';

const canvas =  {
  ...createCanvas(200, 200),
  appendChild: () => (createCanvas(200, 200))
};

const fakeFunc = (prop: any) => ({});

test('should set useMouseDown as a function', () => {
  const { result } = renderHook(() => (
    // @ts-ignore
    useMouseDown(canvas as unknown as fabric.Canvas, fakeFunc, fakeFunc, fakeFunc, 'pen', '#999')
  ));
  expect(typeof result.current).toBe('function');
});

test('should set useMouseUp as a function', () => {
  const { result } = renderHook(() => (
    // @ts-ignore
    useMouseUp(fakeFunc)
  ));
  expect(typeof result.current).toBe('function');
});

test('should set useMouseMove as a function', () => {
  const { result } = renderHook(() => (
    // @ts-ignore
    useMouseMove(fakeFunc)
  ));
  expect(typeof result.current).toBe('function');
});
