import { renderHook, act } from '@testing-library/react-hooks';
import { useShape } from './useShape';
test('should set shape from initial value', function () {
    var result = renderHook(function () { return useShape(); }).result;
    expect(result.current.shape).toBe('rectangle');
    expect(typeof result.current.updateShape).toBe('function');
});
test('should update shape value', function () {
    var result = renderHook(function () { return useShape(); }).result;
    act(function () {
        result.current.updateShape('circle');
    });
    expect(result.current.shape).toBe('circle');
});
//# sourceMappingURL=useShape.test.js.map