import IToolbarSelectorOption from './toolbar-selector-option';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

export default interface ToolbarSelector {
  index: number;
  options: IToolbarSelectorOption[];
  selected: boolean;
  iconColorPalette?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  selectedColor?: string;
  onAction: (index: number, value?: string) => void;
  onChildClick: (index: number) => void;
  onChildChange: (index: number, value: string) => void;
  onColorChange?: (index: number, color: string) => void;
}
