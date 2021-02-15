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
    const initStudentsArray = () => {
      return studentsList.map((_) => false);
    };

    const { studentsList, assignStudents } = props;
    let students = initStudentsArray();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const clicked = event.target.id;
      const clickedIndex = studentsList.findIndex(
        (student) => student.id === clicked
      );

      students[clickedIndex] = event.target.checked;
    };

    const assignStampToStudents = () => {
      const assigned = studentsList
        .filter((_, index) => {
          return students[index];
        })
        .map((student) => student.id);

      setOpen(false);
      assignStudents(assigned);
    };

    const areAssignedStudents = () => {
      return students.find((student) => student);
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
              disabled={!areAssignedStudents()}
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
