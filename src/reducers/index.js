import { combineReducers } from 'redux';
import auth from './authReducer';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootAppReducer = combineReducers({
  routing,
  auth,
  toastr: toastrReducer,
});
export default rootAppReducer;
