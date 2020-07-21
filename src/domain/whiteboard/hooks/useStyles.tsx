import { useState } from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

// const defaultStyle: CSSProperties = {
//   border: '1px solid blue',
//   width: '640px',
//   height: '275px',
//   position: 'absolute',
//   pointerEvents: 'none',
// };

export const useStyles = (style: CSSProperties) => {
  const [ styles, updateStyles ] = useState(style);
  return { styles, updateStyles };
};
