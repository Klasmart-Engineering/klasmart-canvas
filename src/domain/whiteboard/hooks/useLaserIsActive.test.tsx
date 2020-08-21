import { renderHook, act } from '@testing-library/react-hooks';
import { useLaserIsActive, useLaserIsAvailable } from './useLaserIsActive';

test('should set laserIsActive from initial value', () => {
  const { result } = renderHook(() => useLaserIsActive());
  expect(result.current.laserIsActive).toBe(false);
  expect(typeof result.current.updateLaserIsActive).toBe('function');
});

test('should update laserIsActive', () => {
  const { result } = renderHook(() => useLaserIsActive());

  act(() => {
    result.current.updateLaserIsActive(true);
  });
  expect(result.current.laserIsActive).toBe(true);

  act(() => {
    result.current.updateLaserIsActive(false);
  });
  expect(result.current.laserIsActive).toBe(false);
});

test('should set laserIsAvailable from initial value', () => {
  const { result } = renderHook(() => useLaserIsAvailable());
  expect(result.current.laserIsAvailable).toBe(false);
  expect(typeof result.current.updateLaserIsAvailable).toBe('function');
});

test('should update laserIsAvailable', () => {
  const { result } = renderHook(() => useLaserIsAvailable());

  act(() => {
    result.current.updateLaserIsAvailable(true);
  });
  expect(result.current.laserIsAvailable).toBe(true);

  act(() => {
    result.current.updateLaserIsAvailable(false);
  });
  expect(result.current.laserIsAvailable).toBe(false);
});
