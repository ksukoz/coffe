import { takeLatest, put, call } from "redux-saga/effects";
import { getProductReviews } from "../actions/catalogActions";
import { GET_PRODUCT_ID } from "../actions/types";

export function* fetchProductReviewsSaga(item) {
  const { payload } = item;
  if (payload) {
    const response = yield call(
      fetch,
      `http://kawaapi.gumione.pro/api/catalog/get_comments/${payload}`
    );
    const { comments } = yield response.json();
    yield put(getProductReviews(comments));
  }
}

export function* watchFetchProductReviewsSaga() {
  yield takeLatest(GET_PRODUCT_ID, fetchProductReviewsSaga);
}
