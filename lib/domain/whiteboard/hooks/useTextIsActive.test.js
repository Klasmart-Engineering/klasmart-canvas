import { renderHook, act } from '@testing-library/react-hooks';
import { useTextIsActive } from './useTextIsActive';
test('should set textIsActive from initial value', function () {
    var result = renderHook(function () { return useTextIsActive(); }).result;
    expect(result.current.textIsActive).toBe(false);
    expect(typeof result.current.updateTextIsActive).toBe('function');
});
test('should update textIsActive', function () {
    var result = renderHook(function () { return useTextIsActive(); }).result;
    act(function () {
        result.current.updateTextIsActive(true);
    });
    expect(result.current.textIsActive).toBe(true);
    act(function () {
        result.current.updateTextIsActive(false);
    });
    expect(result.current.textIsActive).toBe(false);
});
//# sourceMappingURL=useTextIsActive.test.js.map