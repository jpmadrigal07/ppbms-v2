import { GET_CURRENT_PAGE } from './types';

export const gSetCurrentPage = (page: string) => (dispatch: Function) => {
    dispatch({
        type: GET_CURRENT_PAGE,
        payload: page
    })
};