import { GET_USER, SET_USER, UPDATE_USER } from "./types";

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

export const updateUser = (firstName, lastName, city) => dispatch => {
  dispatch({
    type: UPDATE_USER,
    payload: { firstName, lastName, city }
  });
};
