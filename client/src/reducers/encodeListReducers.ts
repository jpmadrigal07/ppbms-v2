import {
  UPDATE_ENCODE_LIST,
  ADD_ENCODE_LIST,
  GET_ENCODE_LIST,
  DELETE_ENCODE_LIST,
  ENCODE_LIST_LOADER,
} from "../actions/types";
import { I_ReduxAction, I_EncodeList } from "../interfaces";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isUpdateLoading: false,
  isAddLoading: false,
  isDeleteLoading: false,
  data: [],
};

export default function (state = initialState, action: I_ReduxAction) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_ENCODE_LIST:
      return {
        ...state,
        isUpdateLoading: false,
      };
    case ADD_ENCODE_LIST:
      return {
        ...state,
        data: [...state.data, payload],
        isAddLoading: false,
      };
    case ENCODE_LIST_LOADER:
      return {
        ...state,
        isLoading:
          payload.type === "list" ? payload.isLoading : state.isLoading,
        isUpdateLoading:
          payload.type === "update" ? payload.isLoading : state.isUpdateLoading,
        isAddLoading:
          payload.type === "add" ? payload.isLoading : state.isAddLoading,
        isDeleteLoading:
          payload.type === "delete" ? payload.isLoading : state.isDeleteLoading,
      };
    case GET_ENCODE_LIST:
      return {
        ...state,
        isLoading: false,
        data: payload.dbRes,
      };
    case DELETE_ENCODE_LIST:
      return {
        ...state,
        isDeleteLoading: false,
        data: state.data.filter(
          (data: I_EncodeList) => data._id !== payload._id
        ),
      };
    default:
      return state;
  }
}
