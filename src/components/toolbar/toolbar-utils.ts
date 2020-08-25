import IBasicToolbarButton from "../../interfaces/toolbar/toolbar-button/basic-toolbar-button";
import IBasicToolbarSelector from "../../interfaces/toolbar/toolbar-selector/basic-toolbar-selector";
import IBasicSpecialSelector from "../../interfaces/toolbar/toolbar-special-elements/basic-special-selector";
import IStyleForIcon from "../../interfaces/toolbar/toolbar-special-elements/style-for-icon";
import { toolsSection } from "./toolbar-sections";

export type IThicknessStyle = {
  id: string;
  style: IStyleForIcon;
  value: string | number;
};

type GenericToolbarSelector =
  | IBasicToolbarButton
  | IBasicToolbarSelector
  | IBasicSpecialSelector;

export const selectorOptionsWithId = (id: string) => {
  return toolsSection.elements
    .filter(
      (t: GenericToolbarSelector & Object) =>
        t.id === id && t.hasOwnProperty('options')
    )
    .map((t) => { return (t as IBasicToolbarSelector).options })[0];
};

export const selectorStyleOptionsWithId = (id: string) => {
  return toolsSection.elements
    .filter(
      (t: GenericToolbarSelector & Object) =>
        t.id === id && t.hasOwnProperty('styleOptions')
    )
    .map((t) => (t as IBasicSpecialSelector).styleOptions)[0];
};
