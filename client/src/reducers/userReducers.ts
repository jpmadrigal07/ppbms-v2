import { UPDATE_USER, GET_USERS, USER_LOADER } from "../actions/types";
import { I_ReduxAction } from "../interfaces";
import _ from "lodash";

const initialState = {
  isLoading: true,
  data: null
};

export default function (state = initialState, action: I_ReduxAction) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case USER_LOADER:
      return {
        ...state,
        isLoading: action.payload
      };
    case GET_USERS:
      return {
        isLoading: false,
        data: action.payload
      };
    default:
      return state;
  }
}
