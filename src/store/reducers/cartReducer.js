import { SET_CART, ADD_TO_CART } from "../actions/types";

const initialState = {
  items: null,
  item: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        items: action.payload
      };
    case ADD_TO_CART:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
