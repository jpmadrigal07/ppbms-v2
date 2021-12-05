import axios from "axios";
import {
  GET_DISPATCH_CONTROL_DATA,
  DISPATCH_CONTROL_DATA_LOADER,
  ADD_DISPATCH_CONTROL_DATA,
  TOP_ALERT,
  PAGE_LOADED_DATA,
  OVERWRITE_PAGE_LOADED_DATA,
  DELETE_DISPATCH_CONTROL_DATA,
  MODAL_TOP_ALERT,
  UPDATE_DISPATCH_CONTROL_DATA,
  SECOND_MODAL_TOP_ALERT,
  PROOF_RECORD_COUNTS,
} from "./types";
import _ from "lodash";

export const getDispatchControlData = (variables: string | undefined, pageNumber: number | undefined) => (dispatch: Function) => {
  dispatch(setDispatchControlDataLoader("list", true));
  axios
    .get(`/api/dispatchControlData${variables}`)
    .then((res) => {
      dispatch({
        type: GET_DISPATCH_CONTROL_DATA,
        payload: res.data !== "" ? res.data : {},
      });
      if(!_.isNil(pageNumber)) {
        const dbRes = res.data.dbRes;
        const isDbResArray = _.isArray(dbRes);
        if(isDbResArray && dbRes.length > 0) {
          dispatch({
            type: PAGE_LOADED_DATA,
            payload: pageNumber
          });
        }
      } else {
        dispatch(setDispatchControlDataLoader("list", false));
      }
    })
    .catch((err) => {
      dispatch(setDispatchControlDataLoader("list", false));
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

// bulk
export const getDispatchControlDataRecordCount = (variables: string | undefined) => (dispatch: Function) => {
  dispatch(setDispatchControlDataLoader("list", true));
  axios
    .get(`/api/dispatchControlData/count/record${variables}`)
    .then((res) => {
      dispatch({
        type: PROOF_RECORD_COUNTS,
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

export const addDispatchControlData = (
  name: string,
  address: string,
  preparedBy: string,
  date: string
) => (dispatch: Function) => {
  dispatch(setDispatchControlDataLoader("add", true));
  axios
    .post(`/api/dispatchControlData`, { name, address, preparedBy, date })
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: ADD_DISPATCH_CONTROL_DATA,
          payload: res.data !== "" ? res.data : {},
        });
        dispatch({
          type: TOP_ALERT,
          payload: {
            showAlert: true,
            message: "Successfully added",
            type: "success",
          },
        });
      } else {
        dispatch(setDispatchControlDataLoader("add", false));
        dispatch({
          type: TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
      }
    })
    .catch((err) => {
      dispatch(setDispatchControlDataLoader("add", false));
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const updateDispatchControlData = (
  id: String,
  name: string,
  address: string,
  preparedBy: string,
  date: string
) => (dispatch: Function) => {
  dispatch(setDispatchControlDataLoader("update", true));
  axios
    .patch(`/api/dispatchControlData/${id}`, { name, address, preparedBy, date })
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: UPDATE_DISPATCH_CONTROL_DATA,
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
        dispatch(setDispatchControlDataLoader("update", false));
        dispatch({
          type: MODAL_TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
      }
    })
    .catch((err) => {
      dispatch(setDispatchControlDataLoader("update", false));
      dispatch({
        type: MODAL_TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const deleteDispatchControlData = (id: string) => (dispatch: Function) => {
  dispatch(setDispatchControlDataLoader("delete", true));
  axios
    .delete(`/api/dispatchControlData/${id}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: DELETE_DISPATCH_CONTROL_DATA,
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
        dispatch(setDispatchControlDataLoader("delete", false));
        dispatch({
          type: SECOND_MODAL_TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
      }
    })
    .catch((err) => {
      dispatch(setDispatchControlDataLoader("delete", false));
      dispatch({
        type: SECOND_MODAL_TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const setDispatchControlDataLoader = (type: string, isLoading: boolean) => {
  return {
    type: DISPATCH_CONTROL_DATA_LOADER,
    payload: { type, isLoading }
  };
};

export const setDispatchControlDataLoadedPage = (array: number[]) => {
  return {
    type: OVERWRITE_PAGE_LOADED_DATA,
    payload: array
  };
};
