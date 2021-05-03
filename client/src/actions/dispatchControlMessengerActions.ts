import axios from "axios";
import {
  GET_DISPATCH_CONTROL_MESSENGERS,
  DISPATCH_CONTROL_MESSENGER_LOADER,
  ADD_DISPATCH_CONTROL_MESSENGER,
  TOP_ALERT,
  PAGE_LOADED_MESSENGERS,
  OVERWRITE_PAGE_LOADED_MESSENGERS,
  DELETE_DISPATCH_CONTROL_MESSENGER,
  MODAL_TOP_ALERT,
  UPDATE_DISPATCH_CONTROL_MESSENGER,
  SECOND_MODAL_TOP_ALERT
} from "./types";
import _ from "lodash";

export const getDispatchControlMessengers = (variables: string | undefined, pageNumber: number | undefined) => (dispatch: Function) => {
  dispatch(setDispatchControlMessengerLoader("list", true));
  axios
    .get(`/api/dispatchControlMessenger${variables}`)
    .then((res) => {
      dispatch({
        type: GET_DISPATCH_CONTROL_MESSENGERS,
        payload: res.data !== "" ? res.data : {},
      });
      if(!_.isNil(pageNumber)) {
        const dbRes = res.data.dbRes;
        const isDbResArray = _.isArray(dbRes);
        if(isDbResArray && dbRes.length > 0) {
          dispatch({
            type: PAGE_LOADED_MESSENGERS,
            payload: pageNumber
          });
        }
      } else {
        dispatch(setDispatchControlMessengerLoader("list", false));
      }
    })
    .catch((err) => {
      dispatch(setDispatchControlMessengerLoader("list", false));
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const addDispatchControlMessenger = (
  name: string,
  address: string,
  preparedBy: string,
  date: string
) => (dispatch: Function) => {
  dispatch(setDispatchControlMessengerLoader("add", true));
  axios
    .post(`/api/dispatchControlMessenger`, { name, address, preparedBy, date })
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: ADD_DISPATCH_CONTROL_MESSENGER,
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
        dispatch(setDispatchControlMessengerLoader("add", false));
        dispatch({
          type: TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
      }
    })
    .catch((err) => {
      dispatch(setDispatchControlMessengerLoader("add", false));
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const updateDispatchControlMessenger = (
  id: String,
  name: string,
  address: string,
  preparedBy: string,
  date: string
) => (dispatch: Function) => {
  dispatch(setDispatchControlMessengerLoader("update", true));
  axios
    .patch(`/api/dispatchControlMessenger/${id}`, { name, address, preparedBy, date })
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: UPDATE_DISPATCH_CONTROL_MESSENGER,
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
        dispatch(setDispatchControlMessengerLoader("update", false));
        dispatch({
          type: MODAL_TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
      }
    })
    .catch((err) => {
      dispatch(setDispatchControlMessengerLoader("update", false));
      dispatch({
        type: MODAL_TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const deleteDispatchControlMessenger = (id: string) => (dispatch: Function) => {
  dispatch(setDispatchControlMessengerLoader("delete", true));
  axios
    .delete(`/api/dispatchControlMessenger/${id}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: DELETE_DISPATCH_CONTROL_MESSENGER,
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
        dispatch(setDispatchControlMessengerLoader("delete", false));
        dispatch({
          type: SECOND_MODAL_TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
      }
    })
    .catch((err) => {
      dispatch(setDispatchControlMessengerLoader("delete", false));
      dispatch({
        type: SECOND_MODAL_TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const setDispatchControlMessengerLoader = (type: string, isLoading: boolean) => {
  return {
    type: DISPATCH_CONTROL_MESSENGER_LOADER,
    payload: { type, isLoading }
  };
};

export const setDispatchControlMessengerLoadedPage = (array: number[]) => {
  return {
    type: OVERWRITE_PAGE_LOADED_MESSENGERS,
    payload: array
  };
};
