import { renderHook, act } from '@testing-library/react-hooks';
import { useClearIsActive } from './useClearIsActive';
test('should set clearIsActive from initial value', function () {
    var result = renderHook(function () { return useClearIsActive(); }).result;
    expect(result.current.clearIsActive).toBe(false);
    expect(typeof result.current.updateClearIsActive).toBe('function');
});
test('should update clearIsActive', function () {
    var result = renderHook(function () { return useClearIsActive(); }).result;
    act(function () {
        result.current.updateClearIsActive(true);
    });
    expect(result.current.clearIsActive).toBe(true);
    act(function () {
        result.current.updateClearIsActive(false);
    });
    expect(result.current.clearIsActive).toBe(false);
});
//# sourceMappingURL=useClearIsActive.test.js.map