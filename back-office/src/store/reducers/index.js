// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import authReducer from './authReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  auth: authReducer
});

export default reducers;
