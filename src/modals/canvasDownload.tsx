import React from 'react';
import { Modal, Button } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  confirm: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '100px',
    left: 'calc(50% - 200px)',
    textAlign: 'center'
  },
  button: {
    border: '1px solid black',
    borderRadius: '5px',
    margin: '0 5px'
  },
  cancel: {
    border: '2px solid red',
    borderRadius: '5px',
    margin: '0 5px'
  }
}));

export const CanvasDownloadConfirm = () => {
  const css = useStyles();

  return (
    <Modal
      open={true}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={css.confirm}>
        <h2>Select Format</h2>
        <Button className={css.button}>PNG</Button>
        <Button className={css.button}>JPEG</Button>
        <Button className={css.cancel}>Cancel</Button>
      </div>
    </Modal>
    
  );
};

