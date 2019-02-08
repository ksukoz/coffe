import { GET_ORDER, SET_ORDER } from "./types";

export const setOrder = id => dispatch => {
  dispatch({
    type: SET_ORDER,
    payload: id
  });
};

export const getOrder = (
  delivery_system,
  city,
  delivery_type,
  warehouse,
  payment,
  flat
) => dispatch => {
  dispatch({
    type: GET_ORDER,
    payload: {
      delivery_system,
      city,
      delivery_type,
      warehouse,
      payment,
      flat
    }
  });
};
