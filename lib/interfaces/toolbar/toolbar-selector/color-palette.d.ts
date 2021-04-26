import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon';
export default interface IColorPalette {
    icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
    selectedColor: string;
    onChangeColor: (id: string, color: string) => void;
}
