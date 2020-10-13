import React, { useContext, useEffect, useState } from 'react';
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
import { WhiteboardContext } from '../domain/whiteboard/WhiteboardContext';
import { IWhiteboardContext } from '../interfaces/whiteboard-context/whiteboard-context';

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

export default function AuthMenu(props: {
  userId: string;
  setToolbarIsEnabled: (enabled: boolean) => void;
}) {
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
  const { serializerToolbarState } = useContext(
    WhiteboardContext
  ) as IWhiteboardContext;
  const [localToolbarState, setLocalToolbarState] = useState(
    serializerToolbarState
  );
  const {
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
    downloadCanvas
  } = localToolbarState;

  const handleToolbarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalToolbarState({
      ...localToolbarState,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    const payload = {
      id: userId,
      target: {
        toolbarState: localToolbarState,
      },
    };

    eventSerializer?.push('setToolbarPermissions', payload);
  }, [userId, eventSerializer, localToolbarState]);

  const tools = [
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
