import { combineReducers } from 'redux';
import navBarReducer from './navBarReducer';
import authBarReducer from './authReducers';
import userReducer from './userReducers';
import topAlertReducer from './topAlertReducers';
import modalTopAlertReducer from './modalTopAlertReducers';
import areaPriceReducer from './areaPriceReducers';
import dispatchControlMessengerReducer from './dispatchControlMessengerReducers';
import barcodeMiddleTextReducer from './barcodeMiddleTextReducers';
import encodeListReducer from './encodeListReducers';
import recordReducer from './recordReducers';

export default combineReducers({
    navBar: navBarReducer,
    user: userReducer,
    auth: authBarReducer,
    topAlert: topAlertReducer,
    modalTopAlert: modalTopAlertReducer,
    areaPrice: areaPriceReducer,
    dispatchControlMessenger: dispatchControlMessengerReducer,
    barcodeMiddleText: barcodeMiddleTextReducer,
    encodeList: encodeListReducer,
    record: recordReducer
});