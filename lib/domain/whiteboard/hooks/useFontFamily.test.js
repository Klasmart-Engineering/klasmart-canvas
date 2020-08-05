import { renderHook, act } from '@testing-library/react-hooks';
import { useFontFamily } from './useFontFamily';
test('should set fontFamily initial value', function () {
    var result = renderHook(function () { return useFontFamily(); }).result;
    expect(result.current.fontFamily).toBe('Arial');
    expect(typeof result.current.updateFontFamily).toBe('function');
});
test('should update fontFamily', function () {
    var result = renderHook(function () { return useFontFamily('Crayon'); }).result;
    act(function () {
        result.current.updateFontFamily('Chalk');
    });
    expect(result.current.fontFamily).toBe('Chalk');
});
//# sourceMappingURL=useFontFamily.test.js.map