import { GET_CART, SET_CART, ADD_TO_CART, CHANGE_CART } from "./types";

export const setCart = cart => dispatch => {
  dispatch({
    type: SET_CART,
    payload: cart
  });
};

export const getCart = () => dispatch => {
  dispatch({
    type: GET_CART
  });
};

export const addToCart = id => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: { id, qty: 1 }
  });
};

export const updateCart = (id, quantity) => dispatch => {
  dispatch({
    type: CHANGE_CART,
    payload: { id, qty: quantity }
  });
  // let formData = new FormData();
  // let data = new FormData();
  // formData.append("login", "info@wrevery.com");
  // formData.append("password", "testtest");

  // data.append("item_id", id);
  // data.append("qty", quantity);

  // fetch("http://kawaapi.gumione.pro/api/auth/login", {
  //   method: "POST",
  //   body: formData
  // })
  //   .then(response => response.json())
  //   .then(responseJson => {
  //     fetch("http://kawaapi.gumione.pro/api/catalog/cart_update", {
  //       method: "POST",
  //       headers: new Headers({
  //         Authorization: "Bearer " + responseJson.token
  //       }),
  //       body: data
  //     })
  //       .then(response => response.json())
  //       .then(responseJson => {
  //         dispatch(getCart());
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
};
