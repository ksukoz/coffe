import { take, takeLatest, takeEvery, put, call, fork } from 'redux-saga/effects';
import { getAlphabet } from '../actions/commonActions';
import { CHANGE_CART, GET_CART, ADD_TO_CART } from '../actions/types';
import { setCart, getCart } from '../actions/cartActions';

export function* fetchCartSaga() {
	let formData = new FormData();
	formData.append('login', 'info@wrevery.com');
	formData.append('password', 'testtest');

	const response = yield call(fetch, `http://kawaapi.gumione.pro/api/auth/login`, {
		method: 'POST',
		body: formData
	});
	let { token } = yield response.json();

	const response2 = yield call(fetch, `http://kawaapi.gumione.pro/api/catalog/cart`, {
		headers: new Headers({
			Authorization: 'Bearer ' + token
		})
	});

	const { cart } = yield response2.json();

	yield put(setCart(cart));
}

export function* addToCartSaga(item) {
	const { payload } = item;
	if (payload) {
		let formData = new FormData();
		let data = new FormData();
		formData.append('login', 'info@wrevery.com');
		formData.append('password', 'testtest');

		data.append('item_id', payload.id);
		data.append('qty', payload.qty);

		const response = yield call(fetch, `http://kawaapi.gumione.pro/api/auth/login`, {
			method: 'POST',
			body: formData
		});
		let { token } = yield response.json();

		const response2 = yield call(fetch, `http://kawaapi.gumione.pro/api/catalog/cart_add`, {
			headers: new Headers({
				Authorization: 'Bearer ' + token
			}),
			method: 'POST',
			body: data
		});

		yield call(fetchCartSaga);
	}
}

export function* updateCartSaga(item) {
	const { payload } = item;
	if (payload) {
		let formData = new FormData();
		let data = new FormData();
		formData.append('login', 'info@wrevery.com');
		formData.append('password', 'testtest');

		data.append('item_id', payload.id);
		data.append('qty', payload.qty);

		const response = yield call(fetch, `http://kawaapi.gumione.pro/api/auth/login`, {
			method: 'POST',
			body: formData
		});
		let { token } = yield response.json();

		const response2 = yield call(fetch, `http://kawaapi.gumione.pro/api/catalog/cart_update`, {
			headers: new Headers({
				Authorization: 'Bearer ' + token
			}),
			method: 'POST',
			body: data
		});

		yield call(fetchCartSaga);
	}
}

export function* watchCartSaga() {
	yield takeLatest(ADD_TO_CART, addToCartSaga);
	yield takeLatest(CHANGE_CART, updateCartSaga);
	yield takeLatest(GET_CART, fetchCartSaga);
}
