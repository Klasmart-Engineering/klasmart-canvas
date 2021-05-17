/// <reference types="react" />
export interface ISetUserInfoToDisplayModal {
    selection: string;
    setSelection: (selection: string) => void;
}
/**
 Modal component to select user info option to display on the tooltip that appears hovering an object.
 */
export declare const useSetUserInfoToDisplayModal: (setUserInfo: (value: string) => void) => {
    openSetUserInfoToDisplayModal: () => void;
    SetUserInfoToDisplayModal: (props: ISetUserInfoToDisplayModal) => JSX.Element;
};
