import { GET_SEARCHED_PRODUCTS } from "../actions/types";

const initialState = {
  searchedProducts: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCHED_PRODUCTS:
      return {
        ...state,
        searchedProducts: action.payload
      };
    default:
      return state;
  }
}
