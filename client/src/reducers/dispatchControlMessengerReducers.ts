import { GET_DISPATCH_CONTROL_MESSENGERS, ADD_DISPATCH_CONTROL_MESSENGER, DISPATCH_CONTROL_MESSENGER_LOADER } from "../actions/types";
import { I_ReduxAction } from "../interfaces";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isUpdateLoading: false,
  isAddLoading: false,
  isDeleteLoading: false,
  data: []
};

export default function (state = initialState, action: I_ReduxAction) {
  const { type, payload } = action;

  switch (type) {
    case GET_DISPATCH_CONTROL_MESSENGERS:
      return {
        ...state,
        data: payload.dbRes,
        isLoading: false
      };
    case ADD_DISPATCH_CONTROL_MESSENGER:
      return {
        ...state,
        data: [payload.dbRes, ...state.data],
        isAddLoading: false
      };
    case DISPATCH_CONTROL_MESSENGER_LOADER:
      return {
        ...state,
        isLoading: payload.type === 'list' ? payload.isLoading : state.isLoading,
        isUpdateLoading: payload.type === 'update' ? payload.isLoading : state.isUpdateLoading,
        isAddLoading: payload.type === 'add' ? payload.isLoading : state.isAddLoading,
        isDeleteLoading: payload.type === 'delete' ? payload.isLoading : state.isDeleteLoading
      };
    default:
      return state;
  }
}
