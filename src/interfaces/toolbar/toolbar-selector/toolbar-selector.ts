import IToolbarSelectorOption from './toolbar-selector-option';
import IColorPalette from './color-palette';

export default interface ToolbarSelector {
  id: string;
  options: IToolbarSelectorOption[];
  selected: boolean;
  definedOptionName?: string;
  colorPalette?: IColorPalette;
  selectedColor?: string;
  onAction: (tool: string, value?: string) => void;
  onClick: (tool: string) => void;
  onChange: (tool: string, value: string) => void;
}
