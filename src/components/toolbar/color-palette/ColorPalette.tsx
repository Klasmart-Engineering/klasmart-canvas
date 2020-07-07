import React from 'react';
import { colorPaletteOptions } from '../toolbar-section/toolbar-sections';
import SpecialButton from '../special-button/SpecialButton';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

interface IColorPalette {
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  handleColorChange: (color: string) => void;
}

/**
 * Render a color palette
 * @param {IColorPalette} props - Props needed to render the component:
 * - Icon - Icon to use in the color palette
 * - handleColorChange - Function to execute when the color changes
 */
function ColorPalette({ Icon, handleColorChange }: IColorPalette) {
  /**
   * Executes the given funtion when the color changes
   * @param {string} color - new color to set
   */
  function changeColor(color: string) {
    handleColorChange(color);
  }

  return (
    <div>
      {colorPaletteOptions.map((color, index) => {
        return color.iconName ? (
          <SpecialButton
            key={index}
            index={index}
            Icon={Icon}
            style={color.style}
            iconName={color.iconName}
            selected={false}
            onChildClick={(e) => changeColor(color.iconName || '')}
          />
        ) : null;
      })}
    </div>
  );
}

export default ColorPalette;
