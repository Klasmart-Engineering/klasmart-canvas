import React, {
  createContext,
  ReactChild,
  ReactChildren,
  useCallback,
} from 'react';

import IToolbarSelectorOption from '../../interfaces/toolbar/toolbar-selector/toolbar-selector-option';
import IStyleOption from '../../interfaces/toolbar/toolbar-special-elements/style-option';
import { colorPaletteOptions } from './toolbar-sections';
import {
  IThicknessStyle,
  selectorOptionsWithId,
  selectorStyleOptionsWithId,
} from './toolbar-utils';

export type ToolType =
  | 'select'
  | 'pointer'
  | 'move'
  | 'eraser'
  | 'line'
  | 'fill'
  | 'text'
  | 'shape'
  | 'stamp';

type OptionalToolOptions = IToolbarSelectorOption[] | undefined;

const tools: Record<ToolType, IToolbarSelectorOption[] | undefined> = {
  select: selectorOptionsWithId('pointers'),
  pointer: selectorOptionsWithId('laser_pointer'),
  move: selectorOptionsWithId('move_objects'),
  eraser: selectorOptionsWithId('erase_type'),
  line: selectorOptionsWithId('line_type'),
  fill: selectorOptionsWithId('flood_fill'),
  text: selectorOptionsWithId('add_text'),
  shape: selectorOptionsWithId('add_shape'),
  stamp: selectorOptionsWithId('add_stamp'),
};

const colors = colorPaletteOptions.reduce((map, color) => {
  return map.set(color.id, color);
}, new Map<string, IStyleOption>());

const thickness = selectorStyleOptionsWithId('line_width')
  .map((opt) => {
    return { id: opt.id, style: opt.style, value: opt.value };
  })
  .reduce((map, style) => {
    return map.set(style.id, style);
  }, new Map<string, IThicknessStyle>());

export interface IToolbarActions {
  selectTool: (tool: ToolType, options?: IToolbarSelectorOption) => void;

  selectColor: (color: IStyleOption) => void;

  clear: (filter?: string) => void;

  undo: () => void;

  redo: () => void;
}

export interface IToolbarState {
  tools: Record<ToolType, OptionalToolOptions>;
  colors: Map<string, IStyleOption>;
  thickness: Map<string, IThicknessStyle>;
}

export interface IToolbarStatus {
  selectedTool: ToolType | undefined;
  selectedColor: IStyleOption | undefined;
  selectedToolOptions: IToolbarSelectorOption | undefined;
  canRedo: boolean;
  canUndo: boolean;
}

export interface IToolbarContext {
  state: IToolbarState;
  status: IToolbarStatus;
  actions: IToolbarActions;

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
  // TODO: Function to select laster pointer tool.
}

export const Context = createContext<IToolbarContext | undefined>(undefined);

export type Props = {
  children?: ReactChild | ReactChildren | undefined;
};

export default function ToolbarContextProvider({
  children,
}: Props): JSX.Element {
  const selectToolAction = useCallback((_tool: ToolType, _options?: IToolbarSelectorOption) => {}, []);

  const selectColorAction = useCallback((_color: IStyleOption) => {}, []);

  const clearAction = useCallback((_filter?: string) => {}, []);

  const undoAction = useCallback(() => {}, []);

  const redoAction = useCallback(() => {}, []);

  const actions: IToolbarActions = {
    selectTool: selectToolAction,
    selectColor: selectColorAction,
    clear: clearAction,
    undo: undoAction,
    redo: redoAction,
  };
    
    const status: IToolbarStatus = {
        selectedTool: undefined,
        selectedToolOptions: undefined,
        selectedColor: undefined,
        canRedo: false,
        canUndo: false,
    };

  return (
    <Context.Provider
      value={{ state: { tools, colors, thickness }, status, actions }}
    >
      {children}
    </Context.Provider>
  );
}
