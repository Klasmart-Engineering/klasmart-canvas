import { renderHook, act } from '@testing-library/react-hooks';
import { useFontColor } from './useFontColor';
test('should set fontColor from initial value', function () {
    var result = renderHook(function () { return useFontColor(); }).result;
    expect(result.current.fontColor).toBe('#000');
    expect(typeof result.current.updateFontColor).toBe('function');
    act(function () {
        result.current.updateFontColor('green');
    });
    expect(result.current.fontColor).toBe('green');
});
test('should update shapeColor', function () {
    var result = renderHook(function () { return useFontColor(); }).result;
    act(function () {
        result.current.updateFontColor('green');
    });
    expect(result.current.fontColor).toBe('green');
});
//# sourceMappingURL=useFontColor.test.js.map