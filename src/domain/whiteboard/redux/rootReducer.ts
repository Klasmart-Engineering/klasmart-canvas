import { combineReducers } from 'redux';
import { permissionsReducer } from './permissionsReducer';
import { canvasBoardReducer } from './canvasActionReducer';

const rootReducer = combineReducers({
  permissionsState: permissionsReducer,
  canvasBoardState: canvasBoardReducer
});

export default rootReducer;
