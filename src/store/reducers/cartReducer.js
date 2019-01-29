import { SET_CART, ADD_TO_CART, CART_FETCHED, CART_FETCHING } from '../actions/types';

const initialState = {
	items: null,
	item: null,
	cartFetch: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CART:
			return {
				...state,
				items: action.payload === null ? [] : action.payload
			};
		case ADD_TO_CART:
			return {
				...state,
				item: action.payload
			};
		case CART_FETCHING:
			return {
				...state,
				cartFetch: true
			};
		case CART_FETCHED:
			return {
				...state,
				cartFetch: false
			};
		default:
			return state;
	}
}
