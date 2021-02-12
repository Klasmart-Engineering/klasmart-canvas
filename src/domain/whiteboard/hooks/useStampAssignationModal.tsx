import React from 'react';
import { useState, useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
  Button,
  Checkbox,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';

export interface IStampAssignationModal {
  assignStudents: (studentIds: string[]) => void;
}

export const useStampAssignationModal = () => {
  const [stampAssignationModal, setOpen] = useState(false);

  const openStampAssignationModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeStampAssignationModal = useCallback(() => {
    setOpen(false);
  }, []);

  const StampAssignationModal = (props: IStampAssignationModal) => {
    const [students, setStudents] = useState([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const clicked = event.target.name;

      console.log(clicked);

      // setValue((event.target as HTMLInputElement).value);
    };

    return (
      <div>
        <Dialog
          open={stampAssignationModal}
          onClose={closeStampAssignationModal}
          aria-labelledby="stamp-assignation-dialog"
          aria-describedby="stamp-assignation-dialog"
        >
          <DialogTitle id="alert-dialog-title">
            {'Assign Stamp to:'}
          </DialogTitle>
          <div
            style={{
              padding: '20px',
            }}
          >
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={students[0]}
                      onChange={handleChange}
                      name="student1"
                    />
                  }
                  label="John"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={students[1]}
                      onChange={handleChange}
                      name="student2"
                    />
                  }
                  label="Mary"
                />
              </FormGroup>
            </FormControl>
          </div>
          <DialogActions>
            <Button
              onClick={closeStampAssignationModal}
              color="primary"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              component="span"
              color="default"
              variant="contained"
              onClick={closeStampAssignationModal}
            >
              Assign
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return {
    stampAssignationModal,
    openStampAssignationModal,
    closeStampAssignationModal,
    StampAssignationModal,
  };
};
