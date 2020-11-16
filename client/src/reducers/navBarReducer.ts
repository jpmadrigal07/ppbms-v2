import { GET_CURRENT_PAGE } from '../actions/types';
import { I_ReduxAction } from "../interfaces";

const initialState = {
    currentPage: ""
};

export default function(state = initialState, action: I_ReduxAction) {
    switch (action.type) {
        case GET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };
        default:
            return state;
    }
}