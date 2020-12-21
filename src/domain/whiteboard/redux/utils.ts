import { IPermissions } from '../../../interfaces/permissions/permissions';
import store from './store';

export const getToolbarIsEnabled = () => {
  const permissions = store.getState().permissionsState;

  for (const key in permissions as IPermissions) {
    if (permissions[key] === true) {
      return true;
    }
  }

  return false;
}
