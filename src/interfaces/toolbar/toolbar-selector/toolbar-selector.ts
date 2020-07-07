import IToolbarSelectorOption from './toolbar-selector-option';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap, Color } from '@material-ui/core';

export default interface ToolbarSelector {
  index: number;
  options: IToolbarSelectorOption[];
  selected: boolean;
  iconColorPalette?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  onChildClick: (index: number) => void;
  onChildChange: (index: number, value: string) => void;
  onColorChange?: (color: string) => void;
}
