import { combineReducers } from 'redux';
import { permissionsReducer } from './permissionsReducer';
import { usersReducer } from './usersReducer';
import { canvasBoardReducer } from './canvasActionReducer';

const rootReducer = combineReducers({
  permissionsState: permissionsReducer,
  usersState: usersReducer,
  canvasBoardState: canvasBoardReducer,
});

export default rootReducer;
