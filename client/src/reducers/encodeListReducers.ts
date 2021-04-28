import {
  UPDATE_ENCODE_LIST,
  ADD_ENCODE_LIST,
  GET_ENCODE_LIST,
  DELETE_ENCODE_LIST,
  ENCODE_LIST_LOADER,
  PAGE_LOADED_ENCODE_LIST,
  GET_ENCODE_LIST_RECORD_COUNT
} from "../actions/types";
import { I_ReduxAction, I_EncodeList } from "../interfaces";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isUpdateLoading: false,
  isAddLoading: false,
  isDeleteLoading: false,
  isRecordCountLoading: false,
  pageLoaded: [],
  data: []
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
        isRecordCountLoading:
          payload.type === "recordCount" ? payload.isLoading : state.isRecordCountLoading,
      };
    case GET_ENCODE_LIST:
      return {
        ...state,
        data: _.sortBy(_.uniqBy([...state.data, ...payload.dbRes], '_id'), ['createdAt']),
        isLoading: false
      };
    case PAGE_LOADED_ENCODE_LIST:
      return {
        ...state,
        pageLoaded: _.sortBy([...state.pageLoaded, payload]),
        isLoading: false
      };
    case GET_ENCODE_LIST_RECORD_COUNT:
      return {
        ...state,
        data: state.data.map((res: I_EncodeList) => {
          if(res._id === payload.dbRes.encodeListId) {
            res.recordCount = payload.dbRes.recordCount;
            res.assignedRecordCount = payload.dbRes.assignedRecordCount;
            res.unAssignedRecordCount = payload.dbRes.unAssignedRecordCount;
            return res
          } else {
            return res
          }
        }),
        isRecordCountLoading: false
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

// GANTO ANG MAGING PAGINATION ARRAY STRUCTURE, ALISIN NA PAGINATION_ENCODE_LIST, FOR SEARCH NAMAN DAPAT SA MAIN ENCODELIST ARRAY SIYA MAG HANAP TAPOS STRUCTURE NALANG NG BAGONG PAGINATION
// [{
//     pageNumber: 1
//     encodeListData: []
// }]
