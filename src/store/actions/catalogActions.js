import {
  SET_CATEGORIES,
  SET_SUBCATEGORIES,
  SET_DISHES,
  GET_PRODUCTS,
  GET_MORE_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCT_REVIEWS,
  PRODUCTS_END,
  GET_MESSAGE,
  GET_AUTOCOMPLETE,
  GET_SEARCHED_PRODUCTS,
  GET_MORE_SEARCHED_PRODUCTS
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

export const getProducts = (category, page) => dispatch => {
  fetch(`http://kawaapi.gumione.pro/api/catalog/items/${category}/10/${page}`)
    .then(response => response.json())
    .then(responseJson => {
      responseJson.items.length === 0
        ? dispatch({
            type: PRODUCTS_END,
            payload: true
          })
        : dispatch({
            type: page == 0 ? GET_PRODUCTS : GET_MORE_PRODUCTS,
            payload: responseJson.items
          });
    })
    .catch(error => {
      console.error(error);
    });
};

export const clearProducts = () => dispatch => {
  dispatch({
    type: GET_PRODUCTS,
    payload: []
  });
};

export const clearSearchedProducts = () => dispatch => {
  dispatch({
    type: GET_SEARCHED_PRODUCTS,
    payload: []
  });
};

export const findProducts = (value, category, page, type) => dispatch => {
  fetch(
    `http://kawaapi.gumione.pro/api/catalog/search/${encodeURI(
      value
    )}/${category}/${type}/10/${page}`
  )
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson.items);
      responseJson.items.length === 0
        ? dispatch({
            type: PRODUCTS_END,
            payload: true
          })
        : dispatch({
            type:
              page == 0 && type == "both"
                ? GET_SEARCHED_PRODUCTS
                : page == 0 && type == "after"
                ? GET_PRODUCTS
                : page > 0 && type == "both"
                ? GET_MORE_SEARCHED_PRODUCTS
                : GET_MORE_PRODUCTS,
            payload: responseJson.items
          });
    })
    .catch(error => {
      console.error(error);
    });
};

export const getAutocomplete = (value, category, page, type) => dispatch => {
  fetch(
    `http://kawaapi.gumione.pro/api/catalog/search/${encodeURI(
      value
    )}/${category}/${type}`
  )
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: GET_AUTOCOMPLETE,
        payload: responseJson.items
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const clearAutocomplete = () => dispatch => {
  dispatch({
    type: GET_AUTOCOMPLETE,
    payload: []
  });
};

export const getProduct = id => dispatch => {
  fetch(`http://kawaapi.gumione.pro/api/catalog/item/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: GET_PRODUCT,
        payload: responseJson.item
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const clearProduct = () => dispatch => {
  dispatch({
    type: GET_PRODUCT,
    payload: null
  });
};

export const getProductReviews = id => dispatch => {
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
  formData.append("login", "info@wrevery.com");
  formData.append("password", "testtest");

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
