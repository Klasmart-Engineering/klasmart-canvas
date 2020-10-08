import React, { ChangeEvent, useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export interface IClearWhiteboardModal {
  clearWhiteboard(): void;
  setImage(): any;
  setIsGif(): boolean;
}

export const useUploadFileModal = () => {
  const [uploadFileModal, setOpen] = useState(false);
  const openUploadFileModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeUploadFileModal = useCallback(() => {
    setOpen(false);
  }, []);

  const [value, setValue] = useState('element');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const UploadFileModal = (props: any) => {
    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const fileType = event.target.files[0].type;
        const img = event.target.files[0];
        props.setImage(URL.createObjectURL(img));

        if (fileType === 'image/gif') {
          props.setImage(img);
          props.setIsGif(true);
        } else {
          props.setImage(URL.createObjectURL(img));
          props.setIsGif(false);
        }

        setOpen(false);
      }
    };

    return (
      <div>
        <Dialog
          open={uploadFileModal}
          onClose={closeUploadFileModal}
          aria-labelledby="upload-image-dialog"
          aria-describedby="upload-image-dialog"
        >
          <DialogTitle id="alert-dialog-title">{'Upload image'}</DialogTitle>
          <div
            style={{
              //border: '1px solid blue',
              padding: '20px',
              // width: '140px',
              // height: '160px',
              // display: 'flex',
              // alignItems: 'center',
              // justifyContent: 'center',
            }}
          >
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="element"
                  control={<Radio />}
                  label="Set as a whiteboard element"
                />
                <FormControlLabel
                  value="background"
                  control={<Radio />}
                  label="Set as background image"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <DialogActions>
            <Button
              onClick={closeUploadFileModal}
              color="primary"
              variant="contained"
            >
              Cancel
            </Button>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={onImageChange}
            />
            <label htmlFor="raised-button-file">
              <Button component="span" color="default" variant="contained">
                Upload
              </Button>
            </label>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return {
    uploadFileModal,
    openUploadFileModal,
    closeUploadFileModal,
    UploadFileModal,
  };
};
