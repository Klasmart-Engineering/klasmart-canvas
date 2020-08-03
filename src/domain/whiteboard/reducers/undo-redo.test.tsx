import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import {
  useUndoRedo,
  UNDO,
  REDO,
  SET,
  CanvasHistoryState,
  CanvasAction,
} from './undo-redo';

test('should set state history from initial value', () => {
  const { result } = renderHook<
    any,
    { state: CanvasHistoryState; dispatch: React.Dispatch<CanvasAction> }
  >(() => useUndoRedo());
  expect(result.current.state.states.length).toEqual(0);
});

test('should set state history to activeStateIndex 0.', () => {
  const { result } = renderHook<
    any,
    { state: CanvasHistoryState; dispatch: React.Dispatch<CanvasAction> }
  >(() => useUndoRedo());

  act(() => {
    result.current.dispatch({ type: SET, payload: [{ padding: 12 }] as fabric.Object[] });
  });

  expect(result.current.state.states.length).toEqual(1);
  expect(result.current.state.activeStateIndex).toEqual(0);
});

test('should set state history to activeStateIndex 1.', () => {
  const { result } = renderHook<
    any,
    { state: CanvasHistoryState; dispatch: React.Dispatch<CanvasAction> }
  >(() => useUndoRedo());

  act(() => {
    result.current.dispatch({
      type: SET,
      payload: [{ padding: 12 }, { padding: 14 }] as fabric.Object[],
    });
    result.current.dispatch({
      type: SET,
      payload: [{ padding: 12 }, { padding: 16 }] as fabric.Object[],
    });
  });

  expect(result.current.state.states.length).toEqual(2);
  expect(result.current.state.activeStateIndex).toEqual(1);
});

test('should set state history to activeStateIndex 0 when undone.', () => {
  const { result } = renderHook<
    any,
    { state: CanvasHistoryState; dispatch: React.Dispatch<CanvasAction> }
  >(() => useUndoRedo());

  act(() => {
    result.current.dispatch({
      type: SET,
      payload: [{ padding: 18 }, { padding: 10 }] as fabric.Object[],
    });
    result.current.dispatch({
      type: SET,
      payload: [{ padding: 28 }, { padding: 20 }] as fabric.Object[],
    });
    result.current.dispatch({ type: UNDO });
  });

  expect(result.current.state.states.length).toEqual(2);
  expect(result.current.state.activeStateIndex).toEqual(0);

  act(() => {
    result.current.dispatch({ type: REDO });
  });

  expect(result.current.state.activeStateIndex).toEqual(1);
});

test('should set state history to activeStateIndex 1 when redone.', () => {
  const { result } = renderHook<
    any,
    { state: CanvasHistoryState; dispatch: React.Dispatch<CanvasAction> }
  >(() => useUndoRedo());

  act(() => {
    result.current.dispatch({
      type: SET,
      payload: [{ padding: 10 }, { padding: 12 }] as fabric.Object[],
    });
    result.current.dispatch({
      type: SET,
      payload: [{ padding: 11 }, { padding: 11 }] as fabric.Object[],
    });
    result.current.dispatch({ type: UNDO });
    result.current.dispatch({ type: REDO });
  });

  expect(result.current.state.activeStateIndex).toEqual(1);
});
