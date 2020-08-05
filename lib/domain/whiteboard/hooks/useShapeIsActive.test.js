import { renderHook, act } from '@testing-library/react-hooks';
import { useShapeIsActive } from './useShapeIsActive';
test('should set shapeIsActive from initial value', function () {
    var result = renderHook(function () { return useShapeIsActive(); }).result;
    expect(result.current.shapeIsActive).toBe(false);
    expect(typeof result.current.updateShapeIsActive).toBe('function');
});
test('should update shapeIsActive', function () {
    var result = renderHook(function () { return useShapeIsActive(); }).result;
    act(function () {
        result.current.updateShapeIsActive(true);
    });
    expect(result.current.shapeIsActive).toBe(true);
    act(function () {
        result.current.updateShapeIsActive(false);
    });
    expect(result.current.shapeIsActive).toBe(false);
});
//# sourceMappingURL=useShapeIsActive.test.js.map