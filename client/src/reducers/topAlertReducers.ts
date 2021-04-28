import { TOP_ALERT } from "../actions/types";
import { I_ReduxAction } from "../interfaces";

const initialState = {
  showAlert: false,
  message: null,
  type: null
};

export default function (state = initialState, action: I_ReduxAction) {
  switch (action.type) {
    case TOP_ALERT:
      return {
        showAlert: action.payload.showAlert,
        message: action.payload.message,
        type: action.payload.type
      };
    default:
      return state;
  }
}
