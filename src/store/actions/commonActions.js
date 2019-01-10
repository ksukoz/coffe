import { GET_LETTERS, GET_DELIVERY_COST, GET_SEARCH_FOCUS } from "./types";

export const getAlphabet = (lang, id) => dispatch => {
  fetch(
    `http://kawaapi.gumione.pro/api/catalog/letters/${lang}${
      id ? `/${id}` : ""
    }`
  )
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: GET_LETTERS,
        payload: responseJson.letters
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const getDelivery = (city, delivery, courier) => dispatch => {
  let formData = new FormData();
  let data = new FormData();
  let cost;
  formData.append("username", "+380675635155");
  formData.append("password", "test");

  data.append("city", city);
  data.append("delivery", delivery);
  data.append("courier", courier);

  fetch("http://kawaapi.gumione.pro/api/auth/login", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(responseJson => {
      fetch("http://kawaapi.gumione.pro/api/catalog/delivery_cost", {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + responseJson.token
        }),
        body: data
      })
        .then(response => response.json())
        .then(responseJson => {
          dispatch({
            type: GET_DELIVERY_COST,
            payload: [
              {
                delivery: delivery === 1 ? "np" : "up",
                courier: courier,
                cost: responseJson.cost
              }
            ]
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

export const getDeliveryCost = city => dispatch => {
  dispatch(getDelivery(city, 1, 1));
  dispatch(getDelivery(city, 1, 0));
  dispatch(getDelivery(city, 2, 1));
  dispatch(getDelivery(city, 2, 0));
};

export const searchFocused = () => dispatch => {
  dispatch({
    type: GET_SEARCH_FOCUS,
    payload: true
  });
};
