import axios from "axios";
import {
  GET_DISPATCH_CONTROL_MESSENGERS,
  DISPATCH_CONTROL_MESSENGER_LOADER,
  ADD_DISPATCH_CONTROL_MESSENGER,
  TOP_ALERT
} from "./types";

export const getDispatchControlMessengers = () => (dispatch: Function) => {
  dispatch(setDispatchControlMessengerLoader("list", true));
  axios
    .get(`/api/dispatchControlMessenger`)
    .then((res) => {
      dispatch({
        type: GET_DISPATCH_CONTROL_MESSENGERS,
        payload: res.data !== "" ? res.data : {},
      });
    })
    .catch((err) => {
      dispatch(setDispatchControlMessengerLoader("list", false));
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err, type: "danger" },
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
        payload: { showAlert: true, message: err, type: "danger" },
      });
    });
};

export const setDispatchControlMessengerLoader = (type: string, isLoading: boolean) => {
  return {
    type: DISPATCH_CONTROL_MESSENGER_LOADER,
    payload: { type, isLoading }
  };
};
