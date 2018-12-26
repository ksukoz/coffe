import { GET_MESSAGE, GET_LETTERS } from "../actions/types";

const initialState = {
  message: "",
  letters: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case GET_LETTERS:
      return {
        ...state,
        letters: action.payload
      };
    default:
      return state;
  }
}
