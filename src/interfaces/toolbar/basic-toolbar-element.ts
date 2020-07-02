import IToolbarSelectorOption from './toolbar-selector-option';

export default interface IBasicToolbarElement {
  iconSrc: string;
  iconName: string;
  type: 'button' | 'selector';
  options: IToolbarSelectorOption[];
}
