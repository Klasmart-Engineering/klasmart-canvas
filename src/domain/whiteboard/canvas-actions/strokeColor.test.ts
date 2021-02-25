import { renderHook } from '@testing-library/react-hooks';
import { createCanvas } from 'canvas';
import { useChangeStrokeColor, useTextColor } from './strokeColor';

const canvas =  {
  ...createCanvas(200, 200),
  appendChild: () => (createCanvas(200, 200))
};

const fakeFunc = (prop: any) => ({});

test('useChangeStrokeColor should return a function', () => {
  const { result } = renderHook(() => (
    // @ts-ignore
    useChangeStrokeColor(canvas, 'test', fakeFunc, fakeFunc, fakeFunc, fakeFunc)
  ));
  expect(typeof result.current).toBe('function');
});

test('useTextColor should return a function', () => {
  const { result } = renderHook(() => (
    // @ts-ignore
    useTextColor(canvas, 'test', fakeFunc, fakeFunc, fakeFunc)
  ));
  expect(typeof result.current).toBe('function');
});
