import { combineReducers } from 'redux';
import { permissionsReducer } from './permissionsReducer';
import { usersReducer } from './usersReducer';
import { canvasBoardReducer } from './canvasActionReducer';
import { portfolioReducer } from './portfolioReducer';

const rootReducer = combineReducers({
  permissionsState: permissionsReducer,
  usersState: usersReducer,
  canvasBoardState: canvasBoardReducer,
  potfolioReducer: portfolioReducer,
});

export default rootReducer;
