import { GET_USER, LOG_IN, SET_TOKEN, SET_USER, UPDATE_USER } from './types';

export const logIn = (login, password) => (dispatch) => {
	dispatch({
		type: LOG_IN,
		payload: { login, password }
	});
};

export const setToken = (token) => (dispatch) => {
	dispatch({
		type: SET_TOKEN,
		payload: token
	});
};

export const getToken = () => (dispatch) => {
	dispatch({
		type: GET_TOKEN
	});
};

export const setUser = (user) => (dispatch) => {
	dispatch({
		type: SET_USER,
		payload: user
	});
};

export const getUser = () => (dispatch) => {
	dispatch({
		type: GET_USER
	});
};

export const updateUser = (firstName, lastName, city) => (dispatch) => {
	dispatch({
		type: UPDATE_USER,
		payload: { firstName, lastName, city }
	});
};
