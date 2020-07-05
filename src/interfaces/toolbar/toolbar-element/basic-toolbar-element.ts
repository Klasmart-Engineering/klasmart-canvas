import IToolbarSelectorOption from '../toolbar-selector/toolbar-selector-option';

export default interface IBasicToolbarElement {
  iconSrc?: string;
  iconName?: string;
  options?: IToolbarSelectorOption[];
}
