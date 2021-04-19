import IBasicToolbarSelector from '../../interfaces/toolbar/toolbar-selector/basic-toolbar-selector';
import IBasicToolbarSection from '../../interfaces/toolbar/toolbar-section/basic-toolbar-section';
import IBasicToolbarButton from '../../interfaces/toolbar/toolbar-button/basic-toolbar-button';
import IBasicSpecialSelector from '../../interfaces/toolbar/toolbar-special-elements/basic-special-selector';
import { IPermissions } from '../../interfaces/permissions/permissions';
import IToolbarSelectorOption from '../../interfaces/toolbar/toolbar-selector/toolbar-selector-option';


/**
 * Maps permissions to action tools.
 * @param actions Action tool options for canvas.
 * @param allToolbarIsEnabled Indicates if all tools are enabled for user.
 * @param serializerToolbarState Provided permissions for individual tools.
 */
export const mappedActionElements = (
  actions: IBasicToolbarSection,
  allToolbarIsEnabled: boolean,
  serializerToolbarState: IPermissions
) =>
  actions.elements.map(
    (
      elmnt: IBasicToolbarButton | IBasicToolbarSelector | IBasicSpecialSelector
    ) => {
      switch (elmnt.id) {
        case 'whiteboard_screenshot': {
          const enabled =
            allToolbarIsEnabled || serializerToolbarState.downloadCanvas;
          return { ...elmnt, enabled };
        }
        case 'clear_whiteboard': {
          const enabled =
            allToolbarIsEnabled || serializerToolbarState.clearWhiteboard;
          return { ...elmnt, enabled };
        }
        case 'add_image': {
          const enabled =
            allToolbarIsEnabled || serializerToolbarState.uploadImage;
          return { ...elmnt, enabled };
        }
        case 'undo':
        case 'redo': {
          const enabled =
            allToolbarIsEnabled || serializerToolbarState.undoRedo;
          return { ...elmnt, enabled };
        }
        case 'set_user_info_to_display': {
          const enabled = allToolbarIsEnabled || serializerToolbarState.shape;
          return { ...elmnt, enabled };
        }
        default: {
          return { ...elmnt, enabled: true };
        }
      }
    }
  );

/**
 * Maps permissions to tools.
 * @param tools Tool options for canvas.
 * @param allToolbarIsEnabled Indicates if all tools are enabled for user.
 * @param serializerToolbarState Provided permissions for individual tools.
 */
export const mappedToolElements = (
  tools: IBasicToolbarSection,
  allToolbarIsEnabled: boolean,
  serializerToolbarState: IPermissions,
  is3dSelected: boolean
) =>
  tools.elements.map(
    (
      elmnt: IBasicToolbarButton | IBasicToolbarSelector | IBasicSpecialSelector
    ) => {
      switch (elmnt.id) {
        case 'pointers': {
          const available = true;
          const enabled =
            allToolbarIsEnabled || serializerToolbarState.cursorPointer;
          return { ...elmnt, enabled, available };
        }
        case 'laser_pointer': {
          const available = true;
          const enabled = allToolbarIsEnabled || serializerToolbarState.pointer;
          return { ...elmnt, enabled, available };
        }
        case 'move_objects': {
          const available = true;
          const enabled = allToolbarIsEnabled || serializerToolbarState.move;
          return { ...elmnt, enabled, available };
        }
        case 'erase_type': {
          const available = true;
          const enabled =
            allToolbarIsEnabled ||
            serializerToolbarState.erase ||
            serializerToolbarState.partialErase;

          elmnt = {
            ...elmnt,
            options: (elmnt as IBasicToolbarSelector).options.map(
              (option: IToolbarSelectorOption) => {
                if (option.id === 'partial_erase') {
                  return {
                    ...option,
                    enabled:
                      allToolbarIsEnabled ||
                      serializerToolbarState.partialErase,
                    available,
                  };
                } else {
                  return {
                    ...option,
                    enabled:
                      allToolbarIsEnabled || serializerToolbarState.erase,
                    available,
                  };
                }
              }
            ),
          };

          return { ...elmnt, enabled, available };
        }
        case 'line_type': {
          const available = true;
          const enabled = allToolbarIsEnabled || serializerToolbarState.pen;
          elmnt = {
            ...elmnt,
            options: (elmnt as IBasicToolbarSelector).options.map(
              (option: IToolbarSelectorOption) => {
                if (option.id !== 'pencil_line' && option.id !== 'dashed_line') {
                  return {
                    ...option,
                    enabled: !is3dSelected,
                  };
                } else {
                  return {
                    ...option,
                    enabled,
                  };
                }
              }
            ),
          };
          return { ...elmnt, enabled };
        }
        case 'line_width': {
          const enabled = true;//!is3dSelected;
          return { ...elmnt, enabled };
        }
        case 'flood_fill': {
          const available = true;
          const enabled =
            allToolbarIsEnabled || serializerToolbarState.floodFill;
          return { ...elmnt, enabled, available };
        }
        case 'background_color': {
          const available = true;
          const enabled =
            allToolbarIsEnabled || serializerToolbarState.backgroundColor;
          return { ...elmnt, enabled, available };
        }
        case 'add_text': {
          const available = true;
          const enabled = allToolbarIsEnabled || serializerToolbarState.text;
          return { ...elmnt, enabled, available };
        }
        case 'add_shape': {
          const available = true;
          const enabled = allToolbarIsEnabled || serializerToolbarState.shape;
          return { ...elmnt, enabled, available };
        }
        case 'add_stamp': {
          const available = allToolbarIsEnabled;
          const enabled = allToolbarIsEnabled;
          return { ...elmnt, enabled, available };
        }
        case 'add_3d_shape': {
          const enabled = allToolbarIsEnabled || serializerToolbarState.shape3d;
          return { ...elmnt, enabled };
        }
        default: {
          return { ...elmnt, enabled: true, available: true };
        }
      }
    }
  );
