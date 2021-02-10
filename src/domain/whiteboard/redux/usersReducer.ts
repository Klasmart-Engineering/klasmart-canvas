import { IUser } from '../../../interfaces/user/user';

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

/**
 * Default users state.
 */
const initialState: IUser[] = [
  {
    id: "1",
    name: 'William',
    role: 'teacher',
    permissions: teacherPermissions,
    avatarImg: 'https://i.pravatar.cc/35?img=59',
  },
  {
    id: "2",
    name: 'John',
    role: 'student',
    permissions: studentPermissions,
    avatarImg: 'https://i.pravatar.cc/35?img=4',
  },
  {
    id: "3",
    name: 'Mary',
    role: 'student',
    permissions: studentPermissions,
    avatarImg: 'https://i.pravatar.cc/35?img=37',
  },
];

/**
 * Reducer
 * @param state Redux state
 * @param action Action
 */
export function usersReducer(
  state: IUser[] = initialState,
  action: { type: string; payload: IUser }
) {
  switch (action.type) {
    default:
      return state;
  }
}
