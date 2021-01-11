import axios from 'axios';
import {
  returnErrors
} from './errorActions';
import {
  AUTH_LOADING,
  AUTH_LOADED,
  AUTH_ERROR
} from './types';
import {
  I_LoginCredentials
} from "../interfaces";

export const gFetchUser = () => (dispatch: Function) => {
  dispatch(setAuthLoading());
  axios
    .get('/api/current_user')
    .then(res =>
      dispatch({
        type: AUTH_LOADED,
        payload: res.data !== "" ? res.data : {}
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const loginUser = (values: I_LoginCredentials) => (dispatch: Function) => {
  dispatch(setAuthLoading);
  axios
    .post('/auth/local', values)
    .then(res =>
      dispatch({
        type: AUTH_LOADED,
        payload: res.data !== "" ? res.data : {}
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const setAuthLoading = () => {
  return {
    type: AUTH_LOADING
  };
};