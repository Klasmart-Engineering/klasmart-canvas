import React from 'react';
import '../../assets/style/whiteboard.css';
import { WhiteboardProvider } from './WhiteboardContext';
import Toolbar from '../../components/toolbar/Toolbar';
import { WhiteboardCanvas } from './WhiteboardCanvas';
import '../../assets/style/whiteboard.css';
function Whiteboard() {
    return (React.createElement("div", null,
        React.createElement(WhiteboardProvider, { canvasWidth: '740', canvasHeight: '460' },
            React.createElement("div", { className: "whiteboard" },
                React.createElement(Toolbar, null),
                React.createElement("div", { style: {
                        border: '1px solid black',
                        width: '640px',
                        height: '460px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        backgroundColor: 'white',
                    } },
                    React.createElement(WhiteboardCanvas, { instanceId: "canvas1", userId: "teacher", pointerEvents: true, display: true, height: 460 },
                        React.createElement("button", null, "Teacher"))))),
        React.createElement(WhiteboardProvider, { canvasWidth: '740', canvasHeight: '460' },
            React.createElement("div", { className: "whiteboard" },
                React.createElement(Toolbar, null),
                React.createElement("div", { style: {
                        border: '1px solid black',
                        width: '640px',
                        height: '460px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        backgroundColor: 'white',
                    } },
                    React.createElement(WhiteboardCanvas, { instanceId: "canvas2", userId: "student", pointerEvents: true, display: true, height: 460 },
                        React.createElement("button", null, "Student")))))));
}
export default Whiteboard;
//# sourceMappingURL=Whiteboard.js.map