/// <reference types="react" />
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import '../../../assets/style/color-palette.css';
interface IColorPalette {
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
    handleColorChange: (color: string) => void;
    selectedColor: string;
}
/**
 * Render a color palette
 * @param {IColorPalette} props - Props needed to render the component:
 * - Icon - Icon to use in the color palette
 * - handleColorChange - Function to execute when the color changes
 * - selectedColor - Color to have selected in color palette
 */
declare function ColorPalette(props: IColorPalette): JSX.Element;
export default ColorPalette;
