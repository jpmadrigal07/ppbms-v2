import { GET_CURRENT_PAGE } from './types';

export const gSetCurrentPage = (page: String) => (dispatch: Function) => {
    dispatch({
        type: GET_CURRENT_PAGE,
        payload: page
    })
};