/// <reference types="react" />
import Toolbar from './components/toolbar/Toolbar';
declare const _default: {
    EventSerializerProvider: import("react").FunctionComponent<{
        children?: any;
        simulateNetworkSynchronization?: boolean | undefined;
    }>;
    WhiteboardProvider: ({ children, }: {
        children: import("react").ReactNode;
    }) => JSX.Element;
    Toolbar: typeof Toolbar;
};
export default _default;
