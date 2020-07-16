import { renderHook, act } from '@testing-library/react-hooks';
import { useEraseType } from './useEraseType';

test('should set eraseType initial value', () => {
  const { result } = renderHook(() => useEraseType());
  expect(result.current.eraseType).toBe('');
  expect(typeof result.current.updateEraseType).toBe('function');
});

test('should update eraseType', () => {
  const { result } = renderHook(() => useEraseType('Spot Erase'));
  act(() => {
    result.current.updateEraseType('Object Erase');
  });
  expect(result.current.eraseType).toBe('Object Erase');
});
