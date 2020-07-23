import { renderHook, act } from '@testing-library/react-hooks';
import { useLineWidth } from './useLineWidth';

test('should set lineWidth from initial value', () => {
  const { result } = renderHook(() => useLineWidth());
  expect(result.current.lineWidth).toBe(4);
  expect(typeof result.current.updateLineWidth).toBe('function');
  act(() => {
    result.current.updateLineWidth(8);
  });
  expect(result.current.lineWidth).toBe(8);
});

test('should update lineWidth', () => {
  const { result } = renderHook(() => useLineWidth(20));

  act(() => {
    result.current.updateLineWidth(16);
  });
  expect(result.current.lineWidth).toBe(16);
});
