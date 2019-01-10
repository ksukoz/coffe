import {
  GET_MESSAGE,
  GET_LETTERS,
  GET_DELIVERY_COST,
  GET_SEARCH_FOCUS
} from "../actions/types";

const initialState = {
  message: "",
  letters: null,
  focus: false,
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
    case GET_SEARCH_FOCUS:
      return {
        ...state,
        focus: state.focus ? false : true
      };
    default:
      return state;
  }
}
