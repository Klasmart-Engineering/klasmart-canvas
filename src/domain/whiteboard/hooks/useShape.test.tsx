import { renderHook, act } from '@testing-library/react-hooks';
import { useShape } from './useShape';

test('should set shape from initial value', () => {
  const { result } = renderHook(() => useShape());
  expect(result.current.shape).toBe('rectangle');
  expect(typeof result.current.updateShape).toBe('function');
});

test('should update shape value', () => {
  const { result } = renderHook(() => useShape());
  act(() => {
    result.current.updateShape('circle');
  });
  expect(result.current.shape).toBe('circle');
});
