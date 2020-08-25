import React, {
  createContext,
  ReactChild,
  ReactChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

import IToolbarSelectorOption from '../../interfaces/toolbar/toolbar-selector/toolbar-selector-option';
import IStyleOption from '../../interfaces/toolbar/toolbar-special-elements/style-option';
import { colorPaletteOptions, toolsSection } from './toolbar-sections';
import {
  IThicknessStyle,
  selectorOptionsWithId,
  selectorStyleOptionsWithId,
} from './toolbar-utils';
import { WhiteboardContext } from '../../domain/whiteboard/WhiteboardContext';
import { ELEMENTS } from '../../config/toolbar-element-names';

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

const toolsLookup: Record<ToolType, { id: string, options: OptionalToolOptions }> = {
  select: { id: 'pointers', options: selectorOptionsWithId('pointers') },
  pointer: { id: 'laser_pointer', options: selectorOptionsWithId('laser_pointer') },
  move: { id: 'move_objects', options: selectorOptionsWithId('move_objects') },
  eraser: { id: 'erase_type', options: selectorOptionsWithId('erase_type') },
  line: { id: 'line_type', options: selectorOptionsWithId('line_type') },
  fill: { id: 'flood_fill', options: selectorOptionsWithId('flood_fill') },
  text: { id: 'add_text', options: selectorOptionsWithId('add_text') },
  shape: { id: 'add_shape', options: selectorOptionsWithId('add_shape') },
  stamp: { id: 'add_stamp', options: selectorOptionsWithId('add_stamp') },
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
  selectTool: (toolType: ToolType, options?: IToolbarSelectorOption) => void;

  selectColor: (color: IStyleOption) => void;

  clear: (filter?: string) => void;

  undo: () => void;

  redo: () => void;
}

export interface IToolbarState {
  tools: Record<ToolType, { id: string, options: OptionalToolOptions }>;
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
  // TODO: Current selected color
  // TODO: Current selected text style
  // TODO: Current selected line style
  // TODO: Current selected shape
  // TODO: Undo/Redo available?
}

export const Context = createContext<IToolbarContext>(undefined as unknown as IToolbarContext);

export type Props = {
  children?: ReactChild | ReactChildren | undefined;
};

export default function ToolbarContextProvider({
  children,
}: Props): JSX.Element {
  const [tools, setTools] = useState(toolsSection);
  const [selectedTool, setSelectedTool] = useState<ToolType | undefined>(undefined);

  const { updateEraseType,
    discardActiveObject,
    textIsActive,
    updateTextIsActive,
    updateShapeIsActive,
    updateBrushIsActive,
    updateFloodFillIsActive,
    updateLaserIsActive,
    setPointerEvents,
    updateEventedObjects,
    updateShapesAreSelectable,
    updateShapesAreEvented,
    updatePointer,
    updatePenLine,
    updateLineWidth,
    updateFloodFill,
    updateFontFamily,
    updateShape,
    updateStamp,
  } = useContext(WhiteboardContext);

  const selectToolOption = useCallback((toolId: string, option: IToolbarSelectorOption) => {
    switch (toolId) {
      case ELEMENTS.POINTERS_TOOL:
        updatePointer(option.value);
        break;

      case ELEMENTS.LINE_TYPE_TOOL:
        updatePenLine(option.value);
        break;

      case ELEMENTS.LINE_WIDTH_TOOL:
        updateLineWidth(Number(option.value));
        break;

      case ELEMENTS.FLOOD_FILL_TOOL:
        updateFloodFill(option.value);
        break;

      case ELEMENTS.ADD_TEXT_TOOL:
        updateFontFamily(option.value);
        break;

      case ELEMENTS.ADD_SHAPE_TOOL:
        updateShape(option.value);
        break;

      case ELEMENTS.ADD_STAMP_TOOL:
        updateStamp(option.value);
        break;
      case ELEMENTS.ERASE_TYPE_TOOL:
        updateEraseType(option.value);
        break;
    }
  }, [updateEraseType, updateFloodFill, updateFontFamily, updateLineWidth, updatePenLine, updatePointer, updateShape, updateStamp]);

  const selectToolAction = useCallback((toolType: ToolType, option?: IToolbarSelectorOption) => {
    const tool = toolsLookup[toolType];

    updateEraseType(null);

    if (
      (tool.id !== ELEMENTS.ERASE_TYPE_TOOL &&
        tool.id !== ELEMENTS.ADD_TEXT_TOOL &&
        tool.id !== ELEMENTS.LINE_TYPE_TOOL &&
        tool.id !== ELEMENTS.LINE_WIDTH_TOOL) ||
      textIsActive
    ) {
      discardActiveObject();
    }

    updateTextIsActive(tool.id === ELEMENTS.ADD_TEXT_TOOL);
    updateShapeIsActive(tool.id === ELEMENTS.ADD_SHAPE_TOOL);
    updateBrushIsActive(tool.id === ELEMENTS.LINE_TYPE_TOOL);
    updateFloodFillIsActive(tool.id === ELEMENTS.FLOOD_FILL_TOOL);
    updateLaserIsActive(tool.id === ELEMENTS.LASER_TOOL);
    setPointerEvents(tool.id !== ELEMENTS.POINTERS_TOOL);

    updateEventedObjects(
      tool.id === ELEMENTS.POINTERS_TOOL || tool.id === ELEMENTS.MOVE_OBJECTS_TOOL
    );

    if (
      tool.id === ELEMENTS.POINTERS_TOOL ||
      tool.id === ELEMENTS.MOVE_OBJECTS_TOOL
    ) {
      updateShapesAreSelectable(true);
    } else {
      updateShapesAreSelectable(false);
    }

    updateShapesAreEvented(
      tool.id === ELEMENTS.FLOOD_FILL_TOOL || tool.id === ELEMENTS.ERASE_TYPE_TOOL
    );

    setTools({ active: tool.id, elements: [...tools.elements] });

    setSelectedTool(toolType);

    if (option) {
      selectToolOption(tool.id, option);
    }
  }, [discardActiveObject, selectToolOption, setPointerEvents, textIsActive, tools.elements, updateBrushIsActive, updateEraseType, updateEventedObjects, updateFloodFillIsActive, updateLaserIsActive, updateShapeIsActive, updateShapesAreEvented, updateShapesAreSelectable, updateTextIsActive]);

  const selectColorAction = useCallback((_color: IStyleOption) => { }, []);

  const clearAction = useCallback((_filter?: string) => { }, []);

  const undoAction = useCallback(() => { }, []);

  const redoAction = useCallback(() => { }, []);

  const actions: IToolbarActions = {
    selectTool: selectToolAction,
    selectColor: selectColorAction,
    clear: clearAction,
    undo: undoAction,
    redo: redoAction,
  };

  const status: IToolbarStatus = {
    selectedTool,
    selectedToolOptions: undefined,
    selectedColor: undefined,
    canRedo: false,
    canUndo: false,
  };

  return (
    <Context.Provider
      value={{ state: { tools: toolsLookup, colors, thickness }, status, actions }}
    >
      {children}
    </Context.Provider>
  );
}

export function useToolbarContext(): IToolbarContext {
  return useContext(Context)
}
