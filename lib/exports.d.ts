/// <reference types="react" />
import Toolbar from './components/toolbar/Toolbar';
declare const _default: {
    EventSerializerProvider: import("react").FunctionComponent<{
        children?: string | number | import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)> | import("react").ReactChildren | Element[] | null | undefined;
        simulateNetworkSynchronization?: boolean | undefined;
    }>;
    WhiteboardProvider: ({ children, clearWhiteboardPermissions, }: {
        children: import("react").ReactNode;
        clearWhiteboardPermissions: import("./interfaces/canvas-events/clear-whiteboard-permissions").IClearWhiteboardPermissions;
    }) => JSX.Element;
    Toolbar: typeof Toolbar;
};
export default _default;
