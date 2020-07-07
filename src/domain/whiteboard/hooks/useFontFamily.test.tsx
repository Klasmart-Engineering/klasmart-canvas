import { renderHook, act } from '@testing-library/react-hooks';
import { useFontFamily } from './useFontFamily';

test('should set fontFamily initial value', () => {
  const { result } = renderHook(() => useFontFamily());
  expect(result.current.fontFamily).toBe('Arial');
  expect(typeof result.current.updateFontFamily).toBe('function');
});

test('should update fontFamily', () => {
  const { result } = renderHook(() => useFontFamily('Crayon'));
  act(() => {
    result.current.updateFontFamily('Chalk');
  });
  expect(result.current.fontFamily).toBe('Chalk');
});
