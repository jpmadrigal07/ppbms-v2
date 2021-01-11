import axios from "axios";
import { GET_RECORD, RECORD_LOADER, TOP_ALERT, ADD_RECORD } from "./types";

export const getRecord = () => (dispatch: Function) => {
  dispatch(setRecordLoader("list", true));
  axios
    .get(`/api/record`)
    .then((res) => {
        dispatch({
          type: GET_RECORD,
          payload:
            res.data !== "" ? res.data : {},
        })
      }
    )
    .catch((err) => {
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err, type: "danger" }
      });
    });
};

export const uploadExcelFile = (file: string, sheetNumber: string) => (dispatch: Function) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('sheetNumber', sheetNumber);
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }
  dispatch(setRecordLoader("add", true));
  axios
    .post(`/api/record/upload`, formData, config)
    .then((res) => {
        if(res.data.isSuccess) {
          dispatch({
            type: ADD_RECORD,
            payload: res.data.dbRes
          });
          dispatch({
            type: TOP_ALERT,
            payload: { showAlert: true, message: "Successfully uploaded", type: "success" }
          });
        } else {
          dispatch({
            type: TOP_ALERT,
            payload: { showAlert: true, message: res.data.dbRes, type: "danger" }
          });
          dispatch(setRecordLoader("add", false));
        }
      }
    )
    .catch((err) => {
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err, type: "danger" }
      });
    });
};

export const setRecordLoader = (type: string, isLoading: boolean) => {
  return {
    type: RECORD_LOADER,
    payload: { type, isLoading }
  };
};