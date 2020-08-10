import { renderHook, act } from '@testing-library/react-hooks';
import { useLineWidth } from './useLineWidth';
test('should set lineWidth from initial value', function () {
    var result = renderHook(function () { return useLineWidth(); }).result;
    expect(result.current.lineWidth).toBe(2);
    expect(typeof result.current.updateLineWidth).toBe('function');
    act(function () {
        result.current.updateLineWidth(8);
    });
    expect(result.current.lineWidth).toBe(8);
});
test('should update lineWidth', function () {
    var result = renderHook(function () { return useLineWidth(20); }).result;
    act(function () {
        result.current.updateLineWidth(16);
    });
    expect(result.current.lineWidth).toBe(16);
});
//# sourceMappingURL=useLineWidth.test.js.map