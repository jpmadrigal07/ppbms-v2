import {
    GET_DISPATCH_CONTROL_DATA,
    ADD_DISPATCH_CONTROL_DATA,
    DISPATCH_CONTROL_DATA_LOADER,
    PAGE_LOADED_DATA,
    OVERWRITE_PAGE_LOADED_DATA,
    DELETE_DISPATCH_CONTROL_DATA,
    UPDATE_DISPATCH_CONTROL_DATA,
    PROOF_RECORD_COUNTS,
} from "../actions/types";
import {
    I_DispatchControlData,
    I_ReduxAction
} from "../interfaces";
import sortBy from "lodash/sortBy";
import uniqBy from "lodash/uniqBy";
import orderBy from "lodash/orderBy";

const initialState = {
    isLoading: false,
    isUpdateLoading: false,
    isAddLoading: false,
    isDeleteLoading: false,
    pageLoaded: [],
    proofRecordCounts: [],
    data: []
};

export default function (state = initialState, action: I_ReduxAction) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case GET_DISPATCH_CONTROL_DATA:
            return {
                ...state,
                data: orderBy(uniqBy([...state.data, ...payload.dbRes], '_id'), ['createdAt'], ['desc']),
            };
        case ADD_DISPATCH_CONTROL_DATA:
            return {
                ...state,
                data: orderBy(uniqBy([...state.data, payload.dbRes], '_id'), ['createdAt'], ['desc']),
                isAddLoading: false
            };
        case PAGE_LOADED_DATA:
            return {
                ...state,
                pageLoaded: sortBy([...state.pageLoaded, payload]),
                isLoading: false
            };
        case OVERWRITE_PAGE_LOADED_DATA:
            return {
                ...state,
                pageLoaded: payload,
                isLoading: false
            };
        case DISPATCH_CONTROL_DATA_LOADER:
            return {
                ...state,
                isLoading: payload.type === 'list' ? payload.isLoading : state.isLoading,
                isUpdateLoading: payload.type === 'update' ? payload.isLoading : state.isUpdateLoading,
                isAddLoading: payload.type === 'add' ? payload.isLoading : state.isAddLoading,
                isDeleteLoading: payload.type === 'delete' ? payload.isLoading : state.isDeleteLoading
            };
        case DELETE_DISPATCH_CONTROL_DATA:
            return {
                ...state,
                isDeleteLoading: false,
                data: state.data.filter((data: I_DispatchControlData) => data._id !== payload._id),
            };
        case PROOF_RECORD_COUNTS:
            return {
                ...state,
                proofRecordCounts: [...state.proofRecordCounts, ...payload.dbRes],
            };
        case UPDATE_DISPATCH_CONTROL_DATA:
            return {
                ...state,
                isUpdateLoading: false,
                data: state.data.map((data: I_DispatchControlData) =>
                    data._id === payload._id ? {
                        ...data,
                        messengerId: payload.messengerId,
                        dataCycleCode: payload.dataCycleCode,
                        pickupDate: payload.pickupDate,
                        sender: payload.sender,
                        delType: payload.delType,
                        deletedAt: payload.deletedAt,
                        createdAt: payload.createdAt,
                    } : data
                ),
            };
        default:
            return state;
    }
}