import { GET_USER, SET_USER } from "../actions/types";

const initialState = {
  // items: null,
  info: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        info: action.payload
      };
    case SET_USER:
      return {
        ...state,
        info: action.payload
      };
    default:
      return state;
  }
}
