import { take, takeLatest, all, put, call, fork } from 'redux-saga/effects';
import { setDelivery } from '../actions/commonActions';
import { GET_DELIVERY_COST } from '../actions/types';
// import { setCart, getCart } from "../actions/cartActions";

export function* fetchDeliverySaga(city, delivery, courier) {
	if (city && delivery && courier) {
		let formData = new FormData();
		let data = new FormData();
		formData.append('username', '+380675635155');
		formData.append('password', 'test');

		data.append('city', city);
		data.append('delivery', delivery);
		data.append('courier', courier);

		const response = yield call(fetch, `http://kawaapi.gumione.pro/api/auth/login`, {
			method: 'POST',
			body: formData
		});
		let { token } = yield response.json();

		const response2 = yield call(fetch, `http://kawaapi.gumione.pro/api/catalog/delivery_cost`, {
			method: 'POST',
			headers: new Headers({
				Authorization: 'Bearer ' + token
			}),
			body: data
		});

		const { cost } = yield response2.json();
		yield put(
			setDelivery([
				{
					delivery: delivery === 1 ? 'np' : delivery === 2 ? 'up' : 'es',
					courier: courier,
					cost: cost
				}
			])
		);
	}
}

export function* watchDeliverySaga() {
	const city = yield take(GET_DELIVERY_COST);
	if (city.payload) {
		yield all([
			fork(() => fetchDeliverySaga(city.payload, 1, 1)),
			fork(() => fetchDeliverySaga(city.payload, 1, '0')),
			fork(() => fetchDeliverySaga(city.payload, 2, 1)),
			fork(() => fetchDeliverySaga(city.payload, 2, '0')),
			fork(() => fetchDeliverySaga(city.payload, 3, 1)),
			fork(() => fetchDeliverySaga(city.payload, 3, '0'))
		]);
	}

	// yield takeLatest(ADD_TO_CART, addToCartSaga);
	// yield takeLatest(CHANGE_CART, updateCartSaga);
	// yield takeEvery(GET_CART, fetchCartSaga);
}
