import React from 'react';
import '../../assets/style/whiteboard.css';
import { WhiteboardProvider } from './WhiteboardContext';
import Toolbar from '../../components/toolbar/Toolbar';
function Whiteboard() {
    return (React.createElement("div", null,
        React.createElement(WhiteboardProvider, { canvasId: 'canvas', canvasWidth: '740', canvasHeight: '460', toolbar: React.createElement(Toolbar, null) },
            React.createElement("button", null, "Teacher")),
        React.createElement(WhiteboardProvider, { canvasId: 'student', canvasWidth: '740', canvasHeight: '460', toolbar: React.createElement(Toolbar, null) },
            React.createElement("button", null, "Student"))));
}
export default Whiteboard;
//# sourceMappingURL=Whiteboard.js.map