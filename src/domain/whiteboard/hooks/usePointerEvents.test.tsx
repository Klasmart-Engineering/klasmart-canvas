import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { usePointerEvents } from './usePointerEvents';

test('should set pointerEvents from initial value', () => {
  const { result } = renderHook(() => usePointerEvents());
  expect(result.current.pointerEvents).toBe(false);
  expect(typeof result.current.setPointerEvents).toBe('function');
});

test('should update pointerEvents', () => {
  const { result } = renderHook(() => usePointerEvents());

  act(() => {
    result.current.setPointerEvents(true);
  });
  expect(result.current.pointerEvents).toBe(true);

  act(() => {
    result.current.setPointerEvents(false);
  });
  expect(result.current.pointerEvents).toBe(false);
});
