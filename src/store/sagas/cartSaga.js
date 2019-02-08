import {
  take,
  takeLatest,
  takeEvery,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import { getAlphabet } from "../actions/commonActions";
import { CHANGE_CART, GET_CART, ADD_TO_CART } from "../actions/types";
import { setCart, getCart } from "../actions/cartActions";

const getToken = state => state.user.token;

export function* fetchCartSaga() {
  const token = yield select(getToken);

  const response = yield call(
    fetch,
    `http://kawaapi.gumione.pro/api/catalog/cart`,
    {
      headers: new Headers({
        Authorization: "Bearer " + token
      })
    }
  );

  const { cart } = yield response.json();
  yield put(setCart(cart));
}

export function* addToCartSaga(item) {
  const { payload } = item;
  if (payload) {
    const token = yield select(getToken);

    let data = new FormData();
    data.append("item_id", payload.id);
    data.append("qty", payload.qty);

    const response = yield call(
      fetch,
      `http://kawaapi.gumione.pro/api/catalog/cart_add`,
      {
        headers: new Headers({
          Authorization: "Bearer " + token
        }),
        method: "POST",
        body: data
      }
    );

    yield call(fetchCartSaga);
  }
}

export function* updateCartSaga(item) {
  const { payload } = item;
  if (payload) {
    const token = yield select(getToken);

    let data = new FormData();

    data.append("item_id", payload.id);
    data.append("qty", payload.qty);

    const response = yield call(
      fetch,
      `http://kawaapi.gumione.pro/api/catalog/cart_update`,
      {
        headers: new Headers({
          Authorization: "Bearer " + token
        }),
        method: "POST",
        body: data
      }
    );

    yield call(fetchCartSaga);
  }
}

export function* watchCartSaga() {
  yield takeLatest(ADD_TO_CART, addToCartSaga);
  yield takeLatest(CHANGE_CART, updateCartSaga);
  yield takeLatest(GET_CART, fetchCartSaga);
}
