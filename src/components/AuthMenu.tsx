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

export default function AuthMenu(props: {
  userId: string;
  setToolbarIsEnabled: (enabled: boolean) => void;
}) {
  const { userId } = props;
  const isTeacher = userId === 'teacher';
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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

      eventSerializer?.push('setToolbarPermissions', userId, payload);
    }

    if (index === 0) {
      const payload = {
        id: userId,
        target: false,
      };
      eventSerializer?.push('setToolbarPermissions', userId, payload);
    }
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
      </div>
    </div>
  );
}
