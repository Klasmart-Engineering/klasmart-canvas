import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useSharedEventSerializer } from '../domain/whiteboard/SharedEventSerializerProvider';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
);

function AuthMenu(props: {
  userId: string;
  [key: string]: any
}) {
  console.log('PROPS:::::', props);
  console.log('USER ID: ', props.userId);
  const { userId } = props;
  const isTeacher = userId === 'teacher';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const {
    cursorPointer,
    pointer,
    move,
    erase,
    partialErase,
    pen,
    floodFill,
    text,
    shape,
    undoRedo,
    clearWhiteboard,
    downloadCanvas,
    uploadImage,
    backgroundColor,
    shape3d
  } = props.permissions;

  const handleToolbarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    props.updatePermissions(event.target.name, event.target.checked);

    const payload = {
      id: userId,
      target: {
        [event.target.name]: event.target.checked,
      },
    };

    console.log(payload)

    eventSerializer?.push('setToolbarPermissions', payload);
  };

  const tools = [
    {
      checked: cursorPointer,
      name: 'cursorPointer',
      label: 'Cursor pointer tool',
    },
    {
      checked: pointer,
      name: 'pointer',
      label: 'Laser pointer tool',
    },
    {
      checked: move,
      name: 'move',
      label: 'Move tool',
    },
    {
      checked: erase,
      name: 'erase',
      label: 'Erase tool',
    },
    {
      checked: partialErase,
      name: 'partialErase',
      label: 'Partial Erase tool',
    },
    {
      checked: pen,
      name: 'pen',
      label: 'Pen tool',
    },
    {
      checked: floodFill,
      name: 'floodFill',
      label: 'Flood-fill tool',
    },
    {
      checked: backgroundColor,
      name: 'backgroundColor',
      label: 'Background Color tool',
    },
    {
      checked: text,
      name: 'text',
      label: 'Text tool',
    },
    {
      checked: shape,
      name: 'shape',
      label: 'Shape tool',
    },
    {
      checked: undoRedo,
      name: 'undoRedo',
      label: 'Undo-redo tool',
    },
    {
      checked: clearWhiteboard,
      name: 'clearWhiteboard',
      label: 'Clear whiteboard tool',
    },
    {
      checked: downloadCanvas,
      name: 'downloadCanvas',
      label: 'Save Canvas As Image',
    },
    {
      checked: uploadImage,
      name: 'uploadImage',
      label: 'Upload Image tool',
    },
    {
      checked: shape3d,
      name: 'shape3d',
      label: '3D Shape tool',
    },
  ];

  if (!isTeacher) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
        }}
        className={classes.root}
      >
        <List component="nav" aria-label="Device settings">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu-2"
            onClick={handleClickListItem}
          >
            <ListItemText primary="Authorize Tools" />
          </ListItem>
        </List>

        <Menu
          id="lock-menu-2"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              {tools.map((el) => (
                <FormControlLabel
                  key={el.name}
                  control={
                    <Checkbox
                      checked={el.checked}
                      onChange={handleToolbarChange}
                      name={el.name}
                    />
                  }
                  label={el.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Menu>
      </div>
    </div>
  );
}

// TEMPORARY : once we have an actual login, this will have to be mapped to the login data for the user state and isAdmin properties. 
const mapStateToProps = (state:any, ownProps: any) => (
  { 
    ...ownProps, 
    permissions: state.permissionsState,
    user: state.userState,
    isAdmin: ownProps.userId === 'teacher', // TEMPORARY until actual login process is created.
  }
);

const mapDispatchToProps = (dispatch: any) => ({
  updatePermissions: (tool: string, payload: boolean) => dispatch({ type: tool, payload }),
  updateUser: (id: string) => dispatch({ type: 'UPDATE_USER', id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthMenu);