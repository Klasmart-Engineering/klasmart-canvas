/// <reference types="react" />
import { useToolbarContext } from './components/toolbar/toolbar-context-provider';
import ToolbarExample from './components/toolbar/toolbar-example';
declare const _default: {
    EventSerializerProvider: import("react").FunctionComponent<{
        children?: import("react").ReactChild | import("react").ReactChildren | Element[] | null | undefined;
        simulateNetworkSynchronization?: boolean | undefined;
        simulatePersistence?: boolean | undefined;
    }>;
    WhiteboardProvider: ({ children, permissions, }: {
        children: import("react").ReactNode;
        permissions: import("./interfaces/canvas-events/whiteboard-permissions").IWhiteboardPermissions;
    }) => JSX.Element;
    Toolbar: {
        useToolbarContext: typeof useToolbarContext;
        ToolbarExample: typeof ToolbarExample;
        Context: import("react").Context<import("./components/toolbar/toolbar-context-provider").IToolbarContext>;
    };
};
export default _default;
