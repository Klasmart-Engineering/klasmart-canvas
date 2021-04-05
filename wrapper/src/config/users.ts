const teacherPermissions = {
  allowClearAll: true,
  allowClearOthers: true,
  allowClearMyself: true,
};

const studentPermissions = {
  allowClearAll: false,
  allowClearOthers: false,
  allowClearMyself: true,
};

export const users = [
    {
        id: 'teacher',
        name: 'William Teacher',
        role: 'teacher',
        permissions: teacherPermissions,
        avatarImg: 'https://i.pravatar.cc/35?img=59',
        canvasId: 'canvas1',
      },
      {
        id: 'student',
        name: 'John',
        role: 'student',
        permissions: studentPermissions,
        avatarImg: 'https://i.pravatar.cc/35?img=4',
        canvasId: 'canvas2',
      },
      {
        id: 'student2',
        name: 'Mary',
        role: 'student',
        permissions: studentPermissions,
        avatarImg: 'https://i.pravatar.cc/35?img=37',
        canvasId: 'canvas3',
      },
      {
        id: 'student4',
        name: 'Joe',
        role: 'student',
        permissions: studentPermissions,
        avatarImg: 'https://i.pravatar.cc/35?img=4',
        canvasId: 'canvas4',
      },
];
