import { GET_USER, SET_USER, UPDATE_USER } from "../actions/types";

const initialState = {
  // items: null,
  info: null,
  firstName: "",
  lastName: "",
  city: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        info: action.payload
      };
    case SET_USER:
      return {
        ...state,
        info: action.payload
      };
    case UPDATE_USER:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        city: action.payload.city
      };
    default:
      return state;
  }
}
