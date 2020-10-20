import { renderHook, act } from '@testing-library/react-hooks';
import { usePartialEraseIsActive } from './usePartialEraseIsActive';

test('should set clearIsActive from initial value', () => {
  const { result } = renderHook(() => usePartialEraseIsActive());
  expect(result.current.partialEraseIsActive).toBe(false);
  expect(typeof result.current.updatePartialEraseIsActive).toBe('function');
});

test('should update partialEraseIsActive', () => {
  const { result } = renderHook(() => usePartialEraseIsActive());

  act(() => {
    result.current.updatePartialEraseIsActive(true);
  });
  expect(result.current.partialEraseIsActive).toBe(true);

  act(() => {
    result.current.updatePartialEraseIsActive(false);
  });
  expect(result.current.partialEraseIsActive).toBe(false);
});
