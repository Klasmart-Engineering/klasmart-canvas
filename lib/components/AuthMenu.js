import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useSharedEventSerializer } from '../domain/whiteboard/SharedEventSerializerProvider';
var useStyles = makeStyles(function (theme) {
    return createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
    });
});
var options = ['Revoke all Users', 'Authorize all Users'];
export default function AuthMenu(props) {
    var userId = props.userId;
    var isTeacher = userId === 'teacher';
    var classes = useStyles();
    var _a = useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var _b = useState(1), selectedIndex = _b[0], setSelectedIndex = _b[1];
    var eventSerializer = useSharedEventSerializer().state.eventSerializer;
    var handleClickListItem = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleMenuItemClick = function (_event, index) {
        setSelectedIndex(index);
        setAnchorEl(null);
        if (index === 1) {
            var payload = {
                id: userId,
                target: true,
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('setToolbarPermissions', payload);
        }
        if (index === 0) {
            var payload = {
                id: userId,
                target: false,
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('setToolbarPermissions', payload);
        }
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    if (!isTeacher) {
        return null;
    }
    return (React.createElement("div", null,
        React.createElement("div", { style: {
                display: 'flex',
            }, className: classes.root },
            React.createElement(List, { component: "nav", "aria-label": "Device settings" },
                React.createElement(ListItem, { button: true, "aria-haspopup": "true", "aria-controls": "lock-menu", onClick: handleClickListItem },
                    React.createElement(ListItemText, { primary: "Authorize", secondary: options[selectedIndex] }))),
            React.createElement(Menu, { id: "lock-menu", anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: handleClose }, options.map(function (option, index) { return (React.createElement(MenuItem, { key: option, selected: index === selectedIndex, onClick: function (event) { return handleMenuItemClick(event, index); } }, option)); })))));
}
//# sourceMappingURL=AuthMenu.js.map