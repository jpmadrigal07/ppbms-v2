import axios from "axios";
import { GET_ENCODE_LIST, ENCODE_LIST_LOADER, MODAL_TOP_ALERT } from "./types";

export const getEncodeList = () => (dispatch: Function) => {
  dispatch(setEncodeListLoader("list", true));
  axios
    .get(`/api/encodeList`)
    .then((res) => {
        dispatch({
          type: GET_ENCODE_LIST,
          payload:
            res.data !== "" ? res.data : {},
        })
      }
    )
    .catch((err) => {
      dispatch({
        type: MODAL_TOP_ALERT,
        payload: { showAlert: true, message: err, type: "danger" }
      });
    });
};

export const setEncodeListLoader = (type: string, isLoading: boolean) => {
  return {
    type: ENCODE_LIST_LOADER,
    payload: { type, isLoading }
  };
};