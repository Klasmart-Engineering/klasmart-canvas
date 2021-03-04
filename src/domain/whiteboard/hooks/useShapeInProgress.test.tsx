import { renderHook, act } from '@testing-library/react-hooks';
import { useShapeInProgress } from './useShapeInProgress';

test('should set shapeInProgress from initial value', () => {
  const { result } = renderHook(() => useShapeInProgress());
  expect(result.current.shapeInProgress).toBe(false);
  expect(typeof result.current.updateShapeInProgress).toBe('function');
});

test('should update shapeInProgress', () => {
  const { result } = renderHook(() => useShapeInProgress());

  act(() => {
    result.current.updateShapeInProgress(true);
  });
  expect(result.current.shapeInProgress).toBe(true);

  act(() => {
    result.current.updateShapeInProgress(false);
  });
  expect(result.current.shapeInProgress).toBe(false);
});
