import IBasicToolbarButton from '../toolbar-button/basic-toolbar-button';
import IBasicToolbarSelector from '../toolbar-selector/basic-toolbar-selector';
import IBasicSpecialSelector from '../toolbar-special-elements/basic-special-selector';

export default interface IBasicToolbarSection {
  selected: number;
  elements: (
    | IBasicToolbarButton
    | IBasicToolbarSelector
    | IBasicSpecialSelector
  )[];
}
