export interface IToolbarUI {
    toolbarState: {
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
        uploadImage: boolean;
    };
}
