export interface Permissions {
    allowShowHide: boolean;
    allowCreateShapes: boolean;
    allowEditShapes: {
        own: boolean;
        others: boolean;
    };
    allowDeleteShapes: {
        own: boolean;
        others: boolean;
    };
}
export declare const createPermissions: (isTeacher: boolean) => Permissions;
export declare const createEmptyPermissions: () => Permissions;
export declare const createTeacherPermissions: () => Permissions;
export declare const createStudentPermissions: () => Permissions;
