import React, {
  createContext,
  ReactChild,
  ReactChildren,
  useCallback,
  useContext,
  useState,
  useMemo,
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

export interface IToolbarActions {
  selectTool: (toolType: ToolType, options?: IToolbarSelectorOption) => void;

  selectColorByName: (colorName: string) => void;
  selectColorByValue: (color: string) => void;

  clear: (filter?: string[]) => void;

  undo: () => void;

  redo: () => void;
}

export interface IToolbarState {
  tools: Record<ToolType, { id: string, options: OptionalToolOptions }>;
  colors: IStyleOption[];
  thickness: IThicknessStyle[];
}

export interface IToolbarStatus {
  selectedTool: ToolType | undefined;
  selectedColor: string | undefined;
  selectedToolOption: IToolbarSelectorOption | undefined;
  // TODO: Undo/Redo available?
}

export interface IToolbarContext {
  state: IToolbarState;
  status: IToolbarStatus;
  actions: IToolbarActions;
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
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<IToolbarSelectorOption | undefined>(undefined);

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
    changeStrokeColor,
    textColor,
    fillColor,
    undo,
    redo,
    clear,
  } = useContext(WhiteboardContext);

  const toolsLookup = useMemo<Record<ToolType, { id: string, options: OptionalToolOptions }>>(() => {
    return {
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
  }, []);

  const colorsLookup = useMemo(() => {
    return colorPaletteOptions.reduce((map, color) => {
      return map.set(color.id, color);
    }, new Map<string, IStyleOption>())
  }, []);

  const colors = useMemo(() => {
    return Array.from(colorsLookup.values());
  }, [colorsLookup])

  const thicknessLookup = useMemo(() => {
    return selectorStyleOptionsWithId('line_width')
      .map((opt) => {
        return { id: opt.id, style: opt.style, value: opt.value };
      })
      .reduce((map, style) => {
        return map.set(style.id, style);
      }, new Map<string, IThicknessStyle>())
  }, []);

  const thickness = useMemo(() => {
    return Array.from(thicknessLookup.values());
  }, [thicknessLookup])

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
      (textIsActive && tool.id !== ELEMENTS.ADD_TEXT_TOOL)
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
    setSelectedOption(option);

    if (option) {
      selectToolOption(tool.id, option);
    }
  }, [discardActiveObject, selectToolOption, setPointerEvents, textIsActive, tools.elements, toolsLookup, updateBrushIsActive, updateEraseType, updateEventedObjects, updateFloodFillIsActive, updateLaserIsActive, updateShapeIsActive, updateShapesAreEvented, updateShapesAreSelectable, updateTextIsActive]);

  const selectColorByValueAction = useCallback((color: string) => {
    // TODO: There might be bugs in this action, I'm not sure in which
    // condition the 'updateFloodFill/fillColor/changeStrokeColor/textColor' 
    // should be called. I think from the user's perspective they should
    // select one color and that color is used based on which tool is 
    // selected.

    updateFloodFill(color);

    // NOTE: Added this conditional because without it selected
    // lines would get filled (not just stroked) whenever the color was selected.
    if (selectedTool === "shape") {
      fillColor(color);
    } else {
      changeStrokeColor(color);
      textColor(color);
    }

    setSelectedColor(color);
  }, [changeStrokeColor, fillColor, selectedTool, textColor, updateFloodFill]);

  const selectColorByNameAction = useCallback((colorName: string) => {
    const color = colorsLookup.get(colorName);
    if (!color) return;

    selectColorByValueAction(String(color.value));
  }, [colorsLookup, selectColorByValueAction]);

  const clearAction = useCallback((filter?: string[]) => {
    clear(filter)
  }, [clear]);

  const undoAction = useCallback(() => {
    undo();
  }, [undo]);

  const redoAction = useCallback(() => {
    redo();
  }, [redo]);

  const actions: IToolbarActions = {
    selectTool: selectToolAction,
    selectColorByName: selectColorByNameAction,
    selectColorByValue: selectColorByValueAction,
    clear: clearAction,
    undo: undoAction,
    redo: redoAction,
  };

  const status: IToolbarStatus = {
    selectedTool,
    selectedToolOption: selectedOption,
    selectedColor: selectedColor,
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
