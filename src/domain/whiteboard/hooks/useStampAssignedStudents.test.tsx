import { renderHook, act } from '@testing-library/react-hooks';
import { useStampAssignedStudents } from './useStampAssignedStudents';

test('should set stamp assigned students from initial value', () => {
  const { result } = renderHook(() => useStampAssignedStudents());

  expect(result.current.stampAssignedStudents).toStrictEqual([]);
  expect(typeof result.current.updateStampAssignedStudents).toBe('function');
});

test('should update stamp assigned students color', () => {
  const { result } = renderHook(() => useStampAssignedStudents());

  act(() => {
    result.current.updateStampAssignedStudents(['student', 'student2']);
  });
  expect(result.current.stampAssignedStudents).toStrictEqual([
    'student',
    'student2',
  ]);
});
