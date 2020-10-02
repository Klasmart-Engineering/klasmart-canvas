import React, { useState, ChangeEvent, CSSProperties } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function WhiteboardToggle(props: {
  label: string;
  initialState: boolean;
  onStateChange: (value: boolean) => void;
}) {
  const { label, initialState, onStateChange } = props;
  const [state, setState] = useState(initialState);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentState = event.target.checked;
    setState(currentState);
    onStateChange(currentState);
  };

  const containerStyle: CSSProperties = {
    display: 'inline-block',
    paddingLeft: 10,
  };

  return (
    <div style={containerStyle}>
      <FormControlLabel
        control={
          <Switch
            checked={state}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label={label}
      />
    </div>
  );
}
