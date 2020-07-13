import IToolbarSelectorOption from './toolbar-selector-option';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon';

export default interface IBasicToolbarSelector {
  options: IToolbarSelectorOption[];
  colorPaletteIcon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}
