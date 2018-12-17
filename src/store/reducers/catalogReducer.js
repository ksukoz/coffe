import {
  GET_SEARCHED_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCT_REVIEWS
} from "../actions/types";

const initialState = {
  searchedProducts: null,
  product: null,
  reviews: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCHED_PRODUCTS:
      return {
        ...state,
        searchedProducts: action.payload
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload.item
      };
    case GET_PRODUCT_REVIEWS:
      return {
        ...state,
        reviews: action.payload.comments
      };
    default:
      return state;
  }
}
