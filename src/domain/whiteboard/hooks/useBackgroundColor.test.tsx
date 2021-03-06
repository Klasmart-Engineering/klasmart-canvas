import { renderHook, act } from '@testing-library/react-hooks';
import { useBackgroundColor } from './useBackgroundColor';

test('should set background color from initial value', () => {
  const { result } = renderHook(() => useBackgroundColor());
  expect(result.current.backgroundColor).toBe('#ffffff');
  expect(typeof result.current.updateBackgroundColor).toBe('function');
  act(() => {
    result.current.updateBackgroundColor('green');
  });
  expect(result.current.backgroundColor).toBe('green');
});

test('should update background color', () => {
  const { result } = renderHook(() => useBackgroundColor());

  act(() => {
    result.current.updateBackgroundColor('green');
  });
  expect(result.current.backgroundColor).toBe('green');
});
