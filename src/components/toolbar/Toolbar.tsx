import React, { useState, useContext, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import ToolbarSection from './toolbar-section/ToolbarSection';
import '../../assets/style/toolbar.css';
import ToolbarButton from './toolbar-button/ToolbarButton';
import ToolbarSelector from './toolbar-selector/ToolbarSelector';
import IToolbarSelectorOption from '../../interfaces/toolbar/toolbar-selector/toolbar-selector-option';
import { toolsSection, actionsSection } from './toolbar-sections';
import SpecialSelector from './special-selector/SpecialSelector';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import IStyleOptions from '../../interfaces/toolbar/toolbar-special-elements/style-option';
import IBasicToolbarSelector from '../../interfaces/toolbar/toolbar-selector/basic-toolbar-selector';
import IBasicToolbarButton from '../../interfaces/toolbar/toolbar-button/basic-toolbar-button';
import IColorPalette from '../../interfaces/toolbar/toolbar-selector/color-palette';
import IBasicSpecialSelector from '../../interfaces/toolbar/toolbar-special-elements/basic-special-selector';
import { WhiteboardContext } from '../../domain/whiteboard/WhiteboardContext';
import { ELEMENTS } from '../../config/toolbar-element-names';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import IBasicToolbarSection from '../../interfaces/toolbar/toolbar-section/basic-toolbar-section';
import { mappedActionElements, mappedToolElements } from './permissions-mapper';
import { IBrushType } from '../../interfaces/brushes/brush-type';
import { IPointerType } from '../../interfaces/pointers/pointer-type';
import { IPermissions } from '../../interfaces/permissions/permissions';
import { IBasicSecondOptionSelector } from '../../interfaces/toolbar/toolbar-second-option-selector/basic-second-option-selector';
import SecondOptionSelector from './second-option-selector/SecondOptionSelector';
import { IStampMode } from '../../interfaces/stamps/stamp-mode';

// Toolbar Element Available Types
type ToolbarElementTypes =
  | IBasicToolbarButton
  | IBasicToolbarSelector
  | IBasicSpecialSelector
  | IBasicSecondOptionSelector;

/**
 * Render the toolbar that will be used in the whiteboard
 */
function Toolbar(props: {
  toolbarIsEnabled?: (state: {
    permissionsState: { [key: string]: boolean };
  }) => boolean;
  permissions: IPermissions;
}) {
  const [tools, setTools] = useState(toolsSection);
  const [actions] = useState(actionsSection);

  const {
    fillColor,
    textColor,
    updateShape,
    fontFamily,
    fontColor,
    updateFontFamily,
    setPointerEvents,
    textIsActive,
    updateTextIsActive,
    updateShapeIsActive,
    updateBrushIsActive,
    shape,
    shapeColor,
    eraseType,
    updateEraseType,
    discardActiveObject,
    lineWidth,
    updateLineWidth,
    floodFill,
    updateFloodFill,
    updateFloodFillIsActive,
    updateEventedObjects,
    backgroundColor,
    stampMode,
    updateStampMode,
    updateStampIsActive,
    // Just for control selectors' value may be changed in the future
    pointer,
    updatePointer,
    penColor,
    changeStrokeColor,
    changeBrushType,
    stamp,
    updateStamp,
    updateShapesAreSelectable,
    undo,
    redo,
    updateShapesAreEvented,
    updateLaserIsActive,
    pointerIsEnabled,
    allToolbarIsEnabled,
    updateLineWidthIsActive,
    brushType,
    updateImagePopupIsOpen,
    openUploadFileModal,
    openSetUserInfoToDisplayModal,
    openClearWhiteboardModal,
    updateEraserIsActive,
    fillBackgroundColor,
    updateSelectedTool,
    setActiveTool,
    set3dActive,
    setCreating3d,
    setNew3dShape,
    is3dSelected
  } = useContext(WhiteboardContext);

  const toolbarIsEnabled = props.toolbarIsEnabled;
  const cursorPointerToolIsActive =
    allToolbarIsEnabled || props.permissions.cursorPointer;
  const pointerToolIsActive = allToolbarIsEnabled || props.permissions.pointer;
  const moveToolIsActive = allToolbarIsEnabled || props.permissions.move;
  const eraseToolIsActive =
    allToolbarIsEnabled ||
    props.permissions.erase ||
    props.permissions.partialErase;
  const penToolIsActive = allToolbarIsEnabled || props.permissions.pen;
  const floodFillToolIsActive =
    allToolbarIsEnabled || props.permissions.floodFill;
  const textToolIsActive = allToolbarIsEnabled || props.permissions.text;
  const shapeToolIsActive = allToolbarIsEnabled || props.permissions.shape;
  const backgroundColorToolIsActive =
    allToolbarIsEnabled || props.permissions.backgroundColor;
    const shape3dToolIsActive = allToolbarIsEnabled || props.permissions.shape3d; 

  /**
   * Is executed when a ToolbarButton is clicked in Tools section
   * and set the new selected button for that section
   * @param {number} index - index that the clicked button has in the array
   */
  function handleToolsElementClick(tool: string) {

    if (tool === ELEMENTS.POINTERS_TOOL && !cursorPointerToolIsActive) {
      return;
    }

    if (tool === ELEMENTS.LASER_TOOL && !pointerToolIsActive) {
      return;
    }

    if (tool === ELEMENTS.MOVE_OBJECTS_TOOL && !moveToolIsActive) {
      return;
    }

    if (tool === ELEMENTS.ERASE_TYPE_TOOL && !eraseToolIsActive) {
      return;
    }

    if (tool === ELEMENTS.LINE_TYPE_TOOL && !penToolIsActive) {
      return;
    }

    if (tool === ELEMENTS.FLOOD_FILL_TOOL && !floodFillToolIsActive) {
      return;
    }

    if (tool === ELEMENTS.ADD_TEXT_TOOL && !textToolIsActive) {
      return;
    }

    if (tool === ELEMENTS.ADD_SHAPE_TOOL && !shapeToolIsActive) {
      return;
    }

    if (tool === ELEMENTS.ADD_3D_SHAPE_TOOL && !shape3dToolIsActive) {
      return;
    }

    if(tool === ELEMENTS.LINE_WIDTH_TOOL && is3dSelected) return

    if (
      tool === ELEMENTS.BACKGROUND_COLOR_TOOL &&
      !backgroundColorToolIsActive
    ) {
      return;
    }

    /*
      If you click on another button different than
      the mentioned below the selected object will be deselected;
      the cases mentioned below will be handled in WhiteboardContext.
      The textIsActive validation was added here to fix
      a text synchronization issue
    */
    if (
      (tool !== ELEMENTS.ERASE_TYPE_TOOL &&
        tool !== ELEMENTS.ADD_TEXT_TOOL &&
        tool !== ELEMENTS.LINE_TYPE_TOOL &&
        tool !== ELEMENTS.LINE_WIDTH_TOOL) ||
      (textIsActive && tool !== ELEMENTS.ADD_TEXT_TOOL)
    ) {
      discardActiveObject();
    }

    /*
      It is setted to true when you select Add Text Tool,
      otherwise will be setted in false
    */
    updateTextIsActive(tool === ELEMENTS.ADD_TEXT_TOOL);

    /*
      It is setted to true when you select Add Shape Tool,
      otherwise will be setted in false
    */
    updateShapeIsActive(tool === ELEMENTS.ADD_SHAPE_TOOL);

    /**
     * Indicates if brush / pencil / pen tool is active.
     */
    updateBrushIsActive(tool === ELEMENTS.LINE_TYPE_TOOL);

    /**
     * Indicates if flood-fill/paint bucket is active.
     */
    updateFloodFillIsActive(tool === ELEMENTS.FLOOD_FILL_TOOL);

    /**
     * Indicates if laser tool is active.
     */
    updateLaserIsActive(tool === ELEMENTS.LASER_TOOL);

    /**
     * Indicates if any eraser is active.
     */
    updateEraserIsActive(tool === ELEMENTS.ERASE_TYPE_TOOL);

    /**
     * Indicates if line width tool is active.
     */
    updateLineWidthIsActive(tool === ELEMENTS.LINE_WIDTH_TOOL);

    /*
      It is setted to false when you select Pointer Tool,
      otherwise will be setted in true
    */
    setPointerEvents(tool !== ELEMENTS.POINTERS_TOOL);

    /**
     * Update selected tool
     */
    updateSelectedTool(tool)

    updateEventedObjects(tool === ELEMENTS.MOVE_OBJECTS_TOOL);

    if (tool === ELEMENTS.MOVE_OBJECTS_TOOL) {
      updateShapesAreSelectable(true);
    } else {
      updateShapesAreSelectable(false);
    }

    updateShapesAreEvented(
      tool === ELEMENTS.FLOOD_FILL_TOOL || tool === ELEMENTS.ERASE_TYPE_TOOL
    );

    // set the clicked tool like active style in Toolbar
    if (allToolbarIsEnabled || toolbarIsEnabled) {
      setTools({
        active: tool,
        elements: [...tools.elements],
      });
    }

    setActiveTool(tool);
    /**
     * Indicates if 3d tool is active
     */
    set3dActive(tool === ELEMENTS.ADD_3D_SHAPE_TOOL || (is3dSelected && ELEMENTS.LINE_TYPE_TOOL === tool))
  }

  /**
   * Is executed when a ToolbarButton is clicked in Actions section
   * and set the new selected button for that section
   * @param {number} index - index that the clicked button has in the array
   */
  function handleActionsElementClick(tool: string) {
    discardActiveObject();

    const teacherHasPermission = allToolbarIsEnabled;
    const studentHasPermission = toolbarIsEnabled && props.permissions.undoRedo;

    if (toolbarIsEnabled) {
      switch (tool) {
        case ELEMENTS.CLEAR_WHITEBOARD_ACTION:
          openClearWhiteboardModal();
          break;

        case ELEMENTS.UNDO_ACTION:
          if (teacherHasPermission || studentHasPermission) {
            undo();
          }
          break;

        case ELEMENTS.REDO_ACTION:
          if (teacherHasPermission || studentHasPermission) {
            redo();
          }
          break;
        case ELEMENTS.WHITEBOARD_SCREENSHOT_ACTION:
          updateImagePopupIsOpen(true);
          break;
        case ELEMENTS.ADD_IMAGE_ACTION:
          if (
            teacherHasPermission ||
            (toolbarIsEnabled && props.permissions.uploadImage)
          ) {
            openUploadFileModal();
          }
          break;
        case ELEMENTS.SET_USER_INFO_TO_DISPLAY:
          if (
            teacherHasPermission ||
            (toolbarIsEnabled && props.permissions.uploadImage)
          ) {
            openSetUserInfoToDisplayModal();
          }
          break;
      }
    }
  }

  /**
   * Is executed when a change value happens in a Tools ToolbarSelector
   * @param {string} tool - index of the selector in ToolbarSection
   * @param {string} value - new selected value
   */
  async function handleToolSelectorChange(tool: string, option: string) {
    
    switch (tool) {
      case ELEMENTS.POINTERS_TOOL:
        updatePointer(option as IPointerType);
        break;

      case ELEMENTS.LINE_TYPE_TOOL:
        changeBrushType(option as IBrushType);
        break;

      case ELEMENTS.LINE_WIDTH_TOOL:
        updateLineWidth(Number(option));
        break;

      case ELEMENTS.FLOOD_FILL_TOOL:
        updateFloodFill(option);
        break;

      case ELEMENTS.BACKGROUND_COLOR_TOOL:
        fillBackgroundColor(option);
        break;

      case ELEMENTS.ADD_TEXT_TOOL:
        updateFontFamily(option);
        break;

      case ELEMENTS.ADD_SHAPE_TOOL:
        updateShape(option);
        break;
      case ELEMENTS.ADD_3D_SHAPE_TOOL:
        /**
         * A new shape is chosen from the 3d selector
         */
        await set3dActive(false)
        setNew3dShape(option);
        setCreating3d(true)
        set3dActive(true)
        updateLineWidthIsActive(false)
        break;
      case ELEMENTS.ADD_STAMP_TOOL:
        updateStamp(option);
        break;
    }
  }

  /**
   * Is executed when a change value happens in
   * a Tools ToolbarSecondOptionSelector in its second option
   * @param {string} tool - index of the selector in ToolbarSection
   * @param {string} value - new selected value
   */
  function handleToolSecondSelectorChange(tool: string, option: string) {
    switch (tool) {
      case ELEMENTS.ADD_STAMP_TOOL:
        updateStampMode(option as IStampMode);
        break;
    }
  }

  /**
   * Is executed when the action of the element is triggered
   * @param {number} index - index that the element has in the ToolbarSection
   * @param {string} specific (optional) - specific value/option to use
   */
  function handleToolsElementAction(tool: string, specific: string) {
    updateEraseType(null);

    switch (tool) {
      case ELEMENTS.ERASE_TYPE_TOOL:
        updateEraseType(specific);
        break;

      case ELEMENTS.ADD_TEXT_TOOL:
        updateFontFamily(specific);
        break;

      case ELEMENTS.ADD_SHAPE_TOOL:
        updateShape(specific);
        break;

      case ELEMENTS.ADD_STAMP_TOOL:
        updateStampIsActive(true);
        updateStamp(specific);
      
      default:
        break;
    }
  }

  /**
   * Is executed when a color was picked in elements with color palette
   * @param {number} index - index that the element has in ToolbarSection
   * @param {string} color - new color to set in the element
   */
  function changeColor(tool: string, color: string) {
    switch (tool) {
      case ELEMENTS.LINE_TYPE_TOOL:
        changeStrokeColor(color);
        break;

      case ELEMENTS.ADD_TEXT_TOOL:
        textColor(color);
        break;

      case ELEMENTS.ADD_SHAPE_TOOL:
        fillColor(color);
        break;
    }
  }

  /**
   * Set the props to create a new ColorPalette with the given icon
   * @param {OverridableComponent<SvgIconTypeMap<{}, 'svg'>>}
   * colorPaletteIcon - Icon to set in the color palette
   */
  function setColorPalette(
    tool: IBasicToolbarSelector
  ): IColorPalette | undefined {
    let selected = '';

    if (!tool.colorPaletteIcon) {
      return undefined;
    }

    switch (tool.id) {
      case ELEMENTS.LINE_TYPE_TOOL:
        selected = penColor;
        break;

      case ELEMENTS.ADD_TEXT_TOOL:
        selected = fontColor;
        break;

      case ELEMENTS.ADD_SHAPE_TOOL:
        selected = shapeColor;
        break;

      default:
        selected = '';
        break;
    }

    return {
      icon: tool.colorPaletteIcon,
      selectedColor: selected,
      onChangeColor: changeColor,
    };
  }

  /**
   * Set the parent's definedOptionName in the given tool
   * @param {string} tool - Tool to set the definedOption
   */
  function setSelectedOptionSelector(
    tool: string,
    props?: IBasicToolbarSelector
  ): string | number | null {
    switch (tool) {
      case ELEMENTS.POINTERS_TOOL:
        return pointer;

      case ELEMENTS.ERASE_TYPE_TOOL: {
        let allowed = props?.options.filter((options: any) => options.enabled);

        if (
          allowed?.length === 1 &&
          eraseType &&
          allowed[0].value !== eraseType
        ) {
          updateEraseType(allowed[0].value);
          return allowed[0].value;
        }

        return eraseType;
      }

      case ELEMENTS.LINE_TYPE_TOOL:
        return brushType;

      case ELEMENTS.LINE_WIDTH_TOOL:
        return lineWidth;

      case ELEMENTS.FLOOD_FILL_TOOL:
        return floodFill;

      case ELEMENTS.BACKGROUND_COLOR_TOOL:
        return backgroundColor;

      case ELEMENTS.ADD_TEXT_TOOL:
        return fontFamily;

      case ELEMENTS.ADD_SHAPE_TOOL:
        return shape;

      case ELEMENTS.ADD_STAMP_TOOL:
        return stamp;

      default:
        return '';
    }
  }

  /**
   * Set the parent's definedSecondOptionName in the given tool
   * @param {string} tool - Tool to set the definedSecondOption
   */
  function setSelectedSecondOptionSelector(tool: string) {
    switch (tool) {
      case ELEMENTS.ADD_STAMP_TOOL:
        return stampMode;
      default:
        return null;
    }
  }

  /**
   * If a permission element is active in Toolbar, when the permission
   * will be revoked the active tool will change to the first one (pointers)
   */
  useEffect(() => {
    if (
      !toolbarIsEnabled &&
      tools.active !== ELEMENTS.ADD_TEXT_TOOL &&
      tools.active !== ELEMENTS.ADD_STAMP_TOOL
    ) {
      setTools({
        active: ELEMENTS.POINTERS_TOOL,
        elements: [...tools.elements],
      });
    }
    // If tools.elements and tools.active are added an infinite loop happens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolbarIsEnabled]);

  /**
   * Indicates active tool.
   */
  const getActiveTool = useMemo((): string => tools.active as string, [tools]);

  /**
   * Returns tool elements.
   */
  const getToolElements = useMemo(
    (): IBasicToolbarSection['elements'] => [...tools.elements],
    [tools]
  );

  /**
   * Sets pointer tool as active for teacher user
   */
  useEffect(() => {
    if (allToolbarIsEnabled) {
      setTools({
        active: ELEMENTS.POINTERS_TOOL,
        elements: getToolElements,
      });

      setPointerEvents(false);
    }
    // If getToolElements and tools.active are added an infinite loop happens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allToolbarIsEnabled, setPointerEvents]);

  /**
   * Checks if any tool permission is set to true. If not, and tool is selected,
   * default pointer is automatically selected.
   */
  useEffect(() => {
    if (allToolbarIsEnabled) {
      return;
    }

    if (!props.permissions.pointer && getActiveTool === ELEMENTS.LASER_TOOL) {
      setTools({
        active: null,
        elements: getToolElements,
      });
    }

    if (
      !props.permissions.move &&
      getActiveTool === ELEMENTS.MOVE_OBJECTS_TOOL
    ) {
      setTools({
        active: null,
        elements: getToolElements,
      });
    }

    if (
      !props.permissions.erase && !props.permissions.partialErase &&
      getActiveTool === ELEMENTS.ERASE_TYPE_TOOL
    ) {
      setTools({
        active: null,
        elements: getToolElements,
      });
    }

    if (!props.permissions.erase && props.permissions.partialErase) {
      updateEraseType('partial');
    } else if (props.permissions.erase && !props.permissions.partialErase) {
      updateEraseType('object');
    } else {
      updateEraseType(null);
    }

    if (!props.permissions.pen && getActiveTool === ELEMENTS.LINE_TYPE_TOOL) {
      setTools({
        active: null,
        elements: getToolElements,
      });
    }

    if (
      !props.permissions.floodFill &&
      getActiveTool === ELEMENTS.FLOOD_FILL_TOOL
    ) {
      setTools({
        active: null,
        elements: getToolElements,
      });
    }

    if (!props.permissions.text && getActiveTool === ELEMENTS.ADD_TEXT_TOOL) {
      setTools({
        active: null,
        elements: getToolElements,
      });
    }

    if (!props.permissions.shape && getActiveTool === ELEMENTS.ADD_SHAPE_TOOL) {
      setTools({
        active: null,
        elements: getToolElements,
      });
    }

    if (
      !props.permissions.cursorPointer &&
      getActiveTool === ELEMENTS.POINTERS_TOOL
    ) {
      setTools({
        active: null,
        elements: getToolElements,
      });
    }

    if (
      !props.permissions.backgroundColor &&
      getActiveTool === ELEMENTS.BACKGROUND_COLOR_TOOL
    ) {
      setTools({
        active: ELEMENTS.POINTERS_TOOL,
        elements: getToolElements,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pointerIsEnabled,
    getActiveTool,
    getToolElements,
    allToolbarIsEnabled,
    props.permissions,
    updateEraseType,
  ]);

  const toolbarContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '120px',
  };

  const toolbarStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '16px',
    borderRadius: '8px',
  };

  const actionElements = mappedActionElements(
    actions,
    allToolbarIsEnabled,
    props.permissions
  );

  const toolElements = mappedToolElements(
    tools,
    allToolbarIsEnabled,
    props.permissions,
    is3dSelected
  );

  return (
    <div style={toolbarContainerStyle}>
      <div style={toolbarStyle}>
        <ToolbarSection>
          {toolElements
            .filter((tool) => {
              return tool.available;
            })
            .map(
              (
                tool:
                  | IBasicToolbarButton
                  | IBasicToolbarSelector
                  | IBasicSpecialSelector
                  | IBasicSecondOptionSelector
              ) =>
                determineIfIsToolbarButton(tool)
                  ? createToolbarButton(
                      tool.id,
                      tool.title,
                      tool.iconSrc,
                      tool.iconName,
                      tools.active === tool.id,
                      handleToolsElementClick,
                      tool.enabled
                    )
                  : determineIfIsToolbarSelector(tool)
                  ? createToolbarSelector(
                      tool.id,
                      tool.options,
                      tools.active === tool.id,
                      handleToolsElementClick,
                      handleToolSelectorChange,
                      handleToolsElementAction,
                      setSelectedOptionSelector(tool.id, tool),
                      setColorPalette(tool),
                      tool.enabled
                    )
                  : determineIfIsSpecialSelector(tool)
                  ? createSpecialSelector(
                      tool.id,
                      tool.icon,
                      tools.active === tool.id,
                      setSelectedOptionSelector(tool.id),
                      tool.styleOptions,
                      handleToolsElementClick,
                      handleToolSelectorChange,
                      tool.enabled
                    )
                  : determineIfIsToolbarSecondOptionSelector(tool)
                  ? createToolbarSecondOptionSelector(
                      tool.id,
                      tool.options,
                      tool.secondOptions,
                      tools.active === tool.id,
                      handleToolsElementClick,
                      handleToolSelectorChange,
                      handleToolSecondSelectorChange,
                      handleToolsElementAction,
                      setSelectedOptionSelector(tool.id, tool),
                      setSelectedSecondOptionSelector(tool.id),
                      setColorPalette(tool),
                      tool.enabled
                    )
                  : null
            )}
        </ToolbarSection>

        <ToolbarSection>
          {actionElements.map((action) =>
            determineIfIsToolbarButton(action)
              ? createToolbarButton(
                  action.id,
                  action.title,
                  action.iconSrc,
                  action.iconName,
                  actions.active === action.id,
                  handleActionsElementClick,
                  action.enabled
                )
              : null
          )}
        </ToolbarSection>
      </div>
    </div>
  );
}

/**
 * Creates a ToolbarButton
 * @param {string} id - id of the button
 * @param {string} iconSrc - src for the icon of the button
 * @param {string} iconName - alt for the icon of the button
 * @param {boolean} active - flag to set this button like active
 * @param {(index: number) => void} onClick - function to execute when button is clicked
 */
function createToolbarButton(
  id: string,
  title: string,
  iconSrc: string,
  iconName: string,
  active: boolean,
  onClick: (tool: string) => void,
  enabled?: boolean | undefined
): JSX.Element {
  return (
    <ToolbarButton
      key={id}
      id={id}
      title={title}
      iconSrc={iconSrc}
      iconName={iconName}
      active={active}
      enabled={enabled === false ? false : true}
      onClick={onClick}
    />
  );
}

/**
 * Creates a ToolbarSelector
 * @param {string} id - id of the selector
 * @param {IToolbarSelectorOption[]} options - options that the selector
 * will have
 * @param {boolean} active - flag to set this selector like active
 * @param {(index: number) => void} onClick - function to execute
 * when selector is clicked
 * @param {(value: string) => void} onChange - function to execute
 * when selector's value changes
 * @param {(index: number) => void} onAction - function to execute when
 * the action of this element is triggered
 * @param {string} definedOptionName - selected option name defined by parent
 * @param {IColorPalette} colorPalette (optional) - Describes
 * the color palette to use
 */
function createToolbarSelector(
  id: string,
  options: IToolbarSelectorOption[],
  active: boolean,
  onClick: (tool: string) => void,
  onChange: (tool: string, value: string) => void,
  onAction: (tool: string, value: string) => void,
  selectedValue: string | number | null,
  colorPalette?: IColorPalette,
  enabled?: boolean
): JSX.Element {
  return (
    <ToolbarSelector
      key={id}
      id={id}
      options={options}
      active={active}
      selectedValue={selectedValue as string}
      colorPalette={colorPalette}
      onAction={onAction as any}
      onClick={onClick}
      onChange={onChange}
      enabled={enabled === false ? false : true}
    />
  );
}

/**
 * Creates a ToolbarSecondOptionSelector
 * @param {string} id - id of the selector
 * @param {IToolbarSelectorOption[]} options - options that the selector
 * will have
 * @param {IToolbarSelectorOption[]} secondOptions - options that the selector
 * will have in the second options array
 * @param {boolean} active - flag to set this selector like active
 * @param {(index: number) => void} onClick - function to execute
 * when selector is clicked
 * @param {(value: string) => void} onChange - function to execute
 * when selector's value changes
 * @param {(value: string) => void} onSecondChange - function to execute
 * when selector's second value changes
 * @param {(index: number) => void} onAction - function to execute when
 * the action of this element is triggered
 * @param {string} definedOptionName - selected option name defined by parent
 * @param {string} definedSecondOptionName - selected second option
 * name defined by parent
 * @param {IColorPalette} colorPalette (optional) - Describes
 * the color palette to use
 */
function createToolbarSecondOptionSelector(
  id: string,
  options: IToolbarSelectorOption[],
  secondOptions: IToolbarSelectorOption[],
  active: boolean,
  onClick: (tool: string) => void,
  onChange: (tool: string, value: string) => void,
  onSecondChange: (tool: string, value: string) => void,
  onAction: (tool: string, value: string) => void,
  selectedValue: string | number | null,
  selectedSecondValue: string | number | null,
  colorPalette?: IColorPalette,
  enabled?: boolean
): JSX.Element {
  return (
    <SecondOptionSelector
      key={id}
      id={id}
      options={options}
      secondOptions={secondOptions}
      active={active}
      selectedSecondValue={selectedSecondValue as string}
      selectedValue={selectedValue as string}
      colorPalette={colorPalette}
      onAction={onAction as any}
      onClick={onClick}
      onChange={onChange}
      onSecondChange={onSecondChange}
      enabled={enabled === false ? false : true}
    />
  );
}

/**
 * Create an SpecialToolbarSelector
 * @param {string} id - id of the selector
 * @param {OverridableComponent<SvgIconTypeMap<{}, 'svg'>>} Icon - Icon
 * that the selector will have
 * @param {boolean} selected - flag to set this selector like selected
 * @param {IStyleOptions[]} styleOptions - Options for the special selector
 * @param {(index: number) => void} onClick - Function to execute when
 * selector is clicked
 * @param {(value: string) => void} onChange - Function to execute when
 * selector's value is changed
 */
function createSpecialSelector(
  id: string,
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>,
  active: boolean,
  selectedValue: string | number | null,
  styleOptions: IStyleOptions[],
  onClick: (tool: string) => void,
  onChange: (tool: string, value: string) => void,
  enabled: boolean | undefined
): JSX.Element {
  return (
    <SpecialSelector
      key={id}
      id={id}
      Icon={Icon}
      active={active}
      selectedValue={selectedValue as string}
      styleOptions={styleOptions}
      onClick={onClick}
      onChange={onChange}
      enabled={enabled}
    />
  );
}

/**
 * Validate if the given object has ToolbarButton Props
 * @param {ToolbarElementTypes} toBeDetermined - Object to validate
 */
function determineIfIsToolbarButton(
  toBeDetermined: ToolbarElementTypes
): toBeDetermined is IBasicToolbarButton {
  return !!(toBeDetermined as IBasicToolbarButton).iconSrc;
}

/**
 * Validate if the given object has ToolbarSelector Props
 * @param {ToolbarElementTypes} toBeDetermined - Object to validate
 */
function determineIfIsToolbarSelector(
  toBeDetermined: ToolbarElementTypes
): toBeDetermined is IBasicToolbarSelector {
  return (
    !!(toBeDetermined as IBasicToolbarSelector).options &&
    !(toBeDetermined as IBasicSecondOptionSelector).secondOptions
  );
}

/**
 * Validate if the given object has SpecialToolbarSelector Props
 * @param {ToolbarElementTypes} toBeDetermined - Object to validate
 */
function determineIfIsSpecialSelector(
  toBeDetermined: ToolbarElementTypes
): toBeDetermined is IBasicSpecialSelector {
  return !!(toBeDetermined as IBasicSpecialSelector).icon;
}

/**
 * Validate if the given object has ToolbarSecondOptionSelector Props
 * @param {ToolbarElementTypes} toBeDetermined - Object to validate
 */
function determineIfIsToolbarSecondOptionSelector(
  toBeDetermined: ToolbarElementTypes
): toBeDetermined is IBasicToolbarSelector {
  return (
    !!(toBeDetermined as IBasicToolbarSelector).options &&
    !!(toBeDetermined as IBasicSecondOptionSelector).secondOptions
  );
}

/**
 * Maps state to props.
 * @param state Redux state
 * @param ownProps Own properties
 */
const mapStateToProps = (
  state: { permissionsState: IPermissions },
  ownProps: { toolbarIsEnabled?: boolean }
) => ({
  ...ownProps,
  permissions: state.permissionsState,
  toolbarIsEnabled: (state: {
    permissionsState: { [key: string]: boolean };
  }) => {
    for (const key in state.permissionsState) {
      if (state.permissionsState[key] === true) {
        return true;
      }
    }

    return false;
  },
});

export default connect(mapStateToProps)(Toolbar);
