import {
  GET_FULL_CATEGORIES,
  GET_CATEGORIES,
  GET_SUBCATEGORIES,
  GET_DISHES,
  GET_PRODUCTS,
  GET_MORE_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCT_REVIEWS,
  GET_MESSAGE
} from "./types";

export const getFullCategories = () => dispatch => {
  dispatch(getCategories(true)),
    dispatch(getSubCategories(true)),
    dispatch(getDishes(true));

  return Promise.resolve();
};

export const getCategories = (type = false) => dispatch => {
  fetch("http://kawaapi.gumione.pro/api/catalog/categories")
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: type !== false ? GET_FULL_CATEGORIES : GET_CATEGORIES,
        payload: responseJson.categories
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const getSubCategories = (type = false) => dispatch => {
  fetch("http://kawaapi.gumione.pro/api/catalog/categories/7")
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: type !== false ? GET_FULL_CATEGORIES : GET_SUBCATEGORIES,
        payload: responseJson.categories
      });
    })
    .catch(error => {
      console.error(error);
    });
};
export const getDishes = (type = false) => dispatch => {
  fetch("http://kawaapi.gumione.pro/api/catalog/categories/8")
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: type !== false ? GET_FULL_CATEGORIES : GET_DISHES,
        payload: responseJson.categories
      });
    })
    .catch(error => {
      console.error(error);
    });
};
export const getProducts = (category, page) => dispatch => {
  fetch(`http://kawaapi.gumione.pro/api/catalog/items/${category}/10/${page}`)
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: page == 0 ? GET_PRODUCTS : GET_MORE_PRODUCTS,
        payload: responseJson.items
      });
    })
    .catch(error => {
      console.error(error);
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
      dispatch({
        type: page == 0 ? GET_PRODUCTS : GET_MORE_PRODUCTS,
        payload: responseJson.items
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
  formData.append("username", "+380675635155");
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
