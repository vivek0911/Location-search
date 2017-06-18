import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import location from './location';

const rootReducer = combineReducers({
  routing,
  auth,
  location,
});

export default rootReducer;
