import { renderHook, act } from '@testing-library/react-hooks';
import { usePointerEvents } from './usePointerEvents';
test('should set pointerEvents from initial value', function () {
    var result = renderHook(function () { return usePointerEvents(); }).result;
    expect(result.current.pointerEvents).toBe(true);
    expect(typeof result.current.setPointerEvents).toBe('function');
});
test('should update pointerEvents', function () {
    var result = renderHook(function () { return usePointerEvents(); }).result;
    act(function () {
        result.current.setPointerEvents(true);
    });
    expect(result.current.pointerEvents).toBe(true);
    act(function () {
        result.current.setPointerEvents(false);
    });
    expect(result.current.pointerEvents).toBe(false);
});
//# sourceMappingURL=usePointerEvents.test.js.map