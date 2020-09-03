import { renderHook, act } from '@testing-library/react-hooks';
import { useLaserIsActive, useLaserIsAvailable } from './useLaserIsActive';
test('should set laserIsActive from initial value', function () {
    var result = renderHook(function () { return useLaserIsActive(); }).result;
    expect(result.current.laserIsActive).toBe(false);
    expect(typeof result.current.updateLaserIsActive).toBe('function');
});
test('should update laserIsActive', function () {
    var result = renderHook(function () { return useLaserIsActive(); }).result;
    act(function () {
        result.current.updateLaserIsActive(true);
    });
    expect(result.current.laserIsActive).toBe(true);
    act(function () {
        result.current.updateLaserIsActive(false);
    });
    expect(result.current.laserIsActive).toBe(false);
});
test('should set laserIsAvailable from initial value', function () {
    var result = renderHook(function () { return useLaserIsAvailable(); }).result;
    expect(result.current.laserIsAvailable).toBe(false);
    expect(typeof result.current.updateLaserIsAvailable).toBe('function');
});
test('should update laserIsAvailable', function () {
    var result = renderHook(function () { return useLaserIsAvailable(); }).result;
    act(function () {
        result.current.updateLaserIsAvailable(true);
    });
    expect(result.current.laserIsAvailable).toBe(true);
    act(function () {
        result.current.updateLaserIsAvailable(false);
    });
    expect(result.current.laserIsAvailable).toBe(false);
});
//# sourceMappingURL=useLaserIsActive.test.js.map