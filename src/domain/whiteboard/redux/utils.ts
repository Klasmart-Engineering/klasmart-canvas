import { IPermissions } from '../../../interfaces/permissions/permissions';
import store from './store';

/**
 * Indicates if any tool is enabled in toolbar.
 */
export const getToolbarIsEnabled = (userId?: string): boolean => {
  const users = store.getState().usersState
  const user = users.find(u => u.id === userId)
  if (user && user.role === "teacher") {
    return true;
  }

  const permissions = store.getState().permissionsState;

  for (const key in permissions as IPermissions) {
    if (permissions[key] === true) {
      return true;
    }
  }

  return false;
}
