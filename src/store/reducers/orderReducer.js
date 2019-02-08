import { GET_ORDER, SET_ORDER } from "../actions/types";

const initialState = {
  orderId: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER:
      return {
        ...state,
        orderId: action.payload
      };
    default:
      return state;
  }
}
