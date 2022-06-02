import { renderHook, act } from '@testing-library/react-hooks';
import { useMoveCanvasIsActive } from './useMoveCanvasIsActive';

test('should set move canvas from initial value and update', () => {
  const { result } = renderHook(() => useMoveCanvasIsActive());
  expect(result.current.moveCanvasIsActive).toBe(false);
  expect(typeof result.current.updateMoveCanvasIsActive).toBe('function');
  act(() => {
    result.current.updateMoveCanvasIsActive(true);
  });
  expect(result.current.moveCanvasIsActive).toBe(true);
});
