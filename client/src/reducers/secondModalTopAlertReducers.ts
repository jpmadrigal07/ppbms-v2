import { SECOND_MODAL_TOP_ALERT } from "../actions/types";
import { I_ReduxAction } from "../interfaces";

const initialState = {
  showAlert: false,
  message: null,
  type: null
};

export default function (state = initialState, action: I_ReduxAction) {
  const { type, payload } = action;

  switch (type) {
    case SECOND_MODAL_TOP_ALERT:
      return {
        showAlert: payload.showAlert,
        message: payload.message,
        type: payload.type
      };
    default:
      return state;
  }
}
