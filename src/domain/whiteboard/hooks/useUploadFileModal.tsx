import React, { ChangeEvent, useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormLabel } from '@material-ui/core';

export interface IUploadFileModal {
  setImage: (image: string | File) => void;
  setIsGif: (status: boolean) => void;
  setBackgroundImage: (image: string | File) => void;
  setBackgroundImageIsPartialErasable: (status: boolean) => void;
  isBackgroundImage: boolean;
  setIsBackgroundImage: (status: boolean) => void;
}

/**
 Modal component to upload image files.
 This component handles the logic to set the type of file(png, svg, giff, img)
 the user is uploading.
 The file size limit is 5mb.
 */

export const useUploadFileModal = () => {
  const [uploadFileModal, setOpen] = useState(false);
  const openUploadFileModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeUploadFileModal = useCallback(() => {
    setOpen(false);
  }, []);

  const UploadFileModal = (props: IUploadFileModal) => {
    const [value, setValue] = useState('element');
    const [error, setError] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
    };
    const [
      backgroundImageIsPartialErasable,
      setBackgroundPartialErasable,
    ] = useState(false);

    const handleChangeCheckbox = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setBackgroundPartialErasable(event.target.checked);
    };

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const {
          setBackgroundImageIsPartialErasable,
          setIsBackgroundImage,
          setBackgroundImage,
          setImage,
          setIsGif,
        } = props;
        const fileType = event.target.files[0].type;
        const img = event.target.files[0];
        const imageSize = img.size;
        const totalSize = imageSize / 1024;

        if (totalSize >= 5000) {
          setError(true);

          return;
        }

        if (value === 'background') {
          setIsBackgroundImage(true);
          setBackgroundImage(URL.createObjectURL(img));
          setBackgroundImageIsPartialErasable(backgroundImageIsPartialErasable);
          setOpen(false);
          setError(false);

          return;
        }

        if (fileType === 'image/gif') {
          setImage(img);
          setIsGif(true);
          setIsBackgroundImage(false);
          setBackgroundImageIsPartialErasable(false);
        } else {
          setImage(URL.createObjectURL(img));
          setIsGif(false);
          setIsBackgroundImage(false);
          setBackgroundImageIsPartialErasable(false);
        }

        setOpen(false);
        setError(false);
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
              padding: '20px',
            }}
          >
            {error && (
              <FormLabel component="legend">
                File should be less than 5mb
              </FormLabel>
            )}
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
              {value === 'background' && (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={backgroundImageIsPartialErasable}
                        onChange={handleChangeCheckbox}
                        name="gilad"
                      />
                    }
                    label="Set background image partial erasable"
                  />
                </FormGroup>
              )}
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
