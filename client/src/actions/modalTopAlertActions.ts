import { MODAL_TOP_ALERT } from './types';

export const triggerModalTopAlert = (showAlert: boolean, message: string, type: string) => (
  dispatch: Function
) => {
  return dispatch({
    type: MODAL_TOP_ALERT,
    payload: { showAlert, message, type }
  });
};