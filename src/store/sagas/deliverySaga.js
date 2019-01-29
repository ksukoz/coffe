import { take, takeLatest, all, put, call, fork, select } from 'redux-saga/effects';
import { setDelivery } from '../actions/commonActions';
import { GET_DELIVERY_COST } from '../actions/types';

const getToken = (state) => state.user.token;

export function* fetchDeliverySaga(city, delivery, courier) {
	if (city && delivery && courier) {
		const token = yield select(getToken);

		let data = new FormData();

		data.append('city', city);
		data.append('delivery', delivery);
		data.append('courier', courier);

		const response = yield call(fetch, `http://kawaapi.gumione.pro/api/catalog/delivery_cost`, {
			method: 'POST',
			headers: new Headers({
				Authorization: 'Bearer ' + token
			}),
			body: data
		});

		const { cost } = yield response.json();
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

export function* getDeliverySaga(item) {
	if (item.payload) {
		yield all([
			fork(() => fetchDeliverySaga(item.payload, 1, 1)),
			fork(() => fetchDeliverySaga(item.payload, 1, '0')),
			fork(() => fetchDeliverySaga(item.payload, 2, 1)),
			fork(() => fetchDeliverySaga(item.payload, 2, '0')),
			fork(() => fetchDeliverySaga(item.payload, 3, 1)),
			fork(() => fetchDeliverySaga(item.payload, 3, '0'))
		]);
	}
}

export function* watchDeliverySaga() {
	yield takeLatest(GET_DELIVERY_COST, getDeliverySaga);
}
