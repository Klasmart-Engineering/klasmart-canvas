import { renderHook, act } from '@testing-library/react-hooks';
import { useClearIsActive } from './useClearIsActive';

test('should set clearIsActive from initial value', () => {
  const { result } = renderHook(() => useClearIsActive());
  expect(result.current.clearIsActive).toBe(false);
  expect(typeof result.current.updateClearIsActive).toBe('function');
});

test('should update clearIsActive', () => {
  const { result } = renderHook(() => useClearIsActive());

  act(() => {
    result.current.updateClearIsActive(true);
  });
  expect(result.current.clearIsActive).toBe(true);

  act(() => {
    result.current.updateClearIsActive(false);
  });
  expect(result.current.clearIsActive).toBe(false);
});
