import { renderHook, act } from '@testing-library/react-hooks';
import { useUndoRedo, UNDO, REDO, SET, } from './undo-redo';
test('should set state history from initial value', function () {
    var result = renderHook(function () { return useUndoRedo(); }).result;
    expect(result.current.state.states.length).toEqual(0);
});
test('should set state history to activeStateIndex 0.', function () {
    var result = renderHook(function () { return useUndoRedo(); }).result;
    act(function () {
        result.current.dispatch({
            type: SET,
            payload: [{ padding: 12 }],
        });
    });
    expect(result.current.state.states.length).toEqual(1);
    expect(result.current.state.activeStateIndex).toEqual(0);
});
test('should set state history to activeStateIndex 1.', function () {
    var result = renderHook(function () { return useUndoRedo(); }).result;
    act(function () {
        result.current.dispatch({
            type: SET,
            payload: [{ padding: 12 }, { padding: 14 }],
        });
        result.current.dispatch({
            type: SET,
            payload: [{ padding: 12 }, { padding: 16 }],
        });
    });
    expect(result.current.state.states.length).toEqual(2);
    expect(result.current.state.activeStateIndex).toEqual(1);
});
test('should set state history to activeStateIndex 0 when undone.', function () {
    var result = renderHook(function () { return useUndoRedo(); }).result;
    act(function () {
        result.current.dispatch({
            type: SET,
            payload: [{ padding: 18 }, { padding: 10 }],
        });
        result.current.dispatch({
            type: SET,
            payload: [{ padding: 28 }, { padding: 20 }],
        });
        result.current.dispatch({ type: UNDO });
    });
    expect(result.current.state.states.length).toEqual(2);
    expect(result.current.state.activeStateIndex).toEqual(0);
    act(function () {
        result.current.dispatch({ type: REDO });
    });
    expect(result.current.state.activeStateIndex).toEqual(1);
});
test('should set state history to activeStateIndex 1 when redone.', function () {
    var result = renderHook(function () { return useUndoRedo(); }).result;
    act(function () {
        result.current.dispatch({
            type: SET,
            payload: [{ padding: 10 }, { padding: 12 }],
        });
        result.current.dispatch({
            type: SET,
            payload: [{ padding: 11 }, { padding: 11 }],
        });
        result.current.dispatch({ type: UNDO });
        result.current.dispatch({ type: REDO });
    });
    expect(result.current.state.activeStateIndex).toEqual(1);
});
//# sourceMappingURL=undo-redo.test.js.map