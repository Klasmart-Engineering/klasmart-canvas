import IBasicToolbarSection from '../../interfaces/toolbar/toolbar-section/basic-toolbar-section';
import { IPermissions } from '../../interfaces/permissions/permissions';
import IToolbarSelectorOption from '../../interfaces/toolbar/toolbar-selector/toolbar-selector-option';
/**
 * Maps permissions to action tools.
 * @param actions Action tool options for canvas.
 * @param allToolbarIsEnabled Indicates if all tools are enabled for user.
 * @param serializerToolbarState Provided permissions for individual tools.
 */
export declare const mappedActionElements: (actions: IBasicToolbarSection, allToolbarIsEnabled: boolean, serializerToolbarState: IPermissions) => ({
    enabled: boolean;
    id: string;
    title: string;
    iconSrc: string;
    iconName: string;
} | {
    enabled: boolean;
    id: string;
    options: IToolbarSelectorOption[];
    colorPaletteIcon?: import("@material-ui/core/OverridableComponent").OverridableComponent<import("@material-ui/core").SvgIconTypeMap<{}, "svg">> | undefined;
} | {
    enabled: boolean;
    id: string;
    icon: import("@material-ui/core/OverridableComponent").OverridableComponent<import("@material-ui/core").SvgIconTypeMap<{}, "svg">>;
    styleOptions: import("../../interfaces/toolbar/toolbar-special-elements/style-option").default[];
})[];
/**
 * Maps permissions to tools.
 * @param tools Tool options for canvas.
 * @param allToolbarIsEnabled Indicates if all tools are enabled for user.
 * @param serializerToolbarState Provided permissions for individual tools.
 */
export declare const mappedToolElements: (tools: IBasicToolbarSection, allToolbarIsEnabled: boolean, serializerToolbarState: IPermissions) => ({
    enabled: boolean;
    available: boolean;
    id: string;
    title: string;
    iconSrc: string;
    iconName: string;
} | {
    enabled: boolean;
    available: boolean;
    id: string;
    options: IToolbarSelectorOption[];
    colorPaletteIcon?: import("@material-ui/core/OverridableComponent").OverridableComponent<import("@material-ui/core").SvgIconTypeMap<{}, "svg">> | undefined;
} | {
    enabled: boolean;
    available: boolean;
    id: string;
    icon: import("@material-ui/core/OverridableComponent").OverridableComponent<import("@material-ui/core").SvgIconTypeMap<{}, "svg">>;
    styleOptions: import("../../interfaces/toolbar/toolbar-special-elements/style-option").default[];
})[];
