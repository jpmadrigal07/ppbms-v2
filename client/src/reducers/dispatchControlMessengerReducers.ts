import {
  GET_DISPATCH_CONTROL_MESSENGERS,
  ADD_DISPATCH_CONTROL_MESSENGER,
  DISPATCH_CONTROL_MESSENGER_LOADER,
  PAGE_LOADED_ENCODE_LIST,
  PAGE_LOADED_MESSENGERS
} from "../actions/types";
import { I_ReduxAction } from "../interfaces";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isUpdateLoading: false,
  isAddLoading: false,
  isDeleteLoading: false,
  pageLoaded: [],
  data: []
};

export default function (state = initialState, action: I_ReduxAction) {
  const { type, payload } = action;

  switch (type) {
    case GET_DISPATCH_CONTROL_MESSENGERS:
      return {
        ...state,
        data: _.sortBy(_.uniqBy([...state.data, ...payload.dbRes], '_id'), ['createdAt']),
        isLoading: false
      };
    case ADD_DISPATCH_CONTROL_MESSENGER:
      return {
        ...state,
        data: [payload.dbRes, ...state.data],
        isAddLoading: false
      };
    case PAGE_LOADED_MESSENGERS:
      return {
        ...state,
        pageLoaded: _.sortBy([...state.pageLoaded, payload]),
        isLoading: false
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
