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
import { DialogActions, Button } from '@material-ui/core';

export interface ISetUserInfoToDisplayModal {
  selection: string;
  setSelection: (selection: string) => void;
}

/**
 Modal component to select user info option to display on the tooltip that appears hovering an object.
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

  /**
   * Handles change on user info selection event received
   */
  useEffect(()=>{
    eventController.on("setUserInfoToDisplay", (event, payload)=> {
      setUserInfo(payload)
    })
  }, [eventController, setUserInfo])

  /**
   * Component to display modal and handles change
   * @param {ISetUserInfoToDisplayModal} props 
   */
  const SetUserInfoToDisplayModal = (props: ISetUserInfoToDisplayModal) => {
    const { setSelection, selection } = props;
    
    /**
     * Handle input radio change
     * @param {React.ChangeEvent} event 
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value
      setSelection(value)
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
          <DialogActions>
            <Button
              onClick={closeInfoToDisplayModal}
              color="primary"
              variant="contained"
            >
              Close
            </Button>
           
          </DialogActions>
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
