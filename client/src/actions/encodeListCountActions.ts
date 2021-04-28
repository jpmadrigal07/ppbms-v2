import axios from "axios";
import {
  GET_ENCODE_LIST_COUNT,
  ENCODE_LIST_COUNT_LOADER,
  DELETE_ENCODE_LIST_COUNT,
  ADD_ENCODE_LIST_COUNT,
  TOP_ALERT
} from "./types";
import _ from "lodash";

export const getEncodeListCount = () => (dispatch: Function) => {
  dispatch(setEncodeListCountLoader(true));
  axios
    .get(`/api/encodeList/count`)
    .then((res) => {
      dispatch({
        type: GET_ENCODE_LIST_COUNT,
        payload: res.data !== "" ? res.data.dbRes : 0,
      });
    })
    .catch((err) => {
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const addEncodeListCount = (fileName: string | undefined) => (
  dispatch: Function
) => {
  dispatch(setEncodeListCountLoader(true));
  dispatch({
    type: ADD_ENCODE_LIST_COUNT
  });
};

export const deleteEncodeListCount = (fileName: string | undefined) => (
    dispatch: Function
  ) => {
    dispatch(setEncodeListCountLoader(true));
    dispatch({
      type: DELETE_ENCODE_LIST_COUNT
    });
  };

export const setEncodeListCountLoader = (isLoading: boolean) => {
  return {
    type: ENCODE_LIST_COUNT_LOADER,
    payload: isLoading
  };
};
