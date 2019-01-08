import {
  GET_CATEGORIES,
  GET_SUBCATEGORIES,
  GET_DISHES,
  GET_PRODUCTS,
  GET_MORE_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCT_REVIEWS
} from "../actions/types";

const initialState = {
  categories: [],
  products: [],
  product: null,
  reviews: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case GET_SUBCATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case GET_DISHES:
      return {
        ...state,
        categories: action.payload
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case GET_MORE_PRODUCTS:
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
