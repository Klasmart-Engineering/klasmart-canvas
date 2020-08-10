import { renderHook, act } from '@testing-library/react-hooks';
import { useFloodFillIsActive } from './useFloodFillIsActive';
test('should set floodFillIsActive from initial value', function () {
    var result = renderHook(function () { return useFloodFillIsActive(); }).result;
    expect(result.current.floodFillIsActive).toBe(false);
    expect(typeof result.current.updateFloodFillIsActive).toBe('function');
});
test('should update floddFillIsActive', function () {
    var result = renderHook(function () { return useFloodFillIsActive(); }).result;
    act(function () {
        result.current.updateFloodFillIsActive(true);
    });
    expect(result.current.floodFillIsActive).toBe(true);
    act(function () {
        result.current.updateFloodFillIsActive(false);
    });
    expect(result.current.floodFillIsActive).toBe(false);
});
//# sourceMappingURL=useFloodFillIsActive.test.js.map