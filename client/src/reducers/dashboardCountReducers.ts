import {
  ADD_DASHBOARD_COUNT,
  DELETE_DASHBOARD_COUNT,
  DASHBOARD_COUNT_LOADER,
  GET_DASHBOARD_COUNT,
} from "../actions/types";
import { I_ReduxAction } from "../interfaces";
import _ from "lodash";

const initialState = {
  isImportedListLoading: false,
  isListDataLoading: false,
  isDispatchControlLoading: false,
  isListCompletedLoading: false,
  importedList: 0,
  listData: 0,
  dispatchControl: 0,
  listCompleted: 0,
};

export default function (state = initialState, action: I_ReduxAction) {
  const { type, payload } = action;

  switch (type) {
    case ADD_DASHBOARD_COUNT:
      return {
        importedList:
          payload.type === "importedList"
            ? state.importedList + payload.count
            : state.importedList,
        listData:
          payload.type === "listData"
            ? state.listData + payload.count
            : state.listData,
        dispatchControl:
          payload.type === "dispatchControl"
            ? state.dispatchControl + payload.count
            : state.dispatchControl,
        listCompleted:
          payload.type === "listCompleted"
            ? state.listCompleted + payload.count
            : state.listCompleted,
      };
    case DELETE_DASHBOARD_COUNT:
      return {
        importedList:
          payload.type === "importedList" && state.importedList > 0
            ? state.importedList - payload.count
            : state.importedList,
        listData:
          payload.type === "listData" && state.listData > 0
            ? state.listData - payload.count
            : state.listData,
        dispatchControl:
          payload.type === "dispatchControl" && state.dispatchControl > 0
            ? state.dispatchControl - payload.count
            : state.dispatchControl,
        listCompleted:
          payload.type === "listCompleted" && state.listCompleted > 0
            ? state.listCompleted - payload.count
            : state.listCompleted,
      };
    case DASHBOARD_COUNT_LOADER:
      return {
        ...state,
        isImportedListLoading:
          payload.type === "importedList"
            ? payload.isLoading
            : state.isImportedListLoading,
        isListDataLoading:
          payload.type === "listData"
            ? payload.isLoading
            : state.isListDataLoading,
        isDispatchControlLoading:
          payload.type === "dispatchControl"
            ? payload.isLoading
            : state.isDispatchControlLoading,
        isListCompletedLoading:
          payload.type === "listCompleted"
            ? payload.isLoading
            : state.isListCompletedLoading,
      };
    case GET_DASHBOARD_COUNT:
      return {
        ...state,
        importedList:
          payload.type === "importedList" ? payload.count : state.importedList,
        listData: payload.type === "listData" ? payload.count : state.listData,
        dispatchControl:
          payload.type === "dispatchControl"
            ? payload.count
            : state.dispatchControl,
        listCompleted:
          payload.type === "listCompleted"
            ? payload.count
            : state.listCompleted,
      };
    default:
      return state;
  }
}
