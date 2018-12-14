import { GET_SEARCHED_PRODUCTS } from "./types";

export const findProduct = (value, category, page) => dispatch => {
  fetch(
    `http://kawaapi.gumione.pro/api/catalog/search/${encodeURI(
      value
    )}/${category}/10/${page}`
  )
    .then(response => response.json())
    .then(responseJson => {
      console.log(
        `http://kawaapi.gumione.pro/api/catalog/search/${encodeURI(
          value
        )}/${category}/10/${page}`
      );
      dispatch({
        type: GET_SEARCHED_PRODUCTS,
        payload: responseJson
      });
    })
    .catch(error => {
      console.error(error);
    });
};