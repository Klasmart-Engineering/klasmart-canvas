import { renderHook, act } from '@testing-library/react-hooks';
import { useFloodFillIsActive } from './useFloodFillIsActive';

test('should set floodFillIsActive from initial value', () => {
  const { result } = renderHook(() => useFloodFillIsActive());
  expect(result.current.floodFillIsActive).toBe(false);
  expect(typeof result.current.updateFloodFillIsActive).toBe('function');
});

test('should update floddFillIsActive', () => {
  const { result } = renderHook(() => useFloodFillIsActive());

  act(() => {
    result.current.updateFloodFillIsActive(true);
  });
  expect(result.current.floodFillIsActive).toBe(true);

  act(() => {
    result.current.updateFloodFillIsActive(false);
  });
  expect(result.current.floodFillIsActive).toBe(false);
});
