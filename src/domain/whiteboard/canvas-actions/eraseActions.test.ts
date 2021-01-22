
import { renderHook, act } from '@testing-library/react-hooks';
import { useEraseObject } from './eraseActions';
import { createCanvas } from 'canvas';

const canvas =  {
  ...createCanvas(200, 200),
  appendChild: () => (createCanvas(200, 200))
};

test('should set useClearWhiteboardSelf as a function', () => {
  const { result } = renderHook(() => (
    useEraseObject(
      // @ts-ignore
      canvas,
      'test',
      'test'))
  );
  expect(typeof result.current).toBe('function');
});