import IToolbarSelectorOption from '../toolbar-selector/toolbar-selector-option';
export interface IBasicSecondOptionSelector {
    id: string;
    options: IToolbarSelectorOption[];
    secondOptions: IToolbarSelectorOption[];
    enabled?: boolean;
}
