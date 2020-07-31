import { renderHook, act } from '@testing-library/react-hooks';
import { useFloodFill } from './useFloodFill';

test('should set floodFill from initial value', () => {
  const { result } = renderHook(() => useFloodFill());
  expect(result.current.floodFill).toBe('#000');
  expect(typeof result.current.updateFloodFill).toBe('function');
  act(() => {
    result.current.updateFloodFill('green');
  });
  expect(result.current.floodFill).toBe('green');
});

test('should update floodFill', () => {
  const { result } = renderHook(() => useFloodFill());

  act(() => {
    result.current.updateFloodFill('green');
  });
  expect(result.current.floodFill).toBe('green');
});
