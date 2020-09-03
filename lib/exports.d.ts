/// <reference types="react" />
import { useToolbarContext } from './components/toolbar/toolbar-context-provider';
import ToolbarExample from './components/toolbar/toolbar-example';
declare const _default: {
    EventSerializerProvider: import("react").FunctionComponent<{
        children?: string | number | import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)> | import("react").ReactChildren | Element[] | null | undefined;
        simulateNetworkSynchronization?: boolean | undefined;
        simulatePersistence?: boolean | undefined;
    }>;
    WhiteboardProvider: ({ children, clearWhiteboardPermissions, }: {
        children: import("react").ReactNode;
        clearWhiteboardPermissions: import("./interfaces/canvas-events/clear-whiteboard-permissions").IClearWhiteboardPermissions;
    }) => JSX.Element;
    Toolbar: {
        useToolbarContext: typeof useToolbarContext;
        ToolbarExample: typeof ToolbarExample;
        Context: import("react").Context<import("./components/toolbar/toolbar-context-provider").IToolbarContext>;
    };
};
export default _default;
