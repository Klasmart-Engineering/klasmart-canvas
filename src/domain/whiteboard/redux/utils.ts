import { IPermissions } from '../../../interfaces/permissions/permissions';
import store from './store';

/**
 * Indicates if any tool is enabled in toolbar.
 */
export const getToolbarIsEnabled = (): boolean => {
  const permissions = store.getState().permissionsState;

  for (const key in permissions as IPermissions) {
    if (permissions[key] === true) {
      return true;
    }
  }

  return false;
}
