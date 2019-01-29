import { GET_USER, SET_USER, UPDATE_USER, LOG_IN, SET_TOKEN, GET_TOKEN } from '../actions/types';

const initialState = {
	// items: null,
	info: null,
	firstName: '',
	lastName: '',
	city: '',
	login: null,
	token: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOG_IN:
			return {
				...state,
				login: action.payload
			};
		case SET_TOKEN:
			return {
				...state,
				token: action.payload
			};
		case GET_TOKEN:
			return {
				...state,
				token: action.payload
			};
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
