import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
export var useWhiteboardClearModal = function () {
    var _a = useState(false), clearWhiteboardModal = _a[0], setOpen = _a[1];
    var openModal = useCallback(function () {
        setOpen(true);
    }, [setOpen]);
    var closeModal = useCallback(function () {
        setOpen(false);
    }, [setOpen]);
    var ClearWhiteboardModal = function (props) {
        return (React.createElement("div", null,
            React.createElement(Dialog, { open: clearWhiteboardModal, onClose: closeModal, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
                React.createElement(DialogTitle, { id: "alert-dialog-title" }, 'Are you sure you want to clear the board?'),
                React.createElement(DialogActions, null,
                    React.createElement(Button, { onClick: closeModal, color: "primary", variant: "contained" }, "Cancel"),
                    React.createElement(Button, { onClick: props.clearWhiteboard, color: "secondary", variant: "contained" }, "Yes")))));
    };
    return { clearWhiteboardModal: clearWhiteboardModal, openModal: openModal, closeModal: closeModal, ClearWhiteboardModal: ClearWhiteboardModal };
};
//# sourceMappingURL=useWhiteboardClearModal.js.map