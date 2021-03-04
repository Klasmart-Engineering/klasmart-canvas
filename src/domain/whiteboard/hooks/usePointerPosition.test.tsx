import { renderHook, act } from '@testing-library/react-hooks';
import { usePointerPosition } from './usePointerPosition';

test('should set pointerPosition from initial value', () => {
  const { result } = renderHook(() => usePointerPosition());
  expect(result.current.pointerPosition).toStrictEqual({ x: 0, y: 0 });
  expect(typeof result.current.updatePointerPosition).toBe('function');
});

test('should update pointerPosition', () => {
  const { result } = renderHook(() => usePointerPosition());

  act(() => {
    result.current.updatePointerPosition({ x: 10, y: 25 });
  });
  expect(result.current.pointerPosition).toStrictEqual({ x: 10, y: 25 });

  act(() => {
    result.current.updatePointerPosition({ x: 18, y: 20 });
  });
  expect(result.current.pointerPosition).toStrictEqual({ x: 18, y: 20 });
});
