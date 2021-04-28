import axios from "axios";
import { TOP_ALERT, UPDATE_USER, GET_USERS, USER_LOADER } from "./types";
import { returnErrors } from "./errorActions";

export const getUser = (id: string) => (dispatch: Function) => {
  dispatch(setUsersLoader(true));
  axios
    .get(`/api/user/${id}`)
    .then((res) =>
      dispatch({
        type: GET_USERS,
        payload:
          res.data !== "" ? res.data : {},
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const updateUser = (id: String, password: String) => (
  dispatch: Function
) => {
  dispatch(setUsersLoader(true));
  axios
    .patch(`/api/user/${id}`, { password })
    .then(res => {
      if(res.data.isSuccess) {
        dispatch({
          type: UPDATE_USER,
          payload: res.data
        });
        dispatch({
          type: TOP_ALERT,
          payload: { showAlert: true, message: "Successfully updated", type: "success" }
        });
      } else {
        dispatch({
          type: TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" }
        });
      }
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setUsersLoader = (isLoading: boolean) => {
  return {
    type: USER_LOADER,
    payload: isLoading
  };
};
