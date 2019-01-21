import {
  GET_FULL_CATEGORIES,
  SET_CATEGORIES,
  SET_SUBCATEGORIES,
  SET_DISHES,
  GET_CATEGORY,
  SET_PRODUCTS,
  CLEAR_PRODUCTS,
  FETCHING,
  FETCHED,
  GET_SEARCHED_PRODUCTS,
  GET_MORE_SEARCHED_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCT_REVIEWS,
  PRODUCTS_END,
  GET_AUTOCOMPLETE
} from "../actions/types";

const initialState = {
  categories: [],
  subcategories: [],
  dishes: [],
  status: false,
  category: "",
  page: 0,
  letter: false,
  products: [],
  searchedProducts: [],
  autocomplete: [],
  product: null,
  reviews: null,
  end: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FULL_CATEGORIES:
      return {
        ...state,
        categoriesFull: [...state.categoriesFull, ...action.payload]
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case SET_SUBCATEGORIES:
      return {
        ...state,
        subcategories: action.payload
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload.category,
        page: action.payload.page,
        letter: action.payload.letter
      };
    case SET_DISHES:
      return {
        ...state,
        dishes: action.payload
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload],
        end: false
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        end: false
      };
    case FETCHING:
      return {
        ...state,
        fetch: true
      };
    case FETCHED:
      return {
        ...state,
        fetch: false
      };
    case GET_SEARCHED_PRODUCTS:
      return {
        ...state,
        searchedProducts: action.payload,
        end: false
      };
    case GET_AUTOCOMPLETE:
      return {
        ...state,
        autocomplete: action.payload
      };
    case GET_MORE_SEARCHED_PRODUCTS:
      return {
        ...state,
        searchedProducts: [...state.searchedProducts, ...action.payload]
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    case GET_PRODUCT_REVIEWS:
      return {
        ...state,
        reviews: action.payload.comments.reverse()
      };
    case PRODUCTS_END:
      return {
        ...state,
        end: action.payload
      };
    default:
      return state;
  }
}
