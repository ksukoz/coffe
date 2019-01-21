import { put, call } from "redux-saga/effects";
import {
  setCategories,
  setSubCategories,
  setDishes
} from "../actions/catalogActions";

export function* fetchCategoriesSaga() {
  const response = yield call(
    fetch,
    "http://kawaapi.gumione.pro/api/catalog/categories"
  );
  const { categories } = yield response.json();
  yield put(setCategories(categories));
}

export function* fetchSubCategoriesSaga() {
  const response = yield call(
    fetch,
    "http://kawaapi.gumione.pro/api/catalog/categories/7"
  );
  const { categories } = yield response.json();
  yield put(setSubCategories(categories));
}

export function* fetchDishesSaga() {
  const response = yield call(
    fetch,
    "http://kawaapi.gumione.pro/api/catalog/categories/8"
  );
  const { categories } = yield response.json();
  yield put(setDishes(categories));
}
