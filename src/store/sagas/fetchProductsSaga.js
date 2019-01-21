import { take, takeLatest, put, call, apply } from "redux-saga/effects";
import {
  setProducts,
  getEndProducts,
  setProductsStatus
} from "../actions/catalogActions";
import { GET_CATEGORY, FETCHED, FETCHING } from "../actions/types";

export function* fetchProductsSaga(item) {
  yield put(setProductsStatus(FETCHING));
  const { payload } = item;
  if (payload) {
    console.log(payload);
    const response = yield call(
      fetch,
      payload.letter
        ? `http://kawaapi.gumione.pro/api/catalog/search/${encodeURI(
            payload.letter
          )}/after/${payload.category}/10/${payload.page}}`
        : `http://kawaapi.gumione.pro/api/catalog/items/${
            payload.category
          }/10/${payload.page}}`
    );
    const { items } = yield response.json();
    items.length > 0
      ? yield put(setProducts(items))
      : yield put(getEndProducts());
  }
  yield put(setProductsStatus(FETCHED));
}

export function* watchFetchProductsSaga() {
  yield takeLatest(GET_CATEGORY, fetchProductsSaga);
}
