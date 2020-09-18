import { renderHook, act } from '@testing-library/react-hooks';
import { useLineWidthIsActive } from './lineWidthIsActive';

test('should set lineWidthIsActive from initial value', () => {
  const { result } = renderHook(() => useLineWidthIsActive());
  expect(result.current.lineWidthIsActive).toBe(false);
  expect(typeof result.current.updateLineWidthIsActive).toBe('function');
});

test('should update lineWidthIsActive', () => {
  const { result } = renderHook(() => useLineWidthIsActive());

  act(() => {
    result.current.updateLineWidthIsActive(true);
  });
  expect(result.current.lineWidthIsActive).toBe(true);

  act(() => {
    result.current.updateLineWidthIsActive(false);
  });
  expect(result.current.lineWidthIsActive).toBe(false);
});
