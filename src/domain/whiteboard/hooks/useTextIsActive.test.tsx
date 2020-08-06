import { renderHook, act } from '@testing-library/react-hooks';
import { useTextIsActive } from './useTextIsActive';

test('should set textIsActive from initial value', () => {
  const { result } = renderHook(() => useTextIsActive());
  expect(result.current.textIsActive).toBe(false);
  expect(typeof result.current.updateTextIsActive).toBe('function');
});

test('should update textIsActive', () => {
  const { result } = renderHook(() => useTextIsActive());

  act(() => {
    result.current.updateTextIsActive(true);
  });
  expect(result.current.textIsActive).toBe(true);

  act(() => {
    result.current.updateTextIsActive(false);
  });
  expect(result.current.textIsActive).toBe(false);
});
