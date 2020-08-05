export var createPermissions = function (isTeacher) {
    if (isTeacher) {
        return createTeacherPermissions();
    }
    else {
        return createStudentPermissions();
    }
};
export var createEmptyPermissions = function () {
    return {
        allowShowHide: false,
        allowCreateShapes: false,
        allowEditShapes: {
            own: false,
            others: false,
        },
        allowDeleteShapes: {
            own: false,
            others: false,
        },
    };
};
export var createTeacherPermissions = function () {
    return {
        allowShowHide: true,
        allowCreateShapes: true,
        allowEditShapes: {
            own: true,
            others: true,
        },
        allowDeleteShapes: {
            own: true,
            others: true,
        },
    };
};
export var createStudentPermissions = function () {
    return {
        allowShowHide: false,
        allowCreateShapes: false,
        allowEditShapes: {
            own: true,
            others: false,
        },
        allowDeleteShapes: {
            own: true,
            others: false,
        },
    };
};
//# sourceMappingURL=Permissions.js.map