import { takeLatest, put, call } from "redux-saga/effects";
import { SET_CATEGORIES } from "../actions/types";
import { setCategories } from "../actions/catalogActions";

function* fetchCategories() {
  const response = yield yield call(
    fetch,
    "http://kawaapi.gumione.pro/api/catalog/categories"
  );
  const { categories } = yield response.json();
  yield put(setCategories(categories));
}

export function* fetchCategoriesSaga() {
  yield takeLatest(SET_CATEGORIES, fetchCategories);
}
