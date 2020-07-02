import IToolbarSelectorOption from './toolbar-selector-option';

export default interface ToolbarSelector {
  index: number;
  options: IToolbarSelectorOption[];
  selected: boolean;
  onChildClick: (index: number) => void;
  onChildChange: (value: string) => void;
}
