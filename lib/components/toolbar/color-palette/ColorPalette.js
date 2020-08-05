import React from 'react';
import { colorPaletteOptions } from '../toolbar-sections';
import SpecialButton from '../special-button/SpecialButton';
import './color-palette.css';
/**
 * Render a color palette
 * @param {IColorPalette} props - Props needed to render the component:
 * - Icon - Icon to use in the color palette
 * - handleColorChange - Function to execute when the color changes
 * - selectedColor - Color to have selected in color palette
 */
function ColorPalette(props) {
    var Icon = props.Icon, handleColorChange = props.handleColorChange, selectedColor = props.selectedColor;
    /**
     * Executes the given funtion when the color changes
     * @param {string} color - new color to set
     */
    function changeColor(color) {
        handleColorChange(color);
    }
    return (React.createElement("div", { className: "color-palette" }, colorPaletteOptions
        .filter(function (_, index) { return index; })
        .map(function (color) {
        return color.id ? (React.createElement(SpecialButton, { key: color.id, id: color.id, title: color.title, Icon: Icon, style: color.style, selected: selectedColor === color.style.color, onClick: function () { return changeColor(color.style.color || ''); } })) : null;
    })));
}
export default ColorPalette;
//# sourceMappingURL=ColorPalette.js.map