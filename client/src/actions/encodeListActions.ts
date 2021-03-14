import axios from "axios";
import {
  GET_ENCODE_LIST,
  ENCODE_LIST_LOADER,
  DELETE_ENCODE_LIST,
  ADD_ENCODE_LIST,
  MODAL_TOP_ALERT,
  ADD_DASHBOARD_COUNT,
  PAGE_LOADED_ENCODE_LIST,
  TOP_ALERT,
} from "./types";
import _ from "lodash";

export const addLoadedPage = (pageNumber: number) => (dispatch: Function) => {
  dispatch(setEncodeListLoader("list", true));
  console.log('mylove', pageNumber)
  dispatch({
    type: PAGE_LOADED_ENCODE_LIST,
    payload: pageNumber
  });
};

export const getEncodeList = (variables: string | undefined, pageNumber: number | undefined) => (dispatch: Function) => {
  dispatch(setEncodeListLoader("list", true));
  axios
    .get(`/api/encodeList${variables}`)
    .then((res) => {
      dispatch({
        type: GET_ENCODE_LIST,
        payload: res.data !== "" ? res.data : {},
      });
      if(!_.isNil(pageNumber)) {
        dispatch({
          type: PAGE_LOADED_ENCODE_LIST,
          payload: pageNumber
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: MODAL_TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const addEncodeList = (fileName: string | undefined) => (
  dispatch: Function
) => {
  dispatch(setEncodeListLoader("add", true));
  axios
    .post(`/api/encodeList`, { fileName })
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: ADD_ENCODE_LIST,
          payload: res.data.dbRes,
        });
        dispatch({
          type: TOP_ALERT,
          payload: {
            showAlert: true,
            message: "Successfully added encode list",
            type: "success",
          },
        });
        dispatch({
          type: ADD_DASHBOARD_COUNT,
          payload: {
            count: 1,
            type: "importedList"
          }
        });
      } else {
        dispatch(setEncodeListLoader("add", false));
        dispatch({
          type: TOP_ALERT,
          payload: {
            showAlert: true,
            message: res.data.dbRes,
            type: "danger",
          },
        });
      }
    })
    .catch((err) => {
      dispatch(setEncodeListLoader("add", false));
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const deleteEncodeList = (id: string) => (dispatch: Function) => {
  dispatch(setEncodeListLoader("delete", true));
  axios
    .delete(`/api/encodeList/${id}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: DELETE_ENCODE_LIST,
          payload: res.data.dbRes,
        });
        dispatch({
          type: MODAL_TOP_ALERT,
          payload: {
            showAlert: true,
            message: "Successfully deleted",
            type: "success",
          },
        });
      } else {
        dispatch(setEncodeListLoader("delete", false));
        dispatch({
          type: MODAL_TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
      }
    })
    .catch((err) => {
      dispatch(setEncodeListLoader("delete", false));
      dispatch({
        type: MODAL_TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const setEncodeListLoader = (type: string, isLoading: boolean) => {
  return {
    type: ENCODE_LIST_LOADER,
    payload: { type, isLoading },
  };
};
