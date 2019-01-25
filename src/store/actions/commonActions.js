import {
  GET_LETTERS,
  GET_DELIVERY_COST,
  SET_DELIVERY_COST,
  GET_SEARCH_FOCUS,
  SET_LANG,
  GET_LANG,
  SET_SEARCH,
  GET_SEARCH
} from "./types";

export const getAlphabet = letters => dispatch => {
  dispatch({
    type: GET_LETTERS,
    payload: letters
  });
};

export const clearAlphabet = () => dispatch => {
  dispatch({
    type: GET_LETTERS,
    payload: []
  });
};

export const setDelivery = cost => dispatch => {
  dispatch({
    type: SET_DELIVERY_COST,
    payload: cost
  });
};

export const getDeliveryCost = city => dispatch => {
  dispatch({
    type: GET_DELIVERY_COST,
    payload: city
  });
};

export const searchFocused = () => dispatch => {
  dispatch({
    type: GET_SEARCH_FOCUS,
    payload: true
  });
};

export const setLang = (lang, id) => dispatch => {
  dispatch({
    type: SET_LANG,
    payload: { lang, id }
  });
};

export const getLang = lang => dispatch => {
  dispatch({
    type: GET_LANG,
    payload: lang
  });
};

export const getSearch = (search, categoryId) => dispatch => {
  dispatch({
    type: GET_SEARCH,
    payload: { search, id: categoryId }
  });
};

export const setSearch = (search, categoryId, page) => dispatch => {
  dispatch({
    type: SET_SEARCH,
    payload: { search, id: categoryId, page }
  });
};
