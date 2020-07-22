import { useState } from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export const useStyles = (style: CSSProperties) => {
  const [styles, updateStyles] = useState(style);
  return { styles, updateStyles };
};
