import { GET_LETTERS } from "./types";

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
