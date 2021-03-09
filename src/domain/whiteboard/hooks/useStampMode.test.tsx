import { renderHook, act } from '@testing-library/react-hooks';
import { useStampMode } from './useStampMode';

test('should set stampMode initial value', () => {
  const { result } = renderHook(() => useStampMode());
  expect(result.current.stampMode).toBe('student');
  expect(typeof result.current.updateStampMode).toBe('function');
});

test('should update stampMode', () => {
  const { result } = renderHook(() => useStampMode('student'));
  act(() => {
    result.current.updateStampMode('present');
  });
  expect(result.current.stampMode).toBe('present');
});
