import React from 'react';
import { Modal, Button } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { downloadCanvas } from './utils';

/**
 * Modal styles
 */
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
    textAlign: 'center',
  },
  button: {
    border: '1px solid black',
    borderRadius: '5px',
    margin: '0 5px',
  },
  cancel: {
    border: '2px solid red',
    borderRadius: '5px',
    margin: '0 5px',
  },
  a: {
    visibility: 'hidden',
  },
}));

/**
 * Modal props.
 */
type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  canvas: fabric.Canvas;
  backgroundImage?: string | File | undefined;
  width: number;
  height: number;
};

/**
 * Modal component to confirm download.
 * @param props Component props.
 */
export const CanvasDownloadConfirm = (props: Props) => {
  /**
   * Modal styles
   */
  const css = useStyles();

  /**
   * Click event to download png image.
   */
  const downloadCanvasPNG = () => {
    downloadCanvas(props, 'image/png');
  };

  /**
   * Click event to downloag jpg image.
   */
  const downloadCanvasJPG = () => {
    downloadCanvas(props, 'image/jpeg');
  };

  return (
    <Modal
      open={props.open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={css.confirm}>
        <h2>Select Format</h2>
        <Button className={css.button} onClick={downloadCanvasPNG}>
          PNG
        </Button>
        <Button className={css.button} onClick={downloadCanvasJPG}>
          JPG
        </Button>
        <Button
          className={css.cancel}
          onClick={() => {
            props.onClose(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
