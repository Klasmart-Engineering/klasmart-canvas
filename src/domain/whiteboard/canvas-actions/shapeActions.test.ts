import { renderHook } from '@testing-library/react-hooks';
import { shapeSelector, useSpecialShapeSelector } from './shapeActions';

const props = {
  brushType: 'pen',
  lineWidth: 2,
  penColor: '#000',
  shape: 'rectangle',
  shapeColor: '#000',
};

test('shapeSelector should return an object', () => {
  const { result } = renderHook(() => (
    // @ts-ignore
    shapeSelector(props)
  ));
  expect(typeof result.current).toBe('object');
});

test('expect useSpecialShapeSelector to return function', () => {
  const { result } = renderHook(() => (
    // @ts-ignore
    useSpecialShapeSelector('test')
  ));
  expect(typeof result.current).toBe('function');
});