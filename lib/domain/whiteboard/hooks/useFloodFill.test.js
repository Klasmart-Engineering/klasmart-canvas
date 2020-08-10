import { renderHook, act } from '@testing-library/react-hooks';
import { useFloodFill } from './useFloodFill';
test('should set floodFill from initial value', function () {
    var result = renderHook(function () { return useFloodFill(); }).result;
    expect(result.current.floodFill).toBe('#000000');
    expect(typeof result.current.updateFloodFill).toBe('function');
    act(function () {
        result.current.updateFloodFill('green');
    });
    expect(result.current.floodFill).toBe('green');
});
test('should update floodFill', function () {
    var result = renderHook(function () { return useFloodFill(); }).result;
    act(function () {
        result.current.updateFloodFill('green');
    });
    expect(result.current.floodFill).toBe('green');
});
//# sourceMappingURL=useFloodFill.test.js.map