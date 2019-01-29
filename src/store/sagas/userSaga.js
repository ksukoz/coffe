import { takeLatest, takeEvery, take, put, call } from 'redux-saga/effects';
import { GET_USER, UPDATE_USER, LOG_IN } from '../actions/types';
import { setToken, setUser, updateUser } from '../actions/userActions';

export function* setUserSaga() {
	const user = yield take(LOG_IN);
	const { payload } = user;
	let formData = new FormData();
	formData.append('login', payload.login);
	formData.append('password', payload.password);

	const response = yield call(fetch, `http://kawaapi.gumione.pro/api/auth/login`, {
		method: 'POST',
		body: formData
	});
	let { token } = yield response.json();

	yield put(setToken(token));
}

export function* fetchUserSaga() {
	let formData = new FormData();
	formData.append('login', 'info@wrevery.com');
	formData.append('password', 'testtest');

	const response = yield call(fetch, `http://kawaapi.gumione.pro/api/auth/login`, {
		method: 'POST',
		body: formData
	});
	let { token } = yield response.json();

	const response2 = yield call(fetch, `http://kawaapi.gumione.pro/api/profile/get`, {
		headers: new Headers({
			Authorization: 'Bearer ' + token
		})
	});

	const { profile } = yield response2.json();
	yield put(setUser(profile));
}

export function* updateUserSaga(item) {
	const { payload } = item;
	if (payload) {
		let formData = new FormData();
		let data = new FormData();
		formData.append('login', 'info@wrevery.com');
		formData.append('password', 'testtest');

		data.append('firstname', payload.firstName);
		data.append('lastname', payload.lastName);
		// data.append("city", payload.city);

		const response = yield call(fetch, `http://kawaapi.gumione.pro/api/auth/login`, {
			method: 'POST',
			body: formData
		});
		let { token } = yield response.json();

		const response2 = yield call(fetch, `http://kawaapi.gumione.pro/api/profile/update`, {
			headers: new Headers({
				Authorization: 'Bearer ' + token
			}),
			method: 'POST',
			body: data
		});
		yield call(fetchUserSaga);
	}
}

export function* watchUserSaga() {
	yield takeLatest(UPDATE_USER, updateUserSaga);
	yield takeLatest(GET_USER, fetchUserSaga);
}
