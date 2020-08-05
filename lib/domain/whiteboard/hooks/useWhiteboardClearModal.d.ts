/// <reference types="react" />
export interface IClearWhiteboardModal {
    clearWhiteboard(): void;
}
export declare const useWhiteboardClearModal: () => {
    clearWhiteboardModal: boolean;
    openModal: () => void;
    closeModal: () => void;
    ClearWhiteboardModal: (props: IClearWhiteboardModal) => JSX.Element;
};
