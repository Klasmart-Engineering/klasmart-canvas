import { renderHook, act } from '@testing-library/react-hooks';
import { useFontColor } from './useFontColor';

test('should set fontColor from initial value', () => {
  const { result } = renderHook(() => useFontColor());
  expect(result.current.fontColor).toBe('black');
  expect(typeof result.current.updateFontColor).toBe('function');
  act(() => {
    result.current.updateFontColor('green');
  });
  expect(result.current.fontColor).toBe('green');
});

test('should update shapeColor', () => {
  const { result } = renderHook(() => useFontColor());

  act(() => {
    result.current.updateFontColor('green');
  });
  expect(result.current.fontColor).toBe('green');
});
