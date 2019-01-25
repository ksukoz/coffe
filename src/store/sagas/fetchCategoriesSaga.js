import { put, call, take } from "redux-saga/effects";
import {
  setCategories,
  setSubCategories,
  setDishes
} from "../actions/catalogActions";
import { GET_CATEGORIES } from "../actions/types";

export function* fetchCategoriesSaga() {
  yield take(GET_CATEGORIES);
  const response = yield call(
    fetch,
    "http://kawaapi.gumione.pro/api/catalog/categories"
  );
  const { categories } = yield response.json();
  yield put(setCategories(categories));
}

export function* fetchSubCategoriesSaga() {
  yield take(GET_CATEGORIES);
  const response = yield call(
    fetch,
    "http://kawaapi.gumione.pro/api/catalog/categories/7"
  );
  const { categories } = yield response.json();
  yield put(setSubCategories(categories));
}

export function* fetchDishesSaga() {
  yield take(GET_CATEGORIES);
  const response = yield call(
    fetch,
    "http://kawaapi.gumione.pro/api/catalog/categories/8"
  );
  const { categories } = yield response.json();
  yield put(setDishes(categories));
}
