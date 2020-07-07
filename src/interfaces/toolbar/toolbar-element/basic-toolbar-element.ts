import IToolbarSelectorOption from '../toolbar-selector/toolbar-selector-option';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import IStyleOptions from './style-options';

export default interface IBasicToolbarElement {
  iconSrc?: string;
  iconName?: string;
  options?: IToolbarSelectorOption[];
  iconColorPalette?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  styleOptions?: IStyleOptions[];
  onClick?: () => void;
  onChange?: (value: string) => void;
}
