import IToolbarSelectorOption from './toolbar-selector-option';
import IColorPalette from './color-palette';

export default interface ToolbarSelector {
  id: string;
  options: IToolbarSelectorOption[];
  active: boolean;
  selectedValue: string;
  colorPalette?: IColorPalette;
  onAction: (tool: string, option: string) => void;
  onClick: (tool: string) => void;
  onChange: (tool: string, option: string) => void;
}
