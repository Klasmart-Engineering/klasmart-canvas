import { renderHook, act } from '@testing-library/react-hooks';
import { useToolbarPermissions } from './useToolbarPermissions';

test('should set toolbarIsEnabled from initial value', () => {
  const { result } = renderHook(() => useToolbarPermissions());
  expect(result.current.toolbarIsEnabled).toBe(true);
  expect(typeof result.current.setToolbarIsEnabled).toBe('function');
});

test('should update toolbarIsEnabled', () => {
  const { result } = renderHook(() => useToolbarPermissions());

  act(() => {
    result.current.setToolbarIsEnabled(false);
  });
  expect(result.current.toolbarIsEnabled).toBe(false);

  act(() => {
    result.current.setToolbarIsEnabled(true);
  });
  expect(result.current.toolbarIsEnabled).toBe(true);
});
