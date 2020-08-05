import { renderHook, act } from '@testing-library/react-hooks';
import { useShapeColor } from './useShapeColor';
test('should set shapeColor from initial value', function () {
    var result = renderHook(function () { return useShapeColor(); }).result;
    expect(result.current.shapeColor).toBe('#000');
    expect(typeof result.current.updateShapeColor).toBe('function');
    act(function () {
        result.current.updateShapeColor('green');
    });
    expect(result.current.shapeColor).toBe('green');
});
test('should update shapeColor', function () {
    var result = renderHook(function () { return useShapeColor(); }).result;
    act(function () {
        result.current.updateShapeColor('green');
    });
    expect(result.current.shapeColor).toBe('green');
});
//# sourceMappingURL=useShapeColor.test.js.map