import { renderHook, act } from '@testing-library/react-hooks';
import { usePerfectShapeIsActive } from './perfectShapeIsActive';

test('should set perfectShapeIsActive from initial value', () => {
  const { result } = renderHook(() => usePerfectShapeIsActive());
  expect(result.current.perfectShapeIsActive).toBe(false);
  expect(typeof result.current.updatePerfectShapeIsActive).toBe('function');
});

test('should update perfectShapeIsActive', () => {
  const { result } = renderHook(() => usePerfectShapeIsActive());

  act(() => {
    result.current.updatePerfectShapeIsActive(true);
  });
  expect(result.current.perfectShapeIsActive).toBe(true);

  act(() => {
    result.current.updatePerfectShapeIsActive(false);
  });
  expect(result.current.perfectShapeIsActive).toBe(false);
});
