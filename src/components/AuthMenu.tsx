import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useSharedEventSerializer } from '../domain/whiteboard/SharedEventSerializerProvider';
import { WhiteboardContext } from '../domain/whiteboard/WhiteboardContext';
import { IWhiteboardContext } from '../interfaces/whiteboard-context/whiteboard-context';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       backgroundColor: theme.palette.background.paper,
//     },
//   })
// );

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

// const options = ['Revoke all Users', 'Authorize all Users'];
const pointerOptions = [
  'Pointer: Revoke all users',
  'Pointer: Authorize all users',
];

export default function AuthMenu(props: {
  userId: string;
  setToolbarIsEnabled: (enabled: boolean) => void;
}) {
  const { userId } = props;
  const isTeacher = userId === 'teacher';
  // const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorPointerEl, setAnchorPointerEl] = useState<null | HTMLElement>(
    null
  );
  const [selectedIndex] = useState(1);
  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();

  const [pointerIndex, setPointerIndex] = useState(1);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickListPointerItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorPointerEl(event.currentTarget);
  };

  // const handleMenuItemClick = (
  //   _event: React.MouseEvent<HTMLElement>,
  //   index: number
  // ) => {
  //   setSelectedIndex(index);
  //   setAnchorEl(null);
  //
  //   if (index === 1) {
  //     const payload = {
  //       id: userId,
  //       target: true,
  //     };
  //
  //     eventSerializer?.push('setToolbarPermissions', payload);
  //   }
  //
  //   if (index === 0) {
  //     const payload = {
  //       id: userId,
  //       target: false,
  //     };
  //     eventSerializer?.push('setToolbarPermissions', payload);
  //   }
  // };

  const handleMenuPointerClick = (
    _event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setPointerIndex(index);
    setAnchorPointerEl(null);

    let payload =
      index === 1
        ? { id: userId, target: { pointer: true } }
        : { id: userId, target: { pointer: false } };
    eventSerializer?.push('setToolbarPermissions', payload);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //***
  const classes = useStyles();
  const { serializerToolbarState } = useContext(
    WhiteboardContext
  ) as IWhiteboardContext;
  const [localToolbarState, setLocalToolbarState] = useState(
    serializerToolbarState
  );
  const { pointer, move, erase, pen } = localToolbarState;

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
  //***

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
            aria-controls="lock-menu"
            onClick={handleClickListPointerItem}
          >
            <ListItemText
              style={{ paddingLeft: '20px' }}
              primary="Authorize Pointer"
              secondary={pointerOptions[pointerIndex]}
            />
          </ListItem>
        </List>

        <Menu
          id="lock-menu-pointer"
          anchorEl={anchorPointerEl}
          keepMounted
          open={Boolean(anchorPointerEl)}
          onClose={handleClose}
        >
          {pointerOptions.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuPointerClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        <List component="nav" aria-label="Device settings">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu-2"
            onClick={handleClickListItem}
          >
            <ListItemText
              primary="Authorize Tools"
              // secondary={options[selectedIndex]}
            />
          </ListItem>
        </List>

        <Menu
          id="lock-menu-2"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/*{options.map((option, index) => (*/}
          {/*  <MenuItem*/}
          {/*    key={option}*/}
          {/*    selected={index === selectedIndex}*/}
          {/*    onClick={(event) => handleMenuItemClick(event, index)}*/}
          {/*  >*/}
          {/*    {option}*/}
          {/*  </MenuItem>*/}
          {/*))}*/}

          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pointer}
                    onChange={handleToolbarChange}
                    name="pointer"
                  />
                }
                label="Laser Pointer"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={move}
                    onChange={handleToolbarChange}
                    name="move"
                  />
                }
                label="Move objects"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={erase}
                    onChange={handleToolbarChange}
                    name="erase"
                  />
                }
                label="Erase objects"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pen}
                    onChange={handleToolbarChange}
                    name="pen"
                  />
                }
                label="Pen tool"
              />
            </FormGroup>
          </FormControl>
        </Menu>
      </div>
    </div>
  );
}
