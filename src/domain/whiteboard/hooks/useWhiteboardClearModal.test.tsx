import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useWhiteboardClearModal } from './useWhiteboardClearModal';

test('should set clearWhiteboardModal from initial value', () => {
  const { result } = renderHook(() => useWhiteboardClearModal());
  expect(result.current.clearWhiteboardModal).toBe(false);
  expect(typeof result.current.openModal).toBe('function');
  expect(typeof result.current.closeModal).toBe('function');
  expect(typeof result.current.ClearWhiteboardModal).toBe('function');
});

test('should update clearWhiteboardModal', () => {
  const { result } = renderHook(() => useWhiteboardClearModal());

  act(() => {
    result.current.openModal();
  });
  expect(result.current.clearWhiteboardModal).toBe(true);

  act(() => {
    result.current.closeModal();
  });
  expect(result.current.clearWhiteboardModal).toBe(false);
});
