import { renderHook, act } from '@testing-library/react-hooks';
import { useStampIsActive } from './useStampIsActive';

test('should set stampIsActive from initial value', () => {
  const { result } = renderHook(() => useStampIsActive());
  expect(result.current.stampIsActive).toBe(false);
  expect(typeof result.current.updateStampIsActive).toBe('function');
});

test('should update stampIsActive', () => {
  const { result } = renderHook(() => useStampIsActive());

  act(() => {
    result.current.updateStampIsActive(true);
  });
  expect(result.current.stampIsActive).toBe(true);

  act(() => {
    result.current.updateStampIsActive(false);
  });
  expect(result.current.stampIsActive).toBe(false);
});
