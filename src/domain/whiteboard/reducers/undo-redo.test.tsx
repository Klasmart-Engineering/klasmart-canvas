import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useUndoRedo, UNDO, REDO, SET, MODIFY, CanvasHistoryState, CanvasAction } from './undo-redo';
import { Canvas } from 'fabric/fabric-impl';

const initialState = {
  states: [],
  actionType: null,
  activeStateIndex: null,
  activeState: null,
};

test('should set text from initial value', () => {
  const { result } = renderHook<any, { state: CanvasHistoryState, dispatch: React.Dispatch<CanvasAction> }>(() => useUndoRedo());
  expect(result.current.state.states.length).toEqual(0);
});
