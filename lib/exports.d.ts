/// <reference types="react" />
import Toolbar from './components/toolbar/Toolbar';
declare const _default: {
    EventSerializerProvider: import("react").FunctionComponent<{
        children?: any;
        simulateNetworkSynchronization?: boolean | undefined;
    }>;
    WhiteboardProvider: ({ children, canvasWidth, canvasHeight, }: {
        children: import("react").ReactNode;
        canvasWidth: string;
        canvasHeight: string;
    }) => JSX.Element;
    Toolbar: typeof Toolbar;
};
export default _default;
