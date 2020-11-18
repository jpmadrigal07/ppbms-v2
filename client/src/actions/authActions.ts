import axios from 'axios';
import { returnErrors } from './errorActions';
import { USER_LOADING, USER_LOADED, AUTH_ERROR } from './types';
import { I_LoginCredentials } from "../interfaces";

export const gFetchUser = () => (dispatch: Function) => {
  dispatch({ type: USER_LOADING });
  axios
  .get('/api/current_user')
  .then(res => 
    dispatch({
      type: USER_LOADED,
      payload: res.data !== "" ? res.data : null
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
  dispatch({ type: USER_LOADING });
    axios
    .post('/auth/local', values)
    .then(res => 
        dispatch({
          type: USER_LOADED,
          payload: res.data !== "" ? res.data : null
        })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};