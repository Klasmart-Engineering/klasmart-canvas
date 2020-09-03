import React, { ReactChild, ReactChildren } from 'react';
import IToolbarSelectorOption from '../../interfaces/toolbar/toolbar-selector/toolbar-selector-option';
import IStyleOption from '../../interfaces/toolbar/toolbar-special-elements/style-option';
import { IThicknessStyle } from './toolbar-utils';
export declare type ToolType = 'select' | 'pointer' | 'move' | 'eraser' | 'line' | 'fill' | 'text' | 'shape' | 'stamp';
declare type OptionalToolOptions = IToolbarSelectorOption[] | undefined;
export interface IToolbarActions {
    selectTool: (toolType: ToolType, options?: IToolbarSelectorOption) => void;
    selectColorByName: (colorName: string) => void;
    selectColorByValue: (color: string) => void;
    clear: (filter?: string) => void;
    clearAll: () => void;
    undo: () => void;
    redo: () => void;
}
export interface IToolbarState {
    tools: Record<ToolType, {
        id: string;
        options: OptionalToolOptions;
    }>;
    colors: IStyleOption[];
    thickness: IThicknessStyle[];
}
export interface IToolbarStatus {
    selectedTool: ToolType | undefined;
    selectedColor: string | undefined;
    selectedToolOption: IToolbarSelectorOption | undefined;
}
export interface IToolbarContext {
    state: IToolbarState;
    status: IToolbarStatus;
    actions: IToolbarActions;
}
export declare const Context: React.Context<IToolbarContext>;
export declare type Props = {
    children?: ReactChild | ReactChildren | undefined;
};
export default function ToolbarContextProvider({ children, }: Props): JSX.Element;
export declare function useToolbarContext(): IToolbarContext;
export {};
