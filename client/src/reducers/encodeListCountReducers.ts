import {
  ADD_ENCODE_LIST_COUNT,
  DELETE_ENCODE_LIST_COUNT,
  GET_ENCODE_LIST_COUNT,
  ENCODE_LIST_COUNT_LOADER,
} from "../actions/types";
import { I_ReduxAction } from "../interfaces";
import _ from "lodash";

const initialState = {
  isLoading: false,
  dataCount: 0,
  pageCount: 0,
};

const calculatePageCount = (count: number) => {
  return count > 10 && count > 0 ? count / 10 : count < 11 && count > 0 ? 1 : 0;
};

export default function (state = initialState, action: I_ReduxAction) {
  const { type, payload } = action;

  switch (type) {
    case ADD_ENCODE_LIST_COUNT:
      return {
        isLoading: false,
        dataCount: state.dataCount - 1,
        pageCount: calculatePageCount(state.dataCount),
      };
    case DELETE_ENCODE_LIST_COUNT:
      return {
        isLoading: false,
        dataCount: state.dataCount - 1,
        pageCount: calculatePageCount(state.dataCount),
      };
    case ENCODE_LIST_COUNT_LOADER:
      return {
        ...state,
        isLoading: payload,
      };
    case GET_ENCODE_LIST_COUNT:
      return {
        ...state,
        isLoading: false,
        dataCount: payload,
        pageCount: calculatePageCount(state.dataCount),
      };
    default:
      return state;
  }
}
