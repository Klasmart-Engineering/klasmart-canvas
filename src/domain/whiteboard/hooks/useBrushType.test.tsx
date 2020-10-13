import { renderHook, act } from '@testing-library/react-hooks';
import { useBrushType } from './useBrushType';

test('should set brushType initial value', () => {
  const { result } = renderHook(() => useBrushType());
  expect(result.current.brushType).toBe('pen');
  expect(typeof result.current.updateBrushType).toBe('function');
});

test('should update fontFamily', () => {
  const { result } = renderHook(() => useBrushType('crayon'));
  act(() => {
    result.current.updateBrushType('chalk');
  });
  expect(result.current.brushType).toBe('chalk');
});
