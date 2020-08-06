import React from 'react';
import '../../assets/style/whiteboard.css';
import { WhiteboardProvider } from './WhiteboardContext';
import Toolbar from '../../components/toolbar/Toolbar';
import { WhiteboardCanvas } from './WhiteboardCanvas';
function Whiteboard() {
    var canvasStyle = {
        border: '2px blue solid',
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(WhiteboardProvider, null,
            React.createElement("div", { className: "whiteboard" },
                React.createElement(Toolbar, null),
                React.createElement("div", { style: {
                        border: '1px solid black',
                        width: '740px',
                        height: '460px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        backgroundColor: 'white',
                    } },
                    React.createElement(WhiteboardCanvas, { instanceId: "canvas1", userId: "teacher", style: canvasStyle, pointerEvents: true, width: 740, height: 460 },
                        React.createElement("button", null, "Teacher"))))),
        React.createElement(WhiteboardProvider, null,
            React.createElement("div", { className: "whiteboard" },
                React.createElement(Toolbar, null),
                React.createElement("div", { style: {
                        border: '1px solid black',
                        width: '740px',
                        height: '460px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        backgroundColor: 'white',
                    } },
                    React.createElement(WhiteboardCanvas, { instanceId: "canvas2", userId: "student", style: canvasStyle, pointerEvents: true, width: 740, height: 460 },
                        React.createElement("button", null, "Student")))))));
}
export default Whiteboard;
//# sourceMappingURL=Whiteboard.js.map