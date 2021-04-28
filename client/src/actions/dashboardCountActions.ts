import axios from "axios";
import {
    GET_DASHBOARD_COUNT,
    DASHBOARD_COUNT_LOADER,
    DELETE_DASHBOARD_COUNT,
    ADD_DASHBOARD_COUNT,
    TOP_ALERT
} from "./types";
import _ from "lodash";

const getEndPoint = (reqType: string) => {
    switch (reqType) {
        case "importedList":
            return "encodeList"
        case "listData":
            return "record"
        case "listCompleted":
            return "record"
        case "dispatchControl":
            return "dispatchControlMessenger"
        default:
            // code block
    }
}

export const getDashboardCount = (reqType: string) => (dispatch: Function) => {
    dispatch(setDashboardCountLoader(true, reqType));
    axios
        .get(`/api/${getEndPoint(reqType)}/count`)
        .then((res) => {
            dispatch({
                type: GET_DASHBOARD_COUNT,
                payload: {
                    count: !_.isNil(res.data) ? res.data.dbRes : 0,
                    type: reqType
                },
            });
            dispatch(setDashboardCountLoader(false, reqType));
        })
        .catch((err) => {
            dispatch({
                type: TOP_ALERT,
                payload: {
                    showAlert: true,
                    message: err.message,
                    type: "danger"
                },
            });
        });
};

export const addDashboardCount = (reqType: string, count: number) => (
    dispatch: Function
) => {
    dispatch(setDashboardCountLoader(true, reqType));
    dispatch({
        type: ADD_DASHBOARD_COUNT,
        payload: {
            count,
            type: reqType
        }
    });
};

export const deleteDashboardCount = (reqType: string, count: number) => (
    dispatch: Function
) => {
    dispatch(setDashboardCountLoader(true, reqType));
    dispatch({
        type: DELETE_DASHBOARD_COUNT,
        payload: {
            count,
            type: reqType
        }
    });
};

export const setDashboardCountLoader = (isLoading: boolean, type: string) => {
    return {
        type: DASHBOARD_COUNT_LOADER,
        payload: {
            isLoading,
            type
        },
    };
};