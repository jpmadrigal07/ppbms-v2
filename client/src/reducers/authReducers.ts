import { USER_LOADING, USER_LOADED } from '../actions/types';
import { I_ReduxAction } from "../interfaces";

const initialState = {
    isLoading: false,
    user: null
};

export default function(state = initialState, action: I_ReduxAction) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                isLoading: false,
                user: action.payload
            };
        default:
            return state;
    }
}