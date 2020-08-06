import { renderHook, act } from '@testing-library/react-hooks';
import { useEraseType } from './useEraseType';
test('should set eraseType initial value', function () {
    var result = renderHook(function () { return useEraseType(); }).result;
    expect(result.current.eraseType).toBe(null);
    expect(typeof result.current.updateEraseType).toBe('function');
});
test('should update eraseType', function () {
    var result = renderHook(function () { return useEraseType('partial'); }).result;
    act(function () {
        result.current.updateEraseType('object');
    });
    expect(result.current.eraseType).toBe('object');
});
//# sourceMappingURL=useEraseType.test.js.map