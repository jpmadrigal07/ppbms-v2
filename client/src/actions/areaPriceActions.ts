import axios from "axios";
import { UPDATE_AREA_PRICE, GET_AREA_PRICES, AREA_PRICE_LOADER, MODAL_TOP_ALERT } from "./types";

export const getAreaPrices = () => (dispatch: Function) => {
  dispatch(setAreaPriceLoader("list", true));
  axios
    .get(`/api/areaPrice`)
    .then((res) => {
        dispatch({
          type: GET_AREA_PRICES,
          payload:
            res.data !== "" ? res.data : {},
        })
      }
    )
    .catch((err) => {
      dispatch({
        type: MODAL_TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" }
      });
    });
};

export const updateAreaPrice = (id: String, name: string, price: number) => (
  dispatch: Function
) => {
  dispatch(setAreaPriceLoader("update", true));
  axios
    .patch(`/api/areaPrice/${id}`, { name, price })
    .then(res => {
      if(res.data.isSuccess) {
        dispatch({
          type: UPDATE_AREA_PRICE,
          payload: res.data.dbRes
        });
        dispatch({
          type: MODAL_TOP_ALERT,
          payload: { showAlert: true, message: "Successfully updated", type: "success" }
        });
      } else {
        dispatch(setAreaPriceLoader("update", false));
        dispatch({
          type: MODAL_TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" }
        });
      }
    })
    .catch((err) => {
        dispatch(setAreaPriceLoader("update", false));
        dispatch({
          type: MODAL_TOP_ALERT,
          payload: { showAlert: true, message: err.message, type: "danger" }
        });
      }
    );
};

export const setAreaPriceLoader = (type: string, isLoading: boolean) => {
  return {
    type: AREA_PRICE_LOADER,
    payload: { type, isLoading }
  };
};