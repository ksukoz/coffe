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
  CLEAR_SEARCHED_PRODUCTS,
  SET_PRODUCT,
  GET_PRODUCT_ID,
  GET_PRODUCT_REVIEWS,
  ADD_PRODUCT_REVIEW,
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
  id: "",
  products: [],
  searchedProducts: [],
  autocomplete: [],
  product: null,
  reviews: [],
  review: null,
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
    case CLEAR_SEARCHED_PRODUCTS:
      return {
        ...state,
        searchedProducts: action.payload,
        end: false
      };
    case GET_SEARCHED_PRODUCTS:
      return {
        ...state,
        searchedProducts: [...state.searchedProducts, ...action.payload],
        end: false
      };
    case GET_AUTOCOMPLETE:
      return {
        ...state,
        autocomplete: action.payload
      };
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    case GET_PRODUCT_ID:
      return {
        ...state,
        id: action.payload
      };
    case GET_PRODUCT_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };
    case ADD_PRODUCT_REVIEW:
      return {
        ...state,
        review: action.payload
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
