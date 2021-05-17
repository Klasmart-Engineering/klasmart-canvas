import IStyleForIcon from "../../interfaces/toolbar/toolbar-special-elements/style-for-icon";
export declare type IThicknessStyle = {
    id: string;
    style: IStyleForIcon;
    value: string | number;
};
export declare const selectorOptionsWithId: (id: string) => import("../../interfaces/toolbar/toolbar-selector/toolbar-selector-option").default[];
export declare const selectorStyleOptionsWithId: (id: string) => import("../../interfaces/toolbar/toolbar-special-elements/style-option").default[];
