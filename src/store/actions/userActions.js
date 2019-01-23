import { GET_USER, SET_USER } from "./types";

export const setUser = user => dispatch => {
  dispatch({
    type: SET_USER,
    payload: user
  });
};

export const getUser = () => dispatch => {
  dispatch({
    type: GET_USER
  });
};

// export const updateCart = (id, quantity) => dispatch => {
//   dispatch({
//     type: CHANGE_CART,
//     payload: { id, qty: quantity }
//   });
// };
