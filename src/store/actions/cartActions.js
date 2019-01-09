import { GET_CART, GET_MESSAGE } from "./types";

export const getCart = () => dispatch => {
  let formData = new FormData();
  formData.append("username", "+380675635155");
  formData.append("password", "test");

  fetch("http://kawaapi.gumione.pro/api/auth/login", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(responseJson => {
      fetch("http://kawaapi.gumione.pro/api/catalog/cart", {
        headers: new Headers({
          Authorization: "Bearer " + responseJson.token
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          dispatch({
            type: GET_CART,
            payload: responseJson.cart
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

export const addToCart = id => dispatch => {
  let formData = new FormData();
  let data = new FormData();
  formData.append("username", "+380675635155");
  formData.append("password", "test");

  data.append("item_id", id);
  data.append("qty", 1);

  fetch("http://kawaapi.gumione.pro/api/auth/login", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(responseJson => {
      fetch("http://kawaapi.gumione.pro/api/catalog/cart_add", {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + responseJson.token
        }),
        body: data
      })
        .then(response => response.json())
        .then(responseJson => {
          dispatch(getCart());
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
};

export const updateCart = (id, quantity) => dispatch => {
  let formData = new FormData();
  let data = new FormData();
  formData.append("username", "+380675635155");
  formData.append("password", "test");

  data.append("item_id", id);
  data.append("qty", quantity);

  fetch("http://kawaapi.gumione.pro/api/auth/login", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(responseJson => {
      fetch("http://kawaapi.gumione.pro/api/catalog/cart_update", {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + responseJson.token
        }),
        body: data
      })
        .then(response => response.json())
        .then(responseJson => {
          dispatch(getCart());
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
};
