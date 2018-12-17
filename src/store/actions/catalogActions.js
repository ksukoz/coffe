import {
  GET_SEARCHED_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCT_REVIEWS,
  GET_MESSAGE
} from "./types";

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

export const getProduct = id => dispatch => {
  fetch(`http://kawaapi.gumione.pro/api/catalog/item/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: GET_PRODUCT,
        payload: responseJson
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const getProductReviews = id => dispatch => {
  // fetch(`http://kawaapi.gumione.pro/api/catalog/get_comments/416`)
  fetch(`http://kawaapi.gumione.pro/api/catalog/get_comments/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: GET_PRODUCT_REVIEWS,
        payload: responseJson
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const addProductReviews = (data, id) => dispatch => {
  let formData = new FormData();
  formData.append("username", "+380999999999");
  formData.append("password", "test");

  fetch("http://kawaapi.gumione.pro/api/auth/login", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(responseJson => {
      fetch("http://kawaapi.gumione.pro/api/catalog/add_comment", {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + responseJson.token
        }),
        body: data
      })
        .then(response => response.json())
        .then(responseJson => {
          dispatch(getProductReviews(id));
          dispatch({
            type: GET_MESSAGE,
            payload: responseJson.message
          });
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
};
