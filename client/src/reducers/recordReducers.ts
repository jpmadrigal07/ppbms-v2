import {
  UPDATE_RECORD,
  GET_RECORD,
  RECORD_LOADER,
  ADD_RECORD,
  DELETE_RECORD,
} from "../actions/types";
import { I_ReduxAction, I_Record } from "../interfaces";
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
    case UPDATE_RECORD:
      return {
        ...state,
        isUpdateLoading: false,
        data: state.data.map((data: I_Record) => {
          // sometimes payload is array and sometimes its an object
          const updatedRecord = _.isArray(payload)
            ? payload.find((updated: I_Record) => updated._id === data._id)
            : payload._id === data._id
            ? payload
            : null;
          return !_.isNil(updatedRecord) ? updatedRecord : data;
        }),
      };
    case RECORD_LOADER:
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
    case ADD_RECORD:
      return {
        ...state,
        data: [...state.data, ...payload],
        isAddLoading: false,
      };
    case GET_RECORD:
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...payload.dbRes],
      };
    case DELETE_RECORD:
      return {
        ...state,
        isDeleteLoading: false,
        data: state.data.filter((data: I_Record) => data._id !== payload._id),
      };
    default:
      return state;
  }
}
