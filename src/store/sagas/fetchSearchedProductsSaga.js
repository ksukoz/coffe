import { takeEvery, put, call, all } from "redux-saga/effects";
import {
  findProducts,
  getEndProducts,
  setProductsStatus
} from "../actions/catalogActions";
import { GET_CATEGORY, FETCHED, FETCHING, SET_SEARCH } from "../actions/types";

export function* fetchSearchedProductsSaga(item) {
  const { payload } = item;
  if (payload && payload.page) {
    console.log(payload);
    yield put(setProductsStatus(FETCHING));
    const response = yield call(
      fetch,
      `http://kawaapi.gumione.pro/api/catalog/search/${encodeURI(
        payload.search
      )}/${payload.category}/both//10/${payload.page}}`
    );
    const { items } = yield response.json();
    items.length === 10
      ? yield put(findProducts(items))
      : yield all([put(findProducts(items)), put(getEndProducts())]);
  }
  yield put(setProductsStatus(FETCHED));
}

export function* watchFetchSearchedProductsSaga() {
  yield takeEvery(SET_SEARCH, fetchSearchedProductsSaga);
}
