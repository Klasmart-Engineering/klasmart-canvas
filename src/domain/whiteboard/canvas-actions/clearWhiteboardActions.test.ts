import { renderHook, act } from '@testing-library/react-hooks';
import { useClearWhiteboardSelf, useClearWhiteboardOthers, useClearWhiteboardClearAll } from './clearWhiteboardActions';
import { createCanvas } from 'canvas';
import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';

const canvas =  {
  ...createCanvas(200, 200),
  appendChild: () => (createCanvas(200, 200))
};

const fakeFunc = (prop: any) => ({});

test('should set useClearWhiteboardSelf as a function', () => {
  const { result } = renderHook(() => (
    useClearWhiteboardSelf(
      // @ts-ignore
      canvas,
      'test',
      fakeFunc,
      fakeFunc,
      fakeFunc,
      true,
      null,
      fakeFunc,
      false,
      'test',
      null,
      null))
  );
  expect(typeof result.current).toBe('function');
});

test('should set useClearWhiteboardOthers as a function', () => {
  const { result } = renderHook(() => (
    useClearWhiteboardOthers(
      // @ts-ignore
      canvas,
      fakeFunc,
      fakeFunc,
      new PaintEventSerializer(1)))
  );
  expect(typeof result.current).toBe('function');
});

test('should set useClearWhiteboardClearAll as a function', () => {
  const { result } = renderHook(() => (
    useClearWhiteboardClearAll(
      // @ts-ignore
      canvas,
      'test',
      fakeFunc,
      fakeFunc,
      fakeFunc,
      fakeFunc))
  );
  expect(typeof result.current).toBe('function');
});

