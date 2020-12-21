import { createStore } from 'redux'
import { rootReducer } from './permissionsReducer';

/**
 * Redux store
 */
const store = createStore(rootReducer)

export default store;
