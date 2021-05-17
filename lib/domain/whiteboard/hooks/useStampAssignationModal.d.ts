/// <reference types="react" />
import { IUser } from '../../../interfaces/user/user';
export interface IStampAssignationModal {
    assignStudents: (studentIds: string[]) => void;
    studentsList: IUser[];
}
/**
 * Generates stamp assignation modal
 */
export declare const useStampAssignationModal: () => {
    stampAssignationModal: boolean;
    openStampAssignationModal: () => void;
    closeStampAssignationModal: () => void;
    StampAssignationModal: (props: IStampAssignationModal) => JSX.Element;
};
