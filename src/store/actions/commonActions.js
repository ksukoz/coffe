import { GET_LETTERS } from "./types";

export const getAlphabet = lang => dispatch => {
  fetch(`http://kawaapi.gumione.pro/api/catalog/letters/${lang}`)
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
