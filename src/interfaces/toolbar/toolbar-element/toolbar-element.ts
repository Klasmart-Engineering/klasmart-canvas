import IToolbarSelectorOption from '../toolbar-selector/toolbar-selector-option';

export default interface IToolbarElement {
  iconSrc: string;
  iconName: string;
  type: 'button' | 'selector';
  index: number;
  selected: boolean;
  options: IToolbarSelectorOption[];
  onChildClick: (index: number) => void;
  onChildChange: (value: string) => void;
}
