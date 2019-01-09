import { GET_MESSAGE, GET_LETTERS, GET_DELIVERY_COST } from "../actions/types";

const initialState = {
  message: "",
  letters: null,
  delivery: []
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
    case GET_DELIVERY_COST:
      return {
        ...state,
        delivery: [...state.delivery, ...action.payload]
      };
    default:
      return state;
  }
}
