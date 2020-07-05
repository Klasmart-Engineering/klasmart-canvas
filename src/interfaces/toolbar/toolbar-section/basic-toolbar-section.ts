import IBasicToolbarElement from '../toolbar-element/basic-toolbar-element';

export default interface IBasicToolbarSection {
  selected: number;
  elements: IBasicToolbarElement[];
}
