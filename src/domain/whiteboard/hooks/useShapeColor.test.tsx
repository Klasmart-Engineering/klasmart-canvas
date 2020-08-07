import { renderHook, act } from '@testing-library/react-hooks';
import { useShapeColor } from './useShapeColor';

test('should set shapeColor from initial value', () => {
  const { result } = renderHook(() => useShapeColor());
  expect(result.current.shapeColor).toBe('#000000');
  expect(typeof result.current.updateShapeColor).toBe('function');
  act(() => {
    result.current.updateShapeColor('green');
  });
  expect(result.current.shapeColor).toBe('green');
});

test('should update shapeColor', () => {
  const { result } = renderHook(() => useShapeColor());

  act(() => {
    result.current.updateShapeColor('green');
  });
  expect(result.current.shapeColor).toBe('green');
});
