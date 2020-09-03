import { renderHook, act } from '@testing-library/react-hooks';
import { useToolbarPermissions } from './useToolbarPermissions';
test('should set toolbarIsEnabled from initial value', function () {
    var result = renderHook(function () { return useToolbarPermissions(); }).result;
    expect(result.current.toolbarIsEnabled).toBe(true);
    expect(typeof result.current.setToolbarIsEnabled).toBe('function');
});
test('should update toolbarIsEnabled', function () {
    var result = renderHook(function () { return useToolbarPermissions(); }).result;
    act(function () {
        result.current.setToolbarIsEnabled(false);
    });
    expect(result.current.toolbarIsEnabled).toBe(false);
    act(function () {
        result.current.setToolbarIsEnabled(true);
    });
    expect(result.current.toolbarIsEnabled).toBe(true);
});
//# sourceMappingURL=useToolbarPermissions.test.js.map