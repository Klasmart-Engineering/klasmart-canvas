import IColorPalette from '../toolbar-selector/color-palette';
import IToolbarSelectorOption from '../toolbar-selector/toolbar-selector-option';

export interface ISecondOptionSelector {
  id: string;
  options: IToolbarSelectorOption[];
  secondOptions: IToolbarSelectorOption[];
  active: boolean;
  selectedValue: string | number | null;
  selectedSecondValue: string | number | null;
  colorPalette?: IColorPalette;
  onAction: (tool: string, option: string) => void;
  onClick: (tool: string) => void;
  onChange: (tool: string, option: string) => void;
  onSecondChange: (tool: string, option: string) => void;
  enabled?: boolean;
}
