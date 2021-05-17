/// <reference types="react" />
import '../../assets/style/toolbar.css';
import { IPermissions } from '../../interfaces/permissions/permissions';
/**
 * Render the toolbar that will be used in the whiteboard
 */
declare function Toolbar(props: {
    toolbarIsEnabled?: (state: {
        permissionsState: {
            [key: string]: boolean;
        };
    }) => boolean;
    permissions: IPermissions;
}): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof Toolbar, Pick<{
    toolbarIsEnabled?: ((state: {
        permissionsState: {
            [key: string]: boolean;
        };
    }) => boolean) | undefined;
    permissions: IPermissions;
}, never> & {
    toolbarIsEnabled?: boolean | undefined;
}>;
export default _default;
