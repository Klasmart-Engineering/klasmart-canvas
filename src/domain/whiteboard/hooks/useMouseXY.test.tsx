import { renderHook, act } from '@testing-library/react-hooks';
import { useMouseXY } from './useMouseXY';

test('should set mousexy from initial value and update', () => {
  const { result } = renderHook(() => useMouseXY());
  expect(result.current.mouseXY).toBe({x:0,y:0});
  expect(typeof result.current.updateMouseXY).toBe('function');
  act(() => {
    result.current.updateMouseXY({x:1,y:1});
  });
  expect(result.current.mouseXY).toBe({x:1,y:1});
});
