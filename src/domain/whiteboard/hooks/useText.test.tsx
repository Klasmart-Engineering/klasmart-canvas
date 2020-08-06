import { renderHook, act } from '@testing-library/react-hooks';
import { useText } from './useText';

test('should set text from initial value', () => {
  const { result } = renderHook(() => useText());
  expect(result.current.text).toBe('');
  expect(typeof result.current.updateText).toBe('function');
});

test('should update text value', () => {
  const { result } = renderHook(() => useText());
  act(() => {
    result.current.updateText('I want to go to the movies');
  });
  expect(result.current.text).toBe('I want to go to the movies');
});
