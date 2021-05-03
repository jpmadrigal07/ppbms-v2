import axios from "axios";
import { I_Record } from "../interfaces";
import {
  GET_RECORD,
  RECORD_LOADER,
  TOP_ALERT,
  ADD_RECORD,
  UPDATE_RECORD,
  SECOND_MODAL_TOP_ALERT,
  DELETE_RECORD,
  ADD_DASHBOARD_COUNT,
  UPDATE_LATEST_ENCODE_LIST_COUNT
} from "./types";
import _ from "lodash";

export const getRecord = (variables: string | undefined) => (dispatch: Function) => {
  dispatch(setRecordLoader("list", true));
  axios
    .get(`/api/record${variables}`)
    .then((res) => {
      dispatch({
        type: GET_RECORD,
        payload: res.data !== "" ? res.data : {},
      });
    })
    .catch((err) => {
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const updateRecord = (id: string, recordData: I_Record) => (
  dispatch: Function
) => {
  dispatch(setRecordLoader("update", true));
  axios
    .patch(`/api/record/${id}`, recordData)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: UPDATE_RECORD,
          payload: res.data.dbRes,
        });
        dispatch({
          type: SECOND_MODAL_TOP_ALERT,
          payload: {
            showAlert: true,
            message: "Successfully updated",
            type: "success",
          },
        });
      } else {
        dispatch({
          type: SECOND_MODAL_TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
        dispatch(setRecordLoader("update", false));
      }
    })
    .catch((err) => {
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const uploadExcelFile = (encodeListId: string, file: string, barcodeMiddleText: string) => (
  dispatch: Function
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("encodeListId", encodeListId);
  formData.append("barcodeMiddleText", barcodeMiddleText);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  dispatch(setRecordLoader("add", true));
  axios
    .post(`/api/record/upload`, formData, config)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: ADD_RECORD,
          payload: res.data.dbRes,
        });
        dispatch({
          type: UPDATE_LATEST_ENCODE_LIST_COUNT,
          payload: res.data.dbRes.length,
        });
        dispatch({
          type: TOP_ALERT,
          payload: {
            showAlert: true,
            message: "Successfully uploaded record",
            type: "success",
          },
        });
        dispatch({
          type: ADD_DASHBOARD_COUNT,
          payload: {
            count: _.isArray(res.data.dbRes) ? res.data.dbRes.length : 0,
            type: "listData"
          }
        });
      } else {
        dispatch({
          type: TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
        dispatch(setRecordLoader("add", false));
      }
    })
    .catch((err) => {
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const updateExcelFile = (file: string, sheetNumber: string) => (
  dispatch: Function
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("sheetNumber", sheetNumber);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  dispatch(setRecordLoader("update", true));
  axios
    .patch(`/api/record/update`, formData, config)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: UPDATE_RECORD,
          payload: res.data.dbRes,
        });
        dispatch({
          type: TOP_ALERT,
          payload: {
            showAlert: true,
            message: "Successfully updated",
            type: "success",
          },
        });
      } else {
        dispatch({
          type: TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
        dispatch(setRecordLoader("update", false));
      }
    })
    .catch((err) => {
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const bulkDeleteRecord = (ids: string[]) => (dispatch: Function) => {
  dispatch(setRecordLoader("delete", true));
  axios
    .delete(`/api/record/bulk`, { data: ids })
    .then((res) => {
      if (res.data.isSuccess) {
        // dispatch({
        //   type: DELETE_RECORD,
        //   payload: res.data.dbRes,
        // });
      } else {
        dispatch(setRecordLoader("delete", false));
        dispatch({
          type: TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
      }
    })
    .catch((err) => {
      dispatch(setRecordLoader("delete", false));
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const deleteRecord = (id: string) => (dispatch: Function) => {
  console.log('delete')
  dispatch(setRecordLoader("delete", true));
  axios
    .delete(`/api/record/${id}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: DELETE_RECORD,
          payload: res.data.dbRes,
        });
        dispatch({
          type: SECOND_MODAL_TOP_ALERT,
          payload: {
            showAlert: true,
            message: "Successfully deleted",
            type: "success",
          },
        });
      } else {
        dispatch(setRecordLoader("delete", false));
        dispatch({
          type: SECOND_MODAL_TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
      }
    })
    .catch((err) => {
      dispatch(setRecordLoader("delete", false));
      dispatch({
        type: SECOND_MODAL_TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const setRecordLoader = (type: string, isLoading: boolean) => {
  return {
    type: RECORD_LOADER,
    payload: { type, isLoading },
  };
};
