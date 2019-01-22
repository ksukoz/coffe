import {
  SET_CATEGORIES,
  SET_SUBCATEGORIES,
  SET_DISHES,
  GET_CATEGORY,
  SET_PRODUCTS,
  CLEAR_PRODUCTS,
  CLEAR_SEARCHED_PRODUCTS,
  SET_PRODUCT,
  GET_PRODUCT_ID,
  GET_PRODUCT_REVIEWS,
  ADD_PRODUCT_REVIEW,
  PRODUCTS_END,
  GET_AUTOCOMPLETE,
  GET_SEARCHED_PRODUCTS
} from "./types";

export const setCategories = categories => dispatch => {
  dispatch({
    type: SET_CATEGORIES,
    payload: categories
  });
};

export const setSubCategories = categories => dispatch => {
  dispatch({
    type: SET_SUBCATEGORIES,
    payload: categories
  });
};

export const setDishes = categories => dispatch => {
  dispatch({
    type: SET_DISHES,
    payload: categories
  });
};

export const getProductsParams = (
  category,
  page = 0,
  letter = false
) => dispatch => {
  dispatch({
    type: GET_CATEGORY,
    payload: { category, page, letter }
  });
};

export const setProducts = products => dispatch => {
  dispatch({
    type: SET_PRODUCTS,
    payload: products
  });
};

export const setProductsStatus = fetch => dispatch => {
  dispatch({
    type: fetch
  });
};

export const getEndProducts = () => dispatch => {
  dispatch({
    type: PRODUCTS_END,
    payload: true
  });
};

export const clearProducts = () => dispatch => {
  dispatch({
    type: CLEAR_PRODUCTS,
    payload: []
  });
};

export const clearSearchedProducts = () => dispatch => {
  dispatch({
    type: CLEAR_SEARCHED_PRODUCTS,
    payload: []
  });
};

export const findProducts = items => dispatch => {
  dispatch({
    type: GET_SEARCHED_PRODUCTS,
    payload: items
  });
};

export const getAutocomplete = items => dispatch => {
  dispatch({
    type: GET_AUTOCOMPLETE,
    payload: items
  });
};

export const clearAutocomplete = () => dispatch => {
  dispatch({
    type: GET_AUTOCOMPLETE,
    payload: []
  });
};

export const getProductID = id => dispatch => {
  dispatch({
    type: GET_PRODUCT_ID,
    payload: id
  });
};

export const getProduct = item => dispatch => {
  dispatch({
    type: SET_PRODUCT,
    payload: item
  });
};

export const clearProduct = () => dispatch => {
  dispatch({
    type: SET_PRODUCT,
    payload: null
  });
};

export const getProductReviews = comments => dispatch => {
  dispatch({
    type: GET_PRODUCT_REVIEWS,
    payload: comments
  });
};

export const addProductReviews = (data, id) => dispatch => {
  dispatch({
    type: ADD_PRODUCT_REVIEW,
    payload: { data, id }
  });
};
