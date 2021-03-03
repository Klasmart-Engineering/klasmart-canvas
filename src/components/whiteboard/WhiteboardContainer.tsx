import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { relative } from 'path';

/**
 * Container for WhiteboardCanvas used to resize
 * proportionally the canvas background
 * @param props - Properties needed to render the component:
 * @field {number} width: initial width for the container
 * @field {number} height: initial heigth for the container
 * @field {React.ReactNode} children: container's content
 */
export function WhiteboardContainer(props: {
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  const { width, height, children } = props;

  /**
   * Calculates the padding in the container to resize it proportionally
   */
  const calcProportionalPadding = () => {
    return ((height / width) * 100) / 2;
  };

  const wrapperStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 13px 0 8px',
    position: 'relative'
  };

  const resizeDivStyle: CSSProperties = {
    width: '100%',
    height: '0',
    position: 'relative',
    paddingBottom: `${calcProportionalPadding()}%`,
    paddingTop: `${calcProportionalPadding()}%`,
  };

  const containerStyle: CSSProperties = {
    border: '2px blue solid',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  };

  return (
    <div style={wrapperStyle}>
      <div style={resizeDivStyle}>
        <div style={containerStyle}>{children}</div>
      </div>
    </div>
  );
}
