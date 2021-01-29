import { renderHook } from '@testing-library/react-hooks';
import { mouseMoveMain, setShapeSize } from './shapeActionUtils';

test('setShapeSize should return a function', () => {
  const { result } = renderHook(() => (
    // @ts-ignore
    setShapeSize
  ));
  expect(typeof result.current).toBe('function');
});

test('mouseMoveMain should return a function', () => {
  const { result } = renderHook(() => (
    // @ts-ignore
    mouseMoveMain
  ));
  expect(typeof result.current).toBe('function');
});
