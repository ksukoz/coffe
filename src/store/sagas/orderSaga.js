import {
  take,
  takeLatest,
  takeEvery,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import { GET_ORDER, SET_ORDER } from "../actions/types";
// import { setCart, getCart } from '../actions/cartActions';

const getToken = state => state.user.token;

export function* setOrderSaga(item) {
  const { payload } = item;
  console.log(payload);
  // if (payload) {
  //   const token = yield select(getToken);

  //   let data = new FormData();

  //   data.append("item_id", payload.id);
  //   data.append("qty", payload.qty);

  //   const response = yield call(
  //     fetch,
  //     `http://kawaapi.gumione.pro/api/catalog/cart_update`,
  //     {
  //       headers: new Headers({
  //         Authorization: "Bearer " + token
  //       }),
  //       method: "POST",
  //       body: data
  //     }
  //   );

  //   yield call(fetchCartSaga);
  // }
}

export function* watchOrderSaga() {
  yield takeLatest(GET_ORDER, setOrderSaga);
}
