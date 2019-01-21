import {
  GET_MESSAGE,
  GET_LETTERS,
  GET_DELIVERY_COST,
  SET_LANG,
  SET_SEARCH,
  GET_SEARCH_FOCUS
} from "../actions/types";

const initialState = {
  message: "",
  letters: [],
  lang: 1,
  id: 0,
  search: "",
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
        delivery:
          state.delivery.length === 6
            ? [...action.payload]
            : [...state.delivery, ...action.payload]
      };
    case SET_LANG:
      return {
        ...state,
        lang: action.payload.lang,
        id: action.payload.id
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload
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
