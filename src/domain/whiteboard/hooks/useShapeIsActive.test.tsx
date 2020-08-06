import { renderHook, act } from '@testing-library/react-hooks';
import { useShapeIsActive } from './useShapeIsActive';

test('should set shapeIsActive from initial value', () => {
  const { result } = renderHook(() => useShapeIsActive());
  expect(result.current.shapeIsActive).toBe(false);
  expect(typeof result.current.updateShapeIsActive).toBe('function');
});

test('should update shapeIsActive', () => {
  const { result } = renderHook(() => useShapeIsActive());

  act(() => {
    result.current.updateShapeIsActive(true);
  });
  expect(result.current.shapeIsActive).toBe(true);

  act(() => {
    result.current.updateShapeIsActive(false);
  });
  expect(result.current.shapeIsActive).toBe(false);
});
