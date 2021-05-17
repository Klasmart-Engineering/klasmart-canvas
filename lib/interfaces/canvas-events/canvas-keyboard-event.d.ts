export interface ICanvasKeyboardEvent extends Event {
    key: string;
    keyCode?: number;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    metaKey?: boolean;
}
