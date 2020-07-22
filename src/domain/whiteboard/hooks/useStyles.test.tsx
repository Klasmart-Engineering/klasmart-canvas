import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useStyles } from './useStyles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const styles: CSSProperties = {
  border: '1px solid blue',
  width: '200px',
  height: '100px',
  position: 'absolute',
  pointerEvents: 'auto',
};

test('should set styles from initial value', () => {
  const { result } = renderHook(() => useStyles(styles));
  expect(result.current.styles).toBe(styles);
  expect(typeof result.current.updateStyles).toBe('function');
});

test('should update styles value', () => {
  const { result } = renderHook(() => useStyles(styles));
  const updatedStyles: CSSProperties = { ...styles, pointerEvents: 'none' };

  act(() => {
    result.current.updateStyles(updatedStyles);
  });
  expect(result.current.styles).toBe(updatedStyles);
});
