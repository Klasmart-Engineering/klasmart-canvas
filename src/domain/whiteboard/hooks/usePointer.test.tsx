import { renderHook, act } from '@testing-library/react-hooks';
import { usePointer } from './usePointer';

test('should set pointer from initial value', () => {
  const { result } = renderHook(() => usePointer());
  expect(result.current.pointer).toBe('arrow');
  expect(typeof result.current.updatePointer).toBe('function');
});

test('should update pointer value', () => {
  const { result } = renderHook(() => usePointer());
  act(() => {
    result.current.updatePointer('hand');
  });
  expect(result.current.pointer).toBe('hand');
});
