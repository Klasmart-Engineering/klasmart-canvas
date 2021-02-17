import { renderHook, act } from '@testing-library/react-hooks';
import { useStamp } from './useStamp';

test('should set stamp from initial value', () => {
  const { result } = renderHook(() => useStamp());
  expect(result.current.stamp).toBe('good');
  expect(typeof result.current.updateStamp).toBe('function');
});

test('should update stamp value', () => {
  const { result } = renderHook(() => useStamp());
  act(() => {
    result.current.updateStamp('wellDone');
  });
  expect(result.current.stamp).toBe('wellDone');
});
