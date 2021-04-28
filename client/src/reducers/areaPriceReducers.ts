import { UPDATE_AREA_PRICE, GET_AREA_PRICES, AREA_PRICE_LOADER } from "../actions/types";
import { I_AreaPrice, I_ReduxAction } from "../interfaces";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isUpdateLoading: false,
  isAddLoading: false,
  isDeleteLoading: false,
  data: []
};

export default function (state = initialState, action: I_ReduxAction) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_AREA_PRICE:
      return {
        ...state,
        isUpdateLoading: false,
        data: state.data.map((data: I_AreaPrice) =>
          data._id === payload._id ? { ...data, name: payload.name, price: payload.price } : data
        )
      };
    case AREA_PRICE_LOADER:
      return {
        ...state,
        isLoading: payload.type === 'list' ? payload.isLoading : state.isLoading,
        isUpdateLoading: payload.type === 'update' ? payload.isLoading : state.isUpdateLoading,
        isAddLoading: payload.type === 'add' ? payload.isLoading : state.isAddLoading,
        isDeleteLoading: payload.type === 'delete' ? payload.isLoading : state.isDeleteLoading
      };
    case GET_AREA_PRICES:
      return {
        isLoading: false,
        data: payload.dbRes
      };
    default:
      return state;
  }
}
