import {
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCT_REVIEWS
} from "../actions/types";

const initialState = {
  products: [],
  product: null,
  reviews: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload]
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload.item
      };
    case GET_PRODUCT_REVIEWS:
      return {
        ...state,
        reviews: action.payload.comments.reverse()
      };
    default:
      return state;
  }
}
