import { combineReducers } from 'redux';
import navBarReducer from './navBarReducer';
import authBarReducer from './authReducers';
import userReducer from './userReducers';
import topAlertReducer from './topAlertReducers';
import modalTopAlertReducer from './modalTopAlertReducers';
import secondModalTopAlertReducer from './secondModalTopAlertReducers';
import areaPriceReducer from './areaPriceReducers';
import dispatchControlMessengerReducer from './dispatchControlMessengerReducers';
import dispatchControlDataReducer from './dispatchControlDataReducers';
import barcodeMiddleTextReducer from './barcodeMiddleTextReducers';
import encodeListReducer from './encodeListReducers';
import encodeListCountReducer from './encodeListCountReducers';
import dashboardCountReducer from './dashboardCountReducers';
import recordReducer from './recordReducers';

export default combineReducers({
    navBar: navBarReducer,
    user: userReducer,
    auth: authBarReducer,
    topAlert: topAlertReducer,
    modalTopAlert: modalTopAlertReducer,
    secondModalTopAlert: secondModalTopAlertReducer,
    areaPrice: areaPriceReducer,
    dispatchControlMessenger: dispatchControlMessengerReducer,
    dispatchControlData: dispatchControlDataReducer,
    barcodeMiddleText: barcodeMiddleTextReducer,
    encodeList: encodeListReducer,
    encodeListCount: encodeListCountReducer,
    dashboardCount: dashboardCountReducer,
    record: recordReducer
});