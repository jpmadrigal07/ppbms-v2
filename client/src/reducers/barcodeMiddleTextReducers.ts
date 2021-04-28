import {
  GET_BARCODE_MIDDLE_TEXT,
  ADD_BARCODE_MIDDLE_TEXT,
  BARCODE_MIDDLE_TEXT_LOADER,
  UPDATE_BARCODE_MIDDLE_TEXT,
  DELETE_BARCODE_MIDDLE_TEXT
} from "../actions/types";
import { I_BarcodeMiddleText, I_ReduxAction } from "../interfaces";
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
    case GET_BARCODE_MIDDLE_TEXT:
      return {
        ...state,
        data: payload.dbRes,
        isLoading: false,
      };
    case ADD_BARCODE_MIDDLE_TEXT:
      return {
        ...state,
        data: [...state.data, payload],
        isAddLoading: false,
      };
    case UPDATE_BARCODE_MIDDLE_TEXT:
      return {
        ...state,
        isUpdateLoading: false,
        data: state.data.map((data: I_BarcodeMiddleText) =>
          data._id === payload._id ? { ...data, code: payload.code } : data
        ),
      };
    case DELETE_BARCODE_MIDDLE_TEXT:
      return {
        ...state,
        isDeleteLoading: false,
        data: state.data.filter((data: I_BarcodeMiddleText) => data._id !== payload._id)
      };
    case BARCODE_MIDDLE_TEXT_LOADER:
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
    default:
      return state;
  }
}
