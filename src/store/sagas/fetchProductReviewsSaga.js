import { takeLatest, takeEvery, put, call } from 'redux-saga/effects';
import { getProductReviews } from '../actions/catalogActions';
import { GET_PRODUCT_ID, ADD_PRODUCT_REVIEW } from '../actions/types';

const getToken = (state) => state.user.token;

export function* fetchProductReviewsSaga(item) {
	const { payload } = item;
	if (payload) {
		const response = yield call(fetch, `http://kawaapi.gumione.pro/api/catalog/get_comments/${payload}`);
		const { comments } = yield response.json();
		yield put(getProductReviews(comments.reverse()));
	}
}

export function* addProductReviewSaga(item) {
	const { payload } = item;
	if (payload) {
		const token = yield select(getToken);

		const response = yield call(fetch, `http://kawaapi.gumione.pro/api/catalog/add_comment`, {
			headers: new Headers({
				Authorization: 'Bearer ' + token
			}),
			method: 'POST',
			body: payload.data
		});

		yield call(() => fetchProductReviewsSaga({ payload: payload.id }));
	}
}

export function* watchFetchProductReviewsSaga() {
	yield takeLatest(ADD_PRODUCT_REVIEW, addProductReviewSaga);
	yield takeEvery(GET_PRODUCT_ID, fetchProductReviewsSaga);
}
