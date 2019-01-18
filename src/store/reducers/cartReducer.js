import { GET_CART } from "../actions/types";

const initialState = {
  items: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        items: action.payload ? action.payload : []
      };
    default:
      return state;
  }
}
