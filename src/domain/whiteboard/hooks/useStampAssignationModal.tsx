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
import { IUser } from '../../../interfaces/user/user';

export interface IStampAssignationModal {
  assignStudents: (studentIds: string[]) => void;
  studentsList: IUser[];
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
    const { studentsList, assignStudents } = props;
    const initStudentsArray = () => {
      return studentsList.map((_) => false);
    };

    const [studentsStatus, setStudentsStatus] = useState(initStudentsArray());

    const [selectionExists, setSelectionExists] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let status = studentsStatus;

      const clicked = event.target.id;
      const clickedIndex = studentsList.findIndex(
        (student) => student.id === clicked
      );

      studentsStatus[clickedIndex] = event.target.checked;

      setStudentsStatus(status);
      areStudentsSelected();
    };

    const assignStampToStudents = () => {
      const assigned = studentsList
        .filter((_, index) => {
          return studentsStatus[index];
        })
        .map((student) => student.id);

      setOpen(false);
      assignStudents(assigned);
    };

    const areStudentsSelected = () => {
      const exists = !!studentsStatus.filter((student) => student).length;

      setSelectionExists(exists);
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
              padding: '0 20px 10px 20px',
            }}
          >
            <FormControl component="fieldset">
              <FormGroup>
                {studentsList.map((student) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={student.id}
                        onChange={handleChange}
                        name={student.id}
                      />
                    }
                    label={student.name}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </div>
          <DialogActions style={{ padding: '10px 20px 20px 20px' }}>
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
              onClick={assignStampToStudents}
              disabled={!selectionExists}
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
