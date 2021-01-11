import { AUTH_LOADING, AUTH_LOADED } from '../actions/types';
import { I_ReduxAction } from "../interfaces";

const initialState = {
    isLoading: false,
    user: null
};

export default function(state = initialState, action: I_ReduxAction) {
    switch (action.type) {
        case AUTH_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case AUTH_LOADED:
            return {
                isLoading: false,
                user: action.payload
            };
        default:
            return state;
    }
}