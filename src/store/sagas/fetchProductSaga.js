import { takeEvery, put, call } from "redux-saga/effects";
import { getProduct } from "../actions/catalogActions";
import { GET_PRODUCT_ID } from "../actions/types";

export function* fetchProductSaga(item) {
  const { payload } = item;
  if (payload) {
    const response = yield call(
      fetch,
      `http://kawaapi.gumione.pro/api/catalog/item/${payload}`
    );
    const { item } = yield response.json();
    console.log(item);
    yield put(getProduct(item));
  }
}

export function* watchFetchProductSaga() {
  yield takeEvery(GET_PRODUCT_ID, fetchProductSaga);
}
