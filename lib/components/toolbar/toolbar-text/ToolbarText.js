import React from 'react';
import '../toolbar.css';
import TextField from '@material-ui/core/TextField';
/**
 * Render an InputText below of the toolbar
 * @param {IToolbarText} props - Props that the component need to be rendered:
 * - showInput - flag tho show/hide the input
 * - text - value that the input field will have
 * - updateText - function to execute when the field value changes
 * - writeText (provisionaly optional) -
 *   function to execute when the user keydown a key
 */
function ToolbarText(props) {
    var showInput = props.showInput, text = props.text, updateText = props.updateText, writeText = props.writeText;
    return (React.createElement("div", { className: "input-container" }, showInput ? (React.createElement(TextField, { id: "outlined-basic", className: "input-text", label: "Insert Text", variant: "outlined", value: text, onChange: function (e) { return updateText(e.target.value); }, onKeyDown: function (e) { return writeText(e); } })) : null));
}
export default ToolbarText;
//# sourceMappingURL=ToolbarText.js.map