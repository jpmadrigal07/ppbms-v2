import axios from "axios";
import {
  ADD_BARCODE_MIDDLE_TEXT,
  DELETE_BARCODE_MIDDLE_TEXT,
  UPDATE_BARCODE_MIDDLE_TEXT,
  GET_BARCODE_MIDDLE_TEXT,
  BARCODE_MIDDLE_TEXT_LOADER,
  MODAL_TOP_ALERT,
} from "./types";

export const getBarcodeMiddleText = () => (dispatch: Function) => {
  dispatch(setBarcodeMiddleTextLoader("list", true));
  axios
    .get(`/api/barcodeMiddleText`)
    .then((res) => {
      dispatch({
        type: GET_BARCODE_MIDDLE_TEXT,
        payload: res.data !== "" ? res.data : {},
      });
    })
    .catch((err) => {
      dispatch({
        type: MODAL_TOP_ALERT,
        payload: { showAlert: true, message: err, type: "danger" },
      });
    });
};

export const addBarcodeMiddleText = (
  code: string
) => (dispatch: Function) => {
  dispatch(setBarcodeMiddleTextLoader("add", true));
  axios
    .post(`/api/barcodeMiddleText`, { code })
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: ADD_BARCODE_MIDDLE_TEXT,
          payload: res.data.dbRes,
        });
        dispatch({
          type: MODAL_TOP_ALERT,
          payload: {
            showAlert: true,
            message: "Successfully added",
            type: "success",
          },
        });
      } else {
        dispatch(setBarcodeMiddleTextLoader("add", false));
        dispatch({
          type: MODAL_TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
      }
    })
    .catch((err) => {
      dispatch(setBarcodeMiddleTextLoader("add", false));
      dispatch({
        type: MODAL_TOP_ALERT,
        payload: { showAlert: true, message: err, type: "danger" },
      });
    });
};

export const updateBarcodeMiddleText = (
  id: String,
  code: string
) => (dispatch: Function) => {
  dispatch(setBarcodeMiddleTextLoader("update", true));
  axios
    .patch(`/api/barcodeMiddleText/${id}`, { code })
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: UPDATE_BARCODE_MIDDLE_TEXT,
          payload: res.data.dbRes,
        });
        dispatch({
          type: MODAL_TOP_ALERT,
          payload: {
            showAlert: true,
            message: "Successfully updated",
            type: "success",
          },
        });
      } else {
        dispatch(setBarcodeMiddleTextLoader("update", false));
        dispatch({
          type: MODAL_TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
      }
    })
    .catch((err) => {
      dispatch(setBarcodeMiddleTextLoader("update", false));
      dispatch({
        type: MODAL_TOP_ALERT,
        payload: { showAlert: true, message: err, type: "danger" },
      });
    });
};

export const deleteBarcodeMiddleText = (
  id: String
) => (dispatch: Function) => {
  dispatch(setBarcodeMiddleTextLoader("delete", true));
  axios
    .delete(`/api/barcodeMiddleText/${id}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: DELETE_BARCODE_MIDDLE_TEXT,
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
        dispatch(setBarcodeMiddleTextLoader("delete", false));
        dispatch({
          type: MODAL_TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
      }
    })
    .catch((err) => {
      dispatch(setBarcodeMiddleTextLoader("delete", false));
      dispatch({
        type: MODAL_TOP_ALERT,
        payload: { showAlert: true, message: err, type: "danger" },
      });
    });
};

export const setBarcodeMiddleTextLoader = (
  type: string,
  isLoading: boolean
) => {
  return {
    type: BARCODE_MIDDLE_TEXT_LOADER,
    payload: { type, isLoading },
  };
};
