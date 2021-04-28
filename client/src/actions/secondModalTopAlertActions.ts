import { SECOND_MODAL_TOP_ALERT } from './types';

export const triggerSecondModalTopAlert = (showAlert: boolean, message: string, type: string) => (
  dispatch: Function
) => {
  return dispatch({
    type: SECOND_MODAL_TOP_ALERT,
    payload: { showAlert, message, type }
  });
};