import React, {  useCallback, useState } from 'react';
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
import Modal from 'react-modal';


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
    if(!setUserInfoToDisplayModal)
      setOpen(true);
  }, [setUserInfoToDisplayModal]);

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
    const [value, setValue] = useState(selection)
    
    /**
     * Handle input radio change
     * @param {React.ChangeEvent} event 
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value
      setValue(value)
    };

    const confirm = () => {
      setSelection(value)
      const payload: ObjectEvent = {
        type: 'userInfoToDisplay',
        target: value,
        id: 'teacher',
      };
      eventSerializer.push('setUserInfoToDisplay', payload);
      setOpen(false);
    }

    const cancel = () => {
      setOpen(false);
    }

    return (
      <div>
        <Modal
          isOpen={setUserInfoToDisplayModal}
          onRequestClose={cancel}
          aria-labelledby="user-info-to-display-dialog"
          aria-describedby="user-info-to-display-dialog"
          id="userinfo-modal"
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
                  checked={value === option.value}
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
              onClick={cancel}
              color="default"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              onClick={confirm}
              color="primary"
              variant="contained"
            >
              Confirm
            </Button>
          </DialogActions>
        </Modal>
      </div>
    );
  };

  return {
    openSetUserInfoToDisplayModal,
    SetUserInfoToDisplayModal,
  };
};
