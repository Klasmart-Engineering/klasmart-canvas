import React, {  useCallback, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { ObjectEvent } from '../event-serializer/PaintEventSerializer';
import { useEffect } from 'react';
import { UserInfoTooltip } from '../brushes/classes/userInfoTooltip';

export interface ISetUserInfoToDisplayModal {
  selection: string;
  setSelection: (selection: string) => void;
}

/**
 Modal component to set user info to display.
 */

export const useSetUserInfoToDisplayModal = (setUserInfo: (value: string) => void) => {
  
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  const [setUserInfoToDisplayModal, setOpen] = useState(false);
  const openSetUserInfoToDisplayModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeInfoToDisplayModal = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(()=>{
    eventController.on("setUserInfoToDisplay", (event, payload)=> {
      setUserInfo(payload)
    })
  }, [eventController])

  const SetUserInfoToDisplayModal = (props: ISetUserInfoToDisplayModal) => {
    const { setSelection, selection } = props;
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value
      setSelection(value)
      closeInfoToDisplayModal()
      const payload: ObjectEvent = {
        type: 'userInfoToDisplay',
        target: value,
        id: 'teacher',
      };

      eventSerializer.push('setUserInfoToDisplay', payload);
    };

    return (
      <div>
        <Dialog
          open={setUserInfoToDisplayModal}
          onClose={closeInfoToDisplayModal}
          aria-labelledby="user-info-to-display-dialog"
          aria-describedby="user-info-to-display-dialog"
        >
          <DialogTitle id="alert-dialog-title">
            {'Set user info to display'}
          </DialogTitle>
          <div
            style={{
              padding: '20px',
            }}
          >
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="infotodisplay"
                name="infotodisplay"
                value={selection}
                onChange={handleChange}
              >
                {UserInfoTooltip.infoOptions.map(option => (
                  <FormControlLabel
                  key={option.value}
                  checked={selection === option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
                ))}
                
              </RadioGroup>
            </FormControl>
          </div>
        </Dialog>
      </div>
    );
  };

  return {
    openSetUserInfoToDisplayModal,
    closeInfoToDisplayModal,
    SetUserInfoToDisplayModal,
  };
};
