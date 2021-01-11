import { UPDATE_ENCODE_LIST, GET_ENCODE_LIST, ENCODE_LIST_LOADER } from "../actions/types";
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
    case UPDATE_ENCODE_LIST:
      return {
        ...state,
        isUpdateLoading: false
      };
    case ENCODE_LIST_LOADER:
      return {
        ...state,
        isLoading: payload.type === 'list' ? payload.isLoading : state.isLoading,
        isUpdateLoading: payload.type === 'update' ? payload.isLoading : state.isUpdateLoading,
        isAddLoading: payload.type === 'add' ? payload.isLoading : state.isAddLoading,
        isDeleteLoading: payload.type === 'delete' ? payload.isLoading : state.isDeleteLoading
      };
    case GET_ENCODE_LIST:
      return {
        ...state,
        isLoading: false,
        data: payload.dbRes
      };
    default:
      return state;
  }
}
