import React, { ChangeEvent, CSSProperties } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function WhiteboardToggle(props: {
  label: string;
  state: boolean;
  onStateChange: (value: boolean) => void;
}) {
  const { label, state, onStateChange } = props;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentState = event.target.checked;
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
