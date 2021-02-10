import { combineReducers } from 'redux';
import { permissionsReducer } from './permissionsReducer';
import {usersReducer} from './usersReducer'

const rootReducer = combineReducers({
  permissionsState: permissionsReducer,
  usersState: usersReducer
});

export default rootReducer;
