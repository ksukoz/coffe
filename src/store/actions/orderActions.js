import { GET_ORDER, GET_PAYER_INFO, SET_ORDER } from "./types";

export const setOrder = id => dispatch => {
  dispatch({
    type: SET_ORDER,
    payload: id
  });
};

export const getOrder = params => dispatch => {
  dispatch({
    type: GET_ORDER,
    payload: {
      params
    }
  });
};

export const getPayerInfo = params => dispatch => {
  dispatch({
    type: GET_PAYER_INFO,
    payload: params
  });
};
