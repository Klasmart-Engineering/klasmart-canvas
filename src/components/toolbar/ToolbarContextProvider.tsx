import React, { createContext, ReactChild, ReactChildren, useCallback } from 'react';

export interface IToolbarActions {
    // TODO: Typed tool parameter.
    selectTool: (tool: string) => void;

    // TODO: Typed color parameter.
    selectColor: (color: string) => void;

    // TODO: Typed brushStyle input.
    selectBrushStyle: (brushStyle: string) => void;

    clear: (filter?: string) => void;

    undo: () => void;

    redo: () => void;
}

export interface IToolbarState {

}

export interface IToolbarStatus {

}

export interface IToolbarContext {
    state: IToolbarState
    status: IToolbarStatus
    actions: IToolbarActions

    // Data
    // TODO: List of available tools.
    // TODO: List of available colors.
    // TODO: List of available text styles.
    // TODO: List of available line styles.
    // TODO: List of available shapes.

    // Status
    // TODO: Current selected tool
    // TODO: Current selected color
    // TODO: Current selected text style
    // TODO: Current selected line style
    // TODO: Current selected shape
    // TODO: Undo/Redo available?

    // Tools
    // TODO: Function to select line tool.
    // TODO: Function to select pen tool.
    // TODO: Function to select text tool.
    // TODO: Function to select shape tool.
    // TODO: Function to select select/move tool.

    // Styling
    // TODO: Function to select text style (font/size).
    // TODO: Function to select line (style/width).
    // TODO: Function to select color.

    // Actions
    // TODO: Function to clear.
    // TODO: Function to undo.
    // TODO: Function to redo.
}

export const Context = createContext<IToolbarContext | undefined>(undefined);

export type Props = {
    children?: ReactChild | ReactChildren | undefined
}

export default function ToolbarContextProvider({children}: Props): JSX.Element {
    const selectToolAction = useCallback((tool: string) => {

    }, []);

    const selectColorAction = useCallback((color: string) => {

    }, []);

    const selectBrushStyleAction = useCallback((textStyle: string) => {

    }, []);

    const clearAction = useCallback((filter?: string) => {

    }, []);

    const undoAction = useCallback(() => {

    }, []);

    const redoAction = useCallback(() => {

    }, []);

    const actions: IToolbarActions = {
        selectTool: selectToolAction,
        selectColor: selectColorAction,
        selectBrushStyle: selectBrushStyleAction,
        clear: clearAction,
        undo: undoAction,
        redo: redoAction,
    }

    return (
        <Context.Provider value={{state: {}, status: {}, actions}}>
            {children}
        </Context.Provider>
    )
}