import { combineReducers } from 'redux';
import navBarReducer from './navBarReducer';

export default combineReducers({
    navBar: navBarReducer
});