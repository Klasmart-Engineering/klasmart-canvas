/// <reference types="react" />
import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
export interface IUploadFileModal {
    setImage: (image: string | File) => void;
    setIsGif: (status: boolean) => void;
    setBackgroundImage: (image: string | File) => void;
    setBackgroundImageIsPartialErasable: (status: boolean) => void;
    isBackgroundImage: boolean;
    setIsBackgroundImage: (status: boolean) => void;
}
/**
 Modal component to upload image files.
 This component handles the logic to set the type of file(png, svg, giff, img)
 the user is uploading.
 The file size limit is 5mb.
 */
export declare const useUploadFileModal: (eventSerializer: PaintEventSerializer, userId: string) => {
    uploadFileModal: boolean;
    openUploadFileModal: () => void;
    closeUploadFileModal: () => void;
    UploadFileModal: (props: IUploadFileModal) => JSX.Element;
};
