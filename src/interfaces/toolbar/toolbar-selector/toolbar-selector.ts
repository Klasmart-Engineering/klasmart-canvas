import IToolbarSelectorOption from './toolbar-selector-option';
import IColorPalette from './color-palette';

export default interface ToolbarSelector {
  id: string;
  options: IToolbarSelectorOption[];
  selected: boolean;
  definedOptionName?: string;
  colorPalette?: IColorPalette;
  selectedColor?: string;
  onAction: (tool: string, option?: string | boolean | number) => void;
  onClick: (tool: string) => void;
  onChange: (tool: string, option: string | boolean | number) => void;
}
