import IBasicToolbarButton from '../toolbar-button/basic-toolbar-button';
import IBasicToolbarSelector from '../toolbar-selector/basic-toolbar-selector';
import IBasicSpecialSelector from '../toolbar-special-elements/basic-special-selector';
import { IBasicSecondOptionSelector } from '../toolbar-second-option-selector/basic-second-option-selector';

export default interface IBasicToolbarSection {
  active: string;
  elements: (
    | IBasicToolbarButton
    | IBasicToolbarSelector
    | IBasicSpecialSelector
    | IBasicSecondOptionSelector
  )[];
}
