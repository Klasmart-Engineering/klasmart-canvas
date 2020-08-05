/// <reference types="react" />
import Toolbar from './components/toolbar/Toolbar';
declare const _default: {
    EventSerializerProvider: import("react").FunctionComponent<{
        children?: any;
    }>;
    WhiteboardProvider: ({ children, canvasId, canvasWidth, canvasHeight, toolbar, }: {
        children: import("react").ReactNode;
        canvasId: string;
        toolbar: import("react").ReactComponentElement<any, Pick<any, string | number | symbol>>;
        canvasWidth: string;
        canvasHeight: string;
    }) => JSX.Element;
    Toolbar: typeof Toolbar;
};
export default _default;
