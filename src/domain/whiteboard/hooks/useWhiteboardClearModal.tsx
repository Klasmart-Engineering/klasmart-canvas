import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

export interface IClearWhiteboardModal {
  clearWhiteboard(): void;
}

export const useWhiteboardClearModal = () => {
  const [clearWhiteboardModal, setOpen] = useState(false);
  const openModal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  
  const ClearWhiteboardModal = (props: IClearWhiteboardModal) => {
    return (
      <div>
        <Dialog
          open={clearWhiteboardModal}
          onClose={closeModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Are you sure you want to clear the board?'}
          </DialogTitle>
          <DialogActions>
            <Button onClick={closeModal} color="primary" variant="contained">
              Cancel
            </Button>
            <Button
              onClick={props.clearWhiteboard}
              color="secondary"
              variant="contained"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return { clearWhiteboardModal, openModal, closeModal, ClearWhiteboardModal };
};
