import IBasicToolbarSelector from '../../interfaces/toolbar/toolbar-selector/basic-toolbar-selector';
import IBasicToolbarSection from '../../interfaces/toolbar/toolbar-section/basic-toolbar-section';
import { IWhiteboardContext } from '../../interfaces/whiteboard-context/whiteboard-context';
import IBasicToolbarButton from '../../interfaces/toolbar/toolbar-button/basic-toolbar-button';
import IBasicSpecialSelector from '../../interfaces/toolbar/toolbar-special-elements/basic-special-selector';
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
  serializerToolbarState: IWhiteboardContext['serializerToolbarState']
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
        case 'undo':
        case 'redo': {
          const enabled =
            allToolbarIsEnabled || serializerToolbarState.undoRedo;
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
  serializerToolbarState: IWhiteboardContext['serializerToolbarState']
) =>
  tools.elements.map(
    (
      elmnt: IBasicToolbarButton | IBasicToolbarSelector | IBasicSpecialSelector
    ) => {
      switch (elmnt.id) {
        case 'laser_pointer': {
          const enabled = allToolbarIsEnabled || serializerToolbarState.pointer;
          return { ...elmnt, enabled };
        }
        case 'move_objects': {
          const enabled = allToolbarIsEnabled || serializerToolbarState.move;
          return { ...elmnt, enabled };
        }
        case 'erase_type': {
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
                  };
                } else {
                  return {
                    ...option,
                    enabled:
                      allToolbarIsEnabled || serializerToolbarState.erase,
                  };
                }
              }
            ),
          };

          return { ...elmnt, enabled };
        }
        case 'line_type': {
          const enabled = allToolbarIsEnabled || serializerToolbarState.pen;
          return { ...elmnt, enabled };
        }
        case 'flood_fill': {
          const enabled =
            allToolbarIsEnabled || serializerToolbarState.floodFill;
          return { ...elmnt, enabled };
        }
        case 'add_text': {
          const enabled = allToolbarIsEnabled || serializerToolbarState.text;
          return { ...elmnt, enabled };
        }
        case 'add_shape': {
          const enabled = allToolbarIsEnabled || serializerToolbarState.shape;
          return { ...elmnt, enabled };
        }
        default: {
          return { ...elmnt, enabled: true };
        }
      }
    }
  );
