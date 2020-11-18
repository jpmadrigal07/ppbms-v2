import { combineReducers } from 'redux';
import navBarReducer from './navBarReducer';
import authBarReducer from './authReducers';

export default combineReducers({
    navBar: navBarReducer,
    auth: authBarReducer
});