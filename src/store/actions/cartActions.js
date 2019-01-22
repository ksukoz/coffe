import { GET_CART, SET_CART, ADD_TO_CART, CHANGE_CART } from "./types";

export const setCart = cart => dispatch => {
  dispatch({
    type: SET_CART,
    payload: cart
  });
};

export const getCart = () => dispatch => {
  dispatch({
    type: GET_CART
  });
};

export const addToCart = id => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: { id, qty: 1 }
  });
};

export const updateCart = (id, quantity) => dispatch => {
  dispatch({
    type: CHANGE_CART,
    payload: { id, qty: quantity }
  });
};
