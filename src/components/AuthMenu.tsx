import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useSharedEventSerializer } from '../domain/whiteboard/SharedEventSerializerProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const options = ['Revoke all Users', 'Authorize all Users'];
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
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorPointerEl, setAnchorPointerEl] = useState<null | HTMLElement>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState(1);
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

  const handleMenuItemClick = (
    _event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    if (index === 1) {
      const payload = {
        id: userId,
        target: true,
      };

      eventSerializer?.push('setToolbarPermissions', payload);
    }

    if (index === 0) {
      const payload = {
        id: userId,
        target: false,
      };
      eventSerializer?.push('setToolbarPermissions', payload);
    }
  };

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
            onClick={handleClickListItem}
          >
            <ListItemText
              primary="Authorize"
              secondary={options[selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

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
      </div>
    </div>
  );
}
