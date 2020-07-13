import IToolbarSelectorOption from './toolbar-selector-option';
import IColorPalette from './color-palette';

export default interface ToolbarSelector {
  index: number;
  options: IToolbarSelectorOption[];
  selected: boolean;
  definedOptionName?: string;
  colorPalette?: IColorPalette;
  selectedColor?: string;
  onAction: (index: number, value?: string) => void;
  onClick: (index: number) => void;
  onChange: (index: number, value: string) => void;
}
