import { renderHook, act } from '@testing-library/react-hooks';
import { usePointerPermissions } from './usePointerPermissions';

test('should set pointerIsEnabled from initial value', () => {
  const { result } = renderHook(() => usePointerPermissions());
  expect(result.current.pointerIsEnabled).toBe(true);
  expect(typeof result.current.setPointerIsEnabled).toBe('function');
});

test('should update pointerIsEnabled', () => {
  const { result } = renderHook(() => usePointerPermissions());

  act(() => {
    result.current.setPointerIsEnabled(false);
  });
  expect(result.current.pointerIsEnabled).toBe(false);

  act(() => {
    result.current.setPointerIsEnabled(true);
  });
  expect(result.current.pointerIsEnabled).toBe(true);
});
