/// <reference types="react" />
export declare const useToolbarPermissions: () => {
    toolbarIsEnabled: boolean;
    setToolbarIsEnabled: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    serializerToolbarState: {
        cursorPointer: boolean;
        pointer: boolean;
        move: boolean;
        erase: boolean;
        partialErase: boolean;
        pen: boolean;
        floodFill: boolean;
        text: boolean;
        shape: boolean;
        undoRedo: boolean;
        clearWhiteboard: boolean;
        downloadCanvas: boolean;
        uploadImage: boolean;
        backgroundColor: boolean;
    };
    setSerializerToolbarState: import("react").Dispatch<import("react").SetStateAction<{
        cursorPointer: boolean;
        pointer: boolean;
        move: boolean;
        erase: boolean;
        partialErase: boolean;
        pen: boolean;
        floodFill: boolean;
        text: boolean;
        shape: boolean;
        undoRedo: boolean;
        clearWhiteboard: boolean;
        downloadCanvas: boolean;
        uploadImage: boolean;
        backgroundColor: boolean;
    }>>;
};
