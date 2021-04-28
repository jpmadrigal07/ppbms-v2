import { TOP_ALERT } from './types';

export const triggerTopAlert = (showAlert: boolean, message: string, type: string) => (
  dispatch: Function
) => {
  return dispatch({
    type: TOP_ALERT,
    payload: { showAlert, message, type }
  });
};