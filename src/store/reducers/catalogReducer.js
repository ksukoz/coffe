import { GET_SEARCHED_PRODUCTS, GET_PRODUCT } from '../actions/types';

const initialState = {
	searchedProducts: null,
	product: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_SEARCHED_PRODUCTS:
			return {
				...state,
				searchedProducts: action.payload
			};
		case GET_PRODUCT:
			return {
				...state,
				product: action.payload.item
			};
		default:
			return state;
	}
}
